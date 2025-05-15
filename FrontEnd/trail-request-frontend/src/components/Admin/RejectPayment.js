import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './paymentapproval.css';

const RejectPayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/payments/${id}/reject`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error rejecting payment:', err);
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
      <h2 className="pay-app-title">Reject Pending Payments</h2>

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
              <th>Reject</th>
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
                    >
                      View Slip
                    </button>
                  </td>
                  <td>
                    <button
                      className="pay-app-button reject"
                    >
                      Reject
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
