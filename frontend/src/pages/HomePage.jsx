import React from 'react'
import Navbar from '../NavAndFoot/Navbar'
import { Link } from 'react-router-dom'
import LMS from '../images/lms1.png'
import SSP from '../images/ssp1.png'
import './Homepage.css'

function HomePage() {
  return (
    
    <div>
      <Navbar/>
      <div className="homepage">
      <main>
        <section className="image-section">
          <div className="image-wrapper">
            <Link to="https://karnatakalms.com/">
              <img src={LMS} />
            </Link>
            <Link to="https://ssp.postmatric.karnataka.gov.in/">
              <img src={SSP} />
            </Link>
          </div>
        </section>
      </main>
      <footer>
        <p>Student Database Management System - Powered by React</p>
      </footer></div> </div>
  )
}

export default HomePage