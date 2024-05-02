const Teacher = require('../model/teacherSchema');
const Student = require('../model/studentSchema');
const { client, twilioPhoneNumber } = require('../twilioConfig');

// Function to handle teacher login
const teacherLogin = async (req, res) => {
    const { name, password } = req.body;

    try {
        if (!name || !password) {
            return res.status(400).json({ error: 'Both name and password are required.' });
        }

        const teacher = await Teacher.findOne({ name });

        // Ensure teacher exists and verify the password
        if (!teacher || !teacher.isPasswordValid(password)) {
            return res.status(401).json({ error: 'Invalid name or password.' });
        }

        console.log(`Teacher ${name} logged in successfully.`);
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error during teacher login:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to add student to the database
const addStudent = async (req, res) => {
    try {
        const { studentname, fathername, mothername, email, regnumber, year, phone } = req.body;

        // Validate required fields
        if (!studentname || !fathername || !mothername || !email || !regnumber || !year || !phone) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ regnumber });

        if (existingStudent) {
            return res.status(400).json({ error: 'Registration number already exists.' });
        }

        // Create and save new student
        const student = new Student({
            studentname,
            fathername,
            mothername,
            email,
            regnumber,
            year,
            phone,
        });

        await student.save();
        res.status(201).json({ message: 'Student added successfully.' });

    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to delete a student by registration number
const deleteStudentByRegnumber = async (req, res) => {
    try {
        const { regnumber } = req.body;

        if (!regnumber) {
            return res.status(400).json({ error: 'Registration number is required.' });
        }

        const student = await Student.findOne({ regnumber });

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        await Student.deleteOne({ regnumber });
        res.status(200).json({ message: 'Student deleted successfully.' });

    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to delete students by year
const deleteStudentsByYear = async (req, res) => {
    try {
        const { year } = req.body;

        if (!year) {
            return res.status(400).json({ error: 'Year is required.' });
        }

        const students = await Student.find({ year });

        if (!students.length) {
            return res.status(404).json({ error: 'No students found for the specified year.' });
        }

        await Student.deleteMany({ year });
        res.status(200).json({ message: 'Students deleted successfully.' });

    } catch (error) {
        console.error('Error deleting students:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to update student details
const updateStudent = async (req, res) => {
    try {
        const { regnumber, studentname, year } = req.body;

        // Check if regnumber is provided
        if (!regnumber) {
            return res.status(400).json({ error: 'Registration number is required.' });
        }

        // Find student by registration number
        const student = await Student.findOne({ regnumber });

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Update student name if provided
        if (studentname) {
            student.studentname = studentname;
        }

        // Update year if provided
        if (year) {
            student.year = year;
        }

        // Save the updated student details
        await student.save();

        res.status(200).json({ message: 'Student information updated successfully.' });

    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to update students' academic year
const updateStudentsYear = async (req, res) => {
    try {
        const { oldYear, newYear } = req.body;

        // Validate old and new years
        if (!oldYear || !newYear) {
            return res.status(400).json({ error: 'Both old and new year values are required.' });
        }

        // Update students' academic year
        const result = await Student.updateMany({ year: oldYear }, { year: newYear });

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: `No students found with year ${oldYear}` });
        }

        res.status(200).json({ message: `Updated ${oldYear} students to ${newYear} year.` });

    } catch (error) {
        console.error('Error updating students year:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to fetch list of all registered students for a specific academic year
const studentsList = async (req, res) => {
    try {
        const { year } = req.query;

        // Validate the year parameter
        if (!year) {
            return res.status(400).json({ error: 'Year parameter is required.' });
        }

        // Fetch students for the specified year
        const students = await Student.find({ year });

        if (students.length === 0) {
            return res.status(404).json({ error: 'No students found for the specified year.' });
        }

        res.status(200).json(students);

    } catch (error) {
        console.error('Error fetching students list:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to handle sending message about attendance percentage
const handleSendMessage = async (req, res) => {
    try {
        const { regnumber, phone, attendancePercentage } = req.body;

        if (!regnumber || !phone || typeof attendancePercentage !== 'number') {
            return res.status(400).json({ error: 'Registration number, phone number, and attendance percentage are required.' });
        }

        if (attendancePercentage < 75) {
            // Construct the message body for the SMS
            const messageBody = `Your attendance is below 75%. Registration number: ${regnumber}`;

            // Send the SMS using Twilio's client
            const message = await client.messages.create({
                body: messageBody,
                from: twilioPhoneNumber,
                to: `+91${phone}`,
            });

            console.log(`Message sent to ${phone}. SID: ${message.sid}`);
            res.status(200).json({ message: 'Message sent successfully.' });

        } else {
            res.status(200).json({ message: 'No message sent: Attendance percentage is 75% or higher.' });
        }

    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Function to handle result submission for a student
const result = async (req, res) => {
    try {
        const { regnumber, semesterNumber, subjects } = req.body;

        // Validate the request body
        if (!regnumber || !semesterNumber || !Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ error: 'Invalid request body.' });
        }

        // Find the student by registration number
        let student = await Student.findOne({ regnumber });

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Find or create the semester in the student's semesters array
        let semester = student.semesters.find(sem => sem.semesterNumber === semesterNumber);

        if (!semester) {
            semester = {
                semesterNumber,
                subjects: [],
            };
            student.semesters.push(semester);
        }

        // Update marks for existing subjects and add new subjects
        for (const subject of subjects) {
            let existingSubject = semester.subjects.find(sub => sub.subjectName === subject.subjectName);

            if (existingSubject) {
                // Update marks for existing subject
                existingSubject.internalMarks = Number(subject.internalMarks);
                existingSubject.externalMarks = Number(subject.externalMarks);
                existingSubject.totalMarks = existingSubject.internalMarks + existingSubject.externalMarks;
            } else {
                // Add new subject
                semester.subjects.push({
                    subjectName: subject.subjectName,
                    internalMarks: Number(subject.internalMarks),
                    externalMarks: Number(subject.externalMarks),
                    totalMarks: Number(subject.internalMarks) + Number(subject.externalMarks),
                });
            }
        }

        // Save the updated student document
        await student.save();

        console.log('Marks submitted successfully:', student); // Log the updated student document
        res.status(200).json({ message: 'Marks submitted successfully.' });

    } catch (error) {
        console.error('Error submitting marks:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Exporting the functions
module.exports = {
    teacherLogin,
    addStudent,
    deleteStudentByRegnumber,
    deleteStudentsByYear,
    updateStudent,
    updateStudentsYear,
    studentsList,
    handleSendMessage,
    result,
};
