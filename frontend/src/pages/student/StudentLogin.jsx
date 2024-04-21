import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import student__bgimage from '../../images/student__bgimage.jpg'
import students from '../../images/students.jpg'

import {  toast,Bounce } from 'react-toastify';

import './studentLogin.css'

const LoginForm = () => {
  const [studentname, setStudentname] = useState('');
  const [regnumber, setRegnumber] = useState('');
  const [error] = useState('');
  const  navigate = useNavigate();




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/studentLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentname, regnumber }),
      });

      if (!response.ok) {
        toast.error('Invalid studentname and register number', {
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
      navigate('/StudentDashboard')
      toast.success('Login Successfull', {
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
    <div className='Student__loginpage'>
      <div className="student__logincontainer" >
<img src={students} alt="" />


<div className='stduent__loginform'>
      <h2>Welcome! PLease Login to continue</h2>
      <form onSubmit={handleSubmit} className='studentform'>
        <div>
          <label htmlFor="studentname" className='stduentinput'>Student Name:</label>
          <input
            type="text"
            id="studentname"
            value={studentname}
            onChange={(e) => setStudentname(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="regnumber" className='stduentinput'>Registration Number:</label>
          <input
            type="text"
            id="regnumber"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)} required
          />
        </div>
        <button className='studentSubmitbtn'  type="submit" >Login</button>
        {error && <div>{error}</div>}
      </form>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
