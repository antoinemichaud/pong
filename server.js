var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
var requestAsync = Promise.promisify(require('request'));

var app = express();

app.get('/sendMe/:addressToCall', function (req, res) {
  var addressToCall = req.params.addressToCall;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  requestAsync("http://" + ip + ':3000/' + addressToCall, {timeout: 1500}).then(function (result) {
    res.send(result.body);
  }).catch(function () {
    res.send("timeout ! but ip was " + ip);
  });
});

app.get('/pingMe/:ipAddress', function (req, res) {
  var ipAddress = req.params.ipAddress;
  var ping = require('ping');

  var hosts = [ipAddress];

  hosts.forEach(function (host) {
    ping.promise.probe(host)
      .then(function (pingRes) {
        res.send(pingRes);
      })
      .catch(function (error) {
        res.send(error);
      });
  });
});

app.get('/success', function (req, res) {
  res.send("success");
});

app.get('/timeout', function (req, res) {
  setTimeout(function () {
    res.send("success")
  }, 2500);
});

app.get('/httpsuccess', function (req, res) {
  res.send('success !')
});

app.use(express.static(__dirname + '/'));

console.log("Please open http://localhost:3000/index.html");
app.listen(process.env.PORT || 3000);