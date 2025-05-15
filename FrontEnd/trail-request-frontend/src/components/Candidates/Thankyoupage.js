import React from 'react';
import './Thankyou.css';

const AutoVanoeInterface = () => {
  return (
    <div className="av-container">

      
      {/* Navigation Bar */}
      <nav className="av-navbar">
        <div className="av-logo">AUTOVANOE</div>
        <div className="av-nav-links">
          <a href="/dashboard" className="av-nav-link active">DASH-BOARD</a>
          {/* <a href="/ConfirmationRequest" className="av-nav-link">CONFIRMATION</a>
          <a href="#results" className="av-nav-link">VIEW RESULTS</a>
          <a href="#payment" className="av-nav-link">PAYMENT CHECKOUT</a>
          <a href="#about" className="av-nav-link">ABOUT US</a> */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="av-main-content">
        <h1 className="av-thank-you">Thank You For Applying Trail Session!</h1>
        <div className="av-dashboard">
          <h2 className="av-dashboard-title">Dashboard</h2>
          {/* Dashboard content would go here */}
        </div>
      </main>
    </div>
  );
};

export default AutoVanoeInterface;