import React from 'react';
import { Navbar, Footer } from '../../NavAndFoot/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Syllabus() {
  return (
    <div>
      <Navbar />
      <style>
        {`
        /* Internal CSS for Syllabus component */
        .syllabus {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color:white ; /* Background color for the syllabus component */
        }
        h1, h2 {
          font-size: 24px;
          font-weight: bold;
          color: black;
          text-align: center; /* Center h1 and h2 tags */
        }
        h2 {
          font-size: 20px;
          color: black;
          margin-top: 20px;
        }
        p {
          line-height: 1.6;
          color: black;
        }

        /* Internal CSS for the table section */
        .table-section {
          background-color: white; /* Background color for the table section */
          padding: 20px;
          border-radius: 8px;
        }

        /* Optional: Styling for the links */
        .syllabus a {
          color: blue; /* Bootstrap primary color */
          text-decoration: none;
        }
        .syllabus a:hover {
          text-decoration: underline;
        }
        `}
      </style>
      <div className="syllabus fw-bold">
        <h1>Computer Science Syllabus</h1>
        <p>
          The Computer Science program at Government Polytechnic, Kalaburagi provides students with a solid foundation in the theoretical and practical aspects of the field. The curriculum is designed to prepare students for various opportunities in the industry and academia by covering a wide range of topics.
        </p>
        <p>
          The syllabus includes fundamental subjects such as programming, data structures, algorithms, and operating systems, as well as advanced topics like artificial intelligence, cybersecurity, and cloud computing. Through hands-on projects, labs, and internships, students gain practical experience and apply their knowledge in real-world scenarios.
        </p>
        <p>
          The program emphasizes skill-based learning and industry readiness, providing students with the tools they need to succeed in their chosen careers. Graduates of the Computer Science program are well-prepared for roles in software development, data science, networking, and more.
        </p>
        <p>
          Overall, the Computer Science syllabus is comprehensive and up-to-date, ensuring that students are equipped with the knowledge and skills needed to thrive in the ever-evolving field of technology.
        </p>

        {/* Table to display syllabus files links */}
        <h2>Syllabus Links</h2>
        <div className="table-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Semester Group</th>
                      <th>Syllabus Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1st & 2nd Semester</td>
                      <td><a href="https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C_20_CSE_1_2_Sem.pdf" target="_blank" rel="noopener noreferrer">1st & 2nd Semester Syllabus</a></td>
                    </tr>
                    <tr>
                      <td>3rd & 4th Semester</td>
                      <td><a href="https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C_20_CS_3_4_Sem.pdf" target="_blank" rel="noopener noreferrer">3rd & 4th Semester Syllabus</a></td>
                    </tr>
                    <tr>
                      <td>5th & 6th Semester</td>
                      <td><a href="https://dtek.karnataka.gov.in/storage/pdf-files/CDC/C20_5_6_sem_CSE.pdf" target="_blank" rel="noopener noreferrer">5th & 6th Semester Syllabus</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
