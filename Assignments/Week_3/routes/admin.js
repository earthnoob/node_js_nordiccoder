var router = require('express').Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/users', function(req, res, next) {
  res.render('users');
});

module.exports = router;
