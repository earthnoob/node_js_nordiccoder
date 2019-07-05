var express = require('express');
var router = express.Router();

var redirectLogin = require('../actions/redirectLogin.action');

/* GET home page. */
router.get('/', redirectLogin, function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;