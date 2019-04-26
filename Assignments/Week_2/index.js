const rb = require('./readbasic')();
const colors = require('./colors');

rb.open();

rb.interview([
  {
    question: 'What is your name?',
    varName: 'name',
  },
  {
    question: 'Which year were you born?',
    varName: 'birthYear',
  },
  {
    question: 'What is your home town?',
    varName: 'homeTown',
  }])
  .then((answers) => {
    const { name, birthYear, homeTown } = answers;
    process.stdout.write(`Thank you. Hello, ${colors.random(name)}. You are now ${colors.random(+new Date().getFullYear() - +birthYear)} years old and from ${colors.random(homeTown)}.\n`);
    rb.close();
  });
