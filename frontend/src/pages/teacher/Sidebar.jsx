// TeacherSidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const TeacherSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Teacher Dashboard</h2>
      <ul>
        <li>
          <Link to="/teacher/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/teacher/students">View Students</Link>
        </li>
        <li>
          <Link to="/teacher/add-student">Add Student</Link>
        </li>
        <li>
          <Link to="/teacher/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
