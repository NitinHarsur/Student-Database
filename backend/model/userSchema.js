const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  studentname: {
    type: String,
    required: true // Ensure that the username is required
  },
  regnumber: {
    type: String,
    required: true // Ensure that the registration number is required
  }
});

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User;
