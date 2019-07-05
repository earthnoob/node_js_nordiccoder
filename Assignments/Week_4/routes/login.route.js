var router = require("express").Router();
var passport = require("passport");
var jsonwebtoken = require("jsonwebtoken");
var Paxxy = require("../utils/passxy");

var JWT = require("../utils/jwt")(jsonwebtoken, Paxxy);
var redirectLogin = require('../actions/redirectLogin.action');
var redirectHome = require('../actions/redirectHome.action');

/* LOGIN routes */
/* router.get("/", function (req, res, next) {
  if (!req.get('Authorization')) {
    // console.log('Authorization header not present');
    res.render("dummy", {
      action: "get-jwt-token",
      origin: req.fullUrl
    });
  } else {
    // console.log('Header present');
    next();
  }
}, function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
      if (!user) {
        res.render('login');
      } else {
        next();
      }
    })(req, res, next);
}, function (req, res, next) {
  res.redirect('../');
}); */

router.get("/", redirectHome, function (req, res, next) {
  // Check for token in the request
  res.render('login', { layout: false });
});

router.post("/", redirectHome, function(req, res, next) {
  passport.authenticate("login", function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ info });
    }

    console.log(info);

    req.logIn(user, { session: false }, function(err) {
      if (err) {
        return next(err);
      }

      /**
       * NOTE-TO-SELF
       * For some reasons signing with the full user object takes FOREVER,
       * so JSON.stringify() is suitable.
       */
      const token = JWT.sign(
        {
          user: user.username,
          role: user.role
        },
        res.privateKey
      );

      /* return res.render("index", {
        token,
        action: "set-jwt-token",
        origin: req.fullUrl,
      }); */
      req.session.token = token;
      req.session.user = user;
      res.redirect('/home');
    });
  })(req, res, next);
});

module.exports = router;
