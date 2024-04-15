import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Teacher Dashboard</h2>
      <ul>
        <li>
          <Link to="/TeacherDashboard">Home</Link>
        </li>
        <li>
          <Link to="/TeacherDashboard/StudentManager">StudentManager</Link>
        </li>
        <li>
          <Link to="/TeacherDashboard/Attendence">Attendence</Link>
        </li>
        <li>
          <Link to="/TeacherDashboard/Result">Result</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
