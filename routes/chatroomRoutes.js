// routes/chatroomRoutes.js

const express = require('express');
const router = express.Router();
const chatroomController = require('../controllers/classroomController');


// Create a new chatroom
router.post('/api/chatrooms', chatroomController.createChatroom);

// Get chatrooms for a user
router.get('/api/chatrooms', chatroomController.getChatroomsForUser);

// Add members to a chatroom
router.post('/api/chatrooms/:chatroomId/members', chatroomController.addMembersToChatroom);

// Send a message in a chatroom
router.post('/api/chatrooms/:chatroomId/messages', chatroomController.sendMessage);

// Get messages for a specific chatroom
router.get('/api/chatrooms/:chatroomId/messages', chatroomController.getMessagesForChatroom);

router.post('/message', (req, res) => 
    {const messageData = req.body;
    // Process the messageData
    res.status(200).json({ message: 'Message sent successfully' });
});
module.exports = router;
