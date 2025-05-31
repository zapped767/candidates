import React, { useState } from 'react';
import axios from 'axios';
import './CandidateVideo.css';
import { useNavigate } from 'react-router-dom';

const CandidateVideo = () => {
  const [candidateId, setCandidateId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!candidateId.trim()) {
      setError('Please enter a valid Candidate ID');
      return;
    }

    axios.get(`http://localhost:8080/api/results/candidate/${candidateId}`)
      .then(response => {
        setResult(response.data);
        setError('');
      })
      .catch(err => {
        setResult(null);
        setError('No result found for the provided Candidate ID.');
      });
  };

  const extractFilename = (fullPath) => {
    return fullPath.split("\\").pop(); // handles Windows path
  };
  const navigate=useNavigate();

  return (
    <div className="video-container">
      <h2 className="video-title">🎥 View Your Trail Test Video</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="🔍 Enter Candidate ID"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
          className="candidate-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button > 
        <button className="search-button" onClick={() => navigate("/dashboard")}>Back</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-container">
          <h3>👤 Name: {result.candidate_name}</h3>
          <h4>🆔 ID: {result.candidate_id}</h4>
          <video width="100%" controls className="candidate-video">
            <source
              src={`http://localhost:8080/api/results/video/${extractFilename(result.videoPath)}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default CandidateVideo;
