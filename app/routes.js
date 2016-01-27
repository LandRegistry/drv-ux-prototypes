var express = require('express');
var router = express.Router();
var yaml = require('yamljs');
var fs = require('fs');
// var results = require('./results');


var results = yaml.parse(fs.readFileSync('app/results.yaml', 'utf8'));

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name' : 'Foo' });
});

/**
 * Worldpay routes
 */
router.get('/drv-16/worldpay_:stage', function (req, res) {
  res.render('drv-16/worldpay_' + req.params.stage, { 'id': parseInt(req.query.id) });
});

/**
 * Listing page route
 */
router.get('/drv-16/search/:page', function (req, res) {
  var rpp = 25;

  var start = (req.params.page - 1) * rpp;

  var page = parseInt(req.params.page);

  res.render('drv-16/search_results', {
    'results' : results.slice(start, start + rpp),
    'page': page,
    'next': page + 1,
    'prev': (page > 1) ? page - 1 : false,
  });
});

/**
 * Individual item route
 */
router.get('/drv-16/result/:id', function (req, res) {

  var id = parseInt(req.params.id);

  res.render('drv-16/result', {
    'id': id,
    'result': results[id - 1]
  });
});

/**
 * Summary route
 */
router.get('/drv-16/summary/:id', function (req, res) {

  var id = parseInt(req.params.id);

  res.render('drv-16/summary', {
    'id': id,
    'result': results[id - 1]
  });
});

module.exports = router;
