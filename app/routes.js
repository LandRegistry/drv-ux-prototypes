var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// Needed for the worldpay routes which throw POST data around
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  res.render('index', {
    'query': req.query
  });
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

  res.render('drv-' + req.params.version + '/worldpay_' + req.params.stage, {
    'id': id,
    'query': req.query
  });
});

/**
 * Sign-in - added for DRV-17 to POST result ID
 * not needed for previous protos, but does not break 16 or earlier
 */
router.all('/drv-:version/sign-in', function (req, res) {
  var id;

  if(req.body.id) {
    id = parseInt(req.body.id);
  }

  if(req.query.id) {
    id = req.query.id;
  }

  res.render('drv-' + req.params.version + '/sign-in' , {
    'id': id,
    'query': req.query
  });
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
    'results_count': results.length,
    'query': req.query
  });
});

/**
 * Individual item route - result
 */
router.get('/drv-:version/result/:id', function (req, res) {

  var id = parseInt(req.params.id);
  var results = require('./results')();

  res.render('drv-' + req.params.version + '/result', {
    'id': id,
    'result': results[id - 1],
    'query': req.query
  });
});

/**
 * Individual item route - confirm
 */
router.get('/drv-:version/confirm/:id', function (req, res) {

  var id = parseInt(req.params.id);
  var results = require('./results')();

  res.render('drv-' + req.params.version + '/confirm', {
    'id': id,
    'result': results[id - 1],
    'query': req.query
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
    'result': results[id - 1],
    'query': req.query
  });
});


// Override all the page routes so we can expose the query string
router.get('/drv-:version/*/:page', function (req, res) {
  res.render(path.join('drv-' + req.params.version, req.params[0], req.params.page), {
    'query': req.query
  });
});


module.exports = router;
