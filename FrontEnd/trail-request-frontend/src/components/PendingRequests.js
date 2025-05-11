// src/PaymentForm.js

import React, { useState } from "react";
import axios from "axios";
import './PaymentForm.css';

function PaymentForm() {
  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    date: "",
    time: "",
    location: "",
    amount: "",
    paymentSlip: null,
  });

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

    const data = new FormData();
    data.append("candidateName", formData.candidateName);
    data.append("email", formData.email);
    data.append("date", formData.date);
    data.append("time", formData.time);
    data.append("location", formData.location);
    data.append("amount", formData.amount);
    data.append("paymentSlip", formData.paymentSlip);

    try {
      await axios.post("http://localhost:8080/api/payments/submit", data);
      alert("Payment submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Candidate Name</label>
        <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} required />

        <label>E-Mail</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Time</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />

        <label>Select Location</label>
        <select name="location" value={formData.location} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kandy">Kandy</option>
          <option value="Galle">Galle</option>
        </select>

        <label>Amount (LKR)</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

        <label>Payment Slip (PDF)</label>
        <input type="file" name="paymentSlip" accept=".pdf" onChange={handleChange} required />

        <div className="payment-form-button-group">
          <button type="submit" className="pay-btn">Pay</button>
          <button type="button" className="dashboard-btn" onClick={() => alert('Redirect to Dashboard')}>
            Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
