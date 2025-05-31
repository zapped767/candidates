import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './PaymentForm.css';

function PaymentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    nic: "",
    date: "",
    time: "",
    location: "Colombo",   // ✅ default selected
    amount: "2500",        // ✅ fixed amount
    paymentSlip: null,
  });

  // On component load
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedNIC = localStorage.getItem('userNIC');

    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeNow = now.toTimeString().split(':').slice(0,2).join(':'); // HH:MM

    setFormData(prevFormData => ({
      ...prevFormData,
      candidateName: storedName || "",
      email: storedEmail || "",
      nic: storedNIC || "",
      date: today,
      time: timeNow,
      location: "Colombo",  // ✅ default option
      amount: "2500",       // ✅ fixed amount
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "paymentSlip") {
      setFormData({ ...formData, paymentSlip: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post('http://localhost:8080/api/payments', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Payment submitted successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Payment submission failed:", error);
      alert("Payment submission failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-section">
          <div className="form-title">Payment Checkout</div>

          <div className="form-group">
            <label className="form-label">NIC</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              readOnly
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Candidate Name</label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              readOnly
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">E – Mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              readOnly
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              readOnly
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Selected Location</label>
            <select
              name="location"
              value={formData.location}
              disabled
              className="form-input"
            >
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
                readOnly
                className="form-input amount-input"
              />
              <div className="currency">LKR</div>
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="dashboard-btn" onClick={handleDashboard}>
              Dashboard
            </button>
            <button type="submit" className="pay-btn">
              Pay
            </button>
          </div>
        </div>

        {/* Right Side - Payment Slip Upload */}
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
          <button
            className="view-btn"
            type="button"
            onClick={() =>
              window.open(URL.createObjectURL(formData.paymentSlip), "_blank")
            }
          >
            View PDF
          </button>
        )}
      </form>
    </div>
  );
}

export default PaymentForm;
