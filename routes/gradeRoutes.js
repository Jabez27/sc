// routes/gradeRoutes.js

const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

// Route: POST /api/grades
// Description: Add exam marks for a student
router.post('/', async (req, res) => {
  try {
    const { student, exam, subject, marks } = req.body;

    // Create a new grade record
    const newGrade = new Grade({
      student,
      exam,
      subject,
      marks
    });

    // Save the grade to the database
    await newGrade.save();

    res.status(201).json({ message: 'Exam marks added successfully', grade: newGrade });
  } catch (error) {
    console.error('Error adding exam marks:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:gradeId', async (req, res) => {
    try {
      const { gradeId } = req.params;
      const { marks } = req.body;
  
      // Find grade by gradeId and update marks
      const updatedGrade = await Grade.findByIdAndUpdate(gradeId, { marks }, { new: true });
      if (!updatedGrade) {
        return res.status(404).json({ message: 'Grade not found' });
      }
  
      res.status(200).json({ message: 'Exam marks updated successfully', grade: updatedGrade });
    } catch (error) {
      console.error('Error updating exam marks:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
router.get('/student/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const grades = await Grade.find({ student: studentId });
      if (grades.length === 0) {
        return res.status(404).json({ message: 'No exam marks found for the student' });
      }
  
      res.status(200).json(grades);
    } catch (error) {
      console.error('Error retrieving exam marks:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
