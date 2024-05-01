const mongoose = require('mongoose');

// Define subject schema


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
<<<<<<< HEAD
  semesters: [{
    semesterNumber: {
      type: Number,
      required: true
    },
    subjects: [{
      subjectName:{type:String ,  required: true} ,
      internalMarks:{type:Number,  required: true} ,
      externalMarks:{type:Number,  required: true} ,
      totalMarks: {type:Number,  required: true} // New field for total marks
    }],
  }],
=======
  image: {type:String,required:true}, 
  firstSemResult: [semesterSchema],
  secondSemResult: [semesterSchema]
>>>>>>> 7a2e31359aba67b52c83575c4cd3a9d4b356a301
});


// Create and export Student model
const db = mongoose.connection.useDb('GPTDATA');
const Student = db.model('STUDENTDATA', studentSchema);


module.exports = Student;
