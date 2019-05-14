var mongoose = require('mongoose');
var { Date, String, Number, ObjectId } = mongoose.Schema.Types;

const examSchema = new mongoose.Schema({
  subject: {
    type: ObjectId,
    required: true,
    ref: 'Subject',
  },
  category: {
    type: String,
    required: true,
    uppercase: true,
    default: 'ORAL',
  },
  takenBy: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  takenAt: {
    type: Date,
  },
  score: {
    type: Number,
    required: true,
  },
  criteria: {
    type: ObjectId,
    required: true,
    ref: 'ScoreCriteria',
  },
  editHistory: [{
    editedBy: {
      type: ObjectId,
      ref: 'User',
    },
    complaint: {
      type: ObjectId,
      ref: 'Complaint',
    },
    score: {
      type: Number,
    },
  }],
});

module.exports = mongoose.model('Exam', examSchema);
