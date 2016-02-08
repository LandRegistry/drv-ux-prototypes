var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// Needed for the worldpay routes which throw POST data around
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name' : 'Foo' });
});

/**
 * Worldpay routes
 */
router.all('/drv-:version/worldpay_:stage', function (req, res) {
  var id;

  if(req.body.id) {
    id = parseInt(req.body.id);
  }

  if(req.query.id) {
    id = req.query.id;
  }

  res.render('drv-' + req.params.version + '/worldpay_' + req.params.stage, { 'id': id });
});

/**
 * Listing page route
 */
router.get('/drv-:version/search/:page', function (req, res) {
  var rpp = 25;

  var start = (req.params.page - 1) * rpp;
  var results = require('./results')();

  var page = parseInt(req.params.page);

  res.render('drv-' + req.params.version + '/search_results', {
    'results' : results.slice(start, start + rpp),
    'page': page,
    'next': page + 1,
    'prev': (page > 1) ? page - 1 : false,
    'results_count': results.length
  });
});

/**
 * Individual item route
 */
router.get('/drv-:version/result/:id', function (req, res) {

  var id = parseInt(req.params.id);
  var results = require('./results')();

  res.render('drv-' + req.params.version + '/result', {
    'id': id,
    'result': results[id - 1]
  });
});

/**
 * Summary route
 */
router.get('/drv-:version/summary/:id', function (req, res) {

  var id = parseInt(req.params.id);
  var results = require('./results')();

  res.render('drv-' + req.params.version + '/summary', {
    'id': id,
    'result': results[id - 1]
  });
});

module.exports = router;
