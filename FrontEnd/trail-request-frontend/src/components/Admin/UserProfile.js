import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import useNavigate
import './UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate(); // <-- initialize navigate

  // Fetch users from Spring Boot backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobileNumber?.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleAdminDashboardClick = () => {
    navigate('/Admin-Dash');
  };

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
  <div className="user-profile-container">
    <div className="header-with-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 className="page-title">User Profiles</h1>
      <button 
        className="admin-dashboard-btn" 
        onClick={handleAdminDashboardClick}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Admin Dashboard
      </button>
    </div>
    
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <span className="user-count">{filteredUsers.length} users found</span>
    </div>

    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>NIC</th>
            <th>Full Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td> {/* NO */}
                <td>{user.nic || 'N/A'}</td> {/* NIC */}
                <td>{user.name}</td> {/* Full Name */}
                <td>{user.email}</td> {/* Email */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">
                No users found matching your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default UserProfile;
