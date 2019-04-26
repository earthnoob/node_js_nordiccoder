const ReadBasic = require('./test');

const rb = ReadBasic();
rb.ask('How are you', (ans) => {
  console.log(`You are feeling ${ans}.`);
});

/* const rl = require('readline');

const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r.question('what shall i call you?', (ans) => {
  console.log(ans);
});

console.log('AAAAAAAAAAAA'); */
