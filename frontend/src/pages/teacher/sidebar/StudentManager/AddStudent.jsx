import React, { useState } from 'react';
import './AddStudent.css';
import {  toast,Bounce } from 'react-toastify';

const AddStudent = () => {
  const [studentname, setStudentname] = useState('');
  const [year, setYear] = useState('');
  const [regnumber, setRegnumber] = useState('');
  const [error] = useState('');
 




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/AddStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentname, regnumber,year }),
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
    <div className='add-student-container' >

      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="regnumber">Registration Number:</label>
          <input
            type="text"
            id="regnumber"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)} required
          />
        </div>
<<<<<<< HEAD
        <div style={{textAlign:'center'}}><button type="submit" >Login</button></div>
=======
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)} required
          />
        </div>
        <button type="submit" >Add Student</button>
>>>>>>> 729b15714e3c6c2da5fade67d00303a79740e7e5
        {error && <div>{error}</div>}
      </form>

    </div>
  );
};

export default AddStudent;
