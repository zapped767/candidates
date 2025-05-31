import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExaminarLogin.css";

const ExaminarLogin = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "Exam" && password === "12") {
      setError("");
      navigate("/Exam-Home");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="examinar-login-container">
      <div className="examinar-login-box">
        <h2>Examiner Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
      
    </div>
  );
};

export default ExaminarLogin;
