import React from 'react';
import StntSidebar from './stne__sidebar/StntSidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Route, Routes, useParams } from 'react-router-dom';
import StntResult from './stne__sidebar/StntResult';
import StntAttendance from './stne__sidebar/StntAttendance';
import StudentHome from './stne__sidebar/StudentHome';
import StntAssignments from './stne__sidebar/StntAssignments';


const StudentDashboard = () => {
  const { studentname, regnumber } = useParams();

  return (
    <div className="Main__Stntdashboard d-flex " style={{backgroundColor: "rgb(215, 252, 237)", width: "100%"}}>
      <div className="__stnt__sidebar flex-shrink-0" style={{ boxShadow: '3px 0 6px rgba(0, 0, 0, 0.1)' }}>
        <StntSidebar />
      </div>

      <div className="__Stnt__dashborad flex-grow-1">
        <Routes>
          <Route path="/" element={<StudentHome studentname={studentname} regnumber={regnumber} />} />
          <Route path="/stntAttendance" element={<StntAttendance studentname={studentname} regnumber={regnumber} />} />
          <Route path="/stntResult" element={<StntResult studentname={studentname} regnumber={regnumber} />} />
          <Route path="/stntassignments" element={<StntAssignments studentname={studentname} regnumber={regnumber} />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
