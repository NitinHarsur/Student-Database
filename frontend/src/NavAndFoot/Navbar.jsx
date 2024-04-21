
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import './Navbar.css';
import { TiThMenu } from "react-icons/ti";

function Navbar() {
    const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState('');
  const [showMenu, setShowMenu] = useState(false);


  // Handle select change and navigation logic (unchanged)
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectOption(value);
    if (value === 'teacher') {
      navigate('/teacher/teacherLogin');
    } else if (value === 'student') {
      navigate('/student/studentLogin');
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
          <Link to = "/" ><img src={logo} alt="Logo" /></Link>
        </div>
        <div className={`menu ${showMenu ? 'show' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/syllabus">Syllabus</Link></li>
            <li><Link to="/admission">Admission</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="login__box">
          <select name="login__container" id="login" value={selectOption} onChange={handleSelectChange}>
            <option value='' selected>Login</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="icon" onClick={toggleMenu}>
          <TiThMenu />
        </div>
      </div>
   
    </div>
  )
}

export default Navbar