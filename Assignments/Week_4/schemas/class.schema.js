var mongoose = require('mongoose');
var { Number, String, ObjectId } = mongoose.Schema.Types;

const classSchema = new mongoose.Schema({
  classType: { // a, b, c
    type: String,
    required: true,
    uppercase: true,
  },
  classLevel: { // 10, 11, 12
    type: String,
    required: true,
  },
  classPosition: { // 1-20
    type: String,
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
    default: null,
  }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

classSchema
  .virtual('fullClassName')
  .get(function () {
    return `${this.classLevel}${this.classType}${this.classPosition}`;
  });

module.exports = mongoose.model('Class', classSchema);
