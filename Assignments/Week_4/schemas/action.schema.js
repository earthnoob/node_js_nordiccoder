var mongoose = require('mongoose');
var { Number, String, ObjectId } = mongoose.Schema.Types;

const actionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
});

module.exports = mongoose.model('Action', actionSchema);