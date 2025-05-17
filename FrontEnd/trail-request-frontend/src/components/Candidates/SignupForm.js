import React, { useState } from 'react';
import './SignupForm.css'
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        nic: formData.nic,
        email: formData.email,
        password: formData.password
      })
    });

    if (response.ok) {
      const result = await response.text();
      alert(result);
      

      localStorage.setItem('userNIC', formData.nic);
      navigate('/Login');


    } else {
      alert("Signup failed. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="sig-container">
      <div className="sig-header">
        <div className="sig-logo">
          <img src="https://i.imgur.com/2B2gElk.png" alt="Logo" />
          <p>AUTOVANCE</p>
        </div>
      </div>
      <div className="sig-form-container">
        <h2 className="sig-title">SIGN-UP</h2>
        <form className="sig-form" onSubmit={handleSubmit}>
          <input type="text" name="name" className="sig-input" placeholder="Name" onChange={handleChange} required />
          <input type="text" name="nic" className="sig-input" placeholder="NIC" onChange={handleChange} required />
          <input type="email" name="email" className="sig-input" placeholder="E-MAIL" onChange={handleChange} required />
          <input type="password" name="password" className="sig-input" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" className="sig-input" placeholder="Confirm Password" onChange={handleChange} required />
          <div className="sig-button-group">
            <button type="button" className="sig-button" onClick={handleLoginRedirect}>LOGIN</button>
            <button type="submit" className="sig-button">SIGN-UP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;