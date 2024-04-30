import React from 'react';
import { Navbar, Footer } from '../NavAndFoot/Navbar';
import LMS from '../images/lms1.png';
import SSP from '../images/ssp1.png';
import './Homepage.css';
import DBwelcome from '../IndexTexts/DBwelcome';
import backgroundImage from '../images/clgbg.jpg'; // Import the background image

function HomePage() {
    return (
        <>
            <Navbar />
            <DBwelcome />
            {/* Add the background image as a style to the home div */}
            <div className="home" style={{
                backgroundImage: `url(${backgroundImage})`, // Set the background image
                backgroundSize: 'cover', // Make the image cover the entire div
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Do not repeat the image
            }}>
                <div className="homepage">
                    <div className="clg-container">
                        {/* Add any content you want in the college container */}
                    </div>
                    
                    {/* New text container row */}
                    <div className="text-row" style={{
                    
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
                        padding: '20px', // Adjust padding as needed
                        borderRadius: '10px', // Rounded corners
                        color: 'white', // White text color
                        margin: '20px auto', // Center the row horizontally and add margin
                        maxWidth: '8000px', // Control the maximum width for better aesthetics
                        backdropFilter: 'blur(1px)', // Optional: blur effect for better aesthetics
                    }}>
                        <div className="text-content">
                            <h2>Welcome to the Government Polytechnic Kalaburagi!</h2>
                            <p>We offer quality education and training in various fields.</p>
                            {/* Add a thought or inspirational message here */}
                            <p className="thought">"Empowering your academic journey with streamlined data management."</p>
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
