import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ExamApplication.css";

const Application = ({ onClose }) => {
  const [nic, setNIC] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // Step 1: Get all users from signup table
    const response = await axios.get("http://localhost:8080/api/auth/users");

    // Step 2: Check NIC
    const matchedUser = response.data.find(
      (user) => user.nic?.trim() === nic.trim()
    );

    if (matchedUser) {
      alert("NIC Verified Successfully");
      navigate("/upvideo", { state: matchedUser });
      if (onClose) onClose();
    } else {
      setError("NIC not found. Please check your NIC or sign up first.");
    }
  } catch (err) {
    console.error("Error connecting to server:", err);
    setError("Failed to connect to server.");
  }
};



  return (
    <div className="application-overlay">
      <div className="application-popup">
        <h2>Candidate Application</h2>
        <form onSubmit={handleSubmit}>
          <label>Candidate NIC</label>
          <input
            type="text"
            placeholder="Enter candidate NIC"
            value={nic}
            onChange={(e) => setNIC(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}

          <div className="popup-buttons">
            <button type="submit" >Submit</button>
            <button
              type="button"
              onClick={() => navigate("/Exam-Home")}
              className="close-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
