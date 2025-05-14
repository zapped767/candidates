import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../assets/WhatsApp Image 2025-02-17 at 14.29.29_59743a97 1.png';
import user from '../assets/bigstock-323788516-1024x614 2.png';
import mainImg from '../assets/image 1.png';
import calendar from '../assets/9_Pragmatica_3D_Metal_Calendar.png';
import card1 from '../assets/image 2.png';
import card2 from '../assets/image 4.png';
import confetti from 'canvas-confetti';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger celebratory confetti once on load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Continuous subtle glow for the hero image
    const glowInterval = setInterval(() => {
      confetti({
        particleCount: 5,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffdc60', '#ffffff'],
        scalar: 0.5
      });
    }, 5000);

    return () => clearInterval(glowInterval);
  }, []);

  return (
    <div className="dashboard-ui">
      <nav className="dashboard-ui__navbar">
        <div className="dashboard-ui__logo-section">
          <img src={logo} alt="Logo" className="dashboard-ui__logo" />
          <span className="dashboard-ui__brand">AUTOVANCE</span>
        </div>
        <div className="dashboard-ui__nav">
          <button onClick={() => navigate('/trail-request')}>Trail Date</button>
          <button onClick={() => navigate('/confirm')}>Confirm</button>
          <button onClick={() => navigate('/payment-form')}>Payment</button>
          <button onClick={() => navigate('/view-results')}>Results</button>
          <button onClick={() => navigate('/about-us')}>About Us</button>
        </div>
        <div className="dashboard-ui__user">
          <img src={user} alt="User" className="dashboard-ui__avatar" />
          <span>P. Harigaran</span>
        </div>
      </nav>

      <main className="dashboard-ui__main">
        <div className="dashboard-ui__top">
          <img
            src={mainImg}
            alt="Main"
            className="dashboard-ui__hero-img animate-fadeInLeft"
          />
          <div className="dashboard-ui__calendar-box animate-fadeInRight">
            <span className="dashboard-ui__calendar-title">Upcoming QBR</span>
            <img src={calendar} alt="Calendar" className="dashboard-ui__calendar-img" />
            <p className="dashboard-ui__calendar-date">12th Aug, 2022</p>
          </div>
        </div>

        <div className="dashboard-ui__divider"></div>

        <div className="dashboard-ui__cards">
          <div className="dashboard-ui__card-container animate-fadeInUp">
            <img
              src={card1}
              alt="Driving Lessons"
              className="dashboard-ui__card"
            />
            <p className="dashboard-ui__card-title">DRIVING LESSONS</p>
          </div>
          <div className="dashboard-ui__card-container animate-fadeInUp">
            <img
              src={card2}
              alt="Road Safety"
              className="dashboard-ui__card"
            />
            <p className="dashboard-ui__card-title">ROAD SAFETY</p>
          </div>
          <div className="dashboard-ui__card-container animate-fadeInUp">
            <img
              src={card2}
              alt="Driving School"
              className="dashboard-ui__card"
            />
            <p className="dashboard-ui__card-title">DRIVING SCHOOL</p>
          </div>
        </div>
      </main>

      {/* Confetti elements */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="confetti" style={{
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${3 + Math.random() * 3}s`
        }} />
      ))}
    </div>
  );
}

export default Dashboard;