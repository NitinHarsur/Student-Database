import React from 'react';
import {Navbar,Footer} from '../../NavAndFoot/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import bgimg from '../../images/bgimg.jpg'; // Import your background image

export default function Department() {
  // Define the faculty data as an array of objects
  const facultyData = [
    {
      name: 'Sunandadevi V K',
      qualification: 'BE',
      designation: 'HOD',
      email: 'john.doe@example.com',
    },
    {
      name: 'Rukmini',
      qualification: 'M.Tech',
      designation: 'SR GR. Lecturer',
      email: 'jane.smith@example.com',
    },
    {
      name: 'Nagraj M',
      qualification: 'M.Tech',
      designation: 'SR GR. Lecturer',
      email: 'michael.johnson@example.com',
    },
    {
      name: 'Ameena Firdous Nikhat',
      qualification: 'M.Tech',
      designation: 'Lecturer',
      email: 'michael.johnson@example.com',
    },
    {
      name: 'Swapna',
      qualification: 'BE',
      designation: 'Lecturer',
      email: 'michael.johnson@example.com',
    },
    {
      name: 'Prashant V B',
      qualification: 'DE IN IS',
      designation: 'Programmer',
      email: 'michael.johnson@example.com',
    },
    {
      name: 'Sunita Kumari',
      qualification: 'BSc BEd',
      designation: 'System Analyst',
      email: 'michael.johnson@example.com',
    },
    {
      name: 'Rajashree',
      qualification: ' PUC',
      designation: 'Asst.Instructor',
      email: 'michael.johnson@example.com',
    },
    {
      name: 'Jyoti',
      qualification: 'BCA',
      designation: 'Mechanic',
      email: 'michael.johnson@example.com',
    },
  ];

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
      <style>
        {`
        h1 {
          font-size: 41px; /* Reduced font size */
          color: black;
          font-weight: 600;
          text-align: center;
          margin-bottom: 20px;
        }
        .dept-overview {
          font-size: 24px;
          line-height: 1.6;
          color: black;
          margin: 40px; /* Adjusted margin */
          padding: 20px; /* Adjusted padding */
          border-radius: 5px;
        }
        .faculty-section {
          margin: 20px;
          text-align: center; 

        }
        .h2,h2{
          font-size: 41px; /* Reduced font size */
          color: black;
          font-weight: 600;
          text-align: center;
          margin-bottom: 20px;
        }
        table {
          width: 100%; /* Same width as the parent container */
          border-collapse: collapse;
          margin: 0 auto; /* Center the table */
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
          font-size: 24px;
          font-weight: 700;
        }
        th {
          background-color: black;
          color: black;
          font-weight: bold;
        }
       

        `}
      </style>
      <h1 className="text-center">COMPUTER SCIENCE OVERVIEW</h1>

      <p className='dept-overview fw-bold'>
        Department of Computer Science and Engineering (CSE) in Government Polytechnic, Kalaburagi was established in the year 1990 to lead and guide the students in computing education and innovation. The advanced computing, industry-ready, skill-based academic programs prescribed by the Department of Collegiate and Technical Education, Bangalore have provided students with opportunities for the public good and broadened societal impact.
        <br /><br />
        Specific courses provide fundamental knowledge, industry readiness, and skills in core aspects of computing like programming, data structure, hardware and maintenance, operating systems, algorithms, computer networks, and Database/PL SQL. New horizons required by industries like Full Stack Development, Artificial Intelligence, Cloud Computing, and Cybersecurity are learned by the students by selecting one of the above subjects as their pathway subjects.
        <br /><br />
        The Department of CSE is approved by AICTE.
      </p>

      <div className="faculty-section table-responsive">
        <h2 className="faculty-heading">Faculty</h2>
        {/* Table to display faculty details */} 
        <table className="table table-striped table-bordered border-black ">
          <thead className='table-primary'>
            <tr>
              <th>Name</th>
              <th>Qualification</th>
              <th>Designation</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className='table-group-divider table-light'>
            {/* Map over the faculty data to create a row for each faculty member */}
            {facultyData.map((faculty, index) => (
              <tr key={index}>
                <td>{faculty.name}</td>
                <td>{faculty.qualification}</td>
                <td>{faculty.designation}</td>
                <td><a href={`mailto:${faculty.email}`}>{faculty.email}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
      </div>
    </div>
  );
}
