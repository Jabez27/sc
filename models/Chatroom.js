// models/chatroom.js

const mongoose = require('mongoose');

// Schema for messages
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the sender (user ID)
  content: String,
  timestamp: { type: Date, default: Date.now }
});

// Schema for chatrooms
const chatroomSchema = new mongoose.Schema({
  name: String, // Name of the chatroom (e.g., Class name)
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of members (user IDs)
  messages: [messageSchema] // List of messages in the chatroom
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
