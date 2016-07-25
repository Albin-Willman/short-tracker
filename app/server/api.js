
/**
 * Register your development apis as router middlewars
 */

var express = require('express');
var router = express.Router();

var path = require('path');

var data = require(path.resolve(__dirname, '../../dist/api/data.json'));

router.get('/data.json', function (req, res) {
    res.send(data);
});

module.exports = router;
