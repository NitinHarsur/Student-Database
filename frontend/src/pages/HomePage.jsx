import React from 'react';
import Navbar from '../NavAndFoot/Navbar';
import LMS from '../images/lms1.png';
import SSP from '../images/ssp1.png';
import './Homepage.css';

function HomePage() {
  return (
    <div className='home' style={{background:'#cdc1ff'}}>
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
        
      </div>
      <footer>
          <div>Student Database Management System - Powered by React</div>
        </footer>
    </div>
  );
}

export default HomePage;
