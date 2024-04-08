// controllers/chatroomController.js

const Chatroom = require('../models/Chatroom');

// Create a new chatroom
exports.createChatroom = async (req, res) => {
  try {
    // Extract chatroom details from request body
    const { name, members } = req.body;

    // Create new chatroom
    const chatroom = await Chatroom.create({ name, members });

    res.status(201).json({ success: true, chatroom });
  } catch (error) {
    console.error('Error creating chatroom:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get chatrooms for a user
exports.getChatroomsForUser = async (req, res) => {
  try {
    // Get chatrooms where the user is a member
    const chatrooms = await Chatroom.find({ members: req.user._id });

    res.status(200).json({ success: true, chatrooms });
  } catch (error) {
    console.error('Error fetching chatrooms:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Add members to a chatroom
exports.addMembersToChatroom = async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { members } = req.body;

    // Find chatroom by ID and update members
    const updatedChatroom = await Chatroom.findByIdAndUpdate(chatroomId, { $push: { members } }, { new: true });

    res.status(200).json({ success: true, chatroom: updatedChatroom });
  } catch (error) {
    console.error('Error adding members to chatroom:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Send a message in a chatroom
exports.sendMessage = async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { sender, content } = req.body;

    // Find chatroom by ID and add message
    const updatedChatroom = await Chatroom.findByIdAndUpdate(chatroomId, { $push: { messages: { sender, content } } }, { new: true });

    res.status(200).json({ success: true, chatroom: updatedChatroom });
  } catch (error) {
    console.error('Error sending message in chatroom:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get messages for a specific chatroom
exports.getMessagesForChatroom = async (req, res) => {
  try {
    const { chatroomId } = req.params;

    // Find chatroom by ID and fetch messages
    const chatroom = await Chatroom.findById(chatroomId);
    const messages = chatroom.messages;

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages for chatroom:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
