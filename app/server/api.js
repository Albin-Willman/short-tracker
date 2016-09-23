
/**
 * Register your development apis as router middlewars
 */

var express = require('express');
var router = express.Router();

var path = require('path');

var data = require(path.resolve(__dirname, '../../dist/api/v2/stocks.json'));
var actors = require(path.resolve(__dirname, '../../dist/api/v2/actors.json'));

router.get('/v2/stocks.json', function (req, res) {
  res.send(data);
});

router.get('/v2/actors.json', function (req, res) {
  res.send(actors);
});

router.get('/v2/actors/:name', function (req, res) {
  var response = require(path.resolve(__dirname, '../../dist/api/v2/actors/' + req.params.name));
  res.send(response);
});

router.get('/v2/stocks/:name', function (req, res) {
  var response = require(path.resolve(__dirname, '../../dist/api/v2/stocks/' + req.params.name));
  res.send(response);
});

module.exports = router;
