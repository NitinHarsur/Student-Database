const express = require('express');
const router = express.Router();
const studentLogin = require('../controller/studentController');
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


const contact = require('../controller/contactController')


//student
router.post('/studentlogin', studentLogin.studentLogin);
//Add student
router.post('/teacherLogin', teacherLogin.teacherLogin );




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



router.post('/contact', contact );
// Route for sending attendance messages







module.exports = router;
