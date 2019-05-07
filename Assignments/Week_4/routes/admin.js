var router = require('express').Router();
var User = require('../schemas/user.schema');

router.get('/', function(req, res, next) {
  console.log(User);
  res.render('index', {
  });
});

router.get('/users', function(req, res, next) {
  res.render('users', {
  });
});

router.get('/test', function(req, res, next) {
  res.render('test-table', {
  });
});

router.get('/users/:id', function(req, res, next) {
  res.render('user-details', {
  });
});

router.get('/old', function(req, res, next) {
  res.render('index-old');
});

module.exports = router;
