const mongoose = require('mongoose');

// Define subject schema
const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  internalMarks: { type: Number, required: true },
  externalMarks: { type: Number, required: true },
  totalMarks: { type: Number, required: true }
});

// Define semester schema
const semesterSchema = new mongoose.Schema({
  semesterNumber: { type: Number, required: true },
  subjects: [subjectSchema]
});

// Define student schema
const studentSchema = new mongoose.Schema({
  studentname: { type: String, required: true },
  fathername: { type: String, required: true },
  mothername: { type: String, required: true },
  email: { type: String, required: true },
  regnumber: { type: String, required: true },
  year: { type: String, required: true },
  phone: { type: Number, required: true },

  image: { type: String }, // If this is supposed to be an image URL, string type is appropriate.
  semesters: [semesterSchema]
});

// Create and export Student model
const db = mongoose.connection.useDb('GPTDATA');
const Student = db.model('STUDENTDATA', studentSchema);

module.exports = Student;
