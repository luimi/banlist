const axios = require("axios").default;
const apiver = "11.13.1";

Parse.Cloud.job("updateChampions", async (params, headers, log, message) => {
  const response = await getRequest(
    "http://ddragon.leagueoflegends.com/cdn/"+apiver+"/data/en_US/champion.json"
  );
  const data = response.data.data;
  const ids = Object.keys(data);
  const Champion = Parse.Object.extend("Champion");
  let news = 0;
  for (let i = 0; i < ids.length; i++) {
    let exists = await new Parse.Query("Champion")
      .equalTo("key", parseInt(data[ids[i]].key))
      .first();
    if (!exists) {
      let champion = new Champion();
      champion.set("key", parseInt(data[ids[i]].key));
      champion.set("name", data[ids[i]].name);
      champion.setACL(getACL());
      await champion.save();
      news++;
    }
  }
  return;
});
/**
* Get summoner from local db if is not then from the riot server
* Errors
* 0: Missing parameters
* 1: Server not found
* 2: Summoner not found on riot server
*/
Parse.Cloud.define("getSummoner", async request => {
  const params = request.params;
  if (!params.server || !params.summoner) {
    return { success: false, error: 0 };
  }
  let server;
  try {
    server = await new Parse.Query("Server").get(params.server);
  } catch (e) {
    return { success: false, error: 1 };
  }

  let summoner;
  try {
    const url = `https://${server.get("url")}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(params.summoner)}`;
    const response = await getRequest(url);
    const data = response.data;
    summoner = await new Parse.Query("Summoner")
      .equalTo("key", data.id)
      .equalTo("server",server)
      .include("server")
      .first();
    if (!summoner) {
      summoner = emptySummoner(params.summoner);
      summoner.set("server", server);
      summoner.set("key", data.id);
    }
    summoner.set("name", data.name);
    summoner.set("profileIcon", data.profileIconId);
    summoner.set("summonerLevel", data.summonerLevel);
  } catch (e) {
    return { success: false, error: 2 };
  }
  await getSummonerRank(summoner);
  await getSummonerMain(summoner);
  await summoner.save(null, { useMasterKey: true });
  return {success: true, data: summoner };
});

/**
* Get current playing game
* Errors:
* 0: Missing parameters
* 1: Server not found
* 2: Unkown error
* TODO add symbol of previous report
*/
Parse.Cloud.define("getCurrentGame", async (request) => {
  const params = request.params;
  if (!params.summoner) {
    return { success: false, error: 0 };
  }
  let summoner;
  try{
    summoner = await new Parse.Query("Summoner").include("server").get(params.summoner);
  }catch(e){
    return { success: false, error: 1 };
  }
  try{
  	
    const url = `https://${summoner.get("server").get("url")}/lol/spectator/v4/active-games/by-summoner/${summoner.get("key")}`;
    const response = await getRequest(url);
    const data = response.data;
    const participants = data.participants;
    let currentId = 100;
    participants.forEach(player => {
      if(player.summonerId === summoner.get("key")){
        currentId = player.teamId;
      }
    });
    let game = {id: data.gameId, startTime: data.gameStartTime, current:[], enemies:[]};
    const summonersKeys = participants.map((player) => {return player.summonerId});
    const summoners = await new Parse.Query("Summoner").containedIn("key", summonersKeys).find();
    for(let i = 0 ; i < participants.length ; i++) {
      let participant = participants[i];
      let player;
      summoners.forEach(_summoner => {
        if(_summoner.get('key') === participant.summonerId){
          player = {summoner:_summoner};
        }
      });
      if(!player){
        let newSummoner = emptySummoner(participant.summonerName);
        newSummoner.set("key", participant.summonerId);
        newSummoner.set("profileIcon", participant.profileIconId);
        newSummoner.set("server", summoner.get("server"));
        await newSummoner.save();
        player = {summoner: newSummoner};
      }
      const champion = await new Parse.Query("Champion").equalTo("key", participant.championId).first();
      player.champion = champion;
      player.averages = getPosNegAverage(player.summoner);
      
      game[(participant.teamId === currentId)?"current":"enemies"].push(player);
    }
    return {success: true, data: game };
  }catch(e){
    return { success: false, error: 2 , message: e};
  }
});

