const express = require('express');
const router = express.Router();
const studentLogin  = require ('../controller/studentController');
const teacherLogin = require('../controller/teacherController');

//student
router.post('/studentlogin', studentLogin );

//teacher
router.post('/teacherlogin', teacherLogin );

module.exports = router;
