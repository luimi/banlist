var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var api = new ParseServer({
databaseURI: `${process.env.MONGODB}`,
  cloud: './cloud/main.js',
  appId: process.env.APPID,
  masterKey: process.env.MASTERKEY,
  serverURL: `http://localhost:${process.env.PORT}/parse`
});

var options = { allowInsecureHTTP: true };

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.URL,
      "appId": process.env.APPID,
      "masterKey": process.env.MASTERKEY,
      "appName": "BanList"
    }
  ],
  "users": [
    {
      "user":process.env.ADMIN,
      "pass":process.env.PASSWORD
    }
  ]
}, options);

var app = express();
app.use('/parse', api);
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);

httpServer.listen(process.env.PORT);