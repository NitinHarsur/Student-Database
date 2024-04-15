import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherHome from './TeacherHome';
import Sidebar from './sidebar/Sidebar';
import Attendence from './sidebar/Attendence';
import StudentManager from './sidebar/StudentManager';
import Result from './sidebar/Result';




const TeacherDashboard = () => {
  return (
    <>
    

      <Sidebar />
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/Attendence" element={<Attendence />} />
        <Route path="/StudentManager" element={<StudentManager />} />
        <Route path="/Result" element={<Result />} />

      </Routes>
    </>
  );
}

export default TeacherDashboard;
