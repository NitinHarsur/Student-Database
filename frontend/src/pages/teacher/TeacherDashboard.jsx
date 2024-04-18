import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherHome from './TeacherHome';
import Sidebar from './sidebar/Sidebar';
import Attendance from './sidebar/Attendance';
import StudentManager from './sidebar/StudentManager';
import Result from './sidebar/Result';
//import AddStudent from './sidebar/StudentManager/AddStudent';




const TeacherDashboard = () => {
  return (
    <div style={{display:'flex',height:'100vh'}}>
    
<div>  <Sidebar />
</div>
    <div style={{backgroundColor:'#fdfffc',width:'100%'}}>
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/StudentManager/*" element={<StudentManager />} />
        <Route path="/Result" element={<Result />} />

      </Routes>
      </div>
    </div>
  );
}

export default TeacherDashboard;
