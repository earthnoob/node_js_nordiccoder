var router = require("express").Router();

var redirectLogin = require("../actions/redirectLogin.action");
var redirectHome = require("../actions/redirectHome.action");

router.get('/', function (req, res, next) {
  res.render('teachers', { layout: false });
});

router.get('/:id', function (req, res, next) {
  res.render('teacher-info', {
    layout: false,
    teacher: {
      name: 'Trịnh Thị Mai',
      dob: '18-06-1979',
      gender: 'NU',
      telephone: '09125643895',
      address: '100 Blah Street',
      email: 'mai012@sgm.com',
      username: 'tea01',
      employmentDate: '10-05-2011',
      educationLevel: 'Trung Cap',
      pastExperiences: [{
        position: 'Meme Lord',
        description: 'Make dank rage comics and share them all over the internet.',
        from: '01-02-2008',
        to: '15-06-2010',
        notes: 'I wasn\'t very good at it',
      }],
      teachingHistory: [{
        schoolYear: '2011-2012',
        class: '10A1',
        startDate: '01-07-2011',
        endDate: '01-06-2012',
      }],
    },
    user: {
      name: 'MAI',
    }
  });
});

module.exports = router;