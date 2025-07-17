// src/pages/Programming/ProgrammingCourses.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Programming = () => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Fetch user progress data
    fetchUserProgress();
  }, []);

  const fetchUserProgress = async () => {
    try {
      // Replace with your actual backend endpoint for user progress
      const response = await fetch('https://3.111.49.131:4000/api/user/progress', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const progressData = await response.json();
        setProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const getProgressInfo = (progressId) => {
    const userProgress = progress[progressId] || { completed: 0, total: 20 };
    const percentage = userProgress.total > 0 ? Math.round((userProgress.completed / userProgress.total) * 100) : 0;
    return {
      percentage,
      text: `${userProgress.completed}/${userProgress.total} Complete`
    };
  };

  const courses = [
    {
      icon: "bi-clipboard-check",
      title: "Weekly Assessments",
      desc: "Regular evaluations to track your learning progress",
      bg: "bg-warning",
      href: "/programming/weekly-assessments",
      progressId: "weekly_assessments"
    },
    {
      icon: "bi-cpu",
      title: "CT Foundation",
      desc: "Develop problem-solving skills using computational methods",
      bg: "bg-primary",
      href: "/programming/ct_foundation_1",
      progressId: "CT_foundation"
    },
    {
      icon: "bi-cpu-fill",
      title: "CT Foundation 1",
      desc: "Advance your computational thinking skills",
      bg: "bg-primary",
      href: "/programming/ct-foundation-1",
      progressId: "CT_foundation_1"
    },
    {
      icon: "bi-layers",
      title: "CT Foundation 2",
      desc: "Master complex computational problem-solving",
      bg: "bg-primary",
      href: "/programming/ct-foundation-2",
      progressId: "CT_foundation_2"
    },
    {
      icon: "bi-arrow-repeat",
      title: "CT Foundation 3",
      desc: "Advanced computational problem-solving techniques",
      bg: "bg-primary",
      href: "/programming/ct-foundation-3",
      progressId: "CT_foundation_3"
    },
    {
      icon: "bi-code-slash",
      title: "Python Basics",
      desc: "Master fundamental Python syntax and concepts",
      bg: "bg-success",
      href: "/programming/python-basics",
      progressId: "python_basics"
    },
    {
      icon: "bi-diagram-3",
      title: "Python Conditionals",
      desc: "Implement decision-making in your code",
      bg: "bg-success",
      href: "/programming/python-conditionals",
      progressId: "python_conditionals"
    },
    {
      icon: "bi-arrow-repeat",
      title: "Python Loops",
      desc: "Automate repetitive tasks efficiently",
      bg: "bg-success",
      href: "/programming/python-loops",
      progressId: "python_loops"
    },
    {
      icon: "bi-box",
      title: "Python Functions",
      desc: "Create reusable code components",
      bg: "bg-success",
      href: "/programming/python-functions",
      progressId: "python_functions"
    },
    {
      icon: "bi-clipboard-check",
      title: "Programming Diagnostic",
      desc: "Assess your programming knowledge and identify areas for improvement",
      bg: "bg-info",
      href: "/programming/programming-diagnostic",
      progressId: "programming_diagnostic",
      isSpecial: true
    }
  ];

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" style={{ marginBottom: '2rem' }}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Programming</h1>
                <p className="mb-0">
                  Welcome to our Programming Learning Hub. Enhance your coding skills with our comprehensive resources
                  and interactive lessons. Join our community and embark on an enriching journey towards mastering
                  programming.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Programming</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Course List */}
      <div className="container">
        {/* Special Diagnostic Section */}
        <div className="mb-4">
          <div className="alert alert-info border-0 shadow-sm">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h5 className="alert-heading mb-2">
                  <i className="bi bi-clipboard-check me-2"></i>
                  Start with a Diagnostic Assessment
                </h5>
                <p className="mb-0">
                  Not sure where to begin? Take our comprehensive diagnostic test to assess your current 
                  programming knowledge and get personalized learning recommendations.
                </p>
              </div>
              <div className="col-md-4 text-end">
                <Link to="/programming/programming-diagnostic" className="btn btn-info">
                  <i className="bi bi-play-circle me-2"></i>
                  Take Diagnostic Test
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="course-list">
          {courses.map(({ icon, title, desc, bg, href, progressId, isSpecial }) => {
            const progressInfo = getProgressInfo(progressId);
            
            return (
              <div key={title} className={`course-item mb-3 ${isSpecial ? 'border-info' : ''}`}>
                <div className={`card course-card h-100 border-0 shadow-sm hover-shadow ${isSpecial ? 'border-2' : ''}`}>
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      <div className="col-lg-1 col-md-2 text-center">
                        <div className={`icon-box ${bg} text-white rounded-circle p-2 d-flex align-items-center justify-content-center`} 
                             style={{ width: 40, height: 40 }}>
                          <i className={`bi ${icon} fs-5`}></i>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-6">
                        <h4 className="mb-1 fs-5">
                          {title}
                          {isSpecial && <span className="badge bg-info ms-2 fs-7">Assessment</span>}
                        </h4>
                        <p className="text-muted mb-2 fs-6">{desc}</p>
                        
                        {!isSpecial && (
                          <>
                            <div className="progress" style={{ height: 6 }}>
                              <div 
                                className={`progress-bar ${bg}`} 
                                role="progressbar" 
                                style={{ width: `${progressInfo.percentage}%` }}
                                aria-valuenow={progressInfo.percentage} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <small className="text-muted fs-7">{progressInfo.text}</small>
                          </>
                        )}
                        
                        {isSpecial && (
                          <small className="text-info fs-7">
                            <i className="bi bi-info-circle me-1"></i>
                            Evaluate your skills and get personalized recommendations
                          </small>
                        )}
                      </div>
                      <div className="col-lg-4 col-md-4 text-end">
                        <Link to={href} className={`btn ${bg} btn-sm`}>
                          <span>{isSpecial ? 'Start Assessment' : 'Continue'}</span>
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-trophy text-warning fs-1 mb-3"></i>
                <h5>Track Progress</h5>
                <p className="text-muted">Monitor your learning journey with detailed progress tracking and achievements.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-code-square text-primary fs-1 mb-3"></i>
                <h5>Interactive Coding</h5>
                <p className="text-muted">Practice with hands-on coding exercises and real-time feedback.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-people text-success fs-1 mb-3"></i>
                <h5>Community Support</h5>
                <p className="text-muted">Connect with fellow learners and get help from our supportive community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-shadow:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease;
        }
        
        .course-card {
          transition: all 0.3s ease;
        }
        
        .icon-box {
          transition: all 0.3s ease;
        }
        
        .course-card:hover .icon-box {
          transform: scale(1.1);
        }
        
        .border-info {
          border-color: #0dcaf0 !important;
        }
      `}</style>
    </main>
  );
};

export default Programming;
