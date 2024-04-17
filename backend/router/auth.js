const express = require('express');
const router = express.Router();
const studentLogin  = require ('../controller/studentController');
const teacherLogin = require('../controller/teacherController');
const AddStudent = require('../controller/studentController');

//student
router.post('/studentlogin', studentLogin );
//Add student
router.post('/AddStudent', AddStudent );

//teacher
router.post('/teacherlogin', teacherLogin );

module.exports = router;
