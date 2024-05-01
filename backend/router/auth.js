const express = require('express');
const router = express.Router();


const studentLogin  = require ('../controller/studentController');
const teacherLogin = require('../controller/teacherController');


const addStudent = require('../controller/studentController');
const deleteStudentByRegnumber = require('../controller/studentController');
const deleteStudentsByYear = require('../controller/studentController');
const updateStudent = require('../controller/studentController')
const updateStudentsYear = require('../controller/studentController')
const studentsList = require('../controller/studentController')
const attendance = require('../controller/studentController')
const handleSendMessage = require('../controller/studentController')
const result = require('../controller/studentController')

const contact = require('../controller/contactController')


//student
router.post('/studentlogin', studentLogin.studentLogin);
//Add student
router.post('/addStudent', addStudent.addStudent );
//Delete student
router.delete('/deleteStudentByRegnumber',deleteStudentByRegnumber.deleteStudentByRegnumber);
router.delete('/deleteStudentsByYear',deleteStudentsByYear.deleteStudentsByYear);
//Update Student 
router.put('/updateStudent',updateStudent.updateStudent);
//Update students year
router.put('/updateStudentsYear',updateStudentsYear.updateStudentsYear)

router.get('/studentsList',studentsList.studentsList)

router.get('/attendance',attendance.attendance)
router.post('/handleSendMessage',handleSendMessage.handleSendMessage)

//Result
router.post('/result',result.result)


//teacher
router.post('/teacherlogin', teacherLogin );



router.post('/contact', contact );
// Route for sending attendance messages







module.exports = router;
