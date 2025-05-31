import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './paymentapproval.css';

const RejectPayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payments/pending');
      setPayments(response.data);
    } catch (err) {
      console.error('Error fetching pending payments:', err);
    }
  };

  
  const handleViewSlip = (filename) => {
    window.open(`http://localhost:8080/api/payments/files/${filename}`, '_blank');
  };

  const filteredPayments = payments.filter(p =>
    p.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pay-app-body">
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px'
        }}
      >
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => navigate('/Admin-Dash')}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#115293')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#1976d2')}
        >
          Admin Dashboard
        </button>
      </div>

      <h2 className="pay-app-title">Reject Payments</h2>

      <input
        type="text"
        placeholder="Search by candidate name..."
        className="pay-app-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="pay-app-container">
        <table className="pay-app-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Slip</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  <td>{payment.candidateName}</td>
                  <td>{payment.email}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <button
                      className="pay-app-link"
                      onClick={() => handleViewSlip(payment.paymentSlipPath)}
                       style={{
                        color: '#065f46',
                        backgroundColor: '#d1fae5',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                          backgroundColor: '#a7f3d0'
                        }
                      }}
                    >
                      View Slip
                    </button>
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="pay-app-empty">
                  No pending payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectPayment;
