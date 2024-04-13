import React, { useState } from 'react';

const LoginForm = () => {
  const [studentname, setStudentname] = useState('');
  const [regnumber, setRegnumber] = useState('');
  const [error, setError] = useState('');

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
        throw new Error('Invalid username or registration number');
      }

      // If successful, you can redirect the user or display a success message
      alert('Login successful');
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
          <label htmlFor="studentname">Student Name:</label>
          <input
            type="text"
            id="studentname"
            value={studentname}
            onChange={(e) => setStudentname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="regnumber">Registration Number:</label>
          <input
            type="text"
            id="regnumber"
            value={regnumber}
            onChange={(e) => setRegnumber(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
