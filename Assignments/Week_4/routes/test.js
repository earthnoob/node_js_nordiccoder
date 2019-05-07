var express = require('express');
var router = express.Router();

var data = [ 'This', 'is', 'John', 'Cena'];

router.get('/', function(req, res, next) {
  res.render('test', { sample: [1, 2, 3, 4, 5] });
});

module.exports = router;
