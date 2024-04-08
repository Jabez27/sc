// models/Homework.js

const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  className: { // Renamed from `class` to `className`
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true  
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
