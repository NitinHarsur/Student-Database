import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/student/StudentLogin';
import TeacherLogin from './pages/teacher/TeacherLogin';
import TeacherDashboard from './pages/teacher/TeacherDashboard';


import StudentDashboard from './pages/student/StudentDashboard';
import Contact from './pages/menu-pages/Contact'; // Import the ContactPage component
import Faculty from './pages/menu-pages/Faculty'; // Import the FacultyPage component
import Department from './pages/menu-pages/Department'; // Import the DepartmentsPage component
import Syllabus from './pages/menu-pages/Syllabus'; // Import the SyllabusPage component
import Admission from './pages/menu-pages/Admission'; // Import the AdmissionPage component
import AboutUs from './pages/menu-pages/AboutUs'; // Import the AboutUsPage component



function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<HomePage />} />

         {/* Login */}
        <Route path="/student/StudentLogin" element={<StudentLogin />} />
        <Route path="/teacher/TeacherLogin" element={<TeacherLogin />} />

           {/* Home Page Navbar */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/about" element={<AboutUs />} />

         {/* Teacher Dashboard */}
        <Route path="/TeacherDashboard/*" element={<TeacherDashboard/>} />
               
       

          {/* Student Dashboard */}
       <Route path="/StudentDashboard/*" element={<StudentDashboard/>} /> 
        
      </Routes>
    </>
  );
}

export default App;
