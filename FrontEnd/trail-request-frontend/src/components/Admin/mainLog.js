import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mainLog.css';

const MainLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="main-log-screen">
      <div className="main-log-title">AUTOMATED DRIVING TRAIL TESTING SYSTEM</div>
      
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
          onClick={() => navigate('/Examo-login')}
        >
          EXAMINAR LOGIN
        </button>
        
        <div className="button-spacing"></div>
        
        <button 
          className="main-log-btn admin" 
          onClick={() => navigate('/Adminlogin')}
        >
          ADMIN LOGIN
        </button>
      </div>
    </div>
  );
};

export default MainLogin;