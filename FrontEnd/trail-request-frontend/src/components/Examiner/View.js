import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './View.css'; // Make sure this path is correct
import { div } from '@tensorflow/tfjs';

const TrailPreview = () => {
  const [trailData, setTrailData] = useState([]);
  const nic = localStorage.getItem('userNIC');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/trail-request/nic/${nic}`);
        setTrailData(res.data);
      } catch (error) {
        console.error('Error fetching trail request:', error);
      }
    };

    if (nic) {
      fetchData();
    }
  }, [nic]);

  return (
    <div className='preview-body'>
    <div className="preview-container">
      <h2 className="preview-title">Preview Trail Submission</h2>
      <p className="preview-nic"><strong>NIC:</strong> {nic}</p>

      {trailData.length > 0 ? (
        trailData.map((item, index) => (
          <div key={index} className="preview-block">
            <p className="preview-field"><strong>Driving School:</strong> {item.drivingSchoolName}</p>
            <p className="preview-field"><strong>L Permit Date:</strong> {item.lPermitDate}</p>

            <div className="pdf-links">
              <a
                href={`http://localhost:8080/api/trail-request/files/${item.lPermitPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                📄 View L Permit PDF
              </a><br />
              <a
                href={`http://localhost:8080/api/trail-request/files/${item.medicalFrontPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                📄 View Medical Front PDF
              </a><br />
              <a
                href={`http://localhost:8080/api/trail-request/files/${item.medicalBackPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                📄 View Medical Back PDF
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="preview-empty">No submissions found.</p>
      )}
    </div>
    </div>
  );
};

export default TrailPreview;
