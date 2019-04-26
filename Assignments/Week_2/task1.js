const rb = require('./readbasic')();

rb.open();

/* rb.ask(
  'How are you?',
  e => e === 'Fine',
  (ans) => {
    console.log(`Your answer is ${ans}.`);
  },
)
  .then((data) => {
    console.log(`YEE HAW ${data}.`);
    return rb.ask('What is your name?', e => e === '1');
  })
  .then((data) => {
    console.log(`So your name is ${data}. Interesting.`);
  }); */

/* (async () => {
    const a = await rb.ask('How are you');
    const b = await rb.ask('Want a coffee?');

    console.log(a, b);
  })() */


rb.interview([
  {
    question: 'Want a cup of coffee?',
    varName: 'coffee',
  },
  {
    question: 'If not, what kind of drink would you like?',
    varName: 'drink',
  },
  {
    question: 'Great choice. Want me to grab some food too?',
    varName: 'food',
  }])
  .then((answers) => {
    console.log(answers);
  });
