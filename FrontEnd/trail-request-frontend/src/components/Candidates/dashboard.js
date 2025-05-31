import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import logo from '../../assets/WhatsApp Image 2025-02-17 at 14.29.29_59743a97 1.png';

// Updated image imports
import mainImg from '../../assets/WhatsApp Image 2025-02-17 at 14.29.29_59743a97 1.png';
import card1 from '../../assets/7025936.jpg';
import card2 from '../../assets/8140054.jpg';
import card3 from '../../assets/8222164.jpg';
import card4 from '../../assets/8339794.jpg';
import card5 from '../../assets/cab_driver_device_1.jpg';
import card6 from '../../assets/new-image-1.jpg';
import card7 from '../../assets/new-image-2.jpg';

import calendar from '../../assets/new-image-1.jpg';

import confetti from 'canvas-confetti';

function Dashboard() {
  const navigate = useNavigate();
  const [userNIC, setUserNIC] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(null);

  const startStatusChecker = (nic) => {
    const interval = setInterval(() => {
      checkApprovalStatus(nic);
    }, 30000); // 30 seconds
    setRefreshInterval(interval);
    return interval;
  };

  useEffect(() => {
    // Initial confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff5e5e', '#ffdc60', '#88ff60', '#60b3ff', '#d460ff']
    });

    // Continuous subtle confetti
    const glowInterval = setInterval(() => {
      confetti({
        particleCount: 8,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffdc60', '#ffffff', '#60ffb3'],
        scalar: 0.6
      });
    }, 5000);

    return () => clearInterval(glowInterval);
  }, []);

  useEffect(() => {
    const nic = localStorage.getItem('userNIC');
    if (nic) {
      setUserNIC(nic);
      checkApprovalStatus(nic);
      const interval = startStatusChecker(nic);
      return () => clearInterval(interval);
    }
  }, []);

  const checkApprovalStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trail-request/accepted');
      if (response.data.status === 'approved') {
        setIsApproved(true);
        setIsPending(false);
        if (refreshInterval) {
          clearInterval(refreshInterval);
          setRefreshInterval(null);
        }
      } else if (response.data.status === 'denied') {
        setIsApproved(false);
        setIsPending(false);
      } else {
        setIsApproved(false);
        setIsPending(true);
      }
    } catch (error) {
      console.error('Error checking approval status:', error);
    }
  };

  const handlePaymentClick = () => {
    if (!isApproved) {
      navigate('/payment-form');
    } else if (isPending) {
      alert('Your request is still pending approval. Please wait for admin approval.');
    } else {
      alert('Your request has been denied. Please contact support for more information.');
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <img src={logo} alt="Autovance Logo" className="nav-logo" />
          <span className="nav-title">AUTOVANCE</span>
        </div>



        <div className="nav-links">
          <button onClick={() => navigate('/trail-request')}>Trail Date</button>
      
          <button
            onClick={handlePaymentClick}
            
            
          >
            Payment   
          </button>

          
          <button onClick={() => navigate('/can-video')}>Results</button>
          
          <span className="user-nic">User ID: {userNIC}</span>
        </div>

        <button className="nav-logout" onClick={() => navigate('/login')}>Logout</button>
      </nav>

      <main className="dashboard-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Drive Into The Future</h1>
            <p className="hero-subtitle">Experience the next generation of driving education</p>
            <button className="hero-cta" onClick={() => navigate('/trail-request')}>
              Start Your Journey
            </button>
          </div>
          <img src={mainImg} alt="Modern car technology" className="hero-image" />
        </section>

        <div className="calendar-section">
          <div className="calendar-card">
            <span className="calendar-title">Upcoming Session</span>
            <img src={calendar} alt="Calendar" className="calendar-image" />
            <p className="calendar-date">15th June, 2025</p>
          </div>
        </div>

        <section className="features-section">
          <h2 className="section-title">Our Services</h2>
          <div className="features-grid">
            {[
              { img: card1, title: 'DRIVING LESSONS', route: '/driving-lessons' },
              { img: card2, title: 'ROAD SAFETY', route: '/road-safety' },
              { img: card3, title: 'DRIVING SCHOOL', route: '/driving-school' },
              { img: card4, title: 'CAR FEATURES', route: '/car-features' },
              { img: card5, title: 'DEVICE GUIDE', route: '/device-guide' },
              { img: card6, title: 'VIRTUAL TRAINING', route: '/virtual-training' },
              { img: card7, title: 'EXPERT TIPS', route: '/expert-tips' }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                onClick={() => navigate(feature.route)}
              >
                <img src={feature.img} alt={feature.title} className="feature-image" />
                <div className="feature-overlay">
                  <h3>{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Confetti decoration */}
      {[...Array(30)].map((_, i) => {
        const left = `${Math.random() * 100}vw`;
        const animationDelay = `${Math.random() * 2}s`;
        const animationDuration = `${3 + Math.random() * 3}s`;
        const background = `hsl(${Math.random() * 360}, 100%, 70%)`;

        return (
          <div
            key={i}
            className="confetti-particle"
            style={{
              left,
              animationDelay,
              animationDuration,
              background
            }}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
