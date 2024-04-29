import React from 'react';
import StntSidebar from './stne__sidebar/StntSidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Route, Routes } from 'react-router-dom';
import StntResult from './stne__sidebar/StntResult';
import StntAttendance from './stne__sidebar/StntAttendance';
import StudentHome from './stne__sidebar/StudentHome';
const StudentDashboard = () => {
  return (
    <div className="Main__Stntdashboard d-flex ">
      <div className="__stnt__sidebar flex-shrink-0" style={{boxShadow: '3px 0 6px rgba(0, 0, 0, 0.1)'}}>
        <StntSidebar />
      </div>

      <div className="__Stnt__dashborad flex-grow-1">

        <Routes>
        <Route path="/" element={<StudentHome/>} />
        <Route path="/stntAttendance" element={<StntAttendance />} />
        <Route path="/stntResult" element={<StntResult/>} />
        </Routes>
        StudentDashboard
      </div>
    </div>
  );
};

export default StudentDashboard;
