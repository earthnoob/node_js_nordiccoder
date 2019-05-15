const crypto = require('crypto');
const random = require('./random');
const promisify = require('./promisify');

const passwordUtils = Object.freeze({
  encrypt (password, cryptoLib = crypto) {
    // Salt/Password length configurations
    const SALT_LEN = random(64, 128);
    const ITERATION_COUNT = random(500000, 800000);
    const PASSWORD_LEN = random(64, 512);
    const DIGEST_ALG = 'sha3-512';

    const salt = cryptoLib.randomBytes(SALT_LEN);
    const hash = promisify(cryptoLib.pbkdf2)(
      password,
      salt,
      ITERATION_COUNT,
      PASSWORD_LEN,
      DIGEST_ALG,
    )
      .then(derivedKey => {
        return `${derivedKey.toString('base64')}.${salt.toString('base64')}.${ITERATION_COUNT}.${PASSWORD_LEN}.${DIGEST_ALG}`;
      })
      .catch(err => {
        return err;
      });

    return hash;
  },

  match (candidate, hashed, cryptoLib = crypto) {
    const [ password, salt, iterCount, passLen, digestAlg ] = hashed.split(/\./g);

    return promisify(cryptoLib.pbkdf2)(
      candidate,
      Buffer.from(salt, 'base64'),
      +iterCount,
      +passLen,
      digestAlg,
    )
      .then(hashedCandidate => {
        return hashedCandidate.toString('base64') === password;
      });
  }
});

module.exports = passwordUtils;
