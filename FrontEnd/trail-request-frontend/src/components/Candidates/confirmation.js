import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ⬅️ import useNavigate
import axios from 'axios';
import './confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ⬅️ initialize navigate
  const API_BASE = 'http://localhost:8080/api/trail-request/approve';

  const [message, setMessage] = useState('Checking your request status...');
  const [statusClass, setStatusClass] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get('id');

    if (!requestId) {
      setMessage('❌ Invalid request. No ID provided.');
      setStatusClass('error');
      return;
    }

    const fetchStatus = async (id) => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        
        if (res.data && res.data.approved) {
          setMessage('🎉 Your request has been accepted!');
          setStatusClass('approved');
        } else {
          setMessage('⏳ Your request has not been accepted yet.');
          setStatusClass('pending');
        }
      } catch (err) {
        console.error('Error fetching request status:', err);
        setMessage('⚠️ Unable to fetch your request status.');
        setStatusClass('error');
      }
    };

    fetchStatus(requestId); // Pass the ID here
  }, [location]);

  return (
  <div className="confirmation-container" style={{ position: 'relative' }}>
    <button 
      className="dashboard-button"
      onClick={() => navigate('/dashboard')}
      style={{ position: 'absolute', top: 20, right: 20 }}
    >
      Dashboard
    </button>

    <div className={`confirmation-box ${statusClass}`}>
      <h2>{message}</h2>
    </div>
  </div>
);

};

export default Confirmation;
