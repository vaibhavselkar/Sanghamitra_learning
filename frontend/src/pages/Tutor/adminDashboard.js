import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const TutorDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Fetch classrooms data
  useEffect(() => {
    const fetchClassrooms = async () => {
      if (!user || !user.id) {
        navigate('/login');
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      try {
        const response = await fetch('https://sanghamitra-learning-server.vercel.app/api/classrooms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Filter classrooms to show only those belonging to the current tutor
        const tutorClassrooms = data.filter(classroom => 
          classroom.tutor && classroom.tutor._id === user.id
        );
        
        setClassrooms(tutorClassrooms);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        setError('Failed to load classroom data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Enhanced success message function
  const showSuccessMessage = (message, link) => {
    // Remove any existing message
    const existingMessage = document.getElementById('share-success-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.id = 'share-success-message';
    messageDiv.innerHTML = `
      <div style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: #28a745; 
        color: white; 
        padding: 15px 20px; 
        border-radius: 8px; 
        z-index: 1000;
        max-width: 400px;
        word-break: break-all;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
      ">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <strong>${message}</strong><br>
            <small style="font-size: 0.8em; opacity: 0.9;">${link}</small>
          </div>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                  style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">
            ×
          </button>
        </div>
      </div>
    `;
    
    // Add CSS animation
    if (!document.getElementById('share-animation-style')) {
      const style = document.createElement('style');
      style.id = 'share-animation-style';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  };

  // Fallback modal for when copying fails
  const showLinkModal = (link) => {
    // Remove any existing modal
    const existingModal = document.getElementById('link-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    const modalHTML = `
      <div id="link-modal" style="
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.5); 
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background: white; 
          padding: 30px; 
          border-radius: 10px; 
          max-width: 500px; 
          width: 90%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
          <h4 style="margin-bottom: 20px; color: #333;">Share Classroom Invite</h4>
          <p style="color: #666; margin-bottom: 15px;">Copy this link to invite students:</p>
          <div style="
            background: #f8f9fa; 
            padding: 15px; 
            border-radius: 5px; 
            word-break: break-all; 
            font-family: monospace;
            border: 1px solid #dee2e6;
            margin-bottom: 20px;
          ">${link}</div>
          <div style="text-align: right;">
            <button onclick="document.getElementById('link-modal').remove()" 
                    style="
                      background: #28a745; 
                      color: white; 
                      border: none; 
                      padding: 10px 20px; 
                      border-radius: 5px; 
                      cursor: pointer;
                      font-size: 14px;
                    ">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close modal when clicking outside
    document.getElementById('link-modal').addEventListener('click', (e) => {
      if (e.target.id === 'link-modal') {
        e.target.remove();
      }
    });
  };

  // Fixed share invite function with multiple fallbacks
  const handleShareInvite = async (joinCode) => {
    const inviteLink = `${window.location.origin}/register?code=${joinCode}`;
    
    try {
      // Check if Web Share API is supported and if we're on HTTPS
      if (navigator.share && window.location.protocol === 'https:') {
        // Use Web Share API if available (mobile devices and secure contexts)
        await navigator.share({
          title: 'Join My Classroom',
          text: `Join my classroom using this link:`,
          url: inviteLink,
        });
        return;
      }
      
      // Fallback: Modern clipboard API (requires HTTPS)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inviteLink);
        showSuccessMessage(`Invite link copied!`, inviteLink);
        return;
      }
      
      // Fallback for older browsers or non-HTTPS
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        showSuccessMessage(`Invite link copied!`, inviteLink);
      } else {
        // Final fallback - show the link in a modal
        showLinkModal(inviteLink);
      }
      
    } catch (error) {
      console.error('Error sharing invite:', error);
      // Show the link in a modal as final fallback
      showLinkModal(inviteLink);
    }
  };

  const handleViewStudents = async (classroomId) => {
    setLoadingStudents(true);
    setError('');
    
    try {
      const response = await fetch(`https://sanghamitra-learning-server.vercel.app/api/classroom/${classroomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const classroomData = await response.json();
      setSelectedClassroom(classroomData);
      setStudentList(classroomData.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load student data. Please try again.');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleCloseStudentView = () => {
    setSelectedClassroom(null);
    setStudentList([]);
  };

  // Debug function to check browser capabilities
  const checkBrowserSupport = () => {
    console.log('Browser Support Check:');
    console.log('Web Share API:', !!navigator.share);
    console.log('Clipboard API:', !!navigator.clipboard);
    console.log('Secure Context:', !!window.isSecureContext);
    console.log('Protocol:', window.location.protocol);
    console.log('User Agent:', navigator.userAgent);
  };

  // Call this on component mount for debugging
  useEffect(() => {
    checkBrowserSupport();
  }, []);

  if (isLoading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="bi bi-person-workspace me-2"></i>
            Tutor Dashboard
          </span>
          
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-2"></i>
                {user?.name || 'Tutor'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Dashboard Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Total Classrooms</h5>
                  <h3 className="mb-0">{classrooms.length}</h3>
                </div>
                <i className="bi bi-house-door fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Total Students</h5>
                  <h3 className="mb-0">{classrooms.reduce((total, classroom) => total + classroom.students.length, 0)}</h3>
                </div>
                <i className="bi bi-people fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Active Classes</h5>
                  <h3 className="mb-0">{classrooms.filter(c => c.students.length > 0).length}</h3>
                </div>
                <i className="bi bi-calendar-check fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Subjects</h5>
                  <h3 className="mb-0">{[...new Set(classrooms.flatMap(c => c.subjects || []))].length}</h3>
                </div>
                <i className="bi bi-book fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classrooms Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-house-door me-2"></i>Classroom Details
              </h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={checkBrowserSupport}>
                <i className="bi bi-info-circle me-1"></i>Debug Browser Support
              </button>
            </div>
            <div className="card-body">
              {classrooms.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-house-door fs-1 text-muted"></i>
                  <h6 className="mt-3 text-muted">No Classrooms Found</h6>
                  <p className="text-muted">No classrooms available.</p>
                </div>
              ) : (
                <div className="row">
                  {classrooms.map((classroom) => (
                    <div key={classroom._id} className="col-lg-6 col-md-12 mb-4">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-success text-white">
                          <h5 className="mb-0 d-flex align-items-center">
                            <i className="bi bi-house-door me-2"></i>
                            {classroom.name}
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-6">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-people text-primary me-2"></i>
                                <span>Students: <strong>{classroom.students.length}</strong></span>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-key text-warning me-2"></i>
                                <span>Code: <strong>{classroom.joinCode}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">SUBJECTS</label>
                            <div>
                              {classroom.subjects && classroom.subjects.length > 0 ? (
                                classroom.subjects.map((subject, index) => (
                                  <span key={index} className="badge bg-info me-1 mb-1 text-capitalize">
                                    {subject}
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted">No subjects assigned</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="d-grid gap-2">
                            <button 
                              className="btn btn-primary"
                              onClick={() => handleShareInvite(classroom.joinCode)}
                            >
                              <i className="bi bi-share me-2"></i>Share Invite Link
                            </button>
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => handleViewStudents(classroom._id)}
                              disabled={loadingStudents}
                            >
                              <i className="bi bi-people me-2"></i>
                              {loadingStudents ? 'Loading...' : 'View Students'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Student List Modal/View */}
      {selectedClassroom && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-people me-2"></i>Students in {selectedClassroom.name}
                </h5>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleCloseStudentView}
                >
                  <i className="bi bi-x"></i> Close
                </button>
              </div>
              <div className="card-body">
                {loadingStudents ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading students...</span>
                    </div>
                    <p className="mt-2">Loading students...</p>
                  </div>
                ) : studentList.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-person-plus fs-1 text-muted"></i>
                    <h6 className="mt-3 text-muted">No Students Enrolled</h6>
                    <p className="text-muted">Share the join code <strong>{selectedClassroom.joinCode}</strong> to invite students.</p>
                    <button 
                      className="btn btn-primary mt-2"
                      onClick={() => handleShareInvite(selectedClassroom.joinCode)}
                    >
                      <i className="bi bi-share me-2"></i>Share Invite Link
                    </button>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Last Active</th>
                          <th>Joined Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentList.map((student, index) => (
                          <tr key={student._id || index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-person"></i>
                                </div>
                                <div>
                                  <strong>{student.name}</strong>
                                  <br />
                                  <small className="text-muted">{student.email}</small>
                                </div>
                              </div>
                            </td>
                            <td>{student.email}</td>
                            <td>
                              <span className={`badge ${student.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                {student.status || 'Active'}
                              </span>
                            </td>
                            <td>
                              {student.lastActive && student.lastActive !== 'Recently' && student.lastActive !== 'Never' ? 
                                new Date(student.lastActive).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: 'short', 
                                  day: 'numeric'
                                }) : student.lastActive || 'Recently'}
                            </td>
                            <td>
                              {student.date ? new Date(student.date).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'short', 
                                day: 'numeric'
                              }) : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;
