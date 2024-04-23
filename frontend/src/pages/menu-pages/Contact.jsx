import React from 'react';
import Navbar from '../../NavAndFoot/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Contact() {
  return (
    <div>
      <Navbar />
      <style>
        {`
        .contact {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        h1 {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          color: #555;
          margin-top: 20px;
          text-align: center; /* Center the h2 tags */
        }
        p, a {
          line-height: 1.6;
          color: #333;
        }
        .card {
          padding: 20px;
          margin-bottom: 20px;
          text-align: center; /* Center text within the box */
        }
        a {
          display: block; /* Make the link a block element */
          margin-top: 10px; /* Add margin for spacing */
        }
        `}
      </style>

      <div className="contact container">
        <h1>Contact Us</h1>

        {/* Table for principal's details */}
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>Prabhu Hosalli</td>
              <td><strong>Email:</strong></td>
              <td><a href="mailto:ppl.gpt@gmail.com">ppl.gpt@gmail.com</a></td>
            </tr>
            <tr>
              <td><strong>Designation:</strong></td>
              <td>Principal</td>
              <td><strong>Contact:</strong></td>
              <td>+91 9110857878</td>
            </tr>
          </tbody>
        </table>

        <h2>College Address:</h2>
        {/* Box for college address */}
        <div className="card bg-light text-center"> {/* Added text-center class */}
          <p>
            Government Polytechnic, Kalaburagi<br />
            Aiwan E Shahi Area<br />
            Kalaburagi, Tq.Dist- Kalaburagi<br />
            Pin code: 585102<br /><br /><br />
            Landline : 08472-221871<br />
            Email Id: ppl.gpt@gmail.com
          </p>
        </div>

        <h2>Location:</h2>
        <p className='googlemap'>
          <a href="https://maps.app.goo.gl/Dn9z7sUztNDo9cUQ9" target="_blank" rel="noopener noreferrer" style={{textAlign:'center'}}>
            View on Google Maps
          </a>
        </p>
      </div>
    </div>
  );
}
