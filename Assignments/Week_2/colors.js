const Colors = (function cl() {
  const globals = {
    ESC_SEQ: '\x1b[',
    COLOR_RST_SEQ: '\x1b[0m',
  };

  const randint = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const random = (string) => {
    const { ESC_SEQ, COLOR_RST_SEQ } = globals;
    const randomColor = randint(30, 37);

    return (`${ESC_SEQ}${randomColor}m${string}${COLOR_RST_SEQ}`);
  };

  return {
    random,
  };
}());

module.exports = Colors;
