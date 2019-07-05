var router = require("express").Router();

var redirectLogin = require("../actions/redirectLogin.action");
var redirectHome = require("../actions/redirectHome.action");

router.get("/", function(req, res, next) {
  res.render("conduct-criteria", { layout: false });
});

module.exports = router;
