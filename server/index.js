var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();
require('dotenv').config()

var api = new ParseServer({
  databaseURI: `${process.env.MONGODB}`,
  cloud: './cloud/main.js',
  appId: process.env.APPID,
  masterKey: process.env.MASTERKEY,
  serverURL: `http://localhost:${process.env.PORT}/parse`
});

app.use('/parse', api);
app.get('/', (req,res)=> {
  res.send("Banlist");
});
app.listen(process.env.PORT, () => {
  console.log('Banlist ready');
});