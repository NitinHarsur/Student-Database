import React, { useState } from 'react';
import './AddStudent.css';
import {  toast,Bounce } from 'react-toastify';

const AddStudent = () => {
  const [studentname, setStudentname] = useState('');
  const [fathername, setFathername] = useState('');
  const [mothername, setMothername] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [regnumber, setRegnumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error] = useState('');
 




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/AddStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentname,
          fathername,
          mothername,
          email,
          regnumber,
          year,
          phone}),
      });

      if (!response.ok) {
        toast.error('Register number already exsist', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });}

else{
      toast.success('Added successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });}      
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error('Netwok Error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  };

  
  return (
    <div className='add-student-container'>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="addbox">
        <div className="left">
      <div>
          <label htmlFor="regnumber">Registration Number:</label>
          <input
            type="text"
            id="regnumber"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)} required
          />
        </div>

        <div>
          <label htmlFor="studentname">Student Name:</label>
          <input
            type="text"
            id="studentname"
            value={studentname}
            onChange={(e) => setStudentname(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="fathername">Student Father Name:</label>
          <input
            type="text"
            id="fathername"
            value={fathername}
            onChange={(e) => setFathername(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="mothername">Student Mother Name :</label>
          <input
            type="text"
            id="mothername"
            value={mothername}
            onChange={(e) => setMothername(e.target.value)} required
          />
        </div>
        </div>
        <div className="right">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
        </div>

        
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} required
          />
        </div>
        </div>
        </div>

        <center>
        <button type="submit" >Add Student</button></center>
        {error && <div>{error}
        </div>}
      </form>
  
    </div>
  );
};

export default AddStudent;
