var express = require("express");
var router = express.Router();

var redirectLogin = require("../actions/redirectLogin.action");

/* GET home page. */
router.get("/", redirectLogin, function(req, res, next) {
  const {
    session: {
      user: {
        role: {
          name: roleName
        }
      }
    }
  } = req;

  if (roleName === 'PEASANT')
    res.render("index", {
      layout: false,
      user: req.session.user,
      renderTemplate: 'index-student',
    });
  else if (roleName === 'NOBLEMAN')
    res.render("index", {
      layout: false,
      user: req.session.user,
      renderTemplate: 'index-teacher',
    });
  else if (roleName === 'OVERLORD')
    res.render("index", {
      layout: false,
      user: req.session.user,
      renderTemplate: 'index-admin'
    });
  else next();
});

module.exports = router;
