import { Hidden } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import { PiStudentBold, PiExamFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";

const Sidebar = () => {
  const [showIconsOnly, setShowIconsOnly] = useState(false);

  // Define function to calculate margin based on showIconsOnly state

  // Define style objects
  const sidebarStyle = {
    background: '#f4f4f4',
    padding: '1rem',
    width: showIconsOnly ? '50px' : '250px', // Shrinking width when showIconsOnly is true
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '3rem' // Apply margin based on showIconsOnly state
  };

  // Function to toggle between showing icons with text and just icons
  const toggleShowIconsOnly = () => {
    setShowIconsOnly(!showIconsOnly);
  };

  return (
    <div className="sidebar" style={sidebarStyle}>
      <IoMenu onClick={toggleShowIconsOnly} style={{ marginBottom: '1rem', cursor: 'pointer', fontSize: '30px' }} />

      <ul style={listStyle}>
        <li > {/* Apply margin based on showIconsOnly state */}
          <Link to="/TeacherDashboard" style={linkStyle}>
            <AiFillHome style={{ marginRight: '0.5rem', display: showIconsOnly ? 'block' : 'inline', fontSize: '30px' }} /> {/* Conditional rendering for Home icon */}
            {!showIconsOnly && 'Home'}
          </Link>
        </li>
        <li > {/* Apply margin based on showIconsOnly state */}
          <Link to="/TeacherDashboard/StudentManager" style={linkStyle}>
            <PiStudentBold style={{ marginRight: '0.5rem', display: showIconsOnly ? 'block' : 'inline', fontSize: '30px' }} /> {/* Conditional rendering for Student Manager icon */}
            {!showIconsOnly && 'Student Manager'}
          </Link>
        </li>
        <li > {/* Apply margin based on showIconsOnly state */}
          <Link to="/TeacherDashboard/Attendance" style={linkStyle}>
            <FaBookBookmark style={{ marginRight: '0.5rem', display: showIconsOnly ? 'block' : 'inline', fontSize: '30px' }} /> {/* Conditional rendering for Attendance icon */}
            {!showIconsOnly && 'Attendance'}
          </Link>
        </li>
        <li > {/* Apply margin based on showIconsOnly state */}
          <Link to="/TeacherDashboard/Result" style={linkStyle}>
            <PiExamFill style={{ marginRight: '0.5rem', display: showIconsOnly ? 'block' : 'inline', fontSize: '30px' }} /> {/* Conditional rendering for Result icon */}
            {!showIconsOnly && 'Result'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
