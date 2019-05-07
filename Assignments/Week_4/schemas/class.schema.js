var mongoose = require('mongoose');
var { String, ObjectId } = mongoose.Schema.Types;

const classSchema = new mongoose.Schema({
  classType: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'MB'],
  },
  classLevel: {
    type: ObjectId,
    ref: 'SchoolLevel',
    required: true,
  },
  classPosition: {
    type: Number,
    required: true,
  },
  homeroomTeacher: {
    type: ObjectId,
    ref: 'Teacher',
  },
  schoolYear: {
    type: ObjectId,
    ref: 'SchoolYear',
  },
});

module.exports = mongoose.model('Class', classSchema);
