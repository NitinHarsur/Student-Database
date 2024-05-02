const express = require('express');
const router = express.Router();


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

<<<<<<< HEAD
const addStudent = require('../controller/studentController');
const deleteStudentByRegnumber = require('../controller/studentController');
const deleteStudentsByYear = require('../controller/studentController');
const updateStudent = require('../controller/studentController')
const updateStudentsYear = require('../controller/studentController')
const studentsList = require('../controller/studentController')
const attendance = require('../controller/studentController')
const handleSendMessage = require('../controller/studentController')
const result = require('../controller/studentController')
const getSemestersAndSubjects = require('../controller/studentController')
=======
>>>>>>> 1fd2ad5f583dcca8223ebcb687788717f02e9ef3

const contact = require('../controller/contactController')


//student
router.post('/studentlogin', studentLogin.studentLogin);

//studentDetails
router.get('/studentDetails',studentDetails.studentDetails)




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


<<<<<<< HEAD
router.post('/showResult',getSemestersAndSubjects.getSemestersAndSubjects)

//teacher
router.post('/teacherlogin', teacherLogin );
=======
>>>>>>> 1fd2ad5f583dcca8223ebcb687788717f02e9ef3



router.post('/contact', contact );
// Route for sending attendance messages







module.exports = router;
