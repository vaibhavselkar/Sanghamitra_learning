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
        const response = await fetch('https://sanghamitra-learning.vercel.app/api/classrooms', {
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
  }, [user]); // Add user as dependency

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleShareInvite = (joinCode) => {
    const inviteLink = `${window.location.origin}/register?code=${joinCode}`;
    
    if (navigator.share) {
      // Use Web Share API if available (mobile devices)
      navigator.share({
        title: 'Join My Classroom',
        text: `Join my classroom using this link:`,
        url: inviteLink,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(inviteLink).then(() => {
        // Show success message with the link
        showSuccessMessage(`Invite link copied!`, inviteLink);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = inviteLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccessMessage(`Invite link copied!`, inviteLink);
    });
    
    // Custom success message function
    function showSuccessMessage(message, link) {
        // Example with a simple div overlay
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <div style="
                position: fixed; 
                top: 400px; 
                right: 800px; 
                background: #28a745; 
                color: white; 
                padding: 15px; 
                border-radius: 5px; 
                z-index: 1000;
                max-width: 400px;
                word-break: break-all;
            ">
                <strong>${message}</strong><br>
                <small>${link}</small>
            </div>
        `;
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
    }
  };

  const handleViewStudents = async (classroomId) => {
    setLoadingStudents(true);
    setError('');
    
    try {
      const response = await fetch(`https://sanghamitra-learning.vercel.app/api/classroom/${classroomId}`, {
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

      {/* Classrooms Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-house-door me-2"></i>Classroom Details
              </h5>
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
                      <div className="card h-100">
                        <div className="card-header bg-success text-white">
                          <h5 className="mb-0">
                            {classroom.name}
                          </h5>
                        </div>
                        <div className="card-body">
                          <p>Students: {classroom.students.length}</p>
                          <p>Join Code: <strong>{classroom.joinCode}</strong></p>
                          <p>Subjects: 
                            {classroom.subjects && classroom.subjects.length > 0 ? (
                              <span className="ms-2">
                                {classroom.subjects.map((subject, index) => (
                                  <span key={index} className="badge bg-info me-1 text-capitalize">
                                    {subject}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <span className="text-muted ms-2">No subjects assigned</span>
                            )}
                          </p>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => handleShareInvite(classroom.joinCode)}
                            >
                              <i className="bi bi-share me-2"></i>Share Invite Link
                            </button>
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleViewStudents(classroom._id)}
                              disabled={loadingStudents}
                            >
                              <i className="bi bi-people me-2"></i>View Students
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
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
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
                                <div className="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                                  <i className="bi bi-person"></i>
                                </div>
                                <strong>{student.name}</strong>
                              </div>
                            </td>
                            <td>{student.email}</td>
                            <td>
                              <span className={`badge ${student.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                {student.status || 'Active'}
                              </span>
                            </td>
                            <td>{student.lastActive && student.lastActive !== 'Recently' && student.lastActive !== 'Never' ? 
                              new Date(student.lastActive).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'numeric', 
                                day: 'numeric'
                              }) : student.lastActive || 'Recently'}</td>
                            <td>{student.date ? new Date(student.date).toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'numeric', 
                              day: 'numeric'
                            }) : 'N/A'}</td>
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
