import React from 'react';
import Navbar from '../NavAndFoot/Navbar';
import LMS from '../images/lms1.png';
import SSP from '../images/ssp1.png';
import WhatsAppIcon from '../images/whatsapp.png'
import InstagramIcon from '../images/instagram.png'
import FacebookIcon from '../images/facebook.png'
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
        <div className="social-icons">
            <a href="..whatsapp" target="_blank" rel="noopener noreferrer">
              <img src={WhatsAppIcon} alt="WhatsApp" />
            </a>
            <a href="..instagram" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram" />
            </a>
            <a href=".. facebook" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook" />
            </a>
          </div>
          
        </footer>
        
  </div>
      </div>
    
  );
}

export default HomePage