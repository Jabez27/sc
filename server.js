const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

const server = http.createServer(app);
const io = socketIo(server);
//1
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Message = require('./models/Message');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const chatroomRoutes = require('./routes/chatroomRoutes');
const feedRoutes = require('./routes/feedRoutes');
const gradeRoutes = require('./routes/gradeRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/chatrooms', chatroomRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/grades', gradeRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', async messageData => {
    try {
      // Save the message to the database
      const newMessage = new Message(messageData);
      await newMessage.save();

      // Broadcast the message to all connected clients
      io.emit('message', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 6554;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
