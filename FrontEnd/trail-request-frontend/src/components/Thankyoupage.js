import React from 'react';

const AutoVanoeInterface = () => {
  // Main container styles
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  // Navigation bar styles
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e0e0e0'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: '1px'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '25px'
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '8px 0',
    position: 'relative'
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    borderBottom: '2px solid #333'
  };

  // Main content styles
  const mainContentStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center'
  };

  const thankYouStyle = {
    fontSize: '28px',
    color: '#333',
    marginBottom: '40px',
    fontWeight: '400',
    letterSpacing: '0.5px'
  };

  const dashboardSectionStyle = {
    backgroundColor: 'white',
    padding: '30px 40px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    width: '80%',
    maxWidth: '900px'
  };

  const dashboardTitleStyle = {
    color: '#333',
    margin: '0',
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'left',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee'
  };

  return (
    <div style={containerStyle}>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <div style={logoStyle}>AUTOVANOE</div>
        <div style={navLinksStyle}>
          <a href="/trail-request" style={activeNavLinkStyle}>REQUEST TRAIL DATE</a>
          <a href="#confirmation" style={navLinkStyle}>CONFIRMATION</a>
          <a href="#results" style={navLinkStyle}>VIEW RESULTS</a>
          <a href="#payment" style={navLinkStyle}>PAYMENT CHECKOUT</a>
          <a href="#about" style={navLinkStyle}>ABOUT US</a>
        </div>
      </nav>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <h1 style={thankYouStyle}>Thank You For Applying Trail session!</h1>
        <div style={dashboardSectionStyle}>
          <h2 style={dashboardTitleStyle}>Dashboard</h2>
          {/* Dashboard content would go here */}
        </div>
      </main>
    </div>
  );
};

export default AutoVanoeInterface;