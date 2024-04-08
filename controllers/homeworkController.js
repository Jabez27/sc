const Homework = require('../models/Homework');

const createHomework = async (req, res) => {
  try {
    const { title, description, dueDate, className, section } = req.body;

    // Create a new homework assignment
    const newHomework = new Homework({
      title,
      description,
      dueDate,
      class: className,
      section,
    });

    // Save the homework assignment to the database
    await newHomework.save();

    res.status(201).json({ message: 'Homework assignment created successfully', homework: newHomework });
  } catch (error) {
    console.error('Error creating homework assignment:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllHomework = async (req, res) => {
  try {
    // Retrieve all homework assignments from the database
    const homeworkAssignments = await Homework.find();

    res.status(200).json(homeworkAssignments);
  } catch (error) {
    console.error('Error retrieving homework assignments:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateHomework = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, className, section } = req.body;

    // Find the homework assignment by ID and update its details
    const updatedHomework = await Homework.findByIdAndUpdate(id, { title, description, dueDate, class: className, section }, { new: true });
    if (!updatedHomework) {
      return res.status(404).json({ message: 'Homework assignment not found' });
    }

    res.status(200).json({ message: 'Homework assignment updated successfully', homework: updatedHomework });
  } catch (error) {
    console.error('Error updating homework assignment:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createHomework,
  getAllHomework,
  updateHomework,
};
