var mongoose = require('mongoose');
var { Date, String, Boolean } = mongoose.Schema.Types;

const studentSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  hasGraduated: {
    type: Boolean,
    required: true,
    default: false,
  },
  parents: [{
    name: {
      type: String,
      required: true,
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
  }],
});

module.exports = mongoose.model('Student', studentSchema);
