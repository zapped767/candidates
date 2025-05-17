import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import logo from '../../assets/WhatsApp Image 2025-02-17 at 14.29.29_59743a97 1.png';

// Updated image imports
import mainImg from '../../assets/WhatsApp Image 2025-02-17 at 14.29.29_59743a97 1.png';
import card1 from '../../assets/7025936.jpg';
import card2 from '../../assets/8140054.jpg';
import card3 from '../../assets/8222164.jpg';
import card4 from '../../assets/8339794.jpg';
import card5 from '../../assets/cab_driver_device_1.jpg';
import card6 from '../../assets/new-image-1.jpg'; // example new image
import card7 from '../../assets/new-image-2.jpg'; // example new image

import calendar from '../../assets/new-image-1.jpg';

import confetti from 'canvas-confetti';

function Dashboard() {
  const navigate = useNavigate();

  

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
  const [userNIC, setUserNIC] = useState('');

useEffect(() => {
  const nic = localStorage.getItem('userNIC');
  if (nic) setUserNIC(nic);
}, []);


  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <img src={logo} alt="Autovance Logo" className="nav-logo" />
          <span className="nav-title">AUTOVANCE</span>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/trail-request')}>Trail Date</button>
          <button onClick={() => navigate('/ConfirmationRequest')}>Confirm</button>
          <button onClick={() => navigate('/payment-form')}>Payment</button>
          <button onClick={() => navigate('/view-results')}>Results</button>
          <button onClick={() => navigate('/about-us')}>About Us</button>
          <button className="user-nic">User ID: {userNIC}</button>
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
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="confetti-particle"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            background: `hsl(${Math.random() * 360}, 100%, 70%)`
          }} 
        />
      ))}
    </div>
  );
}

export default Dashboard;