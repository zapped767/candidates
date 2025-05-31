import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeniedRequests = () => {
  const [DeniedRequests, setDeniedRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [pdfPreview, setPdfPreview] = useState({ show: false, url: '', title: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:8080/api/trail-request/denied';

  useEffect(() => {
    fetchDeniedRequests();
  }, []);

  const fetchDeniedRequests = async () => {
    try {
      const res = await axios.get(API_BASE);
      setDeniedRequest(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Denied requests:', err);
      setAlert({
        show: true,
        message: 'Failed to load denied requests',
        type: 'error'
      });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
      setLoading(false);
    }
  };

  const handleViewPdf = (filePath, title) => {
    if (!filePath) return;
    const filename = filePath.split(/[/\\]/).pop();
    const fullUrl = `http://localhost:8080/api/trail-request/files/${filename}`;

    setPdfPreview({
      show: true,
      url: fullUrl,
      title: title,
    });
  };

  const closePdfPreview = () => {
    setPdfPreview({ show: false, url: '', title: '' });
  };

  const filteredRequests = DeniedRequests.filter(req =>
    req.drivingSchoolName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading denied requests...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{
          fontWeight: 'bold',
          fontSize: '24px',
          textAlign: 'center',
          backgroundColor: '#E0E7FF',
          padding: '8px 20px',
          borderRadius: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Denied Requests
        </h2>
        <button
          onClick={() => navigate('/Admin-Dash')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'background-color 0.2s ease'
          }}
        >
          Admin Dashboard
        </button>
      </div>

      {/* ALERT */}
      {alert.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px 24px',
          backgroundColor: alert.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: alert.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${alert.type === 'success' ? '#10b981' : '#ef4444'}`,
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {alert.message}
        </div>
      )}

      {/* SEARCH */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Search by driving school name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              width: '100%',
              maxWidth: '400px'
            }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div style={{
        overflowX: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#f3f4f6',
              textAlign: 'center'
            }}>
              <th style={{ padding: '12px', fontWeight: '600' }}>No</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>Request ID</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>Medical Report</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>L - Permit</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>Denied Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req, index) => (
              <tr key={req.id} style={{
                textAlign: 'center',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white'
              }}>
                <td style={{ padding: '12px' }}>{index + 1}</td>
                <td style={{ padding: '12px' }}>CD{req.id.toString().padStart(4, '0')}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => handleViewPdf(req.medicalFrontPath, 'Medical Report - Front')}
                      style={{
                        color: '#065f46',
                        backgroundColor: '#d1fae5',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      MF
                    </button>
                    <button
                      onClick={() => handleViewPdf(req.medicalBackPath, 'Medical Report - Back')}
                      style={{
                        color: '#065f46',
                        backgroundColor: '#d1fae5',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      MB
                    </button>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleViewPdf(req.lpermitPath, 'L-Permit')}
                    style={{
                      color: '#92400e',
                      backgroundColor: '#fef3c7',
                      border: '1px solid #f59e0b',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    L
                  </button>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}>
                    Denied
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  {req.approvalDate && !isNaN(new Date(req.approvalDate)) ? (
                    new Date(req.approvalDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="6" style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  {DeniedRequests.length === 0
                    ? 'No denied requests found'
                    : 'No matching denied requests found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PDF PREVIEW */}
      {pdfPreview.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827'
              }}>
                {pdfPreview.title}
              </h3>
              <button
                onClick={closePdfPreview}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              flex: 1,
              overflow: 'hidden',
              position: 'relative'
            }}>
              <iframe
                src={pdfPreview.url}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  minHeight: '500px'
                }}
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeniedRequests;
