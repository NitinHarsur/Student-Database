import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import "./login.css";

const Login = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [regno, setRegno] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", username, regno); // Debugging: Log username and regno
    try {
      const response = await axios.post('http://localhost:3001/login', { username, regno });
      const { message, user } = response.data;
      console.log("Response:", message, user); // Debugging: Log response data
      if (message === "Login successful") {
        if (user.role === "teacher") {
          navigate(`/teacher/home`, { state: { user } }); // Pass user as a prop
        } else if (user.role === "student") {
          navigate("/student/home");
        }
      } else {
        alert("Invalid username or registration number");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error); // Debugging: Log any errors
      alert("An error occurred while logging in");
    }
  }

  return (
    <div id="container">
      <form onSubmit={handleLogin} id="loginform">
        <h2>
          Login <br />
          <span>Welcome User</span>
        </h2>
        <div className="input-row">
          <span>Login As</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select The Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter your Register Number"
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
