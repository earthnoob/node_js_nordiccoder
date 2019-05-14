var mongoose = require('mongoose');
var { String, ObjectId } = mongoose.Schema.Types;

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    uppercase: true,
  },
  taughtBy: [{
    teacher: {
      type: ObjectId,
      ref: 'User',
    },
    isSubstitute: {
      type: Boolean,
      default: false,
    },
  }],
  schoolYear: {
    type: ObjectId,
    ref: 'SchoolYear',
  },
});

module.exports = mongoose.model('Subject', subjectSchema);
