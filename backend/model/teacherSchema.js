const mongoose = require('mongoose');

// Define user schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Ensure that the username is required
  },
  password: {
    type: String,
    required: true // Ensure that the registration number is required
  }
});

// Create and export User model
const db = mongoose.connection.useDb('GPTDATA');
const Teacher = db.model('TEACHERDATA', teacherSchema);
module.exports = Teacher;
