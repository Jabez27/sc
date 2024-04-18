// messageRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');

// PUT route to create a new message
router.post('/:chatroomid', authMiddleware, async (req, res) => {
  try {
    const { chatroomid } = req.params; // Extract chatroomid from URL params
    const { message } = req.body;
    const username = req.user._id;
    const newMessage = new Message({
      chatroomid,
      message,
      username,
    });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch messages by chatroomid
router.get('/:chatroomid', authMiddleware, async (req, res) => {
  try {
    const { chatroomid } = req.params;
    const messages = await Message.find({ chatroomid }).populate('username');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
