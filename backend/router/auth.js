const express = require('express');
const router = express.Router();
const User = require('../model/studentSchema'); // Import the user model (assuming 'models' folder)

// POST route for user login (secure login logic)
router.post('/login', async (req, res) => {
  const { studentname, regnumber } = req.body;

  try {
    // Check if both username and registration number exist in the request body
    if (!studentname || !regnumber) {
      return res.status(400).json({ error: 'Both username and registration number are required' });
    }

    // Find the user in the database based on both studentname and regnumber
    const userLogin = await User.findOne({ studentname: studentname, regnumber: regnumber });

    if (!userLogin) {
      return res.status(400).json({ error: 'Invalid username or registration number' });
    }

    // Return success message if user is found
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
