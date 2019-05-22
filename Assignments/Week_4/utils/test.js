const Password = require('./password');

const pass = Password('argon2'); // bcrypt mode for encryption

(async () => {
  try {
    console.time('test');
    const encrypted = pass.serialize(await pass.encrypt('bananarama'));
    // console.log(pass.deserialize(encrypted));
    // console.log(await pass.match('bananarama', pass.deserialize(encrypted)));
    console.timeEnd('test');
  } catch (err) {
    console.log(err);
  }
})()

// pass.setMode('pbkdf2') // Change mode to PBKDF2

/* pass.setMode('zync', {
  lib: zync,
  configs: {
    zestiness: 100,
    alignment: 'vertical',
    passes: 10,
  },
  encryptor (password, banana, configs) {
    return banana.bananaify(password, configs);
  },
  decryptor (candidate, frozenBanana, banana, configs) {
    return banana.isBanana(candidate, frozenBanana, configs);
  },
  // ...add more properties here
 }); // Add a new mode with library implementation, including encryptor/decryptor functions */

// pass.setEncryptor('zync', function(password) { /* Your new implementation here */ })
// pass.setDecryptor('zync', function(candidate) { /* Your new implementation here */ })

// pass.match('candidate', someSerializedPasswordObject); // Matches/verifies a candidate against stored password object using currrent mode
// pass.serialize(pass.encrypt('bananarama')); // Serialize an encrypted password into javascript object
// pass.deserialize(someSerialziedPasswordObject);

// pass.getConf();
// pass.setConf({});
// pass.getMode(); // Get current mode of encryption
