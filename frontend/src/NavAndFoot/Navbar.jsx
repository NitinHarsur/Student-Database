import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import './Navbar.css';
import { TiThMenu } from "react-icons/ti";
import WhatsAppIcon from '../images/whatsapp.png';
import InstagramIcon from '../images/instagram.png';
import FacebookIcon from '../images/facebook.png';

function Navbar() {
    const navigate = useNavigate();
    const [selectOption, setSelectOption] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    // Handle select change and navigation logic
    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectOption(value);
        if (value === 'teacher') {
            navigate('/teacher/teacherLogin');
        } else if (value === 'student') {
            navigate('/student/studentLogin');
        }
    };

    // Toggle menu functionality
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div className={`menu ${showMenu ? 'show' : ''}`}>
                    <ul className="menu-list">
                        <li><Link to="/departments">Department</Link></li>
                        <li><Link to="/syllabus">Syllabus</Link></li>
                        <li><Link to="/admission">Admission</Link></li>
                        <li><Link to="/about">About us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="login__box">
                    <select name="login__container" id="login" value={selectOption} onChange={handleSelectChange}>
                        <option value="Login">Login</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <div className="icon" onClick={toggleMenu}>
                    <TiThMenu />
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer>
            <div>Student Database Management System - Powered by React</div>
            <div className="social-icons">
                <a href="..whatsapp" target="_blank" rel="noopener noreferrer">
                    <img src={WhatsAppIcon} alt="WhatsApp" />
                </a>
                <a href="..instagram" target="_blank" rel="noopener noreferrer">
                    <img src={InstagramIcon} alt="Instagram" />
                </a>
                <a href="..facebook" target="_blank" rel="noopener noreferrer">
                    <img src={FacebookIcon} alt="Facebook" />
                </a>
            </div>
        </footer>
    );
}

export { Navbar, Footer };
