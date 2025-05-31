import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './AdminDashboard.css';

import Image1 from '../../assets/AD1.jpg';
import Image2 from '../../assets/AD2.jpg';
import Image3 from '../../assets/AD3.jpg';
import Image4 from '../../assets/AD4.jpg';
import Image5 from '../../assets/AD5.jpg';
import Image6 from '../../assets/AD6.jpg';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');
  const [activeSubMenu, setActiveSubMenu] = useState('');

const [parallaxImages] = useState([
    {
      id: 1,
      src: Image1,
      alt: "Driving School Facility",
      title: "Our Facility",
      description: "State-of-the-art training center with modern classrooms and simulation equipment."
    },
    {
      id: 2,
      src: Image2,
      alt: "Driving Instructor",
      title: "Expert Instructors",
      description: "Certified professionals with years of experience in driver education."
    },
    {
      id: 3,
      src: Image3,
      alt: "Student Driving",
      title: "Hands-on Training",
      description: "Practical driving sessions in real-world conditions with personalized feedback."
    },
    {
      id: 4,
      src: Image4,
      alt: "Classroom Session",
      title: "Theory Lessons",
      description: "Comprehensive classroom instruction covering traffic rules and safety."
    },
    {
      id: 5,
      src: Image5,
      alt: "Driving Test",
      title: "Test Preparation",
      description: "We prepare students thoroughly for their official driving examinations."
    },
    {
      id: 6,
      src: Image6,
      alt: "Graduation",
      title: "Success Stories",
      description: "Celebrating our students' achievements and successful licensure."
    }
  ]);
  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    navigate('/Adminlogin');
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? '' : menu);
    if (menu !== activeMenu) {
      setActiveSubMenu('');
    }
  };

  const toggleSubMenu = (subMenu) => {
    setActiveSubMenu(activeSubMenu === subMenu ? '' : subMenu);
  };
  
  return (
    <div className="admin-dashboard">
      {/* Side Navigation Bar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Admin Dashboard</h2>
        </div>
        
        <nav className="sidebar-nav">
          {/* Requests Section */}
          <div className="nav-section">
            <div 
              className={`nav-item ${activeMenu === 'requests' ? 'active' : ''}`}
              onClick={() => toggleMenu('requests')}
            >
              <span>Requests</span>
              <span className="arrow">{activeMenu === 'requests' ? '▼' : '▶'}</span>
            </div>
            {activeMenu === 'requests' && (
              <div className="sub-nav">
                <button 
                  className={`sub-nav-item ${activeSubMenu === 'pending' ? 'active' : ''}`}
                  onClick={() => {
                    toggleSubMenu('pending');
                    navigate('/pending-request');
                  }}
                >
                  Pending Requests
                </button>
                <button 
                  className={`sub-nav-item ${activeSubMenu === 'approved' ? 'active' : ''}`}
                  onClick={() => {
                    toggleSubMenu('approved');
                    navigate('/ApprovedRequests');
                  }}
                >
                  Approved Requests
                </button>
                <button 
                  className={`sub-nav-item ${activeSubMenu === 'denied' ? 'active' : ''}`}
                  onClick={() => {
                    toggleSubMenu('denied');
                    navigate('/denied-request');
                  }}
                >
                  Denied Requests
                </button>
              </div>
            )}
          </div>

          {/* User Profiles */}
          <button 
            className={`nav-item ${activeMenu === 'profiles' ? 'active' : ''}`}
            onClick={() => {
              toggleMenu('profiles');
              navigate('/User-Profile');
            }}
          >
            User Profiles
          </button>

       
          <div className="nav-section">
            <div 
              className={`nav-item ${activeMenu === 'payments' ? 'active' : ''}`}
              onClick={() => toggleMenu('payments')}
            >
              <span>Payments</span>
              <span className="arrow">{activeMenu === 'payments' ? '▼' : '▶'}</span>
            </div>
            {activeMenu === 'payments' && (
              <div className="sub-nav">
                <button 
                  className={`sub-nav-item ${activeSubMenu === 'pending-payments' ? 'active' : ''}`}
                  onClick={() => {
                    toggleSubMenu('pending-payments');
                    navigate('/pending-payment');
                  }}
                >
                  Pending Payments
                </button>
                <button 
                  className={`sub-nav-item ${activeSubMenu === 'approved-payments' ? 'active' : ''}`}
                  onClick={() => {
                    toggleSubMenu('approved-payments');
                    navigate('/aproval-payment');
                  }}
                >
                  Approved Payments
                </button>
                <button 
                  className={`sub-nav-item ${activeSubMenu === 'denied-payments' ? 'active' : ''}`}
                  onClick={() => {
                    toggleSubMenu('denied-payments');
                    navigate('/reject-payment');
                  }}
                >
                  Denied Payments
                </button>
                {/* Results */}
                <button 
                  className={`nav-item ${activeMenu === 'results' ? 'active' : ''}`}
                  onClick={() => {
                    toggleMenu('results');
                    navigate('/res');
                  }}
                >
                  Results
                </button>
              </div>
            )}
          </div>

          
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <header className="top-navbar">
          <div className="nav-left"></div>
          <div className="nav-center">
            <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h2>
          </div>
          <div className="nav-right">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="parallax-gallery-section">
            <div className="gallery-header">
              <h2 className="gallery-title">ADMIN-DASHBOARD</h2>
              <p className="gallery-subtitle"></p>
            </div>
            <div className="parallax-gallery">
              {parallaxImages.map((image) => (
                <div key={image.id} className="parallax-item">
                  <div 
                    className="parallax-image" 
                    style={{ backgroundImage: `url(${image.src})` }}
                    aria-label={image.alt}
                  />
                  <div className="parallax-content">
                    <div className="content-wrapper">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        
      </div>
    </div>
  );
};

export default AdminDashboard;