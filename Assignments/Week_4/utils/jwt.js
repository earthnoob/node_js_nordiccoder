const jwt = require('jsonwebtoken');
const Passxy = require('./passxy');

const JWT = (function (jwtLib = jwt, passwordLib = Passxy) {
  const passxy = passwordLib('argon2');
  const signOptions = {
    issuer: 'earthnoob',
    subject: 'lammap98@gmail.com',
    audience: 'http://fruits.banana.com',
    expiresIn: '30d',
    algorithm: 'RS512',
  };
  const verifyOptions = {
    ...signOptions,
    algorithm: ['RS512'],
  }

  const sign = (payload, key, options = {}) => {
    return jwtLib.sign(payload, key, { algorithm: 'RS512' });
  };

  const verify = (token, key, options = {}) => {
    return jwtLib.verify(token, key, { ...signOptions, ...options });
  }

  return Object.freeze({
    sign,
    verify
  });
});

module.exports = JWT;