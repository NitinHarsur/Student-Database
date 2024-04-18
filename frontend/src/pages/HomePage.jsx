import React from 'react';
import Navbar from '../NavAndFoot/Navbar';
import { Link } from 'react-router-dom';
import LMS from '../images/lms1.png';
import SSP from '../images/ssp1.png';
import './Homepage.css';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="homepage">
        <main>
          <section className="image-section">

            <div className="image-wrapper">
              
              <a href="https://karnatakalms.com/" target="_blank" rel="noopener noreferrer">
                <img src={LMS} alt="LMS" />
              </a>

              <a href="https://ssp.postmatric.karnataka.gov.in/" target="_blank" rel="noopener noreferrer">
                <img src={SSP} alt="SSP" />
              </a>

            </div>
          </section>
        </main>
        <footer>
          <p>Student Database Management System - Powered by React</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
