var mongoose = require('mongoose');
var { String, Number } = mongoose.Schema.Types;

const conductCriteriaSchema = new mongoose.Schema({
  categories: {
    type: String,
    required: true,
  },
  criteria: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('ConductCriteria', conductCriteriaSchema);
