var router = require("express").Router();

var redirectLogin = require("../actions/redirectLogin.action");
var redirectHome = require("../actions/redirectHome.action");
var mapPermissions = require("../actions/createUIPermissionMapping");
var renderTemplate = require("../actions/renderTemplate.action");

var User = require("../schemas/user.schema");
var Role = require("../schemas/role.schema");
var SchoolYear = require('../schemas/schoolyear.schema');
var Class = require('../schemas/class.schema');
var Exam = require('../schemas/exam.schema');

router.get("/", redirectLogin, renderTemplate, function(req, res, next) {
  res.render("students", {
    layout: false,
    renderTemplate: res.renderTemplate
  });
});

router.get("/me", redirectLogin, renderTemplate, mapPermissions, function(
  req,
  res,
  next
) {
  if (req.session.user.isStudent) {
    res.render("student-info", {
      layout: false,
      renderTemplate: "index-student",
      student: req.session.user,
      user: {
        name: req.session.user.name,
        _id: req.session.user._id,
      },
      ...req.permissions
    });
  } else {
    next();
  }
});

router.get("/:id", redirectLogin, renderTemplate, async function(req, res, next) {
  const user = await User.findOne({ _id: req.params.id });
  // const { name, dob, gender, telephone, address, email, username, parents:  }
  res.render("student-info", {
    layout: false,
    renderTemplate: res.renderTemplate,
    student: user,
    user: {
      name: user.username,
    }
  });
});

router.get('/:id/scores', redirectLogin, renderTemplate, async function (req, res, next) {
  const schoolYears = await SchoolYear.find({});
  res.render('student-scores', {
    layout: false,
    renderTemplate: res.renderTemplate,
    schoolYears,
    user: {
      name: req.session.user.name,
    }
  });
});

router.post('/:id/find', redirectLogin, renderTemplate, async function (req, res, next) {
  const student = await User.findOne({ _id: req.params.id });

  // console.log(student);
  res.render('student-scores', {
    layout: false,
    renderTemplate: res.renderTemplate,
    data: true,
    user: {
      name: req.session.user.name,
    }
  })
});

router.post("/add", async function(req, res, next) {
  const {
    inputStdName,
    inputStdDob,
    inputStdGender,
    inputStdTel,
    inputStdAddr,
    inputStdUsername,
    inputStdEmail,
    inputStdPassword,
    inputParName,
    inputParDob,
    inputParGender,
    inputParTel,
    inputParAddr,
    inputParOcc,
    inputParType
  } = req.body;
  const role = await Role.findOne({ name: "PEASANT" }).select("_id");
  let user = {
    name: inputStdName,
    dob: inputStdDob,
    gender: inputStdGender,
    telephone: inputStdTel,
    address: inputStdAddr,
    username: inputStdUsername,
    email: inputStdEmail,
    password: inputStdPassword,
    role: role._id,
    studentInfo: {
      startDate: "2011-01-01",
      parents: []
    },
    teacherInfo: null,
    adminInfo: null,
    isStudent: true,
  };

  if (!Array.isArray(inputParName)) {
    user.studentInfo.parents = [
      ...user.studentInfo.parents,
      {
        name: inputParName,
        dob: inputParDob,
        telephone: inputParTel,
        address: inputParAddr,
        occupation: inputParOcc,
        isGuardian: false
      }
    ];
  } else {
    // For array
    for (let i = 0; i < inputParName.length; i++) {
      user.studentInfo.parents = [
        ...user.studentInfo.parents,
        {
          name: inputParName[i],
          dob: inputParDob[i],
          telephone: inputParTel[i],
          address: inputParAddr[i],
          occupation: inputParOcc[i],
          isGuardian: false
        }
      ];
    }
  }

  User.create(user).then((user) => { res.redirect(`/students/${user._id}`) });
  // console.log(user.studentInfo.parents);
});

module.exports = router;
