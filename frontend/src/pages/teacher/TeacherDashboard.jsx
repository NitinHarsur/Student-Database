import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TeacherHome from './TeacherHome';
import Sidebar from './sidebar/Sidebar';
import Attendance from './sidebar/Attendance';
import StudentManager from './sidebar/StudentManager';
import Result from './sidebar/Result';
import StudentsList from './sidebar/StudentsList';
import TeacherProfile from './sidebar/TeacherProfile';





const TeacherDashboard = () => {
  return (
    <div style={{display:'flex',height:'100vh'}}>
    
<div className='__side__bar' theme="dark">  
  <Sidebar />
</div>
    <div className='teacherDashboard'   style={{ backgroundColor: '#d7e3fc',width:'100%'}} >
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/StudentManager/*" element={<StudentManager/>} />
        <Route path="/Result" element={<Result />} />
        <Route path="/StudentsList" element={<StudentsList />} />
        <Route path="/TeacherProfile" element={<TeacherProfile />} />
      </Routes>
      </div>
    </div>
  );
}

export default TeacherDashboard;
