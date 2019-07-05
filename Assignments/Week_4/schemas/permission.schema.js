var mongoose = require('mongoose');
var { String, ObjectId } = mongoose.Schema.Types;

const permissionSchema = new mongoose.Schema({
  entity: {
    type: ObjectId,
    ref: 'Entity',
  },
  action: {
    type: ObjectId,
    ref: 'Action',
  },
  description: {
    type: String,
  },
});

permissionSchema
  .virtual('permission')
  .get(function () {
    return `${this.entity}:${this.action}`;
  });

module.exports = mongoose.model('Permission', permissionSchema);
