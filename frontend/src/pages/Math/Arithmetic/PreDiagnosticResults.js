// src/pages/Math/Arithmetic/PreDiagnosticResults.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const PreDiagnosticResults = () => {
  const [searchParams] = useSearchParams();
  const [resultsState, setResultsState] = useState({
    loading: true,
    error: null,
    data: null
  });

  // API endpoint
  const RESULTS_API = 'http://3.111.49.131:4000/api/testresponses';

  useEffect(() => {
    const userEmail = searchParams.get('email');
    if (userEmail) {
      loadResults(userEmail);
    } else {
      setResultsState({
        loading: false,
        error: 'No email specified',
        data: null
      });
    }
  }, [searchParams]);

  const loadResults = async (userEmail) => {
    try {
      setResultsState(prev => ({ ...prev, loading: true, error: null }));
      
      console.log('Loading results for:', userEmail);
      
      const response = await fetch(`${RESULTS_API}?email=${encodeURIComponent(userEmail)}`);
      if (!response.ok) throw new Error('Failed to fetch results');
      
      const result = await response.json();
      console.log('Results loaded:', result);
      
      setResultsState({
        loading: false,
        error: null,
        data: result
      });
      
    } catch (error) {
      console.error('Error loading results:', error);
      setResultsState({
        loading: false,
        error: `Failed to load results: ${error.message}`,
        data: null
      });
    }
  };

  const calculateConceptAnalysis = (details) => {
    const conceptScores = {};
    const difficultyWeights = { 'easy': 1, 'medium': 1.5, 'hard': 2 };

    details.forEach(detail => {
      if (detail.userAnswer !== detail.correctAnswer) {
        const concepts = detail.testedConcepts || [];
        const prerequisites = detail.prerequisiteTopics || [];
        
        concepts.forEach(concept => {
          if (!conceptScores[concept]) {
            conceptScores[concept] = {
              count: 0,
              totalDifficulty: 0,
              prerequisiteCount: 0
            };
          }
          
          conceptScores[concept].count++;
          conceptScores[concept].totalDifficulty += difficultyWeights[detail.difficulty] || 1;
          conceptScores[concept].prerequisiteCount += prerequisites.length;
        });
      }
    });

    // Convert to sorted array with priority scoring
    return Object.entries(conceptScores)
      .map(([concept, scores]) => ({
        concept,
        score: (scores.count * 0.5) + 
               (scores.totalDifficulty * 0.3) + 
               (scores.prerequisiteCount * 0.2)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const getAnswerValue = (optionKey, questionOptions) => {
    if (!optionKey || !questionOptions) return 'Unanswered';
    const optionMap = {
      'a': 'optionA',
      'b': 'optionB', 
      'c': 'optionC',
      'd': 'optionD'
    };
    return questionOptions[optionMap[optionKey.toLowerCase()]] || 'Unanswered';
  };

  // Loading state
  if (resultsState.loading) {
    return (
      <main className="main">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{
              width: '3rem',
              height: '3rem',
              borderWidth: '4px'
            }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 fs-5">Loading your test results...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (resultsState.error) {
    return (
      <main className="main">
        <div className="container py-5">
          <div className="alert alert-danger shadow-sm" style={{
            borderRadius: '15px',
            borderWidth: '0',
            padding: '2rem'
          }}>
            <div className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill fs-3 text-danger me-3"></i>
              <div>
                <h4 className="alert-heading mb-2">Error Loading Results</h4>
                <p className="mb-3">{resultsState.error}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                  style={{ borderRadius: '10px' }}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // No data state
  if (!resultsState.data) {
    return (
      <main className="main">
        <div className="container py-5">
          <div className="alert alert-info shadow-sm" style={{
            borderRadius: '15px',
            borderWidth: '0',
            padding: '2rem'
          }}>
            <div className="text-center">
              <i className="bi bi-info-circle-fill fs-3 text-info mb-3"></i>
              <h4>No Results Found</h4>
              <p>No test results were found for this user.</p>
              <Link 
                to="/math/arithmetic/pre-diagnostic-test"
                className="btn btn-primary"
                style={{ borderRadius: '10px' }}
              >
                <i className="bi bi-clipboard-check me-2"></i>
                Take Test
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const result = resultsState.data;
  const scorePercent = (result.correctAnswers / result.totalQuestions * 100).toFixed(1);
  const weakConcepts = calculateConceptAnalysis(result.details);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" style={{ marginBottom: '2rem' }}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Your Test Results</h1>
                <p className="mb-0">Detailed analysis of your diagnostic test performance</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/math">Math</Link></li>
              <li><Link to="/math/arithmetic">Arithmetic</Link></li>
              <li className="current">Pre-Diagnostic Results</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Results Section */}
      <section className="results-section py-5">
        <div className="container">
          {/* Summary Card */}
          <div className="summary-card card shadow-sm mb-4 border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-center">
                <i className="bi bi-graph-up text-primary me-2"></i>
                Test Summary
              </h3>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="stat-item p-4 rounded text-center" style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#dee2e6',
                    transition: 'transform 0.2s ease'
                  }}>
                    <h4 className="stat-value text-primary mb-2" style={{
                      fontSize: '2.2rem',
                      fontWeight: '600'
                    }}>
                      {result.totalQuestions}
                    </h4>
                    <p className="stat-label mb-0 text-muted">Total Questions</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="stat-item p-4 rounded text-center" style={{ 
                    background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#28a745',
                    transition: 'transform 0.2s ease'
                  }}>
                    <h4 className="stat-value text-success mb-2" style={{
                      fontSize: '2.2rem',
                      fontWeight: '600'
                    }}>
                      {result.correctAnswers}
                    </h4>
                    <p className="stat-label mb-0 text-muted">Correct Answers</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="stat-item p-4 rounded text-center" style={{ 
                    background: 'linear-gradient(135deg, #cce7ff, #e6f3ff)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#007bff',
                    transition: 'transform 0.2s ease'
                  }}>
                    <h4 className="stat-value text-info mb-2" style={{
                      fontSize: '2.2rem',
                      fontWeight: '600'
                    }}>
                      {result.timeSpent}s
                    </h4>
                    <p className="stat-label mb-0 text-muted">Total Time Spent</p>
                  </div>
                </div>
              </div>
              
              {/* Score Progress */}
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold fs-5">Overall Score</span>
                  <span className="badge bg-primary px-3 py-2 fs-6">{scorePercent}%</span>
                </div>
                <div className="progress" style={{ height: '12px', borderRadius: '10px' }}>
                  <div 
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${scorePercent}%`,
                      background: 'linear-gradient(90deg, #28a745, #20c997)',
                      borderRadius: '10px',
                      transition: 'width 1.5s ease-in-out'
                    }}
                    aria-valuenow={scorePercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <small className="text-muted">
                    {scorePercent >= 80 ? '🎉 Excellent Performance!' : 
                     scorePercent >= 60 ? '👍 Good Work!' : 
                     scorePercent >= 40 ? '📚 Keep Practicing!' : 
                     '💪 Room for Improvement!'}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Concept Analysis Section */}
          <div className="concept-analysis card shadow-sm mb-4 border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h3 className="card-title mb-4">
                <i className="bi bi-lightbulb text-warning me-2"></i>
                Concept Analysis
              </h3>
              
              {/* Weak Areas */}
              <div className="weak-areas">
                <h5 className="mb-3">
                  <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                  Areas Needing Revision
                </h5>
                <div className="weak-concepts-container mb-3">
                  {weakConcepts.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {weakConcepts.map(({ concept, score }, index) => (
                        <div
                          key={index}
                          className="concept-pill"
                          style={{
                            padding: '0.75em 1.25em',
                            background: '#ffeeba',
                            borderRadius: '25px',
                            fontSize: '0.95rem',
                            margin: '0.25rem',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: '#ffda6a',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#ffda6a';
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#ffeeba';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <span 
                            className="concept-link"
                            style={{
                              textDecoration: 'none',
                              color: '#856404',
                              fontWeight: '500'
                            }}
                            title={`Priority score: ${score.toFixed(1)}`}
                          >
                            {concept}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-success border-0" style={{
                      background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
                      color: '#155724',
                      borderRadius: '12px'
                    }}>
                      <i className="bi bi-check-circle me-2"></i>
                      <strong>Great work!</strong> No significant weak areas detected.
                    </div>
                  )}
                </div>
                <p className="text-muted small mb-0">
                  <i className="bi bi-info-circle me-1"></i>
                  These concepts appeared in questions you answered incorrectly or left unanswered
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="detailed-results">
            <h3 className="mb-4">
              <i className="bi bi-list-check text-primary me-2"></i>
              Question-wise Analysis
            </h3>
            <div className="row g-4">
              {result.details.map((detail, index) => {
                const isCorrect = detail.userAnswer === detail.correctAnswer;
                
                return (
                  <div key={index} className="col-12">
                    <div 
                      className="question-card card shadow-sm border-0" 
                      style={{
                        borderRadius: '15px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        borderLeftWidth: '5px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: isCorrect ? '#28a745' : '#dc3545'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="card-title mb-0">
                            <i className="bi bi-question-circle me-2"></i>
                            Question {index + 1}
                          </h5>
                          <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'} px-3 py-2`}>
                            <i className={`bi ${isCorrect ? 'bi-check-lg' : 'bi-x-lg'} me-1`}></i>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                        
                        <div className="question-content p-3 mb-3 rounded" style={{
                          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: '#dee2e6'
                        }}>
                          <p className="question-text mb-0 fw-semibold" style={{ lineHeight: '1.6' }}>
                            {detail.question}
                          </p>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <div className="answer-section">
                              <p className="mb-2 fw-semibold">
                                <i className="bi bi-person-check me-1"></i>
                                Your Answer:
                              </p>
                              <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'} px-3 py-2 fs-6`}>
                                {getAnswerValue(detail.userAnswer, detail.questionOptions)}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="answer-section">
                              <p className="mb-2 fw-semibold">
                                <i className="bi bi-check-circle me-1"></i>
                                Correct Answer:
                              </p>
                              <span className="badge bg-success px-3 py-2 fs-6">
                                {getAnswerValue(detail.correctAnswer, detail.questionOptions)}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="time-section">
                              <p className="mb-2 fw-semibold">
                                <i className="bi bi-stopwatch me-1"></i>
                                Time Spent:
                              </p>
                              <span className="badge bg-info px-3 py-2 fs-6">
                                <i className="bi bi-clock me-1"></i>
                                {detail.timeSpent}s
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Explanation */}
                        {detail.explanation && (
                          <div className="explanation mt-3 p-3 rounded" style={{
                            background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
                            borderLeftWidth: '4px',
                            borderLeftStyle: 'solid',
                            borderLeftColor: '#2196f3'
                          }}>
                            <h6 className="text-primary mb-2">
                              <i className="bi bi-lightbulb-fill me-2"></i>
                              Explanation:
                            </h6>
                            <p className="mb-0" style={{ lineHeight: '1.6' }}>{detail.explanation}</p>
                          </div>
                        )}
                        
                        {/* Tested Concepts */}
                        {detail.testedConcepts?.length > 0 && (
                          <div className="concepts mt-3">
                            <h6 className="mb-3">
                              <i className="bi bi-tags-fill me-2"></i>
                              Tested Concepts:
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                              {detail.testedConcepts.map((concept, conceptIndex) => (
                                <span
                                  key={conceptIndex}
                                  className="badge"
                                  style={{
                                    background: '#fff3cd',
                                    color: '#856404',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: '#ffeaa7',
                                    padding: '0.5em 0.75em',
                                    fontSize: '0.85rem',
                                    fontWeight: '500'
                                  }}
                                >
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="action-buttons p-4 rounded" style={{
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#dee2e6'
                }}>
                  <h5 className="mb-3">What's Next?</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Link 
                      to="/math/arithmetic/pre-diagnostic-test"
                      className="btn btn-outline-primary btn-lg"
                      style={{ 
                        borderRadius: '12px', 
                        padding: '12px 30px',
                        borderWidth: '2px',
                        fontWeight: '600'
                      }}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Retake Test
                    </Link>
                    <Link 
                      to="/math/arithmetic"
                      className="btn btn-primary btn-lg"
                      style={{ 
                        borderRadius: '12px', 
                        padding: '12px 30px',
                        background: 'linear-gradient(135deg, #007bff, #0056b3)',
                        borderWidth: '0',
                        fontWeight: '600'
                      }}
                    >
                      <i className="bi bi-book me-2"></i>
                      Continue Learning
                    </Link>
                  </div>
                  <p className="text-muted mt-3 mb-0 small">
                    <i className="bi bi-info-circle me-1"></i>
                    Use your results to focus on areas that need improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PreDiagnosticResults;
