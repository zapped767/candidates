import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [pdfPreview, setPdfPreview] = useState({ show: false, url: '', title: '' });
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:8080/api/trail-request';

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pending requests:', err);
      setAlert({ show: true, message: 'Failed to load requests', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${API_BASE}/approve/${id}`);
      setAlert({ show: true, message: 'Request approved successfully', type: 'success' });
      setRequests(prev => prev.filter(req => req.id !== id));
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error approving request:', err);
      setAlert({ show: true, message: 'Failed to approve request', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.post(`${API_BASE}/deny/${id}`);
      setAlert({ show: true, message: 'Request denied successfully', type: 'success' });
      setRequests(prev => prev.filter(req => req.id !== id));
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error denying request:', err);
      setAlert({ show: true, message: 'Failed to deny request', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
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

  const filteredRequests = requests.filter(req =>
    req.drivingSchoolName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!req.status || req.status === 'pending')
  );

  if (loading) {
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading pending requests...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Alert Notification */}
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

      {/* Header */}
      <h2 style={{ 
        fontWeight: 'bold',
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <span style={{ 
          backgroundColor: '#E0E7FF',
          padding: '8px 20px',
          borderRadius: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Pending Requests
        </span>
      </h2>

      {/* Search Bar */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Search by driving school..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            width: '300px'
          }}
        />
      </div>

      {/* Requests Table */}
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
              <th style={{ padding: '12px', fontWeight: '600' }}>Driving School</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>Medical Report</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>L - Permit</th>
              <th style={{ padding: '12px', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req, index) => (
              <tr 
                key={req.id} 
                style={{ 
                  textAlign: 'center',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
                  ':hover': {
                    backgroundColor: '#f3f4f6'
                  }
                }}
              >
                <td style={{ padding: '12px' }}>{index + 1}</td>
                <td style={{ padding: '12px' }}>CD{req.id.toString().padStart(4, '0')}</td>
                <td style={{ padding: '12px' }}>{req.drivingSchoolName}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleViewPdf(req.medicalFrontPath, 'Medical Front')}
                      style={{
                        color: '#065f46',
                        backgroundColor: '#d1fae5',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                          backgroundColor: '#a7f3d0'
                        }
                      }}
                    >
                      MF
                    </button>
                    <button
                      onClick={() => handleViewPdf(req.medicalBackPath, 'Medical Back')}
                      style={{
                        color: '#065f46',
                        backgroundColor: '#d1fae5',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                          backgroundColor: '#a7f3d0'
                        }
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
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      ':hover': {
                        backgroundColor: '#fde68a'
                      }
                    }}
                  >
                    L
                  </button>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleApprove(req.id)}
                      style={{
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                          backgroundColor: '#a7f3d0'
                        }
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(req.id)}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        border: '1px solid #ef4444',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        ':hover': {
                          backgroundColor: '#fecaca'
                        }
                      }}
                    >
                      Deny
                    </button>
                  </div>
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
                  {requests.length === 0 
                    ? 'No pending requests found' 
                    : 'No matching requests found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PDF Preview Modal */}
      {pdfPreview.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0 }}>{pdfPreview.title}</h3>
              <button
                onClick={closePdfPreview}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <object
                data={pdfPreview.url}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ minHeight: '70vh' }}
              >
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  <p>Unable to display PDF. You can download it instead:</p>
                  <a
                    href={pdfPreview.url}
                    download
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      background: '#3b82f6',
                      color: 'white',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      marginTop: '10px'
                    }}
                  >
                    Download PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;