import React from 'react';
import { Navbar, Footer } from '../NavAndFoot/Navbar';
import CLG from '../images/clg.jpg';
import LMS from '../images/lms1.png';
import SSP from '../images/ssp1.png';
import './Homepage.css';
import DBwelcome from '../IndexTexts/DBwelcome';

function HomePage() {
  return (
    <>
    <Navbar />
    <DBwelcome />
      <div className='home' style={{ background: 'white' }}>
        
       
       
        <div className="homepage">
          <div className="clg-container">
            <div className="clgimg">
              <img src={CLG} alt="BG" width={'1000px'} height={'700px'} />
            </div>
            
          </div>
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
          </div>

      <Footer />
    </>
  );
}

export default HomePage;
