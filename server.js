var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
var ping = require('ping-wrapper2');
var requestAsync = Promise.promisify(require('request'));

var app = express();

app.get('/sendMe/:addressToCall', function (req, res) {
  var addressToCall = req.params.addressToCall;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  requestAsync("http://" + ip + ':3000/' + addressToCall, {timeout: 1500}).then(function (result) {
    res.send(result.body);
  }).catch(function() {
    res.send("timeout ! but ip was " + ip);
  });
});

app.get('/pingMe/:ipAddress', function (req, res) {
  var ipAddress = req.params.ipAddress;
  var exec = ping("google.com", { count: 1 });
  exec.on("exit", function(data){
    // { no: 1, bytes: 64, time: 54, ttl: 1 }
    res.send(data);
  });
});

app.get('/success', function(req, res) {
  res.send("success");
});

app.get('/timeout', function(req, res) {
  setTimeout(function() {res.send("success")}, 2500);
});

app.get('/httpsuccess', function (req, res) {
  res.send('success !')
});

app.use(express.static(__dirname + '/'));

console.log("Please open http://localhost:3000/index.html");
app.listen(process.env.PORT || 3000);