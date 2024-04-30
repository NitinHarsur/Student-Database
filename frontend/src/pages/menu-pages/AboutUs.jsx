import React from 'react';
import {Navbar,Footer} from '../../NavAndFoot/Navbar';
import developer1 from '../../images/developer1.jpg';
import developer2 from '../../images/developer2.jpg';
import developer3 from '../../images/developer3.jpg';
import developer4 from '../../images/developer4.jpg';

// Define developer data
const developers = [
  {
    name: 'Adarshyogi',
    email: 'developer1@example.com',
    image: developer1 // Provide the imported image
  },
  {
    name: 'Nitin',
    email: 'developer2@example.com',
    image: developer2
  },
  {
    name: 'Siddaram',
    email: 'developer3@example.com',
    image: developer3
  },
  {
    name: 'Saffura Fatima',
    email: 'developer4@example.com',
    image: developer4
  }
];

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
          A student database management system is a software application designed to efficiently organize, store, and manage information related to students in educational institutions. This comprehensive system offers a centralized platform to maintain various data points, ensuring streamlined administrative processes and enhanced educational experiences for both students and faculty.
        </p>
        <h2 style={{ fontSize: '24px', margin: '20px 0', textAlign: 'center' }}>Key Features</h2>
        <ul style={{ textAlign: 'left', fontSize: '18px' }}>
          <li><strong>Centralized Data Storage:</strong> The system provides a centralized repository for storing a variety of student-related information, including personal details, academic records, attendance, and grades. This allows easy access and management of student data.</li>
          <li><strong>Attendance Tracker:</strong> The system includes an attendance tracker to monitor students' class attendance. It can alert parents if a student's attendance falls below 75%, promoting accountability and fostering communication between the school and students' families.</li>
          <li><strong>Academic Records:</strong> The system maintains comprehensive academic records for each student, including courses taken, grades received, and academic achievements. This helps in tracking students' progress and identifying areas where support may be needed.</li>
          <li><strong>Data Analysis and Reporting:</strong> The system offers tools for generating reports and analyzing data, providing valuable insights for decision-making. Administrators and educators can utilize this data to assess students' performance and tailor interventions as necessary.</li>
          <li><strong>Integration with Other Systems:</strong> The student database management system can integrate with other software applications, such as learning management systems (LMS) and finance systems, to create a seamless experience across various aspects of education.</li>
          <li><strong>Secure Data Management:</strong> Data privacy and security measures are implemented to protect student information and comply with relevant regulations and institutional policies. Access controls and encryption help safeguard sensitive data.</li>
          <li><strong>Efficient Communication:</strong> The system facilitates communication between students, parents, teachers, and administrators. Features such as notifications and messaging can keep all parties informed about important updates and events.</li>
          <li><strong>User-Friendly Interface:</strong> A user-friendly interface ensures that educators, administrators, and students can navigate the system easily, enhancing overall usability and adoption.</li>
        </ul>
        <h2 style={{ fontSize: '24px', margin: '20px 0', textAlign: 'center' }}>About Us Component</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Incorporating additional elements such as an "About Us" section within the software can help provide a personalized touch to the user experience. For example, the section can showcase the team behind the application, with details about developers such as their names, email addresses, and photos. This adds a human element to the software and fosters a sense of community and collaboration.
        </p>
        <h2 style={{ fontSize: '24px', margin: '20px 0', textAlign: 'center' }}>Conclusion</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          A student database management system plays a critical role in modern educational institutions by providing an efficient and effective way to manage student information. By offering features such as attendance tracking, academic record management, data analysis, and secure data storage, the system supports educators in delivering a high-quality educational experience. Additionally, its ability to integrate with other systems and ensure data privacy makes it an indispensable tool for schools and universities.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center' }}>Developers</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {developers.map((developer, index) => (
            <div key={index} style={developerBoxStyle}>
              <img
                src={developer.image}
                alt={developer.name}
                style={imageStyle}
              />
              <h3 style={nameStyle}>{developer.name}</h3>
              <p style={emailStyle}>{developer.email}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// Internal CSS styles
const developerBoxStyle = {
  margin: '20px auto',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '300px'
};

const imageStyle = {
  width: '150px',
  borderRadius: '50%'
};

const nameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '10px 0'
};

const emailStyle = {
  fontSize: '14px'
};
