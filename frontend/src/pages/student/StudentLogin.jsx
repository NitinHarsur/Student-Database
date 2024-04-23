import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
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

 // This function changes the background color of the student form to white on hover
const handleMouseEnter = () => {
  const studentForm = document.querySelector('.studentform');
  studentForm.style.backgroundColor = 'white';
  studentForm.style.transition = '0.3s ease-in-out';
};

// This function reverts the background color change when the mouse leaves the button
const handleMouseLeave = () => {
  const studentForm = document.querySelector('.studentform');
  studentForm.style.backgroundColor = 'rgb(140, 221, 178)'; // Revert to original background color
  studentForm.style.transition = '0.3s ease-in-out';

};


  return (
    <div className='Student__loginpage'>

      <div className="student__logincontainer" >
          <img src={students} alt="" />


        <div className='stduent__loginform'>
       
          <form onSubmit={handleSubmit} className='studentform'>
          <h2 className='login__h2' style={{color:'black'}}>Welcome! Please Login to continue</h2>
              <div>
                  <input
                    type="text"
                    id="studentname"
                    placeholder='Enter your Name'
                    value={studentname}
                    onChange={(e) => setStudentname(e.target.value)} required
                      />
              </div>
              <div>
                    <input
                      type="text"
                      id="regnumber"
                      placeholder='Enter your RegisterNumber'
                      value={regnumber}
                      onChange={(e) => setRegnumber(e.target.value)} required
                    />
                </div>
                <center>
                <button
                                className='studentSubmitbtn'
                                type="submit"

                                onMouseEnter={handleMouseEnter} // Handle mouse enter events
                                onMouseLeave={handleMouseLeave} // Handle mouse leave events
                            >
                                Login
                            </button></center>
                {error && <div>{error}</div>}
          </form>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
