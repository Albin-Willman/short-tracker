
var express = require('express');
var router = express.Router();

var path = require('path');

router.get('/*', function (req, res) {
  var filePath = path.resolve(__dirname, '../../dist/blogposts' + req.url);
  res.sendFile(filePath);
});

module.exports = router;
