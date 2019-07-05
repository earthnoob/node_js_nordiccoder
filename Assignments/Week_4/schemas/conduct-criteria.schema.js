var mongoose = require('mongoose');
var { String, Number } = mongoose.Schema.Types;

const conductCriteriaSchema = new mongoose.Schema({
  criteria: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('ConductCriteria', conductCriteriaSchema);
