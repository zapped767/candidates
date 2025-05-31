import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/signup');
  };
  const handleMain = () => {
    // Clear any authentication tokens or user data here
    navigate('/');
  };
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/nic/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json(); // Backend must return JSON with NIC
        localStorage.setItem("userNIC", result.nic); // Save NIC for dashboard

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1 className="login-logo">AUTOVANCE</h1>
      </header>

      <div className="login-content">
        <h2 className="login-title">Candidate Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="name"
            placeholder="User Name"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
          <button type="button" onClick={handleLoginRedirect}>SIGNUP</button>
          <button 
              type="button" 
              className="login-main-btn" 
              onClick={handleMain}>
              MAIN 3 LOG-IN
            </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
