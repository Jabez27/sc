const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  classValue: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
