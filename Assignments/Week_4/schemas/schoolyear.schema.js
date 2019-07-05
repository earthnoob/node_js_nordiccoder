var mongoose = require('mongoose');
var { Date, String, ObjectId } = mongoose.Schema.Types;

const schoolyearSchema = new mongoose.Schema({
  schoolYear: {
    type: String,
    required: true,
  },
  semesters: [{
    type: ObjectId,
    ref: 'Semester',
  }],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  notes: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('SchoolYear', schoolyearSchema);
