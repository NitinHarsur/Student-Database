import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import teacherLoginImage from '../../images/teacherlogin.jpg'; // Add your teacher login image path
import './teacherLogin.css'; // Keep the existing CSS

const TeacherLoginForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

  // Handle form submission
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
        toast.error('Invalid username or employee number', {
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
        toast.success('Login successful', {
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
      toast.error('Network error', {
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
    <div className="Teacher__loginpage">
      <div className="teacher__logincontainer">
        <img src={teacherLoginImage} alt="Teacher login" />

        <div className='teacher__loginform'>
          <form onSubmit={handleSubmit} className='teacherform'>
            <h2 className='login__h2' style={{ color: 'black' }}>Welcome! Please Login to continue</h2>
            <div>
              <input
                type="text"
                id="teacherName"
                placeholder='Enter your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="passwor"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <center>
              <button
                className='teacherSubmitbtn'
                type="submit"
              >
                Login
              </button>
            </center>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherLoginForm;
