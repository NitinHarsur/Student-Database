const Student  = require ('../model/studentSchema')



// Function to handle student login requests and authenticate students
const studentLogin= async (req, res) => {
    const { studentname, regnumber } = req.body;
  
    try {
      // Check if both username and registration number exist in the request body
      if (!studentname || !regnumber) {
        return res.status(400).json({ error: 'Both username and registration number are required' });
      }
  
      // Find the user in the database based on both studentname and regnumber
      const studentLogin = await Student.findOne({ studentname: studentname, regnumber: regnumber });
  
      if (!studentLogin) {
        return res.status(400).json({ error: 'Invalid username or registration number' });
      }
  
      // Return success message if user is found
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };



// Function to Add Student Data to the Databse System
  const addStudent = async (req, res) => {
    try {
      const { studentname, regnumber,year } = req.body;

        const existingStudent = await Student.findOne({
            regnumber:regnumber
        });

        if (existingStudent) {
          return res.status(400).json({ error: 'Register number already exsist' });
        }
        else {
            const student = new Student({
                studentname,
                regnumber,
                year
            });

            let result = await student.save();

            res.status(201).json({ message: 'Student added successfully' });
        }
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ message: 'Server error' });
    }
}


// Function to delete a specific student from the system using their register number
const deleteStudentByRegnumber = async (req,res)=>{
  try {
    const {regnumber} = req.body;

    // Check if the student exists
    const student = await Student.findOne({regnumber});
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete the student from the database
    await Student.deleteOne({regnumber});

    // Return success message
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error' });
  }

}

//Function to Delete Stduents By using there Year from the Database System
const deleteStudentsByYear = async (req,res)=>{
  try {
    const {year} = req.body;

    // Check if the student exists
    const student = await Student.find({year});
    if (!student) {
      return res.status(404).json({ message: 'Students not found in this year' });
    }

    // Delete the student from the database
    await Student.deleteMany({year});

    // Return success message
    res.json({ message: 'Students deleted successfully' });
  } catch (error) {
    console.error('Error deleting students:', error);
    res.status(500).json({ message: 'Server error' });
  }

}

// Function to Update the Details of an Existing Student in the Databse system
const updateStudent = async (req,res)=>{
  try {
    const { regnumber, studentname, year } = req.body;

    // Find the student by registration number
    const student = await Student.findOne({ regnumber });

    // If student not found, return 404 status with error message
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If student name is provided, update the student's name
    if (studentname) {
      student.studentname = studentname;
    }

    // If year is provided, update the student's year
    if (year) {
      student.year = year;
    }

    // Save the updated student details
    await student.save();

    // Return success message
    res.json({ message: 'Student information updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Function to update the academic year for all students
const updateStudentsYear = async(req,res)=>{

  try {
    // Define the new year value
    const newYear = req.body.newYear;
    const oldYear = req.body.oldYear;


    // Update students where the current year is "1st year"
    const result = await Student.updateMany({ year: oldYear }, { year: newYear });

    // Check if any students were updated
    if (result === 0) {
      return res.status(404).json({ message: 'No students found with year as "1st year"' });
    }

    // Return success message
    res.json({ message: `Updated ${oldYear} students to ${newYear} year` });
  } catch (error) {
    console.error('Error updating students year:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to fetch and display a list of all registered students for a specific academic year
const studentsList = async (req, res) => {
  try {
      const { year } = req.query;
      const students = await Student.find({ year });

      if (!students) {  //{students.length==0}
          return res.status(404).json({ message: 'No students found for the specified year.' });
      }

      else{
        res.status(200).json(students)
      }

  } catch (error) {
      // Handle any errors that may occur during the process
      return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Function to fetch and display a list of all registered students for a specific academic year
const attendance = async (req, res) => {
  try {
      const { year } = req.query;
      const students = await Student.find({ year });

      if (!students) {  //{students.length==0}
          return res.status(404).json({ message: 'No students found for the specified year.' });
      }

      else{
        res.status(200).json(students)
      }

  } catch (error) {
      // Handle any errors that may occur during the process
      return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


const result=async(req,res)=>{
  try {
    const { regnumber, semester, subject, internalMarks, externalMarks } = req.body;

    // Find the student by registration number
    const existingStudent = await Student.findOne({ regnumber });
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Add the result to the student's record
    existingStudent.result.push({ semester, subject, internalMarks, externalMarks });
    await existingStudent.save();

    res.status(200).json({ message: 'Result added successfully' });
  } catch (error) {
    console.error('Error adding result:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={studentLogin,addStudent,deleteStudentByRegnumber,deleteStudentsByYear,
  updateStudent,updateStudentsYear,studentsList,attendance};
