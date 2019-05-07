var mongoose = require('mongoose');
var { String, Date, Boolean, ObjectId } = require('mongoose').Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: String,
  telephone: String,
  address: String,
  username: {
    type: String,
    required: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: ObjectId,
    index: true,
    default: 'default-profile-pic.jpg',
  },
  role: { type: ObjectId, ref: 'Role' },
  joinedAt: Date,
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'ERASED'],
    default: 'INACTIVE',
  },
});

module.exports = mongoose.model('User', userSchema);
