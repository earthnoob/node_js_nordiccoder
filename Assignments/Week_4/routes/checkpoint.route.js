var router = require("express").Router();
var passport = require("passport");

/**
 * Checkpoint middleware, used as man-in-the-middle
 * between MVC-like client with the server using
 * non-api routes but share the same authorization
 * mechanisms
 */
router.get(
  "/",
  function(req, res, next) {
    const requestMode = req.get("X-Request-Mode");

    switch (requestMode) {
      case "token-delivery":
        const token = req.get('X-Access-Token');
        req.jwtToken = req.get("X-Access-Token");
        console.log(req.fullUrl);
        console.log(`This is checkpoint.route.js and Access token is: ${req.get('Access-Token')}`);
        break;
      case "render":
      default:
        console.log(req.fullUrl);
        res.render("dummy", {
          action: "get-jwt-token",
          origin: req.fullUrl
        });
        break;
    }

    // next();
  },
  function(req, res, next) {
    passport.authenticate("jwt", { session: false }, function(err, user, info) {
      /* if (!user) {
      return res.render("login");
    }
    console.log('logged in');
    return res.render("index"); */
      if (!user) {
        res.redirect("../login");
      }
    })(req, res, next);
  }
);

module.exports = router;
