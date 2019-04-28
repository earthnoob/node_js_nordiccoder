// Route imports
var indexRouter = require('./index');
var usersRouter = require('./users');
var stubRouter = require('./stub');

module.exports = function (app) {
  // Route matching
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/stub', stubRouter);
  console.log(stubRouter);
};
