import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  categories = ["pro","nice","feeder","flamer","leaver","troll"];
  public categoriesBy = {positive:[{
    name:"pro",
    icon:"./assets/icon/trophy.svg"
  },{
    name:"nice",
    icon:"./assets/icon/thumbs-up.svg"
  }], 
  negative:[ {
    name:"feeder",
    icon:"./assets/icon/skull.svg"
  },{
    name:"flamer",
    icon:"./assets/icon/fire.svg"
  },{
    name:"leaver",
    icon:"./assets/icon/door-open.svg"
  },{
    name:"troll",
    icon:"./assets/icon/tongue-wink.svg"
  }]};
  positives = ["pro","nice"];
  negatives = ["feeder","flamer","leaver","troll"];
  constructor() { }

  getAverages(summoner){
    let averages:any = {};
    let total = 0;
    this.categories.forEach(category => {
      total= total + summoner[category];
    });
    this.categories.forEach(category => {
      if(summoner[category] === 0){
        averages[category] = 0;
      } else {
        averages[category] = summoner[category]/total*12;
      }
    });
    return averages;
  }
  getPosNegAverage(summoner){
    let averages: any = {total:0, positive:0,negative:0, positiveAVG:0, negativeAVG:0};
    this.positives.forEach(category => {
      try{
        averages.positive+=summoner.get(category);
      }catch(e){
        averages.positive+=summoner[category];
      }
      
    });
    this.negatives.forEach(category => {
      try{
        averages.negative+=summoner.get(category);
      }catch(e){
        averages.negative+=summoner[category];
      }
      
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
}
