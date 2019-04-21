const readline = require('readline');

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (promptObj) => {
  let resultObj = {};
  let tdmp;

  r.on('line', (input) => {
    temp = input;
    console.log(`Received input: ${input}.`);
  });

  promptObj.forEach(({ varName, message, validatorFunc }) => {
    //while (true) {
      process.stdout.write(message);
      if (validatorFunc(temp)) {
        resultObj = { ...resultObj, [varName]: temp };
        temp = null;
        //break;
      } else {
        process.stdout.write('Invalid input, please try again.\n');
      }
    //}
  });

  r.close();
  return resultObj;
};

prompt([
  {
    varName: 'a',
    message: 'HENLO',
    validatorFunc(elem) { return elem > 2; },
  },
  {
    varName: 'b',
    message: 'We met again',
    validatorFunc(elem) { return elem === 'DOGGO'; },
  },
  {
    varName: 'c',
    messgae: 'LOLOLOLOLOLOLOLOLOL',
    validatorFunc(elem) { return elem < 100; },
  },
]);
