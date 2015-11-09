var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
var requestAsync = Promise.promisify(require('request'));


var app = express();

app.get('/scores', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send(ip);
});

app.get('/httpsuccess', function (req, res) {
  res.send('success !')
});

app.use(express.static(__dirname + '/'));

console.log("Please open http://localhost:3000/index.html");
app.listen(process.env.PORT || 3000);