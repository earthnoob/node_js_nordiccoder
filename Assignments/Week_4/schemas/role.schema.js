var mongoose = require('mongoose');
var { Number, String, ObjectId } = mongoose.Schema.Types;

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'PEASANT',
  },
  level: {
    type: Number,
    default: 2,
  },
  description: {
    type: String,
  },
  permissions: [{
    type: ObjectId,
    ref: 'Permission',
  }],
});

module.exports = mongoose.model('Role', roleSchema);
