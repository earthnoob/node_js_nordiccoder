const random = (min = 0, max) => Math.floor(
  Math.random() * (max - min) + min
);

module.exports = random;
