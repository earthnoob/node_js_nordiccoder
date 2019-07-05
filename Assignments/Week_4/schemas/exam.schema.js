var mongoose = require('mongoose');
var { Date, String, Number, ObjectId } = mongoose.Schema.Types;

const examSchema = new mongoose.Schema({
  subject: {
    type: ObjectId,
    required: true,
    ref: 'Subject',
  },
  criteria: {
    type: ObjectId,
    required: true,
    ref: 'ScoreCriteria',
  },
  dateTaken: {
    type: Date,
  },
  class: {
    type: ObjectId,
    ref: 'Class',
  },
});

module.exports = mongoose.model('Exam', examSchema);
