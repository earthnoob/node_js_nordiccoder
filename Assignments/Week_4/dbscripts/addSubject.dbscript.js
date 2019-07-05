var User = require("../schemas/user.schema");
var Role = require("../schemas/role.schema");
var Permission = require("../schemas/permission.schema");
var Subject = require("../schemas/subject.schema");

(async function() {
  const teacher = await User.findOne({
    username: "tea01",
    isTeacher: true
  }).select("_id");
  Subject.create(
    {
      name: "Toán 10",
      code: "MATH101",
      taughtBy: [teacher._id]
    },
    {
      name: "Vật Lý 10",
      code: "PHYS101",
      taughtBy: [teacher._id]
    },
    {
      name: "Tiếng Anh 10",
      code: "ENG101",
      taughtBy: [teacher._id]
    }
  );
})();
