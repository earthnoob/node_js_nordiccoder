var mongoose = require('mongoose');
var { String, Date, Boolean, ObjectId } = require('mongoose').Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: String,
    telephone: String,
    address: String,
    username: {
      type: String,
      required: true,
    },
    email: String,
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: ObjectId,
      index: true,
      default: 'default-profile-pic.jpg',
    },
    role: {
      type: ObjectId,
      ref: 'Role',
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'ERASED'],
      default: 'INACTIVE',
    },
    studentInfo: {
      startDate: {
        type: Date,
        required: true,
      },
      hasGraduated: {
        type: Boolean,
        default: false,
      },
      parents: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          telephone: {
            type: String,
            required: true,
          },
          address: {
            type: String,
          },
          occupation: {
            type: String,
          },
          isGuardian: {
            type: Boolean,
            default: false,
          },
        },
      ],
      exams: [{
        type: ObjectId,
        ref: 'Exam',
      }],
    },
    teacherInfo: {
      employmentDate: {
        type: String,
      },
      educationLevel: {
        type: String,
        uppercase: true,
      },
      pastExperiences: {
        type: [
          {
            experienceDescription: {
              type: String,
              required: true,
            },
            from: {
              type: Date,
              required: true,
            },
            to: {
              type: Date,
            },
            notes: {
              type: String,
            },
          },
        ],
      },
      teachingHistory: [
        {
          schoolYear: {
            type: ObjectId,
            ref: 'SchoolYear',
          },
          startDate: {
            type: Date,
          },
          endDate: {
            type: Date,
          },
          class: {
            type: ObjectId,
            ref: 'Class',
          },
        },
      ],
    },
    adminInfo: {
      isAwesome: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

module.exports = mongoose.model('User', userSchema);
