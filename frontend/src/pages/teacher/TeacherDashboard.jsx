import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TeacherHome from './TeacherHome';
import Sidebar from './sidebar/Sidebar';
import Attendance from './sidebar/Attendance';
import StudentManager from './sidebar/StudentManager';
import Result from './sidebar/Result';
import StudentsList from './sidebar/StudentsList';
import Assignments from './sidebar/Assignments';



const TeacherDashboard = () => {
  return (
    <div style={{display:'flex',height:'100vh'}}>
    
    <div className='__side__bar'>  
  <Sidebar />
</div>

    <div className='teacherDashboard'   style={{ backgroundColor: '#d7e3fc',width:'100%'}} >
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
