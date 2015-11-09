var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
var requestAsync = Promise.promisify(require('request'));


var app = express();

app.get('/sendMe/:addressToCall', function (req, res) {
  var addressToCall = req.params.addressToCall;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  requestAsync("http://" + ip + ':3000/' + addressToCall).then(function (result) {
    res.send(result.body);
  });
});

app.get('/success', function(req, res) {
  res.send("success");
});

app.get('/httpsuccess', function (req, res) {
  res.send('success !')
});

app.use(express.static(__dirname + '/'));

console.log("Please open http://localhost:3000/index.html");
app.listen(process.env.PORT || 3000);