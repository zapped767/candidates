import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Candidatelist.css';
import axios from 'axios';

const AllCandidates = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/trail-request/signup-with-approvals');
    console.log('API response:', response.data); // ✅ Debug log

    if (Array.isArray(response.data)) {
      setUsers(response.data);
      setFilteredUsers(response.data);
    } else {
      console.error('Expected an array but got:', typeof response.data);
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching users:', error);
    setLoading(false);
  }
};


    fetchUsers();
  }, []);

  useEffect(() => {
  if (Array.isArray(users)) {
    const filtered = users.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nic?.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }
}, [searchTerm, users]);


  const ExamAppHome = () => {
    navigate('/Exam-Home');
  };

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="candidate-list-container">
      <div className="header-with-button" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">Candidate List</h1>
        <button 
          className="admin-dashboard-btn" 
          onClick={ExamAppHome}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Examinar Home
        </button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name....."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="user-count">{filteredUsers.length} candidates found</span>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>NIC</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>L Permit</th>
              <th>Medical Front</th>
              <th>Medical Back</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nic || 'N/A'}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.lPermitPath ? (
                      <a
                        href={`http://localhost:8080/api/trail-request/files/${user.lPermitPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td>
                    {user.medicalFrontPath ? (
                      <a
                        href={`http://localhost:8080/api/trail-request/files/${user.medicalFrontPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td>
                    {user.medicalBackPath ? (
                      <a
                        href={`http://localhost:8080/api/trail-request/files/${user.medicalBackPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No candidates found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCandidates;
