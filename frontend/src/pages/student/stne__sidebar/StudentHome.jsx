import React from 'react';
import './stntHome.css';

const StudentHome =  () => {
  const storedStudentname = sessionStorage.getItem('studentname');
  const storedRegnumber = sessionStorage.getItem('regnumber');
  
  return (
    <div className='Student__Home'>
      <h1>Welcome {storedStudentname}</h1>
      <p>Registration Number: {storedRegnumber}</p>
    </div>
  );
}

export default StudentHome;
