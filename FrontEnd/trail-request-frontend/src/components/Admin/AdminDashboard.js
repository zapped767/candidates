import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');
  const [activeSubMenu, setActiveSubMenu] = useState('');

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    navigate('/admin-login');
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
      {/* Top Navigation Bar */}
      <nav className="admin-navbar">
        <div className="navbar-brand">Admin Dashboard</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="dashboard-container">
        {/* Side Navigation Bar */}
        <aside className="sidebar">
          <div className="sidebar-menu">
            {/* Requests Section */}
            <div className={`menu-item ${activeMenu === 'requests' ? 'active' : ''}`}>
              <div className="menu-header" onClick={() => toggleMenu('requests')}>
                Requests
              </div>
              {activeMenu === 'requests' && (
                <div className="sub-menu">
                  <button 
                    className={`sub-menu-item ${activeSubMenu === 'pending' ? 'active' : ''}`}
                    onClick={() => {
                      toggleSubMenu('pending');
                      navigate('/pending-request');
                    }}
                  >
                    Pending Requests
                  </button>
                  <button 
                    className={`sub-menu-item ${activeSubMenu === 'approved' ? 'active' : ''}`}
                    onClick={() => {
                      toggleSubMenu('approved');
                      navigate('/ApprovedRequests');
                    }}
                  >
                    Approved Requests
                  </button>
                  <button 
                    className={`sub-menu-item ${activeSubMenu === 'denied' ? 'active' : ''}`}
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
              className={`menu-item ${activeMenu === 'profiles' ? 'active' : ''}`}
              onClick={() => {
                toggleMenu('profiles');
                navigate('/admin-dashboard/profiles');
              }}
            >
              User Profiles
            </button>

            {/* Payments Section */}
            <div className={`menu-item ${activeMenu === 'payments' ? 'active' : ''}`}>
              <div className="menu-header" onClick={() => toggleMenu('payments')}>
                Payments
              </div>
              {activeMenu === 'payments' && (
                <div className="sub-menu">
                  <button 
                    className={`sub-menu-item ${activeSubMenu === 'pending-payments' ? 'active' : ''}`}
                    onClick={() => {
                      toggleSubMenu('pending-payments');
                      navigate('/pending-payment');
                    }}
                  >
                    Pending Payments
                  </button>
                  <button 
                    className={`sub-menu-item ${activeSubMenu === 'approved-payments' ? 'active' : ''}`}
                    onClick={() => {
                      toggleSubMenu('approved-payments');
                      navigate('/aproval-payment');
                    }}
                  >
                    Approved Payments
                  </button>
                  <button 
                    className={`sub-menu-item ${activeSubMenu === 'denied-payments' ? 'active' : ''}`}
                    onClick={() => {
                      toggleSubMenu('denied-payments');
                      navigate('/reject-payment');
                    }}
                  >
                    Denied Payments
                  </button>
                </div>
              )}
            </div>

            {/* Results */}
            <button 
              className={`menu-item ${activeMenu === 'results' ? 'active' : ''}`}
              onClick={() => {
                toggleMenu('results');
                navigate('/admin-dashboard/results');
              }}
            >
              Results
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-content">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;