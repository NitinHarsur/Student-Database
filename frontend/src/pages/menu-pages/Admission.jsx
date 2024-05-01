import React from 'react';
import {Navbar,Footer} from '../../NavAndFoot/Navbar';

export default function Admission() {
  return (
    <div>
      <Navbar />
      <style>
        {`
        .admission {
          font-family: Arial, sans-serif;
          padding: 20px;
          font-weight: bold; /* Make all text bold */
        }
        h1 {
          font-family: ui-sans-serif;
          font-size: 41px;
          color: black;
          text-align: center;
          margin-bottom: 40px;
          font-weight: lighter;
        }
        h2 {
          font-family: ui-sans-serif;
          font-size: 30px;
          color: black;
          margin-top: 20px;
          font-weight: 500;
        }
        p {
          font-size: 22px;
          line-height: 3.6;
          color: black;
          font-weight: inherit;
        }
        ul {
          font-family: ui-sans-serif;
          margin: 0;
          padding: 0;
          list-style-type: none;
          font-weight: bold;
          color:black;
          font-size: 20px;
        }
        li {
          padding: 10px 0;
          font-weight: bold;
          color:black;
        }
        `}
      </style>

      <div className="admission">
        <h1>Admission Details</h1>
        <h2>SSLC-Passed Admission Details and Rules:</h2>
        <p>
          Students who have passed SSLC (10th standard) can apply for admission to the diploma programs. Here are the rules and guidelines for admission:
        </p>
        <ul>
          <li>Eligibility: Candidates must have passed SSLC or equivalent from a recognized board.</li>
          <li>Age Limit: There may be a specified age limit for admission; please refer to the institution's admission guidelines.</li>
          <li>Application Process: Fill out the admission application form and submit it along with the required documents such as SSLC marks card, identity proof, and passport-sized photographs.</li>
          <li>Selection Process: Selection is usually based on merit (marks obtained in SSLC) and may involve counseling.</li>
          <li>Seat Reservation: There may be reservation policies for different categories such as SC/ST, OBC, and others.</li>
          <li>Fees: Refer to the institution's website for details on admission fees and tuition fees.</li>
        </ul>

        <h2>PUC/IIT-Passed Admission Details and Rules:</h2>
        <p>
          Students who have passed PUC (12th standard) or an equivalent examination from a recognized board can also apply for admission. Here are the rules and guidelines for admission:
        </p>
        <ul>
          <li>Eligibility: Candidates must have passed PUC or an equivalent examination from a recognized board.</li>
          <li>Age Limit: Please refer to the institution's admission guidelines for any specific age limit.</li>
          <li>Application Process: Fill out the admission application form and submit it along with the required documents such as PUC marks card, identity proof, and passport-sized photographs.</li>
          <li>Selection Process: Selection is typically based on merit (marks obtained in PUC or equivalent) and may involve counseling.</li>
          <li>Seat Reservation: There may be reservation policies for different categories such as SC/ST, OBC, and others.</li>
          <li>Fees: Check the institution's website for details on admission fees and tuition fees.</li>
        </ul>
      </div>
      <Footer/>
    </div>
  );
}
