var { ObjectId } = require('mongoose').Types;

var User = require("../schemas/user.schema");
var Role = require("../schemas/role.schema");
var Semester = require('../schemas/semester.schema');
var SchoolYear = require('../schemas/schoolyear.schema');
var Class = require('../schemas/class.schema');

var Passxy = require("../utils/passxy")();

const teachers = [
  /* Teacher 1 */
  {
    _id: ObjectId(),
    name: "Nguyễn Đại Bách",
    dob: "1979-03-31",
    gender: "NAM",
    telephone: "09038674331",
    address: "69 Bùi Đình Túy, phường 6, quận Bình Thạnh, Sài Gòn",
    email: "bachnd@sgm.com",
    username: "tea01",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2011-05-11",
      educationLevel: "Cao Đẳng",
      pastExperiences: [
        {
          position: "Kỹ thuật viên cơ khí",
          description: "Vận hành máy",
          from: "2004-08-08",
          to: "2007-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2011-2012",
          class: "10A7",
          startDate: "2011-07-01",
          endDate: "2012-06-01"
        },

        {
          schoolYear: "2012-2013",
          class: "10A7",
          startDate: "2012-07-01",
          endDate: "2013-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 2 */
  {
    name: "Ngô Văn Bảo",
    dob: "1961-04-29",
    gender: "NAM",
    telephone: "0932864533",
    address:
      "150/3 đường Lê Văn Thọ, phường 6, quận Gò Vấp, thành phố Hồ Chí Minh",
    email: "baonv@sgm.com",
    username: "tea02",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2012-09-10",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Toán học",
          from: "2014-08-06",
          to: "2017-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2012-2013",
          class: "10A5",
          startDate: "2012-07-01",
          endDate: "2013-06-01"
        },

        {
          schoolYear: "2013-2014",
          class: "10A6",
          startDate: "2013-07-01",
          endDate: "2014-06-01"
        },

        {
          schoolYear: "2014-2015",
          class: "10A6",
          startDate: "2014-07-01",
          endDate: "2015-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 3 */
  {
    name: "Lê Bảo Bình",
    dob: "1961-06-03",
    gender: "NAM",
    telephone: "0909852453",
    address: "57 đường 28, phường 7, quận Gò Vấp, thành phố Hồ Chí Minh",
    email: "binhlb@sgm.com",
    username: "tea03",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2008-08-03",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Ngôn ngữ Anh",
          from: "2003-08-06",
          to: "2007-06-15",
          notes: ""
        },

        {
          position: "Giáo viên Anh",
          description: "Giảng viên dạy Anh văn",
          from: "2008-08-06",
          to: "2012-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2012-2013",
          class: "10A1",
          startDate: "2012-07-01",
          endDate: "2013-06-01"
        },

        {
          schoolYear: "2013-2014",
          class: "10A1",
          startDate: "2013-07-01",
          endDate: "2014-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 4 */
  {
    name: "Phạm Việt Hưng",
    dob: "1975-03-19",
    gender: "NAM",
    telephone: "02866718432",
    address:
      "120 đường Lê Đức Thọ, phường 10, quận Gò Vấp, thành phố Hồ Chí Minh",
    email: "hungpv@sgm.com",
    username: "tea04",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2013-08-04",
      educationLevel: "Cao học",
      pastExperiences: [
        {
          position: "Thạc sỹ",
          description: "Chuyên ngành Ngữ văn học",
          from: "2007-08-06",
          to: "2011-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2013-2014",
          class: "10A8",
          startDate: "2013-07-01",
          endDate: "2014-06-01"
        },

        {
          schoolYear: "2014-2015",
          class: "10A8",
          startDate: "2014-07-01",
          endDate: "2015-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 5 */
  {
    name: "Trần Thành Long",
    dob: "1971-09-01",
    gender: "NAM",
    telephone: "0909855340",
    address:
      "340 đường Chu Văn An, phường 8, quận Bình Thạnh, thành phố Hồ Chí Minh",
    email: "longtt@sgm.com",
    username: "tea05",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2014-08-05",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Hóa học",
          from: "2009-08-06",
          to: "2012-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2014-2015",
          class: "10A3",
          startDate: "2014-07-01",
          endDate: "2015-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 6 */
  {
    name: "Trần Văn Minh",
    dob: "1978-12-04",
    gender: "NAM",
    telephone: "0938975383",
    address: "23 đường Lê Lợi, phường 5, quận Gò Vấp, thành phố Hồ Chí Minh",
    email: "minhtv@sgm.com",
    username: "tea06",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2011-07-12",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Vật lý học",
          from: "2006-08-06",
          to: "2010-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2011-2012",
          class: "10A2",
          startDate: "2011-07-01",
          endDate: "2012-06-01"
        },
        {
          schoolYear: "2011-2013",
          class: "10A2",
          startDate: "2012-07-01",
          endDate: "2013-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 7 */
  {
    name: "Nguyễn Hữu Nhân",
    dob: "1980-05-28",
    gender: "NAM",
    telephone: "09326742232",
    address:
      "412 đường Bắc Hải, phường 8, quận Tân Bình, thành phố Hồ Chí Minh",
    email: "nhannh@sgm.com",
    username: "tea07",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2013-08-16",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Sinh vật học",
          from: "2008-08-06",
          to: "2012-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2013-2014",
          class: "10A9",
          startDate: "2013-07-01",
          endDate: "2014-06-01"
        },
        {
          schoolYear: "2014-2015",
          class: "10A9",
          startDate: "2014-07-01",
          endDate: "2015-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 8 */
  {
    name: "Đỗ Thị Kim Phượng",
    dob: "1979-06-16",
    gender: "NU",
    telephone: "0909152833",
    address:
      "245 đường Phạm Văn Chiêu, phường 9, quận Gò Vấp, thành phố Hồ Chí Minh",
    email: "phuongdk@sgm.com",
    username: "tea08",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2014-07-12",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Toán học",
          from: "2009-08-06",
          to: "2013-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2014-2015",
          class: "10A10",
          startDate: "2013-07-01",
          endDate: "2014-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 9 */
  {
    name: "Trương Thị Thu Thảo",
    dob: "1975-08-25",
    gender: "NU",
    telephone: "01256779515",
    address:
      "142 đường Lê Văn Việt, phường Tăng Nhơn Phú A, quận 9, thành phố Hồ Chí Minh",
    email: "thaottt@sgm.com",
    username: "tea09",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2016-09-10",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Kinh tế",
          from: "2010-08-06",
          to: "2014-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2016-2017",
          class: "10A4",
          startDate: "2016-07-01",
          endDate: "2017-06-01"
        }
      ]
    },
    adminInfo: null
  },
  /* Teacher 9 */
  {
    name: "Ngô Gia Trí",
    dob: "1974-01-22",
    gender: "NAM",
    telephone: "0909782243",
    address:
      "70/6 đường Ngô Chí Quốc, khu phố 2, phường Bình Chiểu, quận Thủ Đức, thành phố Hồ Chí Minh",
    email: "tring@sgm.com",
    username: "tea10",
    password: "123",
    role: null,
    studentInfo: null,
    teacherInfo: {
      employmentDate: "2014-08-08",
      educationLevel: "Đại học",
      pastExperiences: [
        {
          position: "Cử nhân",
          description: "Chuyên ngành Mạng máy tính",
          from: "2010-08-06",
          to: "2014-06-15",
          notes: ""
        }
      ],
      teachingHistory: [
        {
          schoolYear: "2014-2015",
          class: "10A12",
          startDate: "2014-07-01",
          endDate: "2015-06-01"
        },
        {
          schoolYear: "2015-2016",
          class: "10A12",
          startDate: "2015-07-01",
          endDate: "2016-06-01"
        }
      ]
    },
    adminInfo: null
  }
];

const semsters = [{
  _id: ObjectId(),
  semester: 'HK1',
  startDate: '2011-08-01',
  endDate: '2012-01-01',
},
{
  _id: ObjectId(),
  semester: 'HK2',
  startDate: '2012-02-01',
  endDate: '2012-06-01',
}];

const schoolYears = [{
  _id: ObjectId(),
  schoolYear: '2011-2012',
  semsters: [
    semsters[0]._id,
    semsters[1]._id,
  ],
  startDate: '2011-08-01',
  endDate: '2012-06-01',
}];

const classes = [{
  _id: ObjectId(),
  classType: 'A',
  classLevel: '10',
  classPosition: '1',
  schoolYear: schoolYears[0]._id,
  homeromTeacher: teachers[0]._id,
}];

(function() {
  Semester.create(semsters)
  .then(() => {
    console.log('Semesters crated');
    return SchoolYear.create(schoolYears);
  })
  .then(() => {
    console.log('School year created');
    return Class.create(classes);
  })
  .then(() => {
    console.log('Classes created');
  })
})();

(async function() {
  Role.findOne({ name: "NOBLEMAN" })
    .select("_id")
    .exec(async function(err, role) {
      const blah = await Promise.all(
        teachers
          .map(t => {
            t.isTeacher = true;
            t.teacherInfo.teachingHistory.map(b => {
              b.schoolYear = schoolYears[0]._id;
              b.startDate = schoolYears[0].startDate;
              b.endDate = schoolYears[0].endDate;
              b.class = classes[0]._id;
              return b;
            });
            return t;
          })
          .map(async t => {
            t.role = role;
            t.password = Passxy.serialize(await Passxy.encrypt(t.password));
            return t;
          })
      );
      User.create(blah).then(() => {
        console.log("Teachers inserted");
      });
    });
})();
