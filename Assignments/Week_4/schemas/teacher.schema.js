var mongoose = require('mongoose');
var { Date, String } = mongoose.Schema.Types;

const teacherSchema = new mongoose.Schema({
  employmentDate: {
    type: String,
  },
  educationLevel: {
    type: String,
    enum: ['LOW', 'MID', 'HIGH'],
  },
  pastExperiences: {
    type: [{
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
    }],
  },
});

module.exports = mongoose.model('Teacher', teacherSchema);
