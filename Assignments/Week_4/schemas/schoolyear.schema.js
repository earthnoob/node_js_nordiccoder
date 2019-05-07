var mongoose = require('mongoose');
var { Date, String } = mongoose.Schema.Types;

const schoolyearSchema = new mongoose.Schema({
  schoolYear: {
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

module.exports = mongoose.model('SchoolYear', schoolyearSchema);
