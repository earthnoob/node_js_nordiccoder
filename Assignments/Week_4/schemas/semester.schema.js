var mongoose = require('mongoose');
var { Date, String } = mongoose.Schema.Types;

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
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Semester', semesterSchema);
