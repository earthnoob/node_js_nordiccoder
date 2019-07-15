const crypto = require('crypto');
const bcrypt = require('bcrypt');
const argon2 = require('argon2');
const random = require('./random');
const promisify = require('./promisify');

const Exceptions = Object.freeze({
  InvalidTypeException(message) {
    const instance = new Error(message);
    instance.name = 'InvalidTypeException';

    return instance;
  },

  InvalidModeException(message) {
    const instance = new Error(message);
    instance.name = 'InvalidModeException';

    return instance;
  },
  InvalidImplementationException(message) {
    const instance = new Error(message);
    instance.name = 'InvalidImplementationException';

    return instance;
  },
  EmtpyImplementationException(message) {
    const instance = new Error(message);
    instance.name = 'EmptyImplementationException';

    return instance;
  },
});

/**
 * Passxy - or Password Proxy - is a one-stop place for all your password
 * hashing/decrypting implementations. It comes with methods suitable
 * for storing/deploying/manipulating different flavours of password securing
 * mechanisms through a unified, intuitive interface.
 *
 * @author earthnoob
 *
 * @param {any} initializer
 * @constructor
 */
const Passxy = function passxy(initializer = 'pbkdf2') {
  const state = {
    modes: {
      PBKDF2: {
        name: 'pbkdf2',
        lib: crypto,
        encryptor(password, cryptoLib, configs) {
          // Salt/Password length configurations
          const SALT_LEN = random(64, 128);
          const ITERATION_COUNT = random(300000, 500000);
          const PASSWORD_LEN = random(64, 128);
          const salt = cryptoLib.randomBytes(SALT_LEN);
          const { DIGEST_ALG } = configs;

          return promisify(cryptoLib.pbkdf2)(
            password,
            salt,
            ITERATION_COUNT,
            PASSWORD_LEN,
            DIGEST_ALG,
          )
            .then((derivedKey) => {
              const encrypted = `${derivedKey.toString(
                'base64',
              )}.${salt.toString('base64')}.${ITERATION_COUNT}`;
              return encrypted;
            })
            .catch(err => err);
        },
        decryptor(candidate, enc, cryptoLib, configs) {
          const [password, salt, iterCount] = enc.split(/\./g);
          const passLen = Buffer.from(password, 'base64').length;
          const { DIGEST_ALG } = configs;

          return promisify(cryptoLib.pbkdf2)(
            candidate,
            Buffer.from(salt, 'base64'),
            +iterCount,
            passLen,
            DIGEST_ALG,
          )
            .then(hashedCandidate => hashedCandidate.toString('base64') === password)
            .catch(err => err);
        },
        configs: {
          DIGEST_ALG: 'sha3-512',
        },
      },
      BCRYPT: {
        name: 'bcrypt',
        lib: bcrypt,
        encryptor(password, cryptoLib, configs) {
          const { SALT_ROUNDS } = configs;

          return cryptoLib
            .genSalt(SALT_ROUNDS)
            .then(salt => cryptoLib
              .hash(password, salt)
              .then(hash => hash)
              .catch(err => err))
            .catch(err => err);
        },
        decryptor(candidate, enc, cryptoLib) {
          return cryptoLib
            .compare(candidate, enc)
            .then(result => result)
            .catch(err => err);
        },
        configs: {
          SALT_ROUNDS: 14,
        },
      },
      SCRYPT: {
        name: 'scrypt',
        lib: null,
        encryptor(password, cryptoLib, configs) {
          return promisify(cryptoLib.scrypt)(password, 'salt', 128, configs)
            .then(derivedKey => derivedKey.toString('base64'))
            .catch(err => err);
        },
        decryptor(candidate, enc, cryptoLib) {
          return promisify(cryptoLib.scrypt)()
            .then(key => key.toString('base64') === enc)
            .catch(err => err);
        },
      },
      ARGON2: {
        name: 'argon2',
        lib: argon2,
        encryptor(password, cryptoLib, configs) {
          const {
            TYPE,
            HASH_LEN,
            TIME_COST,
            MEM_COST,
            PARALLELISM,
            RAW,
          } = configs;

          return cryptoLib
            .hash(password, {
              type: cryptoLib[TYPE],
              hashLength: HASH_LEN,
              timeCost: TIME_COST,
              memoryCost: MEM_COST,
              parallelism: PARALLELISM,
              raw: RAW,
            })
            .then(hash => hash.toString('base64'))
            .catch(err => err);
        },
        decryptor(candidate, enc, cryptoLib) {
          return cryptoLib
            .verify(enc, candidate)
            .then(result => result)
            .catch(err => err);
        },
        configs: {
          TYPE: 'argon2i',
          HASH_LEN: 32,
          TIME_COST: 25,
          MEM_COST: 2 ** 16,
          PARALLELISM: 2,
          RAW: false,
        },
      },
      current: 'PBKDF2',
    },
    get currentMode() {
      return this.modes[this.modes.current.toUpperCase()];
    },
    set currentMode(alg) {
      this.modes.current = alg.toLowerCase();
    },
  };

  /**
   *
   * @param {*} algConf
   */
  const setMode = (algConf = 'pbkdf2') => {
    if (typeof algConf === 'string' && !!algConf) {
      if (state.modes[algConf.toUpperCase()]) {
        state.currentMode = algConf;
      } else {
        // Throw ImplementationInvalidException
        throw Exceptions.InvalidModeException(`Unsupported mode ${algConf}.`);
      }
    } else if (
      typeof algConf === 'object'
      && algConf.constructor === Object().constructor
      && Object.keys(algConf) > 0
    ) {
      const {
        name, lib, conf, encryptor, decryptor,
      } = algConf;
      if (typeof lib !== 'object' || Object.keys(lib) === 0) {
        // Throw ImplementationEmptyException
        throw Exceptions.InvalidImplementationException(
          'Implementation appears to be invalid. Please re-check.',
        );
      } else {
        state.modes = {
          ...state.modes,
          [name.toUpperCase()]: {
            name: name.toUpperCase(),
            lib,
            configs: conf || {},
            encryptor: encryptor || function (password, cryptoLib, configs) {},
            decryptor:
              decryptor || function (candidate, enc, cryptoLib, configs) {},
          },
        };
        state.currentMode = name;
      }
    } else {
      // Do nothing (?!)
    }
  };

  const getModeString = () => state.modes.current.toUpperCase();

  const getMode = () => state.modes[getModeString()];

  const getConf = () => getMode().configs;

  const setConf = (conf) => {
    state.modes[getModeString()] = { ...state.modes[getModeString()], ...conf };
  };

  const setEncryptor = (encryptor) => {
    state.modes[getModeString()].encryptor = encryptor;
  };
  const setDecryptor = (decryptor) => {
    state.modes[getModeString()].decryptor = decryptor;
  };

  const getState = () => state;

  const json = enc => ({
    enc,
    mod: getModeString(),
  });

  const toString = enc => JSON.stringify(json(enc));

  const serialize = encObj => Buffer.from(toString(encObj)).toString('base64');

  const deserialize = encString => JSON.parse(Buffer.from(encString, 'base64').toString('utf8'));

  /**
   * Some initializing stuff here
   */
  if (
    typeof initializer === 'string'
    || (typeof initializer === 'object'
      && initializer.constructor === Object().constructor)
  ) {
    setMode(initializer);
  } else {
    // Throw InvalidTypeException error
    throw Exceptions.InvalidTypeException(
      `Expected String or Object, but got ${typeof initializer} instead.`,
    );
  }

  /**
   *
   * @param {*} password
   * @param {*} conf
   */
  const encrypt = (password, conf) => {
    const currentMode = getMode();
    const { lib } = currentMode;
    const configs = conf || currentMode.configs;
    const hashFn = currentMode.encryptor;

    return hashFn.call(null, password, lib, configs);
  };

  /**
   *
   * @param {*} candidate
   * @param {*} encrypted
   * @param {*} isPassxyString
   * @param {*} conf
   */
  const match = (candidate, encrypted, isPassxyString = false, conf) => {
    let deserialized;

    /* if (typeof encrypted === 'string') {
      if (isPassxyString) {
        deserialized = deserialize(encrypted);
      } else {
        password = encrypted;
      }
    } else if (typeof encrypted === 'object' &&
                encrypted.constructor === Object().constructor) {
      deserialized = encrypted;
    } else {
      throw Exceptions.InvalidTypeException(
        `Expected String or Object, but got ${typeof encrypted} instead.`
      );
    } */

    /* if (
      (typeof encrypted !== 'string') ||
      (typeof encrypted !== 'object' &&
        encrypted.constructor !== Object().constructor)
    ) {
      throw Exceptions.InvalidTypeException(
        `Expected String or Object, but got ${typeof encrypted} instead.`
      );
    } */

    if (isPassxyString) {
      // Is definitely a passxy-formatted string
      deserialized = deserialize(encrypted);
    } else {
      // Could be a password string or an object
      deserialized = encrypted;
    }

    const password = deserialized.enc || encrypted;
    setMode(deserialized.mod || getModeString());

    const currentMode = getMode();
    const { lib } = currentMode;
    const configs = conf || currentMode.configs;

    return currentMode.decryptor.call(null, candidate, password, lib, configs);
  };

  return Object.freeze({
    encrypt,
    match,
    getMode,
    getModeString,
    setMode,
    setEncryptor,
    setDecryptor,
    getConf,
    setConf,
    json,
    toString,
    serialize,
    deserialize,
    getState,
  });
};

module.exports = Passxy;
