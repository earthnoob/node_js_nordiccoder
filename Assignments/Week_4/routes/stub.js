var express = require('express');
var router = express.Router();

// GET stub main route.
router.get('/', function(req, res, next) {
  res.json(
    { message: 'Hello, humans.', mood: 'Neutral' }
  );
});

module.exports = router;
