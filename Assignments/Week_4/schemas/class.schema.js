var mongoose = require('mongoose');
var { Number, String, ObjectId } = mongoose.Schema.Types;

const classSchema = new mongoose.Schema({
  classType: {
    type: String,
    required: true,
    uppercase: true,
  },
  classLevel: {
    type: String,
    required: true,
  },
  classPosition: {
    type: Number,
    required: true,
  },
  homeroomTeacher: {
    type: ObjectId,
    ref: 'User',
  },
  schoolYear: {
    type: ObjectId,
    ref: 'SchoolYear',
  },
  students: [{
    type: ObjectId,
    ref: 'User',
  }],
});

classSchema
  .virtual('fullClassName')
  .get(function () {
    return `${this.classLevel}${this.classType}${this.classPosition}`;
  });

module.exports = mongoose.model('Class', classSchema);
