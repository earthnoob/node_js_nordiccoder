var LocalStrategy = require("passport-local").Strategy;
var { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");

var User = require("../schemas/user.schema");
var Role = require('../schemas/role.schema');
var Passxy = require("../utils/passxy")();
var CustomExtractors = require('./passport-extractors');

/**
 * NOTE-TO-SELF: TODO:
 * Implement error-handling mechanisms
 */
const use = (passport, { privateKey, publicKey }) => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        if (!username || !password) {
          return done (null, false, { message: 'Credentails missing' });
        }

        User.findOne({ username })
          .populate('role')
          .then(user => {
            if (!user) {
              return done(null, false, { message: "User does not exist" });
            }

            // Match password
            Passxy.match(password, user.password, true)
              .then(result => {
                if (result) {
                  return done(null, user, {
                    message: "User logged in successfully"
                  });
                } else {
                  return done(null, false, { message: "Invalid credentials" });
                }
              })
              .catch(err => err);
          })
          .catch(err => done(err, false, { message: "An error has occurred" }));
      }
    )
  );

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
          CustomExtractors.fromSession,
          CustomExtractors.fromReqObj,
        ]),
        secretOrKey: publicKey
      },
      function(jwtPayload, done) {
        User.findOne({ username: jwtPayload.user })
          .populate('role')
          .then(user => {
            if (!user)
              return done(null, false);
            return done(null, user);
          })
          .catch(err => done(err, false));
      }
    )
  );
};

module.exports = use;
