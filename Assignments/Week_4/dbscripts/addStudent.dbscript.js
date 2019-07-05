var User = require("../schemas/user.schema");
var Role = require("../schemas/role.schema");
var Permission = require("../schemas/permission.schema");
var Passxy = require("../utils/passxy")();

/* Array of objects */
const students = [
  /* Student 1 */
  {
    name: "Nguyễn Đình Ánh",
    dob: "1998-01-20",
    gender: "NAM",
    telephone: "0932083341",
    address:
      "99 đường Lê Văn Việt, phường Tăng Nhơn Phú A, quận 9, thành phố Hồ Chí Minh",
    username: "stu1",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 2 */
  {
    name: "Vũ Hoàng Bách",
    dob: "1998-11-15",
    gender: "NAM",
    telephone: "0362845662",
    address:
      "78 đường số 9, khu phố 1, phường Linh Tây, quận Thủ Đức, thành phố Hồ Chí Minh",
    username: "stu2",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 3 */
  {
    name: "Lê Văn Bảo",
    dob: "1998-03-12",
    gender: "NAM",
    telephone: "0903557832",
    address:
      "123/3 đường Lê Lợi, phường Bến Nghé, Quận 1, thành phố Hồ Chí Minh",
    username: "stu3",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 4 */
  {
    name: "Phạm Nguyễn Gia Bảo",
    dob: "1998-06-24",
    gender: "NAM",
    telephone: "01632759825",
    address: "91/9 đường số 4, phường 16, Quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu4",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 5 */
  {
    name: "Phạm Thị Minh Châu",
    dob: "1998-01-17",
    gender: "NU",
    telephone: "0938663251",
    address:
      "104 đường Lê Văn Thọ, phường 11, quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu5",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 6 */
  {
    name: "Trần Quốc Cường",
    dob: "1998-03-05",
    gender: "NAM",
    telephone: "0909743572",
    address:
      "84/19 đường Ngô Chí Quốc, khu phố 2, phường Bình Chiểu, quận Thủ Đức, thành phố Hồ Chí Minh",
    username: "stu6",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 7 */
  {
    name: "Phạm Trần Hải Đăng",
    dob: "1998-10-22",
    gender: "NAM",
    telephone: "07084538227",
    address:
      "375 đường Lý Thường Kiệt, phường 8, quận Tân Bình, thành phố Hồ Chí Minh",
    username: "stu7",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 8 */
  {
    name: "Nguyễn Thành Đạt",
    dob: "1998-03-07",
    gender: "NAM",
    telephone: "01698142283",
    address:
      "167 đường Tây Sơn, phường Tân Quý, quận Tân Bình, thành phố Hồ Chí Minh",
    username: "stu8",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 9 */
  {
    name: "Vũ Anh Đức",
    dob: "1998-05-28",
    gender: "NAM",
    telephone: "0966731853",
    address: "19/2 đường Lê Lợi, phường 4, quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu9",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 10 */
  {
    name: "Nguyễn Thế Dương",
    dob: "1998-11-23",
    gender: "NAM",
    telephone: "0937818635",
    address:
      "326 đường Bắc Hải, phường 6, quận Tân Bình, thành phố Hồ Chí Minh",
    username: "stu10",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 11 */
  {
    name: "Trương Quang Hải",
    dob: "1998-02-16",
    gender: "NAM",
    telephone: "0998365291",
    address: "23 đường 14, phường Tân Hưng, quận 7, thành phố Hồ Chí Minh",
    username: "stu11",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 12 */
  {
    name: "Lê Thị Bảo Hằng",
    dob: "1998-09-19",
    gender: "NU",
    telephone: "0909753225",
    address:
      "544 đường Hương Lộ 2, phường Bình Trị Đông A, quận Bình Tân, thành phố Hồ Chí Minh",
    username: "stu12",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 13 */
  {
    name: "Nguyễn Trần Trung Hiếu",
    dob: "1998-03-05",
    gender: "NAM",
    telephone: "0839426286",
    address:
      "237/65 đường Phạm Văn Chiêu, phường 14, quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu13",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 14 */
  {
    name: "Đỗ Thị Hồng Hoa",
    dob: "1998-08-08",
    gender: "NU",
    telephone: "01694935577",
    address:
      "50/3 đường Lê Đình Quản, khu phố 2, phường Cát Lái, quận 2, thành phố Hồ Chí Minh",
    username: "stu14",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 15 */
  {
    name: "Trần Tấn Hưng",
    dob: "1998-07-02",
    gender: "NAM",
    telephone: "01687536463",
    address:
      "960 đường Tân Kỳ Tân Quý, phường Bình Hưng Hòa, quận Bình Tân, thành phố Hồ Chí Minh",
    username: "stu15",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 16 */
  {
    name: "Hồ Thị Thanh Huyền",
    dob: "1998-09-10",
    gender: "NU",
    telephone: "0977331513",
    address:
      "64 đường 27, khu phố 5, phường Hiệp Bình Chánh, quận Thủ Đức, thành phố Hồ Chí Minh",
    username: "stu16",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 17 */
  {
    name: "Lê Nguyễn Lam Lâm",
    dob: "1998-12-15",
    gender: "NAM",
    telephone: "0362657595",
    address: "Kí túc xá khu B, Đại học Quốc Gia thành phố Hồ Chí Minh",
    username: "stu17",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 18 */
  {
    name: "Trần Phước Lợi",
    dob: "1998-02-21",
    gender: "NAM",
    telephone: "0938554723",
    address: "369 đường Vĩnh Viễn, phường 5, quận 10, thành phố Hồ Chí Minh",
    username: "stu18",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 19 */
  {
    name: "Nguyễn Chí Lương",
    dob: "1998-11-30",
    gender: "NAM",
    telephone: "0965045794",
    address:
      "53 đường Nguyễn Oanh, phường 10, quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu19",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 20 */
  {
    name: "Nguyễn Tiến Minh",
    dob: "1998-06-14",
    gender: "NAM",
    telephone: "0932474563",
    address:
      "880 đường Lê Đức Thọ, phường 15, quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu20",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 21 */
  {
    name: "Trương Thị Quỳnh Nga",
    dob: "1998-01-19",
    gender: "NU",
    telephone: "0362853783",
    address:
      "154 đường Lê Văn Việt, phường Hiệp Phú, quận 9, thành phố Hồ Chí Minh",
    username: "stu21",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 22 */
  {
    name: "Vũ Bảo Ngân",
    dob: "1998-12-20",
    gender: "NU",
    telephone: "0931125455",
    address:
      "66/2A đường Ung Văn Khiêm, phường 25, quận Bình Thạnh, thành phố Hồ Chí Minh",
    username: "stu22",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 23 */
  {
    name: "Lê Nguyễn Bảo Nguyên",
    dob: "1998-04-26",
    gender: "NAM",
    telephone: "033202382",
    address:
      "56 đường Bùi Tư Toàn, phường An Lạc, quận Bình Tân, thành phố Hồ Chí Minh",
    username: "stu23",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 24 */
  {
    name: "Đỗ Thị Thảo Nhi",
    dob: "1998-03-12",
    gender: "NU",
    telephone: "02837651983",
    address:
      "332/80 đường Chu Văn An, phường 12, quận Bình Thạnh, thành phố Hồ Chí Minh",
    username: "stu24",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 25 */
  {
    name: "Nguyễn Tấn Phát",
    dob: "1998-10-21",
    gender: "NAM",
    telephone: "0998387281",
    address:
      "117/4S đường Hồ Văn Long, khu phố 2, phường Tân Tạo, quận Bình Tân, thành phố Hồ Chí Minh",
    username: "stu25",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 26 */
  {
    name: "Lê Minh Phương",
    dob: "1998-02-16",
    gender: "NU",
    telephone: "0903579449",
    address:
      "58 Văn Thánh Bắc, phường 25, quận Bình Thạnh, thành phố Hồ Chí Minh",
    username: "stu26",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 27 */
  {
    name: "Lê Hữu Quang",
    dob: "1998-08-20",
    gender: "NAM",
    telephone: "0362853783",
    address:
      "423 Kha Vạn Cân, phường Linh Đông, quận Thủ Đức, thành phố Hồ Chí Minh",
    username: "stu27",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 28 */
  {
    name: "Đỗ Anh Tài",
    dob: "1998-04-12",
    gender: "NAM",
    telephone: "0362853783",
    address: "95 đường D5, phường 25, quận Bình Thạnh, thành phố Hồ Chí Minh",
    username: "stu28",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 29 */
  {
    name: "Trần Nhân Tâm",
    dob: "1998-11-20",
    gender: "NAM",
    telephone: "0932068161",
    address:
      "70/6 đường Nguyễn Lâm, phường 7, quận Phú Nhuận, thành phố Hồ Chí Minh",
    username: "stu29",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 30 */
  {
    name: "Lê Chí Thanh",
    dob: "1998-03-03",
    gender: "NAM",
    telephone: "0909473532",
    address:
      "135 đường Nguyễn Phúc Nguyên, phường 10, quận 3, thành phố Hồ Chí Minh",
    username: "stu30",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 31 */
  {
    name: "Lê Trung Thành",
    dob: "1998-12-09",
    gender: "NAM",
    telephone: "0773830759",
    address:
      "36/7 đường Kinh Dương Vương, phường 13, quận 6, thành phố Hồ Chí Minh",
    username: "stu31",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 32 */
  {
    name: "Đỗ Đức Thịnh",
    dob: "1998-02-28",
    gender: "NAM",
    telephone: "02866818235",
    address:
      "153 đường Nguyễn Cửu Vân, phường 17, quận Bình Thạnh, thành phố Hồ Chí Minh",
    username: "stu32",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 33 */
  {
    name: "Phạm Linh Trang",
    dob: "1998-09-22",
    gender: "NU",
    telephone: "0773830759",
    address:
      "23 đường Đỗ Xuân Họp, phường Phước Long, quận 9, thành phố Hồ Chí Minh",
    username: "stu33",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 34 */
  {
    name: "Nguyễn Thị Hồng Trúc",
    dob: "1998-01-18",
    gender: "NU",
    telephone: "01655775241",
    address: "73 đường Nhật Tảo, phường 5, quận 10, thành phố Hồ Chí Minh",
    username: "stu34",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 35 */
  {
    name: "Trọng Thái Sơn",
    dob: "1998-11-03",
    gender: "NAM",
    telephone: "0947439974",
    address:
      "234/36/10 đường Phạm Phú Thứ, phường 4, quận 6, thành phố Hồ Chí Minh",
    username: "stu35",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  },
  /* Student 36 */
  {
    name: "Bùi Văn Trung",
    dob: "1998-03-15",
    gender: "NAM",
    telephone: "0932085635",
    address: "46/13 đường 28, phường 6, quận Gò Vấp, thành phố Hồ Chí Minh",
    username: "stu36",
    password: "123",
    profilePic: "default-profile-pic.jpg",
    role: null,
    studentInfo: {
      startDate: new Date(),
      parents: [],
      exams: [],
      conductPenalties: []
    },
    teacherInfo: null,
    adminInfo: null
  }
];

/* Dont't mind this lol */
/* (async function() {
  const pass = ["123", "456", "789"];
  let result = [];
  console.log(
    await Promise.all(pass.map(async p => await Passxy().encrypt(p)))
  );
})(); */

(async function() {
  Role.findOne({ name: "PEASANT" })
    .select("_id")
    .exec(async function(err, role) {
      const blah = await Promise.all(
        students
          .map(s => {
            s.isStudent = true;
            return s;
          })
          .map(async s => {
            s.role = role;
            s.password = Passxy.serialize(await Passxy.encrypt(s.password));
            return s;
          })
      );
      User.create(blah).then(() => { console.log('Students inserted'); })
    });
})();

/* (function () {
  User.remove({ username: { $ne: 'a' } })
  .then(() => { console.log('Users removed'); });
})() */
