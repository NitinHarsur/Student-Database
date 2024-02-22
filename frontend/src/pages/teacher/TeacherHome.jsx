import React from "react";
import { useParams } from 'react-router-dom'; // Importing useParams hook
import './home.css'

const TeacherHome = () => {
  const { user } = useParams(); // Extracting teacherName from URL parameters

  return (
    <div className="Thome">
      <h2>Welcome, {user.username}!</h2>
    </div>
  );
};

export default TeacherHome;
