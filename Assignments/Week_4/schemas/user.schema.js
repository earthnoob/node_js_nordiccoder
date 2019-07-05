var mongoose = require("mongoose");
var { String, Date, Boolean, ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    dob: {
      type: Date,
      required: true
    },
    gender: String,
    telephone: String,
    address: String,
    username: {
      type: String,
      required: true
    },
    email: String,
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      index: true,
      default: "default-profile-pic.jpg"
    },
    role: {
      type: ObjectId,
      ref: "Role"
    },
    isConfirmed: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ERASED"],
      default: "INACTIVE"
    },
    studentInfo: {
      startDate: {
        type: Date
      },
      hasGraduated: {
        type: Boolean,
        default: false
      },
      parents: [
        {
          name: {
            type: String,
            trim: true
          },
          telephone: {
            type: String
          },
          address: {
            type: String
          },
          occupation: {
            type: String
          },
          isGuardian: {
            type: Boolean,
            default: false
          }
        }
      ],
      exams: [
        {
          exam: {
            type: ObjectId,
            ref: "Exam"
          },
          score: {
            type: Number,
            default: 1,
          },
          editHistory: [
            {
              editedBy: {
                type: ObjectId,
                ref: "User"
              },
              complaint: {
                type: ObjectId,
                ref: "Complaint"
              },
              score: {
                type: Number
              }
            }
          ]
        }
      ],
      conductPenalties: [
        {
          conduct: {
            type: ObjectId,
            ref: "ConductCriteria"
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ]
    },
    teacherInfo: {
      employmentDate: {
        type: Date
      },
      educationLevel: {
        type: String,
        uppercase: true
      },
      pastExperiences: [
        {
          position: {
            type: String
          },
          experienceDescription: {
            type: String
          },
          from: {
            type: Date
          },
          to: {
            type: Date
          },
          notes: {
            type: String
          }
        }
      ],
      teachingHistory: [
        {
          schoolYear: {
            type: ObjectId,
            ref: "SchoolYear"
          },
          startDate: {
            type: Date
          },
          endDate: {
            type: Date
          },
          class: {
            type: ObjectId,
            ref: "Class"
          }
        }
      ]
    },
    adminInfo: {
      isAwesome: Boolean
    },
    isStudent: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

module.exports = mongoose.model("User", userSchema);
