const express = require('express');
const router = express.Router();


const contact = require('../controller/contactController')

const studentLogin = require('../controller/studentController');
const studentDetails = require('../controller/studentController');


const teacherLogin = require('../controller/teacherController');

const addStudent = require('../controller/teacherController');
const deleteStudentByRegnumber = require('../controller/teacherController');
const deleteStudentsByYear = require('../controller/teacherController');
const updateStudent = require('../controller/teacherController');
const updateStudentsYear = require('../controller/teacherController');
const studentsList = require('../controller/teacherController');
const attendance = require('../controller/teacherController');
const handleSendMessage = require('../controller/teacherController');
const result = require('../controller/teacherController');


const getSemestersAndSubjects = require('../controller/studentController')




//student
router.post('/studentlogin', studentLogin.studentLogin);

//studentDetails
router.get('/studentDetails',studentDetails.studentDetails)


router.post('/showResult',getSemestersAndSubjects.getSemestersAndSubjects)



//teacherLogin
router.post('/teacherLogin', teacherLogin.teacherLogin );

//Add student
router.post('/addStudent', addStudent.addStudent );

//Delete student
router.delete('/deleteStudentByRegnumber',deleteStudentByRegnumber.deleteStudentByRegnumber);

//deleteStudentsByYear
router.delete('/deleteStudentsByYear',deleteStudentsByYear.deleteStudentsByYear);

//Update Student 
router.put('/updateStudent',updateStudent.updateStudent);

//Update students year
router.put('/updateStudentsYear',updateStudentsYear.updateStudentsYear)

//studentLits
router.get('/studentsList',studentsList.studentsList)

//attendance
router.get('/attendance',attendance.attendance)

//handlesendMessage
router.post('/handleSendMessage',handleSendMessage.handleSendMessage)

//Result
router.post('/submitResult',result.result)







router.post('/contact', contact );
// Route for sending attendance messages







module.exports = router;
