const Student  = require ('../model/studentSchema')
const Teacher = require ('../model/teacherSchema');


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
  const { regnumber } = req.query;
  try {
    const student = await Student.findOne({ regnumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    // Extract semesters and subjects from the student document
    const semesters = student.semesters.map(semester => ({
      semesterNumber: semester.semesterNumber,
      subjects: semester.subjects.map(subject => ({
        subjectName: subject.subjectName,
        internalMarks: subject.internalMarks,
        externalMarks: subject.externalMarks,
        totalMarks: subject.totalMarks
            }))
    }));
    res.json(semesters);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

const showAttendance = async (req, res) => {
  const { regnumber, year } = req.query;
  try {
    // Query the database for the student with the specified registration number
    const student = await Student.findOne({ regnumber });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    let selectedAttendance = null;

    // Extract attendance data for the selected year
    if (year === 'firstYearAttendance') {
      selectedAttendance = student.attendance.find(item => item.firstYearAttendance);
    } else if (year === 'secondYearAttendance') {
      selectedAttendance = student.attendance.find(item => item.secondYearAttendance);
    } else if (year === 'thirdYearAttendance') {
      selectedAttendance = student.attendance.find(item => item.thirdYearAttendance);
    }

    if (!selectedAttendance) {
      return res.status(404).json({ error: 'Attendance data not found for the selected year' });
    }

    const { totalDays, presentDays, percentage } = selectedAttendance[year];

    res.json({ totalDays, presentDays, percentage });
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

//function to display assignments
const showAssignments = async (req, res) => {
  try {
      // Retrieve the regnumber from the request query parameters
      const { regnumber } = req.query;

      // Find the student in the database based on the regnumber
      const student = await Student.findOne({ regnumber });

      // Check if the student was found
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }

      // Determine the student's year
      const studentYear = student.year;

      let assignments;
      const teacher = await Teacher.findOne(); // You may need additional criteria for finding the appropriate teacher

      // Determine the assignments based on the student's year
      if (studentYear === '1st year') {
          assignments = teacher.assignments.firstYear;
      } else if (studentYear === '2ns year') {
          assignments = teacher.assignments.secondYear;
      } else if (studentYear === '3rd year') {
          assignments = teacher.assignments.thirdYear;
      } else {
          return res.status(400).json({ error: 'Invalid student year' });
      }

      // Return the assignments as a JSON response
      res.json(assignments);
  } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = {
studentLogin,
studentDetails,
getSemestersAndSubjects,
showAttendance,
showAssignments
};