import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pendingPayment.css';

const PendingPayments = () => {
  const [payments, setPayments] = useState([]);

  // Fetch pending payments on load
  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payments/pending');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/payments/${id}/approve`);
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Error approving payment:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/payments/${id}/reject`);
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Error rejecting payment:', error);
    }
  };

  const handleViewSlip = (filename) => {
    window.open(`http://localhost:8080/api/payments/files/${filename}`, '_blank');
  };

  return (
   <div className="pending-container">
  <h1 className="pending-title">Pending Payments</h1>
  <table className="pending-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Candidate Name</th>
        <th>Email</th>
        <th>Payment Slip</th>
        <th>Amount</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {payments.length > 0 ? (
        payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.candidateName}</td>
            <td>{payment.email}</td>
            <td>
              <button
                className="pending-button view"
                onClick={() => handleViewSlip(payment.paymentSlipPath)}
              >
                View Slip
              </button>
            </td>
            <td>{payment.amount}</td>
            <td>
              <button
                className="pending-button approve"
                onClick={() => handleApprove(payment.id)}
              >
                Approve
              </button>{' '}
              <button
                className="pending-button reject"
                onClick={() => handleReject(payment.id)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">No pending payments found.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  );
};

export default PendingPayments;
