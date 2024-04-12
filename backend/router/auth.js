const express = require('express');
const router = express.Router();
const User = require('../model/userSchema'); // Import the user model (assuming 'models' folder)

// GET route for login page message (NOT FOR LOGIN)
router.get('/login', (req, res) => {
  console.log("Login page requested"); // Optional logging
  res.send('Welcome to the Login Page! Please enter your credentials below.');
});

// POST route for user login (secure login logic)
router.post('/login', async (req, res) => {
  const { studentname, regnumber } = req.body;

  try {
    // Check if username AND registration number exist
    const user = await User.findOne({ studentname, regnumber });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or registration number' });
    }

    // Handle successful login (e.g., generate token, send user data)
    // Implement secure login logic here (e.g., password hashing, token generation)
    res.json({ message: 'Login successful' }); // You might include additional user data here
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
