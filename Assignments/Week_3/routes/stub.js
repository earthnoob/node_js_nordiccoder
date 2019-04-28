var express = require('express');
var router = express.Router();

// GET stub main route.
router.get('/', function(req, res, next) {
  res.send('This is a stub route for testing purposes only.');
});

module.exports = router;
