const { encrypt, match } = require('./passwordUtils');

let pass;

(async () => {
  let pass = await encrypt('This is a password');
  console.log(await match('This is a password', pass));
})()
