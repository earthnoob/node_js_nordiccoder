var createError = require("http-errors");
var express = require("express");
var HB = require("handlebars");
var hbs = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var logger = require("morgan");
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var util = require("util");
var NodeRSA = require("node-rsa");
var fs = require("fs");
var passport = require('passport');

/**
 * LocalStorage support inside NodeJS. Yay
 */
// var localStorage = require('node-localstorage').LocalStorage;

var promisify = require("./utils/promisify");
var rsa = require("./utils/rsa")(NodeRSA);
var passportConfig = require("./configs/passport");

/**
 * Pre-promisified functions
 */
const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

var app = express();

// Setup .env
dotenv.config();




/**
 * PRIVATE/PUBLIC key paths and data holder
 * for global usage
 */
const privateKey = {
  path: path.join(
    path.resolve(process.env.PROJECT_PATH),
    "private.key"
  ),
  data: null,
};

const publicKey = {
  path: path.join(
    path.resolve(process.env.PROJECT_PATH),
    "public.key"
  ),
  data: null,
};




var exphbs = hbs.create({
  extname: "hbs",
  partialsDir: path.join(__dirname, "views/partials")
});




// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine);




// Handlebars helper definitions go here
require(path.join(__dirname, "handlebars/handlebars_helpers.js"))(HB);

// Bind express-handlebars compiled partials to handlebars'
exphbs
  .getPartials()
  .then(partials => {
    HB.partials = { ...HB.partials, ...partials };
    // console.log(partials);

    // Pre-cache partials/templates for later use.
    // return rf(path.join(__dirname, 'views/cached-partials.hbs'), 'utf8');
    return exphbs.getTemplate(
      path.join(__dirname, "views/cached-partials.hbs")
    );
  })
  .then(compiled => {
    compiled({});
    return exphbs.getTemplate(path.join(__dirname, "views/404.hbs"));
  })
  .catch(err => {
    console.log(err);
  });




app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * Setup session
 */
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // httpOnly: true,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, /* 30 days */ 
    sameSite: true,
  }
}));
app.use(express.static(path.join(__dirname, "public")));




// Check if private/public key files exists on server
access(privateKey.path)
  .then(result => {
    console.log("✔️ Private key present.");
  })
  .catch(err => {
    console.log("Private key not present. Creating one...");
    // Generate private key file
    writeFile(privateKey.path, rsa.exportPrivateKey()).then(
      err => {
        if (!err) {
          console.log("🎉 Private key created.");
        }
      }
    );
  });

access(publicKey.path)
  .then(result => {
    console.log("✔️ Public key present.");
  })
  .catch(err => {
    console.log("Public key not present. Creating one...");
    // Generate public key file
    writeFile(publicKey.path, rsa.exportPublicKey()).then(err => {
      if (!err) {
        console.log("🎉 Public key created.");
      }
    });
  });



/**
 * Read private/public key information from file
  */
readFile(privateKey.path, 'utf8')
  .then(data => {
    privateKey.data = data;
    return readFile(publicKey.path, 'utf8');
  })
  .then(data => {
    publicKey.data = data;

    // Passport.JS configurations
    passportConfig(passport, { privateKey: privateKey.data, publicKey: publicKey.data });
  })
  .catch(err => next(err));

/**
  * Private/public key data middleware.
  * Its job is to modify the response object by adding
  * private/public key information.
  */
app.use(function (req, res, next) {
  res.privateKey = privateKey.data,
  res.publicKey = publicKey.data;
  next();
});


// Connect to MongoDB Atlas service
mongoose
  .connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(
    () => {
      console.log("Atlas says hello 👋");

      /* Use ONCE. Comment after operation */
      // require('./dbscripts/addInitData.dbscript');

      /* Student scripts */
      // require('./dbscripts/addStudent.dbscript');

      /* Teachers scripts */
      // require('./dbscripts/addTeacher.dbscript');

      // require('./dbscripts/addSubject.dbscript');

      // require('./dbscripts/addScoreCrit.dbscript');
    },
    err => {
      console.log(err);
      console.log("Atlas screwed up 🤦 Trying fallback");
      mongoose
        .connect(process.env.DB_CONNECTION_STRING_FALLBACK, {
          useNewUrlParser: true,
          keepAlive: true
        })
        .then(
          () => {
            console.log("Fallback Atlas says hello 😘");
          },
          errFallback => {
            console.log(errFallback);
          }
        );
    }
  );


/**
 * Full request URL retrieval middleware
 */
app.use(function (req, res, next) {
  req.fullUrl = `${req. protocol}://${req.get('host')}${req.originalUrl}`;
  next();
});

// Routes listing
require("./routes/routesListing")(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("404");
});




process.on("SIGINT", function() {
  process.emit("cleanup");
});

// Cleanup stuff before server exit
process.on("cleanup", function() {
  console.log("Exiting server...");
  mongoose.disconnect().then(() => {
    console.log("Atlas says goodbye 👋");
    process.exit();
  });
});

module.exports = app;
