// Route imports
var indexRouter = require('./index');
var usersRouter = require('./users');
var stubRouter = require('./stub');
var adminRouter = require('./admin');

module.exports = function (app) {
  // Route matching
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/stub', stubRouter);
  app.use('/admin', adminRouter);
};
