import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import './Navbar.css';
import { TiThMenu } from "react-icons/ti";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";


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
        <footer className="footer">
            <style>
                {`
                    /* General footer styles */
                    footer {
                        background-color:black ;
                        padding: 20px;
                        text-align: center;
                    }
                    
                    .footer-container {
                        display: flex;
                        justify-content: space-around;
                        align-items: start;
                        flex-wrap: wrap;
                    }

                    .footer-box {
                        width: 30%;
                        padding: 10px;
                        color: white
                    }

                    .footer-box h4 {
                        margin-bottom: 10px;
                        font-size: 18px;
                    }

                    .footer-box p, .footer-box ul {
                        font-size: 14px;
                        margin: 0;
                        color:white
                    }

                    .footer-box ul {
                        list-style: none;
                        padding: 0;
                        color:white
                    }

                    .footer-box ul li {
                        margin-bottom: 5px;
                        color:white
                    }

                    .footer-box ul li a {
                        color: black;
                        text-decoration: none;
                    }

                    .footer-box ul li a:hover {
                        text-decoration: underline;
                    }
                    /* Social media icons styles */
                    .social-media {
                        display: flex;
                        justify-content: center;
                        gap: 20px; /* Space between icons */
                    }

                    .social-media svg {
                        fontSize: 40px; /* Increase icon size */
                        color: white; /* Set icon color */
                        transition: color 0.3s ease; /* Smooth color transition */
                    }

                    .social-media svg:hover {
                        color: lightblue; /* Change icon color on hover */
                    }
                    
                `}
            </style>

            <div className="footer-container">
                {/* Disclaimer box */}
                <div className="footer-box">
                    <h4>Disclaimer</h4>
                    <p>The content on this website is for informational purposes only and should not be considered as legal or professional advice.</p>
                </div>

                {/* Anything box */}
                <div className="footer-box">
                    <h4>Contact Us</h4>
                    <p>For any inquiries or feedback, feel free to reach out to us at <a href="mailto:info@example.com">info@example.com</a>.</p>
                    {/* Social media icons */}
                    <div className="social-media">
                    <FaFacebook style={{fontSize:'40px'}}/>

                        <FaSquareWhatsapp style={{fontSize:'40px'}}/>

                        <FaSquareInstagram style={{fontSize:'40px'}}/>

                    </div>
                </div>
                <div className="footer-box">
                <h4>Team Members (Data Dragons)</h4>
                    <ul>
                        <li>Adarshyogi - MERN Stack Developer</li>
                        <li>Nitin - MERN Stack Developer</li>
                        <li>Siddaram - Frontend Developer</li>
                        <li>Saffura Fatima - Testing </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}

export { Navbar, Footer };
