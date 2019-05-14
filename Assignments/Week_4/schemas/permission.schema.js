var mongoose = require('mongoose');
var { String } = mongoose.Schema.Types;

const permissionSchema = new mongoose.Schema({
  entity: {
    type: String,
    uppercase: true,
  },
  action: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

permissionSchema
  .virtual('fullPermissionName')
  .get(function () {
    return `${this.entity}:${this.action}`;
  });

module.exports = mongoose.model('Permission', permissionSchema);
