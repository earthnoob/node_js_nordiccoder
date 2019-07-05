var router = require("express").Router();

var redirectLogin = require("../actions/redirectLogin.action");
var redirectHome = require("../actions/redirectHome.action");
var { studentFilter } = require("../actions/routesFilter.action");
var mapPermissions = require("../actions/createUIPermissionMapping");
var renderTemplate = require("../actions/renderTemplate.action");

var Subject = require('../schemas/subject.schema');

router.get('/', redirectLogin, studentFilter, renderTemplate, async function (req, res, next) {
  const subs = await Subject.find({});
  res.render('subjects', {
    layout: false,
    renderTemplate: res.renderTemplate,
    subjects: subs,
    user: {
      name: req.session.user.name,
    },
    get headers() {
        return ['_id', 'name', 'code'];
    },
  });
});

router.get('/assign', function (req, res, next) {
  res.render('subject-assign', {
    layout: false,
    subjects: [
      {
        _id: 1,
        name: 'Mathemathics',
        code: 'MATH01',
      },
      {
        _id: 2,
        name: 'Physics',
        code: 'PHYS01',
      },
      {
        _id: 3,
        name: 'English',
        code: 'ENG01',
      }
    ],
    get headers() {
        return Object.keys(this.subjects[0]);
    },
  });
});

router.get('/:id', function (req, res, next) {
  res.render('subject-info', { layout: false });
});



module.exports = router;