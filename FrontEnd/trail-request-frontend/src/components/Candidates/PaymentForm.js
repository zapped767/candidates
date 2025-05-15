import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './PaymentForm.css';

function PaymentForm() {


    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    date: "",
    time: "",
    location: "",
    amount: "",
    paymentSlip: null,
  });

  const [submitted, setSubmitted] = useState(false); // Track submission

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "paymentSlip") {
      setFormData({ ...formData, paymentSlip: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
  await axios.post('http://localhost:8080/api/payments', formDataToSend, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  alert("Submitted successfully");
  setSubmitted(true); 
  navigate('/Dashboard');// Mark submission
} catch (error) {
  console.error(error);
  alert('Submission failed.');
}};


  return (
    <div className="payment-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-item nav-bold">REQUEST TRAIL DATE</div>
        <div className="nav-item">CONFORMATION</div>
        <div className="nav-item">VIEW RESULTS</div>
        <div className="nav-item nav-active">PAYMENT CHECKOUT</div>
        <div className="nav-item">ABOUT US</div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-section">
          <div className="form-title">Payment Checkout</div>
          
          <div className="form-group">
            <label className="form-label">Candidate Name</label>
            <input 
              type="text" 
              name="candidateName" 
              value={formData.candidateName} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">E – Mail</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time</label>
            <input 
              type="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Location</label>
            <select 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              className="form-input"
            >
              <option value="">--Select--</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <div className="amount-group">
              <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
                className="form-input amount-input"
              />
              <div className="currency">LKR</div>
            </div>
          </div>

          <div className="button-group">
            <button 
              type="button" 
              className="dashboard-btn" 
              onClick={() => alert('Redirect to Dashboard')}
            >
              Dashboard
            </button>
            <button type="button" className="pay-btn" onClick={handleSubmit}>
  Pay
</button>

          </div>
        </div>

        {/* Right Side - Payment Slip */}
        <div className="payment-slip-section">
          <div className="payment-slip-title">PAYMENT SLIP</div>
          <div className="upload-area">
            <input 
              type="file" 
              name="paymentSlip" 
              accept=".pdf" 
              onChange={handleChange} 
              required 
              className="file-input"
            />
            <div className="upload-text">UPLOAD HERE</div>
          </div>
        </div>

        {formData.paymentSlip && (
          <button className="view-btn" 
            onClick={() => window.open(URL.createObjectURL(formData.paymentSlip), '_blank')}>
            View PDF
          </button>
        )}

        
      </form>
    </div>
  );
}

export default PaymentForm;