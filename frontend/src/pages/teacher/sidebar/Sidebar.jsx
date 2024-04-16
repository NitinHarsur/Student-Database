import { Hidden } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // Define style objects
  const sidebarStyle = {
    background: '#f4f4f4',
    padding: '1rem',
    width: '200px',
    height: '100vh'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333'
  };

  return (
    <div className="sidebar" style={sidebarStyle}>
    
      <ul style={listStyle}>
        <li>
          <Link to="/TeacherDashboard" style={linkStyle}>Home</Link>
        </li>
        <li>
          <Link to="/TeacherDashboard/StudentManager" style={linkStyle}>Student Manager</Link>
        </li>
        <li>
          <Link to="/TeacherDashboard/Attendance" style={linkStyle}>Attendance</Link>
        </li>
        <li>
          <Link to="/TeacherDashboard/Result" style={linkStyle}>Result</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