/**
* Make a report from game
* Errors:
* 0: Missing Parameters
* 1: can't report yourself
* 2: from, to or champion is not valid
* 3: this report is duplicated
*/
Parse.Cloud.define("report", async (request) => {
  const params = request.params;
  const items = ["pro","nice","feeder","flamer","leaver","troll"];
  let allItems = true;
  items.forEach(item => {
    if(params[item] === undefined) allItems = false;
  });
  let from,to, champion;
  if (!params.from || !params.to || !params.game || !params.champion || !allItems) {
    return { success: false, error: 0 };
  }
  if(params.from === params.to){
    return { success: false, error: 1 };
  }
  try{
    from = await new Parse.Query("Summoner").get(params.from);
    to = await new Parse.Query("Summoner").get(params.to);
    champion = await new Parse.Query("Champion").get(params.champion);
  }catch(e){
    return { success: false, error: 2 };
  }
  const reported = await new Parse.Query("Report").equalTo("from", from).equalTo("to",to).equalTo("game",params.game).first();
  if(reported){
    return { success: false, error: 3 };
  }
  const Report = Parse.Object.extend("Report");
  const report = new Report();
  report.set("from", from);
  report.set("to", to);
  report.set("game",params.game);
  report.set("champion", champion);
  if(params.note){
    report.set("note",params.note);
  }
  report.setACL(getACL());
  items.forEach(item => {
    report.set(item,params[item]);
    if(params[item]){
      to.set(item,to.get(item)+1);
    }
  });
  await report.save(null, { useMasterKey: true });
  await to.save(null, { useMasterKey: true });
  return { success: true }
  
});

/**
* Update summoner data from riot server
* Errors:
* 0: Missing parameters
* 1: Unknown Error
*/
Parse.Cloud.define("updateSummoner", async (request) => {
  const params = request.params;
  if(!params.summoner){
    return { success: false, error: 0 };
  }
  try {
    const summoner = await new Parse.Query("Summoner").include("server").get(params.summoner);
    
    const url = `https://${summoner.get("server").get("url")}/lol/summoner/v4/summoners/${summoner.get("key")}`;
    let response = await getRequest(url);
    const data = response.data;
    
    summoner.set("name", data.name);
    summoner.set("profileIcon", data.profileIconId);
    summoner.set("summonerLevel", data.summonerLevel);
    await getSummonerRank(summoner);
    await getSummonerMain(summoner);
    await summoner.save(null, { useMasterKey: true });
    return { success: true, data: summoner };
  } catch(e) {
    return { success: false, error: 1 };
  }
  
  
});

const getRequest = (url) => {
  return new Promise((res,rej) => {
    axios.get(url)
    .then(function (response) {
      res(response);
    })
    .catch(function (error) {
      res();
    })
    .then(function () {
    });
  });
}

const emptySummoner = name => {
  const Summoner = Parse.Object.extend("Summoner");
  let summoner = new Summoner();
  summoner.set("name", name);
  summoner.set("pro", 0);
  summoner.set("nice", 0);
  summoner.set("feeder", 0);
  summoner.set("flamer", 0);
  summoner.set("leaver", 0);
  summoner.set("troll", 0);
  summoner.setACL(getACL());
  return summoner;
};

const getSummonerRank = async (summoner) => {
  try {
    const url = `https://${summoner.get("server").get("url")}/lol/league/v4/entries/by-summoner/${summoner.get("key")}`;
    const response = await getRequest(url);
    const data = response.data;
    data.forEach(rank => {
      if (rank.queueType === "RANKED_SOLO_5x5") {
        summoner.set("rankSolo", rank.tier);
      } else if (rank.queueType === "RANKED_FLEX_SR") {
        summoner.set("rank5x5", rank.tier);
      }
    });
  } catch (e) {}
}

const getSummonerMain = async (summoner) => {
  try {
    const url = `https://${summoner.get("server").get("url")}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.get("key")}`;
    const response = await getRequest(url);
    const data = response.data;
    if(data.length > 0) {
      const champion = await new Parse.Query("Champion").equalTo("key", data[0].championId).first();
      if(champion) {
        summoner.set("main",champion);
      }
    }
  } catch (e) {}
}
const getPosNegAverage = (summoner) => {
  let positives = ["pro","nice"];
  let negatives = ["feeder","flamer","leaver","troll"];
  let averages = {total:0, positive:0,negative:0, positiveAVG:0, negativeAVG:0};
  positives.forEach(category => {
    averages.positive+=summoner.get(category);
  });
  negatives.forEach(category => {
    averages.negative+=summoner.get(category);
  });
  averages.total = averages.positive + averages.negative;
  if(averages.total > 0){
    if(averages.positive > 0){
      averages.positiveAVG = averages.positive/averages.total*12;
    }
    if(averages.negative > 0){
      averages.negativeAVG = averages.negative/averages.total*12;
    }
  }
  return averages;
}

const getACL = () => {
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);
  return acl;
};
const configure = async () => {
  const config = await Parse.Config.get({ useMasterKey: true });
  axios.defaults.headers.common["X-Riot-Token"] = config.get("riot_token");
};
configure();

