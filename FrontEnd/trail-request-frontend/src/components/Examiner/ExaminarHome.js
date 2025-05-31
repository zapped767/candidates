import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExaminarHome.css";

const ExaminarHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/ExamLogin");
  };

  return (
    <div className="exam-home-container">
      {/* Header Section */}
      <header className="exam-home-header">
      <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
        <div className="header-content">
          <div className="welcome-text">
            <h1>Welcome Examiner ! 👋</h1>
            <p>Start your trial exam or check your candidate status in just a few clicks.</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="exam-home-content">
        {/* Start Exam Section */}
        <div className="exam-card">
          <span className="icon">📝</span>
          <h2>Start a New Exam</h2>
          <p>Begin a new exam session with a single click.</p>
          <button className="primary-btn" onClick={() => navigate("/Exam-App")}>
            Start Exam
          </button>
        </div>

        {/* Candidate List Section */}
        <div className="exam-card">
          <span className="icon">📋</span>
          <h2>Candidate List</h2>
          <p>View the list of registered candidates.</p>
          <button className="secondary-btn" onClick={() => navigate("/Can-list")}>
            View Candidates
          </button>
        </div>
      </main>
    </div>
  );
};

export default ExaminarHome;
