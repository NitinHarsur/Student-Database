import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import './Home.css';
import { TiThMenu } from "react-icons/ti";

function HomePage() {
  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState('');
  const [showMenu, setShowMenu] = useState(false);


  // Handle select change and navigation logic (unchanged)
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectOption(value);
    if (value === 'teacher') {
      navigate('/teacher/TeacherHome');
    } else if (value === 'student') {
      navigate('/student/StudentHome');
    }
  };

  // Toggle menu functionality (unchanged)
  const toggleMenu = (e) => {
    setShowMenu(!showMenu);
  };

;


  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto', cursor: 'pointer' }} />
        </div>
        <div className={`menu ${showMenu ? 'show' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/syllabus">Syllabus</Link></li>
            <li><Link to="/admission">Admission</Link></li>
            <li><Link to="/about">AboutUs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={`login-container`}>
          <select name="login" id="login" value={selectOption} onChange={handleSelectChange}>
            <option selected>Login</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="icon" onClick={toggleMenu}>
          <TiThMenu />
        </div>
      </div>
      <div className="body-page">
      <div className="heading">
          <h1 >
            Welcome to Student  Database.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
