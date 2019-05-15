var mongoose = require('mongoose');
var { Date, String, ObjectId } = mongoose.Schema.Types;

const semesterSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  schoolYear: {
    type: ObjectId,
    ref: 'SchoolYear',
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Semester', semesterSchema);
