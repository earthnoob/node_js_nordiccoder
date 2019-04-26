/* ESLINT CONFIGURATIONS */

/* eslint no-control-regex: 0, global-require: 0, no-await-in-loop: 0 */

/* END OF CONFIGURATIONS */
const ReadBasic = function readBasic(
  stdin = process.stdin,
  stdout = process.stdout,
  // configs = {},
) {
  const readline = require('readline');

  const initGlobalState = () => Object.freeze({
    readlineObj: null,
    SIGINTEventListenerPresent: false,
    cachedCallback: (() => {}),
    response: [],
    temp: '',
    answer: '',
  });
  let shared;

  const saveState = (currentState) => {
    shared = {
      ...shared,
      ...currentState,
    };
  };

  const CONSTANTS = Object.freeze({
    // ANSI escape sequence constants
    CUR_UP: '[A',
    CUR_DOWN: '[B',
    CUR_LEFT: '[D',
    CUR_RIGHT: '[C',
    DEL: '[3~',
    BACKSPACE: '\b',
    // Regular expession for dealing with special characters
    RE_SPACES: /[\n\r\0\t]+/gm,
    RE_ANSI_ESC: /\u001b(?:[[a-zA-Z]?[a-zA-Z]|[0-9]{0,2})~?/g,
    RE_ANSI_ESC_WITH_TEXT: /(\u001b)[[a-zA-Z]*[a-zA-Z0-9]{0,2}~*((?!\u001b).)*/g, // /(\u001b)[[a-zA-Z]*[a-zA-Z0-9]{0,2}~*((?!\1).)*/gm;
    RE_ANSI_ESC_TEXT_BEFORE: /.+?(?=\u001b[[a-zA-Z]*[a-zA-Z0-9]{0,2}~*)/g,
    UNICODE: '\\u001b',
    // Default cursor position in record string processing
    DEFAULT_CUR_POS: 0,
    CONTROL_CODES: {
      UP: { name: 'up' },
      DOWN: { name: 'down' },
      LEFT: { name: 'left' },
      RIGHT: { name: 'right' },
      BACKSPACE: { name: 'backspace' },
      F1: { name: 'f1' },
      F2: { name: 'f2' },
      F3: { name: 'f3' },
      F4: { name: 'f4' },
      F5: { name: 'f5' },
      F6: { name: 'f6' },
      F7: { name: 'f7' },
      F8: { name: 'f8' },
      F9: { name: 'f9' },
      F10: { name: 'f10' },
      F11: { name: 'f11' },
      F12: { name: 'f12' },
      DELETE: { name: 'delete' },
      HOME: { name: 'home' },
      PAGEUP: { name: 'pageup' },
      PAGEDOWN: { name: 'pagedown' },
      END: { name: 'end' },
      CLEAR: { name: 'clear' },
      INSERT: { name: 'insert' },
    },
  });

  const findControlCode = code => CONSTANTS.CONTROL_CODES[code] || !!CONSTANTS.CONTROL_CODES[code];

  // module.exports = CONSTANTS;

  const refine = str => str
    .replace(/(\u001b(?:[[A-Z][A-Z0-9]{0,2}~*)*|[\n\r\0]+)/gi, '').trim();

  const printExitMsg = () => {
    // process.stdin.write('USER PRESSED CTRL-C\nENDING PROGRAM\n');
    process.stdin.write('bye for now.\n');
  };

  const resetTemps = () => {
    saveState({
      cachedCallback: (() => {}),
      temp: '',
      response: [],
      answer: '',
    });
  };

  const on = (event, handler, message = null) => {
    stdin.on(event, handler, message);
  };

  const buildFromMacros = () => {
    const { DEFAULT_CUR_POS = 0 } = CONSTANTS;
    let { answer } = shared;
    const { response, cachedCallback: callback } = shared;
    let cursor = DEFAULT_CUR_POS;

    // Actions for different keypress codes
    const moveRight = (rightBound = answer.length) => {
      if (cursor < rightBound) cursor += 1;
    };

    const moveLeft = (leftBound = DEFAULT_CUR_POS) => {
      if (cursor > leftBound) cursor -= 1;
    };

    const insert = (str, insertStr, index) => str
      .slice(0, index) + insertStr + str.slice(index, str.length);

    const deleteStr = (str, index, control = 1) => {
      let deleted = str;

      if (index > 0) {
        if (Math.sign(control) === 1) {
          // Emulate backspace behaviour
          deleted = str.slice(0, index - 1) + str.slice(index, str.length);
        } else if (Math.sign(control) === -1) {
          // Emulate delete behaviour
          deleted = str.slice(0, index) + str.slice(index + 1, str.length);
        } else {
          process.stdout.write(
            'Control code must be a negative or positive number.\n',
          );
        }
      }
      return deleted;
    };

    response.forEach(({
      type, sequence, name,
    }) => {
      if (type === 'DATA') {
        if (cursor >= DEFAULT_CUR_POS) {
          answer = insert(answer, sequence, cursor);
          cursor += sequence.length;
        }
      } else if (type === 'CONTROL') {
        switch (name) {
          case 'right':
            moveRight();
            break;
          case 'left':
            moveLeft();
            break;
          case 'backspace':
            answer = deleteStr(answer, cursor, 1);
            cursor -= 1;
            break;
          case 'delete':
            answer = deleteStr(answer, cursor, -1);
            break;
          default:
            break;
        }
      }
      // console.log(`answer is now ${answer} and cursor position is now: ${cursor}.`);
    });

    saveState({
      answer,
    });

    return callback(refine(answer));
  };

  const handleKeypress = (letter, { sequence, name, ...additionalInfo }) => {
    let { temp, response } = shared;
    let currentKeypressType = 'DATA';
    let currentSequence = '';

    switch (name || sequence) {
      case findControlCode((name || sequence).toUpperCase()).name:
        currentKeypressType = 'CONTROL';
        currentSequence = sequence.match(CONSTANTS.RE_ANSI_ESC)
          ? sequence
          : '\b';
        break;
      case 'return':
      case 'enter':
        break;
      default:
        temp += sequence;
        break;
    }

    if (currentKeypressType === 'CONTROL') {
      if (temp !== '') {
        response = [
          ...response,
          { type: 'DATA', sequence: temp, ...additionalInfo },
        ];
        temp = '';
      }

      response = [
        ...response,
        {
          type: currentKeypressType,
          sequence: currentSequence,
          name,
          ...additionalInfo,
        },
      ];
    }

    if (name === 'enter' || name === 'return') {
      // process.stdout.write('USER PRESSED ENTER!\n');
      if (temp !== '') {
        response = [
          ...response,
          { type: 'DATA', sequence: temp, ...additionalInfo },
        ];
      }
      temp = '';
      saveState({
        temp,
        response,
      });

      buildFromMacros();
      resetTemps();
      return;
    }
    saveState({
      temp,
      response,
    });
  };

  const init = () => {
    shared = initGlobalState();
    const cleanupOp = printExitMsg || (() => {});

    process.on('exit', () => {
      // NOTE TO SELF: Can emit events with message.
      process.emit('cleanup', 'this is a message.');
    });
    process.on('cleanup', cleanupOp);

    // Default SIGINT behaviour, can be overwritten.
    process.on('SIGINT', () => {
      process.exit();
    });

    process.stdin.on('keypress', handleKeypress);
  };

  const open = () => {
    const initReadlineObj = () => {
      const { readlineObj } = shared;
      if (readlineObj === null) {
        const r = readline.createInterface({
          input: stdin,
          output: stdout,
          // terminal: false,
        });
        saveState({ readlineObj: r });
      }
    };

    const emitSIGINT = () => {
      const { readlineObj, SIGINTEventListernerPresent } = shared;
      if (!SIGINTEventListernerPresent) {
        readlineObj.on('SIGINT', () => { process.emit('SIGINT'); });
        saveState({
          SIGINTEventListenerPresent: true,
        });
      }
    };

    initReadlineObj();
    emitSIGINT();
  };

  const close = () => {
    shared.readlineObj.close();
    shared.SIGINTEventListenerPresent = false;
    // process.emit('cleanup');
  };

  const askCallback = (question, validatorFunc = () => true, callback) => {
    let hasQuestionMark = '';

    if (!/\?$/.test(question)) {
      hasQuestionMark = '?';
    }
    stdout.write(`${question}${hasQuestionMark} `);
    // Callback-caching approach (using callbacks as parameter)
    saveState({ cachedCallback: callback });

    // Promise-based approach
    // const fakeCallback = data => data;
    // shared = { ...shared, cachedCallback: fakeCallback };
  };

  const ask = (question, validatorFunc = () => true) => new Promise(
    resolve => askCallback(question, validatorFunc, resolve),
  );

  const interview = async (queries) => {
    let answers = {};
    let i = 0;
    /* await Promise.all(queries.map(async ({ question, varName }) => {
      const ans = await ask(question);
      console.log(ans);
    })); */

    /* for (const q of queries) {
      // const ans = await ask(q.question);
      answers = {
        ...answers,
        [q.varName]: await ask(q.question),
      };
    } */

    while (i < queries.length) {
      const ans = await ask(queries[i].question);
      if (ans) {
        answers = {
          ...answers,
          [queries[i].varName]: ans,
        };
        i += 1;
      }
    }

    return new Promise(resolve => resolve(answers));
  };

  init();

  return {
    open,
    close,
    ask,
    interview,
    on,
    init,
  };

  /* const parse = (rawStr) => {
    let data = rawStr;
    data = data.replace(CONSTANTS.RE_SPACES, '');

    let result = '';
    let match;
    let matchIndex = 0;
    let matchLength = 0;
    let cursorPosition = 0;
    let controlCode = '';
    // Get the beginning of the string
    result += data.split(CONSTANTS.RE_ANSI_ESC_WITH_TEXT)[0];
    console.log(result);
    cursorPosition = result.length;

    while (true) {
      match = CONSTANTS.RE_ANSI_ESC.exec(rawStr);
      if (match === null) break;
      matchLength = match[1].length + CONSTANTS.UNICODE_LEN;
      matchIndex = match.index;
      console.log(matchLength);
      console.log(match);
    }

    return data;
  }; */
};

module.exports = ReadBasic;
