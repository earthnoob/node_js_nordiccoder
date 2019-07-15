// Route imports
var redirectRouter = require('./redirect.route');
var indexRouter = require('./index.route');
var loginRouter = require('./login.route');
var logoutRouter = require('./logout.route');
var studentRouter = require('./student.route');
var teacherRouter = require('./teacher.route');
var subjectRouter = require('./subject.route');
var examRouter = require('./exam.route');
var scoreCriteriaRouter = require('./score-criteria.route');
var conductCriteriaRouter = require('./conduct-criteria.route');
var penaltyRouter = require('./penalty.route');
var schoolYearRouter = require('./school-year.route');
var classRouter = require('./class.route');
var usersRouter = require('./users.route');
var adminRouter = require('./admin.route');
var testingRouter = require('./test.route');
var checkpointRouter = require('./checkpoint.route');


module.exports = (function (app) {
  /**
   * Every client's request through this protected 'auth' routes
   * will receive a 'dummy' content page containing scripts used
   * to retrieve JWT token from clien't LocalStorage, then the
   * injected script will add the token into the request object
   * and redirect client to the intended route where further
   * processing will be made.
   */
  /* app.use(function (req, res, next) {
    console.log(`This is routesListing and token is: ${req.jwtToken}.`);
    if (!req.jwtToken) {
      console.log('It seems like the request doesnt have a token');
      res.render('dummy', {
        action: 'get-jwt-token',
        redirect: req.fullUrl,
      });
    } else {
      console.log('Got a token. Yay');
      // next();
    }
  }); */

  // Route matching
  app.use('/', redirectRouter);
  app.use('/home', indexRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/users', usersRouter);
  app.use('/students', studentRouter);
  app.use('/teachers', teacherRouter);
  app.use('/subjects', subjectRouter);
  app.use('/exams', examRouter);
  app.use('/score-criteria', scoreCriteriaRouter);
  app.use('/conduct-criteria', conductCriteriaRouter);
  app.use('/penalties', penaltyRouter);
  app.use('/school-years', schoolYearRouter);
  app.use('/classes', classRouter);
  app.use('/admin', adminRouter);
  app.use('/test', testingRouter);
  app.use('/checkpoint', checkpointRouter);
});
