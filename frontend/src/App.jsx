import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentHome from './pages/student/StudentHome';
import TeacherHome from './pages/teacher/TeacherHome';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/home/:user" element={<StudentHome />} />
        <Route path="/teacher/home/:user" element={<TeacherHome />} />
      </Routes>
    </Router>
  );
}

export default App;
