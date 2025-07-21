// src/components/PreDiagnosticTest.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add useNavigate import


const PreDiagnosticTest = () => {

  const navigate = useNavigate(); // Add navigation hook

  const [testState, setTestState] = useState({
    questions: [],
    currentQuestion: 0,
    user: { email: null, username: null },
    userResponses: {},
    timeSpent: {},
    startTime: null,
    loading: true,
    error: null
  });

  // API endpoints
  const QUESTIONS_API = 'http://3.111.49.131:4000/api/pre-test-questions';
  const SUBMIT_API = 'http://3.111.49.131:4000/api/save-test-response';
  const SESSION_API = 'http://3.111.49.131:4000/api/session-info';

  // Initialize test when component mounts
  useEffect(() => {
    initializeTest();
  }, []);

  // Track time when question changes
  useEffect(() => {
    trackTime(testState.currentQuestion);
    setTestState(prev => ({ ...prev, startTime: Date.now() }));
  }, [testState.currentQuestion]);

  const initializeTest = async () => {
    try {
      setTestState(prev => ({ ...prev, loading: true, error: null }));
      
      console.log('Initializing Pre-Diagnostic Test...');
      
      // Step 1: Get user session
      const userInfo = await fetchUserSession();
      console.log('User info loaded:', userInfo);
      
      // Step 2: Load questions
      const questions = await loadQuestions();
      console.log('Questions loaded:', questions.length);
      
      // Step 3: Update state with all data
      setTestState(prev => ({
        ...prev,
        user: userInfo,
        questions: questions,
        loading: false,
        startTime: Date.now()
      }));

      console.log('Test initialization complete');

    } catch (error) {
      console.error('Error initializing test:', error);
      setTestState(prev => ({ 
        ...prev, 
        error: error.message,
        loading: false 
      }));
    }
  };

  const fetchUserSession = async () => {
    const response = await fetch(SESSION_API, { credentials: 'include' });
    if (!response.ok) throw new Error('Authentication required');
    const { email, username } = await response.json();
    
    if (!email) throw new Error('User not authenticated');
    
    return { email, username };
  };

  const loadQuestions = async () => {
    const response = await fetch(QUESTIONS_API);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid questions format');
    
    return data;
  };

  const trackTime = (qidx) => {
    if (testState.startTime && qidx !== null && testState.questions.length > 0) {
      const endTime = Date.now();
      const duration = Math.round((endTime - testState.startTime) / 1000);
      
      setTestState(prev => ({
        ...prev,
        timeSpent: {
          ...prev.timeSpent,
          [qidx]: (prev.timeSpent[qidx] || 0) + duration
        }
      }));
    }
  };

  const selectOption = (optionKey) => {
    // Convert "optionA" to "a", etc.
    const cleanValue = optionKey.replace('option', '').toLowerCase();
    
    setTestState(prev => ({
      ...prev,
      userResponses: {
        ...prev.userResponses,
        [prev.currentQuestion]: cleanValue
      }
    }));
  };

  const navigateToQuestion = (qidx) => {
    if (qidx >= 0 && qidx < testState.questions.length) {
      trackTime(testState.currentQuestion);
      setTestState(prev => ({ ...prev, currentQuestion: qidx }));
    }
  };

  const navigatePrevious = () => {
    const newIndex = Math.max(0, testState.currentQuestion - 1);
    navigateToQuestion(newIndex);
  };

  const navigateNext = () => {
    const newIndex = Math.min(testState.questions.length - 1, testState.currentQuestion + 1);
    navigateToQuestion(newIndex);
  };

  const submitTest = async () => {
    try {
      trackTime(testState.currentQuestion);
      
      console.log('Submitting test...');
      
      const submissionData = {
        userEmail: testState.user.email,
        userName: testState.user.username,
        responses: testState.questions.map((question, idx) => ({
          questionData: {
            _id: question._id,
            questionText: question.questionText,
            questionOptions: question.questionOptions,
            questionCorrectAnswer: question.questionCorrectAnswer,
            explanationText: question.explanationText,
            questionDifficulty: question.questionDifficulty,
            questionTopicArea: question.questionTopicArea,
            questionTopic: question.questionTopic,
            testedConcepts: question.testedConcepts,
            questionMisconceptions: question.questionMisconceptions,
            averageTime: question.averageTime,
            prerequisiteTopics: question.prerequisiteTopics,
            gradeLevel: question.gradeLevel
          },
          userAnswer: testState.userResponses[idx] || 'unanswered',
          timeSpent: testState.timeSpent[idx] || 0
        }))
      };

      console.log('Submission data:', submissionData);

      const response = await fetch(SUBMIT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      console.log('Test submitted successfully');
      
      // Redirect to results page
      navigate(`/math/arithmetic/pre-diagnostic-results?email=${encodeURIComponent(testState.user.email)}`);
      
    } catch (error) {
      console.error('Submission error:', error);
      setTestState(prev => ({ 
        ...prev, 
        error: `Submission failed: ${error.message}` 
      }));
    }
  };

  // Loading state
  if (testState.loading) {
    return (
      <section className="quiz py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading diagnostic test...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (testState.error) {
    return (
      <section className="quiz py-5">
        <div className="container">
          <div className="alert alert-danger">
            <strong>Error:</strong> {testState.error}
            <button 
              className="btn btn-primary ms-3" 
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No questions state
  if (testState.questions.length === 0) {
    return (
      <section className="quiz py-5">
        <div className="container">
          <div className="alert alert-info">
            <strong>No questions available for the diagnostic test.</strong>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = testState.questions[testState.currentQuestion];
  const progress = ((testState.currentQuestion + 1) / testState.questions.length) * 100;
  const selectedOption = testState.userResponses[testState.currentQuestion];
  const answeredCount = Object.keys(testState.userResponses).length;

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{marginBottom: '2rem'}}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Pre-Diagnostic Test</h1>
                <p className="mb-0">
                  Welcome to our arithmetic Learning Hub. Enhance your arithmetic skills with our comprehensive resources and interactive lessons. 
                  Join our community and embark on an enriching journey towards mastering arithmetic.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="../index.html">Home</a></li>
              <li><a href="../math.html">Math</a></li>
              <li><a href="arithmetic.html">Arithmetic</a></li>
              <li className="current">Pre-Diagnostic Test</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Quiz Section */}
      <section id="quiz" className="quiz py-5">
        <div className="container">
          <div className="row g-5">
            {/* Main Question Area */}
            <div className="col-lg-8">
              <div className="question-card card shadow-sm border-0" style={{borderRadius: '15px'}}>
                <div className="card-body p-4">
                  {/* Progress Bar */}
                  <div className="progress mb-4" style={{height: '8px', borderRadius: '10px'}}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{
                        width: `${progress}%`,
                        borderRadius: '10px',
                        transition: 'width 0.3s ease'
                      }}
                      aria-valuenow={progress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  
                  {/* Question Header */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="question-text mb-0">
                      Question <span className="text-primary">{testState.currentQuestion + 1}</span>/{testState.questions.length}
                    </h3>
                    <div className="badge bg-light text-dark px-3 py-2">
                      <i className="bi bi-check-circle me-2"></i>
                      {answeredCount} Answered
                    </div>
                  </div>
                  
                  {/* Question Body */}
                  <div className="question-body">
                    <div className="question-content p-4 mb-4" style={{
                      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                      borderRadius: '12px',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#dee2e6'
                    }}>
                      <p className="fs-5 mb-0 fw-semibold text-center" style={{color: '#495057'}}>
                        {currentQ.questionText}
                      </p>
                    </div>
                    
                    {/* Options */}
                    <div className="options-list">
                      <div className="list-group">
                        {Object.entries(currentQ.questionOptions).map(([key, value]) => {
                          const cleanValue = key.replace('option', '').toLowerCase();
                          const isSelected = selectedOption === cleanValue;
                          
                          return (
                            <div 
                              key={key}
                              className={`list-group-item ${isSelected ? 'selected' : ''}`}
                              onClick={() => selectOption(key)}
                              style={{
                                marginBottom: '10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                borderColor: isSelected ? '#0d6efd' : '#dee2e6',
                                background: isSelected ? '#0d6efd' : '#fff',
                                color: isSelected ? 'white' : '#495057',
                                padding: '15px 20px'
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <span className="option-letter me-3 fw-bold" style={{
                                  width: '30px', height: '30px', borderRadius: '50%',
                                  background: isSelected ? 'rgba(255,255,255,0.2)' : '#f8f9fa',
                                  color: isSelected ? 'white' : '#6c757d',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '14px'
                                }}>
                                  {key.replace('option', '').toUpperCase()}
                                </span>
                                <span className="option-text">{value}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Quiz Controls */}
                  <div className="quiz-controls d-flex justify-content-between mt-4">
                    <button 
                      className="btn btn-outline-primary d-flex align-items-center"
                      onClick={navigatePrevious}
                      disabled={testState.currentQuestion === 0}
                      style={{borderRadius: '10px', padding: '10px 20px'}}
                    >
                      <i className="bi bi-chevron-left me-2"></i> Previous
                    </button>
                    
                    {testState.currentQuestion === testState.questions.length - 1 ? (
                      <button 
                        className="btn btn-success d-flex align-items-center"
                        onClick={submitTest}
                        style={{borderRadius: '10px', padding: '10px 20px'}}
                      >
                        <i className="bi bi-check-lg me-2"></i> Submit Test
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary d-flex align-items-center"
                        onClick={navigateNext}
                        disabled={testState.currentQuestion === testState.questions.length - 1}
                        style={{borderRadius: '10px', padding: '10px 20px'}}
                      >
                        Next <i className="bi bi-chevron-right ms-2"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Sidebar */}
            <div className="col-lg-4">
              <div className="questions-sidebar card shadow-sm border-0" style={{
                borderRadius: '15px',
                position: 'sticky',
                top: '100px'
              }}>
                <div className="card-body p-3">
                  <h5 className="mb-3 fw-bold text-center">
                    <i className="bi bi-grid-3x3-gap me-2 text-primary"></i>
                    Questions Overview
                  </h5>
                  
                  {/* Progress Summary */}
                  <div className="progress-summary mb-4 p-3 bg-light rounded">
                    <div className="row text-center">
                      <div className="col-6">
                        <div className="fw-bold text-primary fs-4">{answeredCount}</div>
                        <small className="text-muted">Answered</small>
                      </div>
                      <div className="col-6">
                        <div className="fw-bold text-secondary fs-4">{testState.questions.length - answeredCount}</div>
                        <small className="text-muted">Remaining</small>
                      </div>
                    </div>
                  </div>
                  
                  {/* Questions Grid */}
                  <div className="questions-grid row row-cols-5 g-2">
                    {testState.questions.map((_, index) => {
                      const isActive = index === testState.currentQuestion;
                      const isAnswered = testState.userResponses[index] !== undefined;
                      
                      let buttonStyle = {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: '600'
                      };
                      
                      if (isActive) {
                        buttonStyle.background = '#0d6efd';
                        buttonStyle.color = 'white';
                        buttonStyle.borderColor = '#0d6efd';
                      } else if (isAnswered) {
                        buttonStyle.background = '#0d6efd';
                        buttonStyle.color = 'white';
                        buttonStyle.borderColor = '#0d6efd';
                      } else {
                        buttonStyle.background = '#f8f9fa';
                        buttonStyle.borderColor = '#dee2e6';
                        buttonStyle.color = '#495057';
                      }
                      
                      return (
                        <div key={index} className="col">
                          <div
                            style={buttonStyle}
                            onClick={() => navigateToQuestion(index)}
                            className="q-number"
                          >
                            {index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legend */}
                  <div className="legend mt-4 pt-3" style={{borderTop: '1px solid #dee2e6'}}>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '4px',
                          background: '#0d6efd', marginRight: '8px'
                        }}></div>
                        <small className="text-muted">Answered</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '4px',
                          background: '#f8f9fa', border: '2px solid #dee2e6', marginRight: '8px'
                        }}></div>
                        <small className="text-muted">Not Answered</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreDiagnosticTest;
