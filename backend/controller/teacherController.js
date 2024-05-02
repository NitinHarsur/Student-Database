const Teacher = require ('../model/teacherSchema');
const Student  = require ('../model/studentSchema')
const { client, twilioPhoneNumber } = require('../twilioConfig');

const teacherLogin = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Ensure both name and password are provided
    if (!name || !password) {
      return res.status(400).json({ error: 'Both name and password are required' });
    }

    // Find the teacher in the database using name and password
    const teacher = await Teacher.findOne({ name, password });

    if (!teacher) {
      return res.status(401).json({ error: 'Invalid name or password' });
    }

    // Log successful login
    console.log(`Teacher ${name} logged in successfully.`);

    // Return a success message
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Log the error
    console.error('Error during teacher login:', error);

    // Return server error
    res.status(500).json({ error: 'Server error during teacher login' });
  }
};

  
 // Function to Add Student Data to the Databse System
 const addStudent = async (req, res) => {
  try {
    const { studentname,fathername,mothername,email, regnumber,year } = req.body;

      const existingStudent = await Student.findOne({
          regnumber:regnumber
      });

      if (existingStudent) {
        return res.status(400).json({ error: 'Register number already exsist' });
      }
      else {
          const student = new Student({
              studentname,
              fathername,
              mothername,
              email,
              regnumber,
              year,
              phone
          });

          await student.save();

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




module.exports={teacherLogin,addStudent,deleteStudentByRegnumber,deleteStudentsByYear,
updateStudent,updateStudentsYear,studentsList,attendance,handleSendMessage,result,getSemestersAndSubjects};
