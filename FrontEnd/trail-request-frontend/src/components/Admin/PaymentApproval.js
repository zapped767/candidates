import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './paymentapproval.css';

const PaymentApproval = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/payments/pending');
      setPayments(res.data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/payments/${id}/approve`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/payments/${id}/reject`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      console.error('Rejection failed:', err);
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
      <h2 className="pay-app-title">Approved Payments</h2>

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
              <th className="text-center">Slip</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{payment.candidateName}</td>
                  <td>{payment.email}</td>
                  <td className="text-center">{payment.amount}</td>
                  <td className="text-center">
                    <button
                className="pending-button view"
                onClick={() => handleViewSlip(payment.paymentSlipPath)}
              >
                View Slip
              </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="pay-app-action-btn pay-app-btn-approve"
                
                    >
                      Approved
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

export default PaymentApproval;
