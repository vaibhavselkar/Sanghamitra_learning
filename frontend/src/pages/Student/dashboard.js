import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    assignments: [],
    announcements: [],
    grades: [],
    upcomingEvents: [],
    classroomInfo: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Mock data for demonstration (remove when backend is ready)
  useEffect(() => {
    const loadMockData = () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const mockData = {
          assignments: [
            {
              title: "Mathematics Assignment 1",
              description: "Solve algebraic equations from Chapter 3",
              subject: "Mathematics",
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
              status: "pending",
              grade: null
            },
            {
              title: "Science Lab Report",
              description: "Chemical reactions experiment report",
              subject: "Science",
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
              status: "pending",
              grade: null
            },
            {
              title: "History Essay",
              description: "Write about World War II impact",
              subject: "History",
              dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
              status: "completed",
              grade: 88
            },
            {
              title: "English Literature Review",
              description: "Analyze Shakespeare's Hamlet",
              subject: "English",
              dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
              status: "completed",
              grade: 92
            }
          ],
          announcements: [
            {
              title: "Class Schedule Update",
              content: "Please note that next Tuesday's math class has been moved to 2:00 PM due to a school assembly.",
              date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
              priority: "high"
            },
            {
              title: "Science Fair Registration",
              content: "Registration for the annual science fair is now open. Submit your project proposals by next Friday.",
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
              priority: "normal"
            },
            {
              title: "Library Hours Extended",
              content: "The school library will now be open until 6:00 PM on weekdays to help students with their studies.",
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
              priority: "normal"
            }
          ],
          grades: [
            {
              assignmentTitle: "History Essay",
              subject: "History",
              submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              score: 88,
              feedback: "Excellent analysis of historical events. Well structured and thoroughly researched."
            },
            {
              assignmentTitle: "English Literature Review",
              subject: "English",
              submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              score: 92,
              feedback: "Outstanding interpretation of the text. Your insights into character development were particularly impressive."
            },
            {
              assignmentTitle: "Math Quiz 2",
              subject: "Mathematics",
              submittedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
              score: 78,
              feedback: "Good work on algebra problems. Review geometry concepts for improvement."
            }
          ],
          upcomingEvents: [
            {
              title: "Science Fair",
              date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
              description: "Annual school science fair - showcase your projects!"
            },
            {
              title: "Parent-Teacher Conference",
              date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks from now
              description: "Meet with teachers to discuss academic progress"
            },
            {
              title: "Math Olympiad",
              date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks from now
              description: "Regional mathematics competition"
            }
          ],
          classroomInfo: {
            name: "Grade 10A",
            subject: "General Studies"
          }
        };
        
        setDashboardData(mockData);
        setIsLoading(false);
      }, 1000); // 1 second delay to show loading state
    };

    if (user) {
      loadMockData();
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

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-info';
    if (grade >= 70) return 'text-warning';
    return 'text-danger';
  };

  const getAssignmentStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'overdue':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
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
            <i className="bi bi-mortarboard me-2"></i>
            Student Dashboard
          </span>
          
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-2"></i>
                {user?.name || 'Student'}
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
                  `You're enrolled in ${dashboardData.classroomInfo.name} - ${dashboardData.classroomInfo.subject}` :
                  'Ready to continue your learning journey?'
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
                <i className="bi bi-clipboard-check fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.assignments?.filter(a => a.status === 'completed').length || 0}</h5>
                <small className="text-muted">Completed Assignments</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-warning">
            <div className="card-body">
              <div className="text-warning">
                <i className="bi bi-clock fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.assignments?.filter(a => a.status === 'pending').length || 0}</h5>
                <small className="text-muted">Pending Assignments</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-info">
            <div className="card-body">
              <div className="text-info">
                <i className="bi bi-trophy fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">
                  {dashboardData.grades?.length > 0 ? 
                    Math.round(dashboardData.grades.reduce((acc, g) => acc + g.score, 0) / dashboardData.grades.length) : 0}%
                </h5>
                <small className="text-muted">Average Grade</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <div className="card text-center border-left-success">
            <div className="card-body">
              <div className="text-success">
                <i className="bi bi-calendar-event fs-2"></i>
              </div>
              <div className="mt-2">
                <h5 className="mb-0">{dashboardData.upcomingEvents?.length || 0}</h5>
                <small className="text-muted">Upcoming Events</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="bi bi-house me-2"></i>Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <i className="bi bi-clipboard me-2"></i>Assignments
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <i className="bi bi-graph-up me-2"></i>Grades
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <i className="bi bi-megaphone me-2"></i>Announcements
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-list-task me-2"></i>Recent Assignments
                  </h5>
                </div>
                <div className="card-body">
                  {dashboardData.assignments?.slice(0, 5).map((assignment, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div>
                        <h6 className="mb-1">{assignment.title}</h6>
                        <small className="text-muted">Due: {new Date(assignment.dueDate).toLocaleDateString()}</small>
                      </div>
                      <span className={getAssignmentStatusBadge(assignment.status)}>
                        {assignment.status}
                      </span>
                    </div>
                  )) || <p className="text-muted">No assignments available</p>}
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-calendar-week me-2"></i>Upcoming Events
                  </h5>
                </div>
                <div className="card-body">
                  {dashboardData.upcomingEvents?.map((event, index) => (
                    <div key={index} className="mb-3">
                      <h6 className="mb-1">{event.title}</h6>
                      <small className="text-muted">
                        <i className="bi bi-calendar me-1"></i>
                        {new Date(event.date).toLocaleDateString()}
                      </small>
                      <p className="small mb-0">{event.description}</p>
                    </div>
                  )) || <p className="text-muted">No upcoming events</p>}
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-megaphone me-2"></i>Latest Announcements
                  </h5>
                </div>
                <div className="card-body">
                  {dashboardData.announcements?.slice(0, 3).map((announcement, index) => (
                    <div key={index} className="mb-3">
                      <h6 className="mb-1">{announcement.title}</h6>
                      <small className="text-muted">
                        {new Date(announcement.date).toLocaleDateString()}
                      </small>
                      <p className="small mb-0">{announcement.content}</p>
                    </div>
                  )) || <p className="text-muted">No announcements</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">All Assignments</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Subject</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Grade</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.assignments?.map((assignment, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{assignment.title}</strong>
                          <br />
                          <small className="text-muted">{assignment.description}</small>
                        </td>
                        <td>{assignment.subject}</td>
                        <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                        <td>
                          <span className={getAssignmentStatusBadge(assignment.status)}>
                            {assignment.status}
                          </span>
                        </td>
                        <td>
                          {assignment.grade ? 
                            <span className={getGradeColor(assignment.grade)}>{assignment.grade}%</span> : 
                            '-'
                          }
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-eye"></i> View
                          </button>
                          {assignment.status === 'pending' && (
                            <button className="btn btn-sm btn-primary">
                              <i className="bi bi-upload"></i> Submit
                            </button>
                          )}
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">No assignments available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Grade Report</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Assignment</th>
                      <th>Subject</th>
                      <th>Date Submitted</th>
                      <th>Score</th>
                      <th>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.grades?.map((grade, index) => (
                      <tr key={index}>
                        <td>{grade.assignmentTitle}</td>
                        <td>{grade.subject}</td>
                        <td>{new Date(grade.submittedDate).toLocaleDateString()}</td>
                        <td>
                          <span className={getGradeColor(grade.score)}>
                            <strong>{grade.score}%</strong>
                          </span>
                        </td>
                        <td>
                          {grade.feedback ? (
                            <button className="btn btn-sm btn-outline-info" title={grade.feedback}>
                              <i className="bi bi-chat-quote"></i> View
                            </button>
                          ) : (
                            <span className="text-muted">No feedback</span>
                          )}
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">No grades available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="row">
            {dashboardData.announcements?.map((announcement, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h6 className="mb-0">{announcement.title}</h6>
                    <small className="text-muted">
                      {new Date(announcement.date).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{announcement.content}</p>
                    {announcement.priority === 'high' && (
                      <span className="badge bg-danger">Important</span>
                    )}
                  </div>
                </div>
              </div>
            )) || (
              <div className="col-12">
                <div className="text-center text-muted py-5">
                  <i className="bi bi-megaphone fs-1"></i>
                  <p className="mt-3">No announcements available</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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

export default StudentDashboard;