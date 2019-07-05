var router = require("express").Router();
var date = require("date-fns");
var mongoose = require("mongoose");

var redirectLogin = require("../actions/redirectLogin.action");
var redirectHome = require("../actions/redirectHome.action");
var { studentFilter } = require("../actions/routesFilter.action");
var mapPermissions = require("../actions/createUIPermissionMapping");
var renderTemplate = require("../actions/renderTemplate.action");

var SchoolYear = require("../schemas/schoolyear.schema");
var Subject = require("../schemas/subject.schema");
var ScoreCriteria = require("../schemas/score-criteria.schema");
var Class = require("../schemas/class.schema");
var Exam = require("../schemas/exam.schema");
var User = require("../schemas/user.schema");

router.get("/", redirectLogin, studentFilter, renderTemplate, async function(
  req,
  res,
  next
) {
  const classArr = await Class.find().populate("schoolYear");
  const subArr = await Subject.find().select("_id name");
  const scoreCritArr = await ScoreCriteria.find().select("-weight");
  const exams = await Exam.find({}).populate('subject').populate('criteria').populate('class');
  console.log(exams);
  res.render("exams", {
    layout: false,
    renderTemplate: res.renderTemplate,
    subjects: subArr,
    scoreCriteria: scoreCritArr,
    classes: classArr
  });
});

router.post("/add", redirectLogin, studentFilter, async function(
  req,
  res,
  next
) {
  const { inputSubName, inputSubType, inputSubDate, inputSubClass } = req.body;

  Exam.create({
    subject: inputSubName,
    criteria: inputSubType,
    dateTaken: inputSubDate,
    class: inputSubClass
  }).then(s => {
    Class.findOne({ _id: inputSubClass })
      .select("_id students")
      .then(async c => {
        await Promise.all(
          c.students.map(async stu => {
            const updating = await User.findOneAndUpdate(
              { _id: stu },
              { $push: { "studentInfo.exams": { exam: s._id } } }
            );
            // console.log(updating.studentInfo.exams);
            return updating;
          })
        );
      });
    res.redirect(`${s._id}`);
  });
});

router.get("/:id", redirectLogin, studentFilter, renderTemplate, async function(
  req,
  res,
  next
) {
  // TODO: Use aggregate()
  const exam = await Exam.findOne({ _id: req.params.id })
    .populate("subject")
    .populate({
      path: "class",
      populate: {
        path: "students",
        select: "_id name studentInfo.exams",
        match: {
          "studentInfo.exams": { $elemMatch: { exam: mongoose.Types.ObjectId(req.params.id) } },
        },
        options: {
        }
      }
    })
    .populate("criteria");

  let {
    subject: { name: subjectName },
    criteria: { description },
    class: { fullClassName, students },
    dateTaken
  } = exam;

  res.render("exam-info", {
    layout: false,
    renderTemplate: res.renderTemplate,
    subject: subjectName,
    category: description,
    schoolYear: "2011-2012",
    class: fullClassName,
    dateTaken: date.parseISO(new Date(dateTaken).toISOString()),
    exId: req.params.id,
    students: students,
    get headers() {
      return ["studentId", "name", "grade"];
    },
    user: {
      name: req.session.user.name
    }
  });
});

router.post("/edit", async function(req, res, next) {
  const { inputExamId, inputStdId, inputStdScore } = req.body;

  for (let i = 0; i < inputStdId.length; i++) {
    await User.findOneAndUpdate(
      { _id: inputStdId[i], "studentInfo.exams": { $elemMatch: { exam: inputExamId } } },
      { $set: { "studentInfo.exams.$.score": +inputStdScore[i] } },
    );
  }
  res.redirect(req.get("referer"));
});

module.exports = router;
