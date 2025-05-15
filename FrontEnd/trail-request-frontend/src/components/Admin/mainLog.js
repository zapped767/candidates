import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mainLog.css';

const MainLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="main-log-screen">
      <div className="main-log-title">AUTOMATIC DRIVING TRAIL SYSTEM</div>
      
      <div className="main-log-buttons">
        <button 
          className="main-log-btn candidate" 
          onClick={() => navigate('/signup')}
        >
          CANDIDATE LOGIN
        </button>
        
        <div className="button-spacing"></div>
        
        <button 
          className="main-log-btn examinar" 
          onClick={() => navigate('/Exminer')}
        >
          EXAMINAR LOGIN
        </button>
        
        <div className="button-spacing"></div>
        
        <button 
          className="main-log-btn admin" 
          onClick={() => navigate('/Admin')}
        >
          ADMIN LOGIN
        </button>
      </div>
    </div>
  );
};

export default MainLogin;