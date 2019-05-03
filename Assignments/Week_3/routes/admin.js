var router = require('express').Router();
var fs = require('fs');
var promisify = require('../utils/promisify');
let users;
let parentTemplate;

const rf = promisify(fs.readFile);

(async () => {
  users = await rf('./Assignments/Week_3/mock-data/users.json', 'utf8');
})()

const findOne = ((obj, query) => {
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i][Object.keys(query)[0]] === query[Object.keys(query)[0]]) {
      return obj[i];
      break;
    }
  }
});

router.get('/', function(req, res, next) {
  const dataObj = JSON.parse(users);
  res.render('index', {
    numUsers: dataObj.body.length,
  });
});

/* router.get('/users', function(req, res, next) {
  fs.readFile('./Assignments/Week_3/mock-data/users.json', 'utf8',  function (err, data) {
    if (err) {
      const err = new Error('An error occured while reading file.');
      err.statusCode = 500;
      next(err);
    }
    const dataObj = JSON.parse(data);
    console.log(spy);
    // res.json(JSON.parse(data));
    res.render('users', {
      headers: Object.keys(dataObj.body[0]),
      data: dataObj.body,
    });
  });
}); */

router.get('/users', function(req, res, next) {
  const dataObj = JSON.parse(users);
  res.render('users', {
    headers: Object.keys(dataObj.body[0]),
    data: dataObj.body,
  });
});

router.get('/test', function(req, res, next) {
  const dataObj = JSON.parse(users);
  res.render('test-table', {
    headers: Object.keys(dataObj.body[0]),
    data: dataObj.body,
  });
});

router.get('/users/:id', function(req, res, next) {
  const usersObj = JSON.parse(users);
  const userId = req.params.id;
  res.render('user-details', {
    user: findOne(usersObj.body, { _id: userId }),
    name: 'BLAH',
  });
});

router.get('/old', function(req, res, next) {
  res.render('index-old');
});

module.exports = router;
