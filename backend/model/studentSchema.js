const mongoose = require('mongoose');

// Define subject schema
const subjectSchema = new mongoose.Schema({
  subjectName: String,
  internalMarks: Number,
  externalMarks: Number,
  totalMarks: Number
});

// Define semester schema
const semesterSchema = new mongoose.Schema({
  semesterName: String,
  subjects: [subjectSchema]
});

// Define user schema
const studentSchema = new mongoose.Schema({
  studentname: {
    type: String,
    required: true // Ensure that the username is required
  },
  fathername:{
    type:String,
    require:true
  },
  mothername:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
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
    required: true // Ensure that the phone number is required
  },

  firstSemResult: [semesterSchema],
  secondSemResult: [semesterSchema]
});

// Create and export Student model
const db = mongoose.connection.useDb('GPTDATA');
const Student = db.model('STUDENTDATA', studentSchema);

// Add method to the model to add a new semester
studentSchema.methods.addSemester = function(semesterData) {
  this.result.push(semesterData);
  return this.save();
};

module.exports = Student;
