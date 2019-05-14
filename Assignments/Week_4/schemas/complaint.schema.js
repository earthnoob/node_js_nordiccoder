var mongoose = require('mongoose');
var { String, ObjectId } = mongoose.Schema.Types;

const complaintSchema = new mongoose.Schema({
  respondent: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    uppercase: true,
    default: 'SCORE',
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    uppercase: true,
    enum: ['PENDING', 'REJECTED', 'ACCEPTED'],
    default: 'PENDING',
  },
  reviewer: {
    type: ObjectId,
    ref: 'User',
  },
  replyMessage: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);
