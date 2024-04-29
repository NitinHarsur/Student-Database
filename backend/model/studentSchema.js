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
  },
  year: {
    type: String,
    required: true // Ensure that the year is required
  },
  phone: {
    type: Number,
    required: true // Ensure that the year is required
  },
  result: [
    {
      semester: String,
      subject: String,
      internalMarks: Number,
      externalMarks: Number
    }
  ]
});

// Create and export User model
const db = mongoose.connection.useDb('GPTDATA');
const Student = db.model('STUDENTDATA', studentSchema);
module.exports = Student;
