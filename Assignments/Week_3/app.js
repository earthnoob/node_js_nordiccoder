var createError = require('http-errors');
var express = require('express');
var HB = require('handlebars');
var hbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var readFile = require('fs').readFile;
var promisify = require('./utils/promisify');
var app = express();

var rf = promisify(readFile);
var exphbs = hbs.create({
  extname: 'hbs',
  partialsDir: path.join(__dirname, 'views/partials'),
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine);

// Handlebars helper definitions go here
require(path.join(__dirname, 'handlebars/handlebars_helpers.js'))(HB);

// Bind express-handlebars compiled partials to handlebars'
exphbs.getPartials()
  .then((partials) => {
    HB.partials = { ...HB.partials, ...partials };

    // Pre-cache partials/templates for later use.
    // return rf(path.join(__dirname, 'views/cached-partials.hbs'), 'utf8');
    return exphbs.getTemplate(path.join(__dirname, 'views/cached-partials.hbs'));
  })
  .then((compiled) => {
    compiled({});
    return exphbs.getTemplate(path.join(__dirname, 'views/404.hbs'));
  })
  .catch((err) => {
    console.log(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes listing
require('./routes/routesListing')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
