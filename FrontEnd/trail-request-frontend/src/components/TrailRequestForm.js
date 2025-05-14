import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './TrailRequestForm.css';

const TrailRequestForm = () => {
  const [formData, setFormData] = useState({
    lPermitDate: '',
    drivingSchoolName: '',
    lPermit: null,
    medicalFront: null,
    medicalBack: null,
  });

  const [pdfPreviews, setPdfPreviews] = useState({
    lPermit: null,
    medicalFront: null,
    medicalBack: null,
  });

  const urlRefs = useRef({
    lPermit: null,
    medicalFront: null,
    medicalBack: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      
      if (urlRefs.current[name]) {
        URL.revokeObjectURL(urlRefs.current[name]);
      }

      const newUrl = URL.createObjectURL(file);
      urlRefs.current[name] = newUrl;

      setFormData(prev => ({ ...prev, [name]: file }));
      setPdfPreviews(prev => ({ ...prev, [name]: newUrl }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('lPermitDate', formData.lPermitDate);
    payload.append('drivingSchoolName', formData.drivingSchoolName);
    if (formData.lPermit) payload.append('lPermit', formData.lPermit);
    if (formData.medicalFront) payload.append('medicalFront', formData.medicalFront);
    if (formData.medicalBack) payload.append('medicalBack', formData.medicalBack);

    try {
      await axios.post('http://localhost:8080/api/trail-request', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Trail Request Submitted Successfully!');
      setFormData({
        lPermitDate: '',
        drivingSchoolName: '',
        lPermit: null,
        medicalFront: null,
        medicalBack: null,
      });
      setPdfPreviews({
        lPermit: null,
        medicalFront: null,
        medicalBack: null,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to submit trail request. Please try again.');
    }
  };

  useEffect(() => {
    return () => {
      Object.values(urlRefs.current).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleViewPdf = (url) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <div className="trail-form-container">
      <div className="trail-form-header">
        <h2>Request Trail Date</h2>
        <div className="road-instructions">
          <span className="live-indicator"></span>
          <span>Live road instructions. Going 24 hours.</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="trail-form">
        <div className="form-section">
          <div className="section-title">L Permit Guide</div>
          <div className="form-group">
            <label>Driving School Name</label>
            <input
              type="text"
              name="drivingSchoolName"
              value={formData.drivingSchoolName}
              onChange={handleChange}
              required
              placeholder="Enter driving school name"
            />
          </div>
          
          <div className="form-group">
            <label>L Permit Date</label>
            <input
              type="date"
              name="lPermitDate"
              value={formData.lPermitDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-section">
          <div className="section-title">L Permit (PDF)</div>
          <div className="file-upload-group">
            <label className="file-upload-label">
              <input
                type="file"
                name="lPermit"
                accept="application/pdf"
                onChange={handleChange}
                required
              />
              <span>Upload L Permit PDF</span>
            </label>
            {pdfPreviews.lPermit && (
              <button 
                type="button" 
                className="view-btn"
                onClick={() => handleViewPdf(pdfPreviews.lPermit)}
              >
                View PDF
              </button>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <div className="section-title">Medical (Front and Back PDFs)</div>
          <div className="medical-uploads">
            <div className="file-upload-group">
              <label className="file-upload-label">
                <input
                  type="file"
                  name="medicalFront"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                />
                <span>Medical Front PDF</span>
              </label>
              {pdfPreviews.medicalFront && (
                <button 
                  type="button" 
                  className="view-btn"
                  onClick={() => handleViewPdf(pdfPreviews.medicalFront)}
                >
                  View PDF
                </button>
              )}
            </div>
            
            <div className="file-upload-group">
              <label className="file-upload-label">
                <input
                  type="file"
                  name="medicalBack"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                />
                <span>Medical Back PDF</span>
              </label>
              {pdfPreviews.medicalBack && (
                <button 
                  type="button" 
                  className="view-btn"
                  onClick={() => handleViewPdf(pdfPreviews.medicalBack)}
                >
                  View PDF
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="secondary-btn"
            onClick={() => window.location.href = '/dashboard'}
          >
            Dashboard
          </button>
          <button 
            type="submit" 
            className="primary-btn"
            onClick={() => window.location.href = '/Thank'}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrailRequestForm;