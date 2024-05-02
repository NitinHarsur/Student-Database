import React from 'react';
import { Navbar, Footer } from '../NavAndFoot/Navbar';
import LMS from '../images/lms1.png';
import SSP from '../images/ssp1.png';
import NSP from '../images/nsp.png';
import './Homepage.css';

import backgroundVideo from '../images/clgbgv.mp4';

function HomePage() {
    return (
        <>
            <Navbar />
            

            {/* Background video */}
            <div className="background-video-wrapper">
                <video
                    src={backgroundVideo} // Specify the video source
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                />
            </div>

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
                            <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer">
                                <img src={NSP} alt="NSP" />
                            </a>
                        </div>
                    </section>
                </main>
            </div>
            
            <Footer />
        </>
    );
}

export default HomePage;
