import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentHome from './pages/student/StudentHome';
import TeacherHome from './pages/teacher/TeacherHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher/TeacherHome" element={<TeacherHome />} />
        <Route path="/student/StudentHome" element={<StudentHome />} />
      </Routes>
    </Router>
  );
}

export default App;



