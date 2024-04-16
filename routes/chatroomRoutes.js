const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Chatroom = require('../models/Chatroom');

// Create a new chatroom
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { groupName, classValue, section } = req.body;
    const createdBy = req.user._id;
    const chatroom = new Chatroom({ groupName, classValue, section, createdBy });
    await chatroom.save();

    console.log('Chatroom created:', chatroom);
    res.status(201).json(chatroom);
  } catch (error) {
    console.error('Error creating chatroom:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch chatrooms by classValue and section
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { groupName, classValue, section } = req.query; // Extract properties from query parameters
    console.log({ groupName, classValue, section }); 
    // const chatrooms = await Chatroom.find({ groupName, classValue, section }); // Query with extracted parameters
    // console.log('Chatrooms found:', chatrooms); 

    //res.json(chatrooms);
  } catch (error) {
    console.error('Error fetching chatrooms:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
