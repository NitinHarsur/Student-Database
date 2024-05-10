const express = require('express');
const router = express.Router();

//---------------------------contact---------------------------
const contact = require('../controller/contactController')

//---------------------------student---------------------------
const studentLogin = require('../controller/studentController');

const studentDetails = require('../controller/studentController');
const showAttendance = require('../controller/studentController');
const getSemestersAndSubjects = require('../controller/studentController')
const showAssignments = require('../controller/studentController')



//---------------------teacher---------------------
const teacherLogin = require('../controller/teacherController');
const attendanceSave = require('../controller/teacherController');
const addStudent = require('../controller/teacherController');
const deleteStudentByRegnumber = require('../controller/teacherController');
const deleteStudentsByYear = require('../controller/teacherController');
const updateStudent = require('../controller/teacherController');
const updateStudentsYear = require('../controller/teacherController');
const studentsList = require('../controller/teacherController');
const attendance = require('../controller/teacherController');
const handleSendMessage = require('../controller/teacherController');
const result = require('../controller/teacherController');
const assignments = require('../controller/teacherController');






//student
router.post('/studentlogin', studentLogin.studentLogin);

router.get('/studentDetails',studentDetails.studentDetails)

router.get('/showResult',getSemestersAndSubjects.getSemestersAndSubjects)

router.get('/showAttendance',showAttendance.showAttendance)

router.get('/showAssignments',showAssignments.showAssignments)



//teacher
router.post('/teacherLogin', teacherLogin.teacherLogin );

router.post('/addStudent', addStudent.addStudent );

router.delete('/deleteStudentByRegnumber',deleteStudentByRegnumber.deleteStudentByRegnumber);

router.delete('/deleteStudentsByYear',deleteStudentsByYear.deleteStudentsByYear);

router.put('/updateStudent',updateStudent.updateStudent);

router.put('/updateStudentsYear',updateStudentsYear.updateStudentsYear)

router.get('/studentsList',studentsList.studentsList)

router.get('/attendance',attendance.attendance)

router.post('/handleSendMessage',handleSendMessage.handleSendMessage)

router.post('/result',result.result)

router.post('/assignments',assignments.assignments)

router.post('/attendanceSave',attendanceSave.attendanceSave)


//contact
router.post('/contact', contact );





module.exports = router; 
