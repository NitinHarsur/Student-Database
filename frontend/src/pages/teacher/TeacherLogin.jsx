import React, { useState } from 'react';
import axios from 'axios'; // For API calls

function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track API call state

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state

    try {
      const response = await axios.post('/api/teacher-login', {
        username,
        regNumber,
      });

      const userData = response.data; // Assuming response contains user data (validation might be needed)

      // Successful login (replace with redirection or state change)
      console.log('Login successful!');
      // Handle successful login (e.g., redirect, store user data in a secure way)
      // Example: store user data in local storage or state management library like Redux/Context API
      localStorage.setItem('userData', JSON.stringify(userData)); // Example using local storage

    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'Login failed'); // Handle potential nested error objects
    } finally {
      setIsLoading(false); // Reset loading state
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
