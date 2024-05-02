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



  const studentDetails = async (req, res) => {
    try {
        // Retrieve the regnumber from the request query parameters
        const { regnumber } = req.query;

        // Query the Student model for students with the specified regnumber
        const students = await Student.find({ regnumber });

        // Check if any students were found
        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found for the specified registration number.' });
        }

        // Return the list of students in a JSON response
        return res.status(200).json(students);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching student details:', error);

        // Return a 500 status code with an error message
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};




const getSemestersAndSubjects = async (req, res) => {
  try {
    // Find the student by registration number
    const student = await Student.findOne({ regnumber: req.body.regnumber });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Prepare the response data
    const semestersData = student.semesters.map(semester => ({
      semesterNumber: semester.semesterNumber,
      subjects: semester.subjects.map(subject => ({
        subjectName: subject.subjectName,
        internalMarks: subject.internalMarks,
        externalMarks: subject.externalMarks,
        totalMarks: subject.totalMarks
      }))
    }));

    res.status(200).json({ semesters: semestersData });
  } catch (error) {
    console.error('Error fetching semesters and subjects:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};




    module.exports = {
      studentLogin,
      studentDetails,getSemestersAndSubjects // Add `studentDetails` to the export object
  };
  
