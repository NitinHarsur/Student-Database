import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo  from '../images/logo.jpg'
import  './Home.css'
function HomePage() {
  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState('');

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectOption(value);
    if (value === 'teacher') {
      navigate('/teacher/TeacherHome');
    } else if (value === 'student') {
      navigate('/student/StudentHome');
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">
        <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto', cursor:'pointer'}} />
        </div>
        <div className="menu">
          <ul className="menu-list">
            <li>Faculty</li>
            <li>Departments</li>
            <li>Syllabus</li>
            <li>Admission</li>
            <li>AboutUs</li>
            <li>Contact</li>
          </ul>
        </div>
      <div className="login-container"> 
        <select name="login" id="login" value={selectOption} onChange={handleSelectChange}>
          <option selected>Login</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
       
      </div>
      Welcome to Student DataBase
    </div>
  );
}

export default HomePage;
