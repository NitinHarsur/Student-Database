import React, { useState } from 'react';
// import './Login.css'; 

function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Implement login logic here (e.g., API call, validation)
    // Replace with your actual backend interaction logic
    if (username === 'admin' && regNumber === '12345') {
      // Successful login (replace with redirection or state change)
      console.log('Login successful!');
    } else {
      setErrorMessage('Invalid username or registration number');
    }
  };

  return (
    <div className="login">
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="regNumber">Registration Number:</label>
          <input
            type="text"
            id="regNumber"
            name="regNumber"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default TeacherLogin;
