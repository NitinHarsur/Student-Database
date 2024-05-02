import React from 'react';
import {Navbar,Footer} from '../../NavAndFoot/Navbar';
import developer1 from '../../images/developer1.jpg';
import developer2 from '../../images/developer2.jpg';
import developer3 from '../../images/developer3.jpg';
import developer4 from '../../images/developer4.jpg';
import bgimg from '../../images/bgimg.jpg'; // Import your background image

// Define developer data
const developers = [
  {
    name: 'Adarshyogi',
    email: 'adarshyogi@gmail.com',
    image: developer1 // Provide the imported image
  },
  {
    name: 'Nitin',
    email: 'nitinharsur@gmail.com',
    image: developer2
  },
  {
    name: 'Siddaram',
    email: 'siddu141204@gmail.com',
    image: developer3
  },
  {
    name: 'Saffura Fatima',
    email: 'saffurafatima22@gmail.com',
    image: developer4
  }
];

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <div
                className="container"
                style={{
                    padding: '20px',
                    minHeight: '100vh',
                    backgroundImage: `url(${bgimg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    maxWidth:'1504px'
                }}
            >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '24px',fontWeight:"700", lineHeight: '1.6',marginTop:'20px',color:"black", marginBottom: '50px' }} className="text-start">
          A student database management system is a software application designed to efficiently organize, store, and manage information related to students in educational institutions. This comprehensive system offers a centralized platform to maintain various data points, ensuring streamlined administrative processes and enhanced educational experiences for both students and faculty.
        </p>
        <div class="container text-start">
    <h2 style={{fontSize:'41px',fontWeight:'600',textAlign:'center'}} >Key Features</h2> 

    <ul>
        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Centralized Data Storage:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>The system provides a centralized repository for storing a variety of student-related information, including personal details, academic records, attendance, and grades. This allows easy access and management of student data.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Attendance Tracker:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>The system includes an attendance tracker to monitor students' class attendance. It can alert parents if a student's attendance falls below 75%, promoting accountability and fostering communication between the school and students' families.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Academic Records:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>The system maintains comprehensive academic records for each student, including courses taken, grades received, and academic achievements. This helps in tracking students' progress and identifying areas where support may be needed.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Data Analysis and Reporting:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>The system offers tools for generating reports and analyzing data, providing valuable insights for decision-making. Administrators and educators can utilize this data to assess students' performance and tailor interventions as necessary.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Integration with Other Systems:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>The student database management system can integrate with other software applications, such as learning management systems (LMS) and finance systems, to create a seamless experience across various aspects of education.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Secure Data Management:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>Data privacy and security measures are implemented to protect student information and comply with relevant regulations and institutional policies. Access controls and encryption help safeguard sensitive data.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>Efficient Communication:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>The system facilitates communication between students, parents, teachers, and administrators. Features such as notifications and messaging can keep all parties informed about important updates and events.</p>
        </li>

        <li style={{fontSize: '30px',fontWeight:"700"}}>
            <strong>User-Friendly Interface:</strong>
            <p style={{fontSize: '24px',fontWeight:"700"}}>A user-friendly interface ensures that educators, administrators, and students can navigate the system easily, enhancing overall usability and adoption.</p>
        </li>
    </ul>



        <h2 style={{ fontSize: '41px', margin: '40px 0', textAlign: 'center',fontWeight:'600' }}>About Us Component</h2>
        <p style={{ fontSize: '24px',fontWeight:'700', lineHeight: '1.6' }} className="text-start">
    Incorporating additional elements such as an "About Us" section within the software can help provide a personalized touch to the user experience. For example, the section can showcase the team behind the application, with details about developers such as their names, email addresses, and photos. This adds a human element to the software and fosters a sense of community and collaboration.
</p>

        <h2 style={{ fontSize: '41px', margin: '20px 0', textAlign: 'center',fontWeight:'600' }}>Conclusion</h2>
        <p style={{ fontSize: '24px',fontWeight:'700', lineHeight: '1.6' }}>
          A student database management system plays a critical role in modern educational institutions by providing an efficient and effective way to manage student information. By offering features such as attendance tracking, academic record management, data analysis, and secure data storage, the system supports educators in delivering a high-quality educational experience. Additionally, its ability to integrate with other systems and ensure data privacy makes it an indispensable tool for schools and universities.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
    <h1 style={{ fontSize: '41px', textAlign: 'center', fontWeight: '600',marginTop:'65px' }}>Developers</h1>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {developers.map((developer, index) => (
            <div key={index} style={developerBoxStyle}>
                <img
                    src={developer.image}
                    alt={developer.name}
                    style={imageStyle}
                />
                <h3 style={{ fontSize: '30px', fontWeight: '600' }}>{developer.name}</h3>
                <p style={{ fontSize: '20px', fontWeight: 'bolder' }}><a style={{color:'black',textDecoration:'none'}}href={`mailto:${developer.email}`}>{developer.email}</a> {/* Convert email to a clickable link */}
                 </p>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Footer/>
    </div>
    </div>
    
  );
}

// Internal CSS styles

const developerBoxStyle = {
  width: '300px',
    padding: '20px',
    margin: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
    transition: 'box-shadow 0.3s ease', // Transition effect for shadow
    textAlign: 'center',
    backgroundColor: 'white', // White background
};


const imageStyle = {
  width: '100px', // Set the desired width of the image
  height: '100px', // Set the desired height of the image
  borderRadius: '50%', // Make the image circular
  border: '2px solid #ccc', // Add a solid border with a specific color (#ccc is a light gray)
  marginBottom: '10px', // Add a margin below the image for spacing
  objectFit: 'cover', // Ensure the image covers the entire area of the circular shape
};

const nameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '10px 0'
};

const emailStyle = {
  fontSize: '14px'
};
