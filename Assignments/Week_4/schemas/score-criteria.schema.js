var mongoose = require('mongoose');
var { String, Number } = mongoose.Schema.Types;

const scoreCriteriaSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    default: 'ORAL',
  },
  weight: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model('ScoreCriteria', scoreCriteriaSchema);
