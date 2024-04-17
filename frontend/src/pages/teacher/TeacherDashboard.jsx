import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherHome from './TeacherHome';
import Sidebar from './sidebar/Sidebar';
import Attendance from './sidebar/Attendance';
import StudentManager from './sidebar/StudentManager/StudentManager';
import Result from './sidebar/Result';
//import AddStudent from './sidebar/StudentManager/AddStudent';




const TeacherDashboard = () => {
  return (
    <div style={{display:'flex'}}>
    
<div>  <Sidebar />
</div>
    <div>
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/StudentManager/*" element={<StudentManager />} />
        <Route path="/Result" element={<Result />} />

        {/*<Route path="/StudentManager/AddStudent" element={<AddStudent/>}/>*/}
      </Routes>
      </div>
    </div>
  );
}

export default TeacherDashboard;
