const mongoose = require('mongoose');

// Define user schema
const studentSchema = new mongoose.Schema({
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
const db = mongoose.connection.useDb('GPTDATA');
const User = db.model('STUDENTDATA', studentSchema);
module.exports = User;
