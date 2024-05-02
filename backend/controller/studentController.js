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




<<<<<<< HEAD
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

const handleSendMessage = async (req, res) => {
  const { regnumber, phone, attendancePercentage } = req.body;
  if (attendancePercentage < 75) {
    // Message body for the SMS
    const messageBody = `Your attendance is below 75%. Registration number: ${regnumber}`;

    try {
        // Send the SMS using Twilio's client
        const message = await client.messages.create({
            body: messageBody,
            from: twilioPhoneNumber,
            to:   `+91${phone}`
        });

        // Log the message SID
        console.log(`Message sent to ${phone}. SID: ${message.sid}`);

        // Respond with a success message
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error(`Error sending SMS to ${phone}:`, error);
        res.status(500).send(`Failed to send SMS to ${phone}`);
    }
} else {
    // Respond with a message indicating no SMS was sent
    res.status(200).send('No message sent: Attendance percentage is 75% or higher');
}

};



const result = async (req, res) => {
  const { regnumber, semesterNumber, subjects } = req.body;

  try {
    // Validate data
    if (!regnumber || !semesterNumber || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Find the student by registration number
    let student = await Student.findOne({ regnumber });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Find or create the semester in the student's semesters array
    let semester = student.semesters.find(sem => sem.semesterNumber === semesterNumber);

    if (!semester) {
      // If the semester doesn't exist, create a new semester
      semester = {
        semesterNumber,
        subjects: [],
      };
      student.semesters.push(semester);
    }

    // Update marks for existing subjects and add new subjects
    subjects.forEach(subject => {
      const existingSubject = semester.subjects.find(sub => sub.subjectName === subject.subjectName);
      if (existingSubject) {
        // Update marks for existing subject
        existingSubject.internalMarks = Number(subject.internalMarks);
        existingSubject.externalMarks = Number(subject.externalMarks);
        existingSubject.totalMarks = Number(subject.internalMarks) + Number(subject.externalMarks);
      } else {
        // Add new subject
        semester.subjects.push({
          subjectName: subject.subjectName,
          internalMarks: Number(subject.internalMarks),
          externalMarks: Number(subject.externalMarks),
          totalMarks: Number(subject.internalMarks) + Number(subject.externalMarks),
        });
      }
    });

    // Save the updated student document
    await student.save();

    console.log('Marks submitted successfully:', student); // Log the updated student document

    res.status(200).json({ message: 'Marks submitted successfully' });
  } catch (error) {
    console.error('Error submitting marks:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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


module.exports={studentLogin,addStudent,deleteStudentByRegnumber,deleteStudentsByYear,
  updateStudent,updateStudentsYear,studentsList,attendance,handleSendMessage,result,getSemestersAndSubjects};

=======
    module.exports = {
      studentLogin,
      studentDetails // Add `studentDetails` to the export object
  };
  
>>>>>>> 1fd2ad5f583dcca8223ebcb687788717f02e9ef3
