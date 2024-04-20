const express = require('express');
const router = express.Router();
const studentLogin  = require ('../controller/studentController');
const teacherLogin = require('../controller/teacherController');
const addStudent = require('../controller/studentController');
const deleteStudentByRegnumber = require('../controller/studentController');
const deleteStudentsByYear = require('../controller/studentController');
const updateStudent = require('../controller/studentController')
const updateStudentsYear = require('../controller/studentController')


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



//teacher
router.post('/teacherlogin', teacherLogin );

module.exports = router;
