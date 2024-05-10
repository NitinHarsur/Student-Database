import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import TeacherHome from './TeacherHome';
import Sidebar from './sidebar/Sidebar';
import Attendance from './sidebar/Attendance';
import StudentManager from './sidebar/StudentManager';
import Result from './sidebar/Result';
import StudentsList from './sidebar/StudentsList';
import Assignments from './sidebar/Assignments';



const TeacherDashboard = () => {
  return (
    <div style={{display:'flex', backgroundColor: '#d7e3fc' , width:"100%"}}>
    
    <div className='__side__bar' style={{ boxShadow: '3px 0 6px rgba(0, 0, 0, 0.1)' }}>  
  <Sidebar />
</div>

    <div className='teacherDashboard flex-grow-1' >
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/StudentManager/*" element={<StudentManager/>} />
        <Route path="/Result" element={<Result />} />
        <Route path="/StudentsList" element={<StudentsList />} />
        <Route path="/Assignments" element={<Assignments />} />
      </Routes>
      </div>
    </div>
  );
}

export default TeacherDashboard;
