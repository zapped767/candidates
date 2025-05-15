import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const API_BASE = 'http://localhost:8080/api/trail-request/approve';

  const [message, setMessage] = useState('Checking your request status...');
  const [statusClass, setStatusClass] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get('id'); // e.g., ?id=123

    if (!requestId) {
      setMessage('❌ Invalid request. No ID provided.');
      setStatusClass('error');
      return;
    }

    // Fetch approval status from API
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

    fetchStatus();
  }, [location]);

  return (
    <div className="confirmation-container">
      <div className={`confirmation-box ${statusClass}`}>
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default Confirmation;
