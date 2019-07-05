const { ObjectId } = require("mongoose").Types;

const Entity = require("../schemas/entity.schema");
const EntityAction = require("../schemas/action.schema");
const Permission = require("../schemas/permission.schema");
const Role = require("../schemas/role.schema");
const User = require("../schemas/user.schema");

/* Add some entities */
const entities = {
  all: {
    _id: new ObjectId(),
    name: "ALL"
  },

  student: {
    _id: new ObjectId(),
    name: "STUDENTS"
  },

  teacher: {
    _id: new ObjectId(),
    name: "TEACHERS"
  },

  subject: {
    _id: new ObjectId(),
    name: "SUBJECTS"
  },

  scoreCriteria: {
    _id: new ObjectId(),
    name: "SCORECRITERIA"
  },

  exam: {
    _id: new ObjectId(),
    name: "EXAMS"
  },

  class: {
    _id: new ObjectId(),
    name: "CLASSES"
  },

  schoolyear: {
    _id: new ObjectId(),
    name: "SCHOOLYEARS"
  },

  semester: {
    _id: new ObjectId(),
    name: "SEMESTERS"
  },

  penalty: {
    _id: new ObjectId(),
    name: "PENALTIES"
  },

  conductCriteria: {
    _id: new ObjectId(),
    name: "CONDUCTCRITERIA"
  },

  complaint: {
    _id: new ObjectId(),
    name: "COMPLAINTS"
  }
};

const entityActions = {
  all: {
    _id: new ObjectId(),
    name: "ALL"
  },
  read: {
    _id: new ObjectId(),
    name: "READ"
  },
  add: {
    _id: new ObjectId(),
    name: "ADD"
  },
  delete: {
    _id: new ObjectId(),
    name: "DELETE"
  },
  read: {
    _id: new ObjectId(),
    name: "EDIT"
  }
};

/* Insert some basic permissions */
const permissions = {
  all: {
    _id: new ObjectId(),
    entity: entities.all._id,
    action: entityActions.all._id,
    description: "Reserved for OVERLORDS."
  },

  allStudent: {
    _id: new ObjectId(),
    entity: entities.student._id,
    action: entityActions.all._id,
    description:
      "Grants permission to execute all operations on students (or users)."
  },

  allTeacher: {
    _id: new ObjectId(),
    entity: entities.teacher._id,
    action: entityActions.all._id,
    description:
      "Grants permission to execute all operations on teachers (or users)."
  },

  allSubject: {
    _id: new ObjectId(),
    entity: entities.subject._id,
    action: entityActions.all._id,
    description: "Grants permission to execute all operations on Subjects."
  },

  allScoreCriteria: {
    _id: new ObjectId(),
    entity: entities.scoreCriteria._id,
    action: entityActions.all._id,
    description: "Grant permission to execute all operations on ScoreCriteria."
  },

  allExam: {
    _id: new ObjectId(),
    entity: entities.exam._id,
    action: entityActions.all._id,
    description: "Grant permission to execute all operations on Exams."
  },

  allClass: {
    _id: new ObjectId(),
    entity: entities.class_id,
    action: entityActions.all._id,
    description: "Grant permission to execute all operations on Classes."
  },

  allSchoolyear: {
    _id: new ObjectId(),
    entity: entities.schoolyear._id,
    action: entityActions.all._id,
    description: "Grant permission to execute all operations on Schoolyears."
  },

  allSemester: {
    _id: new ObjectId(),
    entity: entities.semester._id,
    action: entityActions.all._id,
    description: "Grant permission to execute all operations on Semesters."
  },

  allConductCriteria: {
    _id: new ObjectId(),
    entity: entities.conductCriteria._id,
    action: entityActions.all._id,
    description:
      "Grant all permission to execute all operations on ConductCriteria."
  },

  allPenalty: {
    _id: new ObjectId(),
    entity: entities.penalty._id,
    action: entityActions.all._id,
    description: "Grant all permission to execute all operations on Penalties."
  },

  allComplaint: {
    _id: new ObjectId(),
    entity: entities.complaint._id,
    action: entityActions.all._id,
    description: "Grant all permission to execute all operations on Complaints."
  },
  readExam: {
    _id: new ObjectId(),
    entity: entities.exam._id,
    action: entityActions.read._id,
    description: "Grant read permission on Exams."
  },
  readPenalty: {
    _id: new ObjectId(),
    entity: entities.penalty._id,
    action: entityActions.read._id,
    description: "Grant read permission on Penalties."
  }
};

/* Oh lord he comin */
const roles = {
  overlord: {
    _id: new ObjectId(),
    name: "OVERLORD",
    level: 0,
    description: "I am the earth. I am the sky. I am the One.",
    permissions: [permissions.all._id]
  },

  nobleman: {
    _id: new ObjectId(),
    name: "NOBLEMAN",
    level: 1,
    description: "I stand humbly before the One, serving him as he wishes.",
    permissions: [
      permissions.allExam._id,
      permissions.allPenalty._id,
      permissions.allComplaint._id,
      permissions.allStudent._id
    ]
  },

  peasant: {
    _id: new ObjectId(),
    name: "PEASANT",
    level: 2,
    description: "I am below all, moral below all and act below all.",
    permissions: [
      permissions.allComplaint._id,
      permissions.readExam._id,
      permissions.readPenalty._id
    ]
  }
};

const overlordUser = new User({
  studentInfo: null,
  teacherInfo: null,
  adminInfo: { isAwesome: true },
  profilePic: "pic-01.png",
  isConfirmed: true,
  status: "ACTIVE",
  username: "ad",
  password:
    "eyJlbmMiOiJwa1VKaGFMY2YwVXVZWS9xQUp1YWZnQUVNSG5hQUhwYkdINE1pL1NvaUhrRC9MYk40WGdkUDVxbVYvNWlNUmt3UCsvNmRQV2Z4MXZRZjJKL3plalp1dDRBQ3NjN29IMWd2dWl5aXl1REZBcjBhK3U3em1SRWxGZ3ZDbnFsMEFYdUk2VmdnMW89Lmwyb0E5ZWdnb0lXZGkvdGpNclc3MjJ6RUFIUkk0MGs3N1RWQlFROHEzS1RLRU5aMWY5Q0tUMWM4OXV1Z1V3NjlsRVArbS9LU3hpZFJHNEZFSExRaHdYZ3BVajZnZXdOOFV0d1AwcjhmaWhpZmo1Yz0uNDg2NDE1IiwibW9kIjoiUEJLREYyIn0=",
  name: "First Overlord",
  dob: new Date("1993-02-11T17:00:00.000Z"), // Date from String
  gender: "Male",
  telephone: "0123456789",
  address: "Hellgate",
  email: "admin-sgm@sgm.com",
  role: roles.overlord._id
});

/** Batch insert stuff into mongoDB */
/* Entity.create(Object.keys(entities).map(k => entities[k]))
  .then(() => {
    console.log("Entities created");
    return EntityAction.create(
      Object.keys(entityActions).map(k => entityActions[k])
    );
  })
  .then(() => {
    console.log("Entity actions created");
    return Permission.create(Object.keys(permissions).map(k => permissions[k]));
  })
  .then(() => {
    console.log("Permissions created");
    return Role.create(Object.keys(roles).map(k => roles[k]));
  })
  .then(() => {
    console.log("Roles created");
    return overlordUser.save();
  })
  .then(() => {
    console.log("Overlord user created");
  })
  .catch(err => err); */

overlordUser.save();
