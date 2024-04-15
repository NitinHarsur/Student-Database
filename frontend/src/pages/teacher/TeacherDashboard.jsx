import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherHome from './TeacherHome';
import Attendence from './sidebar/Attendence';
import Sidebar from './sidebar/Sidebar';

const TeacherDashboard = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/TeacherDashboard" element={<TeacherHome />} />
        <Route path="/TeacherDashboard/Attendence" element={<Attendence />} />
        <Route path="*" element={<Navigate to="/TeacherDashboard" replace />} />
      </Routes>
    </>
  );
}

export default TeacherDashboard;
