import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const TutorDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    classroomInfo: null,
    totalStudents: 0,
    students: [],
    joinCode: '',
    subjects: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load tutor data (same pattern as your student dashboard)
  useEffect(() => {
    const loadTutorData = () => {
      setIsLoading(true);
      
      // Simulate API delay (same as student dashboard)
      setTimeout(() => {
        if (user) {
          // Use classroom data from user object (from login response)
          const tutorClassroomData = {
            classroomInfo: {
              name: user.classroomName || 'My Classroom',
              joinCode: user.classroomCode || 'N/A',
              subjects: user.classroom?.subjects || ['General']
            },
            totalStudents: user.classroom?.students?.length || 0,
            students: user.classroom?.students || [],
            joinCode: user.classroomCode || 'N/A',
            subjects: user.classroom?.subjects || ['General']
          };
          
          setDashboardData(tutorClassroomData);
        }
        
        setIsLoading(false);
      }, 1000); // 1 second delay to show loading state
    };

    if (user) {
      loadTutorData();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopySuccess('Failed to copy');
    }
  };

  // Get share URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/join/${dashboardData.joinCode}`;
  };

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
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

      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-gradient bg-primary text-white">
            <div className="card-body">
              <h4 className="card-title">Welcome back, {user?.name}! 👋</h4>
              <p className="card-text mb-0">
                {dashboardData.classroomInfo ? 
                  `You're teaching "${dashboardData.classroomInfo.name}" with ${dashboardData.totalStudents} students` :
                  'Ready to manage your classroom?'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-primary">
            <div className="card-body">
              <div className="text-primary">
                <i className="bi bi-people fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.totalStudents}</h5>
                <small className="text-muted">Total Students</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-success">
            <div className="card-body">
              <div className="text-success">
                <i className="bi bi-house-door fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.classroomInfo?.name ? '1' : '0'}</h5>
                <small className="text-muted">Active Classroom</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-info">
            <div className="card-body">
              <div className="text-info">
                <i className="bi bi-key fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.joinCode}</h5>
                <small className="text-muted">Join Code</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-warning">
            <div className="card-body">
              <div className="text-warning">
                <i className="bi bi-book fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.subjects?.length || 0}</h5>
                <small className="text-muted">Subjects</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Information */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-house-door me-2"></i>Classroom Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Classroom Name:</label>
                    <h6>{dashboardData.classroomInfo?.name || 'Not Set'}</h6>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Tutor Name:</label>
                    <h6>{user?.name}</h6>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Email:</label>
                    <h6>{user?.email}</h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Join Code:</label>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-primary fs-6 me-2">{dashboardData.joinCode}</span>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => copyToClipboard(dashboardData.joinCode)}
                      >
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Total Students:</label>
                    <h6>{dashboardData.totalStudents}</h6>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Subjects:</label>
                    <div>
                      {dashboardData.subjects?.map((subject, index) => (
                        <span key={index} className="badge bg-secondary me-1">{subject}</span>
                      )) || <span className="text-muted">No subjects</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-share me-2"></i>Share Classroom
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Share Link:</label>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={getShareUrl()} 
                    readOnly 
                  />
                  <button 
                    className="btn btn-outline-primary" 
                    type="button"
                    onClick={() => copyToClipboard(getShareUrl())}
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>
              </div>
              
              <div className="alert alert-info">
                <small>
                  <strong>How to invite students:</strong><br/>
                  • Share the join code: <strong>{dashboardData.joinCode}</strong><br/>
                  • Or send them the link above<br/>
                  • Students can use this when registering
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>Students ({dashboardData.totalStudents})
              </h5>
            </div>
            <div className="card-body">
              {dashboardData.students?.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.students.map((student, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                                   style={{width: '32px', height: '32px', fontSize: '14px'}}>
                                {student.name?.charAt(0).toUpperCase() || '?'}
                              </div>
                              {student.name || 'Unknown'}
                            </div>
                          </td>
                          <td>{student.email || 'No email'}</td>
                          <td>{student.date ? new Date(student.date).toLocaleDateString() : 'Unknown'}</td>
                          <td>
                            <span className="badge bg-success">Active</span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              <i className="bi bi-eye"></i> View
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="bi bi-person-x"></i> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  <i className="bi bi-people fs-1"></i>
                  <p className="mt-3">No students have joined yet</p>
                  <p>Share your join code <strong>{dashboardData.joinCode}</strong> to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {copySuccess && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show" role="alert">
            <div className="toast-header">
              <i className="bi bi-check-circle text-success me-2"></i>
              <strong className="me-auto">Success</strong>
            </div>
            <div className="toast-body">
              {copySuccess}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;