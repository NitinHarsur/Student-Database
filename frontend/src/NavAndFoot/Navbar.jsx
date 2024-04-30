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
        <footer className="footer">
            <style>
                {`
                    /* General footer styles */
                    footer {
                        background-color: #f8f8f8;
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
                    }

                    .footer-box h4 {
                        margin-bottom: 10px;
                        font-size: 18px;
                    }

                    .footer-box p, .footer-box ul {
                        font-size: 14px;
                        margin: 0;
                    }

                    .footer-box ul {
                        list-style: none;
                        padding: 0;
                    }

                    .footer-box ul li {
                        margin-bottom: 5px;
                    }

                    .footer-box ul li a {
                        color: #007BFF;
                        text-decoration: none;
                    }

                    .footer-box ul li a:hover {
                        text-decoration: underline;
                    }

                    /* Social media icons styles */
                    .social-media {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 10px;
                    }

                    .social-media a {
                        margin: 0 10px;
                    }

                    .social-media img {
                        width: 24px;
                        height: 24px;
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
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={FacebookIcon} alt="Facebook" />
                        </a>
                        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                            <img src={WhatsAppIcon} alt="WhatsApp" />
                        </a>
                        
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={InstagramIcon} alt="Instagram" />
                        </a>
                    </div>
                </div>
                <div className="footer-box">
                <h4>Team Members</h4>
                    <ul>
                        <li>Adarshyogi - MERN Stack Developer</li>
                        <li>Nitin - MERN Stack Developer</li>
                        <li>Siddaram - Frontend Developer</li>
                        <li>Saffura Fatima - Testing Team</li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}

export { Navbar, Footer };
