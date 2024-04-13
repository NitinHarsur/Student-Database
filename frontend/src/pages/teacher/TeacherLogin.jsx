import React, { useState } from 'react';
import './Login.css'
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        alert('Invalid username or password number');
      }
      else{
        alert('Login successful');
        navigate('/teacherHome');
    }

    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} required
          />
        </div>
        <div>
          <label htmlFor="password"> Password:</label>
          <input
            type="text"
            id="regnumber"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
