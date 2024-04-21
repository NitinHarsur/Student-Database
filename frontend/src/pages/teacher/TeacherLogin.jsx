import React, { useState } from 'react';
import './teacherLogin.css';
import { useNavigate } from 'react-router-dom';
import { toast,Bounce } from 'react-toastify';
import DBwelcome from '../../IndexTexts/DBwelcome';

const LoginForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/teacherLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        toast.error('Invalid username and password', {
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
      } else {
        navigate('/TeacherDashboard');
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
          });
      }
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
    <div className="__login__container">
    <DBwelcome />

    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input type="text" id="name" required placeholder="Username" onChange={(e)=>setName(e.target.value)}/>
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" id="password" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <label>Password</label>
        </div>
        <center>
          <button type="submit">LOGIN<span></span></button>
        </center>  {error && <div className="error-message">{error}</div>}
      </form>
    </div>

  </div>
  
  );
};

export default LoginForm;
