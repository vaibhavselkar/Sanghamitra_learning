// src/components/AdditionQuiz.js
import React, { useState, useEffect } from 'react';
import NumberTheory from '../pages/Math/Algebra/NumberTheory';

const AdditionQuiz = ({ operationType = 'addition' }) => {
  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    user: { email: null, username: null },
    scores: null,
    selectedAnswer: null,
    loading: true,
    error: null
  });

  // API endpoints
  const QUESTIONS_API = 'http://localhost:4000/api/arithmeticQuestionsDatabase';
  const SCORES_API = 'http://localhost:4000/api/arithmetic-scores';
  const SESSION_API = 'http://localhost:4000/api/session-info';

  // Helper functions for safe checking
  const isQuestionAttempted = (question) => {
    return question && question.attempted === true;
  };

  const isQuestionCorrect = (question) => {
    return question && question.attempted === true && question.isCorrect === true;
  };

  const isQuestionIncorrect = (question) => {
    return question && question.attempted === true && question.isCorrect === false;
  };

  const hasValidResult = (question) => {
    return question && question.attempted === true && (question.isCorrect === true || question.isCorrect === false);
  };

  const getQuestionStatus = (question) => {
    if (!question) return 'unknown';
    if (!question.attempted) return 'unattempted';
    if (question.isCorrect === true) return 'correct';
    if (question.isCorrect === false) return 'incorrect';
    return 'attempted'; // fallback
  };

  // Initialize quiz when component mounts or operationType changes
  useEffect(() => {
    initializeQuiz();
  }, [operationType]);

  // Update selected answer when current question changes
  useEffect(() => {
    if (quizState.questions.length > 0) {
      const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
      if (currentQuestion) {
        if (isQuestionAttempted(currentQuestion)) {
          // Restore selected answer for attempted questions
          setQuizState(prev => ({ ...prev, selectedAnswer: currentQuestion.userAnswer }));
        } else {
          // Clear selection for unattempted questions and update start time
          setQuizState(prev => {
            const updatedQuestions = [...prev.questions];
            updatedQuestions[prev.currentQuestionIndex] = {
              ...updatedQuestions[prev.currentQuestionIndex],
              startTime: Date.now()
            };
            return { 
              ...prev, 
              questions: updatedQuestions,
              selectedAnswer: null 
            };
          });
        }
      }
    }
  }, [quizState.currentQuestionIndex, quizState.questions.length]);

  const initializeQuiz = async () => {
    try {
      setQuizState(prev => ({ ...prev, loading: true, error: null }));
      
      console.log('Starting quiz initialization...');
      
      // Step 1: Get user session
      const userInfo = await fetchUserSession();
      console.log('User info loaded:', userInfo);
      
      // Step 2: Load questions
      const questions = await loadQuestions();
      console.log('Questions loaded:', questions.length);
      
      // Step 3: Load user's previous scores/attempts
      const scores = await loadScores(userInfo.email);
      console.log('Scores loaded:', scores);
      
      // Step 4: Merge attempt data with questions
      const mergedQuestions = mergeAttemptData(questions, scores);
      console.log('Questions merged with attempts');
      
      // Step 5: Update state with all data
      setQuizState(prev => ({
        ...prev,
        user: userInfo,
        questions: mergedQuestions,
        scores: scores,
        loading: false
      }));

      console.log('Quiz initialization complete');

    } catch (error) {
      console.error('Error initializing quiz:', error);
      setQuizState(prev => ({ 
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
    return { email, username };
  };

  const loadQuestions = async () => {
    const params = new URLSearchParams({ 
      operationType,
      fields: 'questionText,options,correctOption,explanation,difficultyLevel,arithmeticCategory,coreSkills,commonErrors,foundationalRequirements,gradeLevel'
    });
    
    const response = await fetch(`${QUESTIONS_API}?${params}`);
    if (!response.ok) throw new Error('Failed to load questions');
    
    const result = await response.json();
    
    // Initialize all questions with safe default values
    return result.questions.map(q => ({
      ...q,
      startTime: Date.now(),
      attempted: false,
      userAnswer: null,
      isCorrect: null,
      timeSpent: null
    }));
  };

  const loadScores = async (userEmail) => {
    try {
      const params = new URLSearchParams({
        userEmail: userEmail,
        operationType: operationType
      });
      
      console.log('Loading scores for:', userEmail, operationType);
      
      const response = await fetch(`${SCORES_API}?${params}`);
      
      if (!response.ok) {
        console.log('No previous scores found');
        return { questionsAttempted: [] };
      }
      
      const scores = await response.json();
      console.log('Raw scores from API:', scores);
      
      // Handle both array and object responses
      let processedScores;
      if (Array.isArray(scores)) {
        // If multiple score records, take the most recent one
        processedScores = scores.length > 0 ? scores[scores.length - 1] : { questionsAttempted: [] };
      } else {
        processedScores = scores;
      }
      
      // Ensure questionsAttempted is always an array
      if (!processedScores.questionsAttempted) {
        processedScores.questionsAttempted = [];
      }
      
      console.log('Processed scores:', processedScores);
      console.log('Questions attempted from DB:', processedScores.questionsAttempted.length);
      
      return processedScores;
      
    } catch (error) {
      console.error('Error loading scores:', error);
      return { questionsAttempted: [] };
    }
  };

  const mergeAttemptData = (questions, scores) => {
    console.log('Merging attempt data...');
    console.log('Questions to merge:', questions.length);
    console.log('Attempted questions from DB:', scores?.questionsAttempted?.length || 0);
    
    if (!scores || !scores.questionsAttempted || scores.questionsAttempted.length === 0) {
      console.log('No previous attempts found, returning original questions');
      return questions;
    }

    const mergedQuestions = questions.map(question => {
      // Find matching attempt in the database
      const attempt = scores.questionsAttempted.find(a => {
        const storedQuestionId = a.questionId?._id || a.questionId;
        const currentQuestionId = question._id;
        
        // Convert both to strings for comparison
        const storedId = storedQuestionId ? storedQuestionId.toString() : null;
        const currentId = currentQuestionId ? currentQuestionId.toString() : null;
        
        const isMatch = storedId === currentId;
        
        if (isMatch) {
          console.log(`Found attempt for question ${currentId}:`, {
            userAnswer: a.userAnswer,
            isCorrect: a.isCorrect,
            timeSpent: a.timeSpent
          });
        }
        
        return isMatch;
      });
      
      if (attempt) {
        // Question was previously attempted - restore all data
        return {
          ...question,
          attempted: true,
          userAnswer: attempt.userAnswer || null,
          isCorrect: typeof attempt.isCorrect === 'boolean' ? attempt.isCorrect : null,
          timeSpent: attempt.timeSpent || null,
          attemptedAt: attempt.attemptedAt || null
        };
      } else {
        // Question not attempted - ensure clean state
        return {
          ...question,
          attempted: false,
          userAnswer: null,
          isCorrect: null,
          timeSpent: null,
          attemptedAt: null
        };
      }
    });

    const attemptedCount = mergedQuestions.filter(q => q.attempted).length;
    console.log(`Merged data: ${attemptedCount} out of ${mergedQuestions.length} questions attempted`);
    
    return mergedQuestions;
  };

  const selectAnswer = (answer) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    if (currentQuestion && !isQuestionAttempted(currentQuestion)) {
      console.log('Selected answer:', answer, 'for question:', quizState.currentQuestionIndex + 1);
      setQuizState(prev => ({ ...prev, selectedAnswer: answer }));
    }
  };

  const handleCheckAnswer = async () => {
    const questionIndex = quizState.currentQuestionIndex;
    const question = quizState.questions[questionIndex];
    
    if (!question || !quizState.selectedAnswer) {
      console.error('No question or answer selected');
      return;
    }

    const timeSpent = Date.now() - (question.startTime || Date.now());
    const isCorrect = quizState.selectedAnswer === question.correctOption;

    console.log('Submitting answer:', {
      questionIndex: questionIndex + 1,
      questionId: question._id,
      userAnswer: quizState.selectedAnswer,
      correctAnswer: question.correctOption,
      isCorrect: isCorrect,
      timeSpent: timeSpent
    });

    try {
      const response = await fetch(SCORES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: quizState.user.email,
          username: quizState.user.username,
          operationType,
          totalQuestions: 1,
          correctAnswers: isCorrect ? 1 : 0,
          questionsAttempted: [{
            questionId: question._id,
            userAnswer: quizState.selectedAnswer,
            isCorrect: isCorrect,
            timeSpent: timeSpent,
            difficultyLevel: question.difficultyLevel,
            coreSkills: question.coreSkills,
            commonErrors: question.commonErrors,
            foundationalRequirements: question.foundationalRequirements,
            arithmeticCategory: question.arithmeticCategory,
            gradeLevel: question.gradeLevel,
            attemptedAt: new Date().toISOString()
          }],
          timeTaken: Math.round(timeSpent/1000)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Answer saved successfully:', result);
      
      // Update local state immediately
      setQuizState(prev => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[questionIndex] = {
          ...question,
          attempted: true,
          userAnswer: prev.selectedAnswer,
          isCorrect: isCorrect,
          timeSpent: timeSpent,
          attemptedAt: new Date().toISOString()
        };
        
        console.log('Updated question state:', updatedQuestions[questionIndex]);
        
        return { 
          ...prev, 
          questions: updatedQuestions
        };
      });
      
    } catch (error) {
      console.error('Error saving answer:', error);
      setQuizState(prev => ({ 
        ...prev, 
        error: `Failed to save answer: ${error.message}` 
      }));
    }
  };

  const navigate = (direction) => {
    const newIndex = quizState.currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < quizState.questions.length) {
      console.log('Navigating to question:', newIndex + 1);
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestionIndex: newIndex
      }));
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < quizState.questions.length) {
      console.log('Jumping to question:', index + 1);
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestionIndex: index
      }));
    }
  };

  // Get operation-specific title and icon
  const getOperationDetails = () => {
    const details = {
      addition: { title: 'Addition Practice Test', icon: '➕' },
      subtraction: { title: 'Subtraction Practice Test', icon: '➖' },
      multiplication: { title: 'Multiplication Practice Test', icon: '✖️' },
      division: { title: 'Division Practice Test', icon: '➗' },
      'dealing-with-negative-sign': { title: 'Negative Signs Practice Test', icon: '±' },
      'ratio-proportion-percentage': { title: 'Ratio, Proportion & Percentage Test', icon: '📊' },
      "number-theory": {title: "Number Theory Practice Test", icon:'📊' }
      
    };
    return details[operationType] || details.addition;
  };

  // Get operation-specific colors
  const getOperationColors = () => {
    const colors = {
      addition: { 
        primary: '#20c997', secondary: '#17a2b8', accent: '#28a745',
        light: '#d1ecf1', lighter: '#e7f7ff', dark: '#0c5460'
      },
      subtraction: { 
        primary: '#e74c3c', secondary: '#c0392b', accent: '#dc3545',
        light: '#f8d7da', lighter: '#ffeaa7', dark: '#721c24'
      },
      multiplication: { 
        primary: '#2980b9', secondary: '#3498db', accent: '#007bff',
        light: '#cce7ff', lighter: '#e6f3ff', dark: '#003d82'
      },
      division: { 
        primary: '#f39c12', secondary: '#e67e22', accent: '#fd7e14',
        light: '#fff3cd', lighter: '#fffacd', dark: '#856404'
      },
      'dealing-with-negative-sign': { 
        primary: '#8e44ad', secondary: '#9b59b6', accent: '#6f42c1',
        light: '#e2d9f3', lighter: '#f3e5f5', dark: '#4a148c'
      },
      'ratio-proportion-percentage': { 
        primary: '#16a085', secondary: '#1abc9c', accent: '#20c997',
        light: '#d5f4e6', lighter: '#e8f8f5', dark: '#0d5345'
      }
    };
    return colors[operationType] || colors.addition;
  };

  // Loading state
  if (quizState.loading) {
    return (
      <section className="practice-section py-5">
        <div className="container">
          <div className="text-center" id="loading">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading practice questions...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (quizState.error) {
    return (
      <section className="practice-section py-5">
        <div className="container">
          <div className="alert alert-danger">
            <strong>Error:</strong> {quizState.error}
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
  if (quizState.questions.length === 0) {
    return (
      <section className="practice-section py-5">
        <div className="container">
          <div className="alert alert-info">
            <strong>No questions available for this topic.</strong>
          </div>
        </div>
      </section>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const operationDetails = getOperationDetails();
  const attemptedCount = quizState.questions.filter(q => isQuestionAttempted(q)).length;
  const progressPercentage = (attemptedCount / quizState.questions.length) * 100;

  // Debug current question state
  if (currentQuestion) {
    console.log('Current question debug:', {
      index: quizState.currentQuestionIndex + 1,
      status: getQuestionStatus(currentQuestion),
      attempted: currentQuestion.attempted,
      userAnswer: currentQuestion.userAnswer,
      selectedAnswer: quizState.selectedAnswer,
      isCorrect: currentQuestion.isCorrect
    });
  }

  return (
    <section className="practice-section py-5">
      <div className="container">
        <div className="card shadow-lg border-0" style={{borderRadius: '20px', overflow: 'hidden'}}>
          <div className="card-body p-0">
            {/* Header with gradient background */}
            <div className="quiz-header text-center py-4" style={{
              background: `linear-gradient(135deg, ${getOperationColors().primary}, ${getOperationColors().secondary})`,
              color: 'white'
            }}>
              <h3 className="mb-2 fw-bold">
                <span className="me-3" style={{fontSize: '2rem'}}>{operationDetails.icon}</span>
                {operationDetails.title}
              </h3>
              <div className="d-flex justify-content-center align-items-center gap-4">
                <span className="badge bg-light text-dark px-3 py-2">
                  <i className="bi bi-list-ol me-2"></i>
                  Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
                </span>
                <span className="badge bg-light text-dark px-3 py-2">
                  <i className="bi bi-check-circle me-2"></i>
                  {attemptedCount} Completed
                </span>
              </div>
            </div>
            
            <div className="row g-0">
              {/* Question Panel */}
              <div className="col-lg-7 border-end">
                <div className="question-panel p-4">
                  {/* Question Card */}
                  <div className="question-card mb-4">
                                          <div className="card border-0 shadow-sm" style={{
                        borderRadius: '15px', 
                        borderLeftWidth: '5px',
                        borderLeftStyle: 'solid',
                        borderLeftColor: getOperationColors().accent
                      }}>
                      <div className="card-header border-0 bg-light" style={{borderRadius: '15px 15px 0 0'}}>
                        <div className="d-flex align-items-center">
                          <div className="question-icon me-3" style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: getOperationColors().primary,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: '1.2rem'
                          }}>
                            <i className="bi bi-question-lg"></i>
                          </div>
                          <h5 className="mb-0 text-dark fw-semibold">Problem to Solve</h5>
                          {hasValidResult(currentQuestion) && (
                            <span className={`badge ms-auto ${isQuestionCorrect(currentQuestion) ? 'bg-success' : 'bg-danger'}`}>
                              {isQuestionCorrect(currentQuestion) ? 'Correct' : 'Incorrect'}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="question-text-container text-center mb-4 p-4" style={{
                          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                          borderRadius: '12px',
                          borderWidth: '2px',
                          borderStyle: 'solid',
                          borderColor: getOperationColors().light
                        }}>
                          <h4 className="question-text mb-0 fw-bold" style={{color: getOperationColors().dark}}>
                            {currentQuestion.questionText}
                          </h4>
                        </div>
                        
                        {/* Options */}
                        <div className="options-container">
                          {Object.entries(currentQuestion.options).map(([key, value]) => {
                            // Determine if this option should be shown as selected
                            const isSelected = isQuestionAttempted(currentQuestion) ? 
                              (key === currentQuestion.userAnswer) : 
                              (key === quizState.selectedAnswer);
                            
                            const isCorrectOption = key === currentQuestion.correctOption;
                            const isUserAnswer = key === currentQuestion.userAnswer;
                            
                            let buttonClass = 'option-btn btn w-100 mb-3 p-3 text-start';
                            let buttonStyle = {
                              borderRadius: '12px',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              borderColor: '#e9ecef',
                              transition: 'all 0.3s ease',
                              background: 'white',
                              position: 'relative'
                            };
                            
                            if (isQuestionAttempted(currentQuestion)) {
                              // Show results for attempted questions
                              if (isCorrectOption) {
                                buttonStyle.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
                                buttonStyle.borderColor = '#28a745';
                                buttonStyle.color = '#155724';
                                buttonStyle.borderWidth = '2px';
                              } else if (isUserAnswer && !isCorrectOption) {
                                buttonStyle.background = 'linear-gradient(135deg, #f8d7da, #f5c6cb)';
                                buttonStyle.borderColor = '#dc3545';
                                buttonStyle.color = '#721c24';
                                buttonStyle.borderWidth = '2px';
                              } else {
                                // Non-selected options in attempted questions
                                buttonStyle.background = '#f8f9fa';
                                buttonStyle.borderColor = '#e9ecef';
                                buttonStyle.color = '#6c757d';
                                buttonStyle.borderWidth = '2px';
                              }
                            } else {
                              // Show selection state for current question
                              if (isSelected) {
                                buttonStyle.background = `linear-gradient(135deg, ${getOperationColors().light}, ${getOperationColors().lighter})`;
                                buttonStyle.borderColor = getOperationColors().primary;
                                buttonStyle.color = getOperationColors().dark;
                                buttonStyle.transform = 'translateY(-2px)';
                                buttonStyle.boxShadow = `0 4px 12px ${getOperationColors().primary}40`;
                                buttonStyle.borderWidth = '2px';
                              } else {
                                // Default state for non-selected options
                                buttonStyle.background = 'white';
                                buttonStyle.borderColor = '#e9ecef';
                                buttonStyle.color = '#495057';
                                buttonStyle.borderWidth = '2px';
                              }
                            }
                            
                            return (
                              <button
                                key={key}
                                className={buttonClass}
                                style={buttonStyle}
                                onClick={() => !isQuestionAttempted(currentQuestion) && selectAnswer(key)}
                                disabled={isQuestionAttempted(currentQuestion)}
                              >
                                <div className="d-flex align-items-center">
                                  <span className="option-letter me-3 fw-bold" style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: isSelected ? getOperationColors().primary : '#f8f9fa',
                                    color: isSelected ? 'white' : '#6c757d',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                  }}>
                                    {key}
                                  </span>
                                  <span className="option-text">{value}</span>
                                  {isQuestionAttempted(currentQuestion) && isCorrectOption && (
                                    <i className="bi bi-check-circle-fill text-success ms-auto fs-5"></i>
                                  )}
                                  {isQuestionAttempted(currentQuestion) && isUserAnswer && !isCorrectOption && (
                                    <i className="bi bi-x-circle-fill text-danger ms-auto fs-5"></i>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Feedback Section */}
                        {hasValidResult(currentQuestion) && (
                          <div className="feedback-section mt-4">
                            <div className={`feedback-card p-3 rounded-3 ${isQuestionCorrect(currentQuestion) ? 'bg-success-subtle' : 'bg-danger-subtle'}`} style={{
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              borderColor: isQuestionCorrect(currentQuestion) ? '#28a745' : '#dc3545'
                            }}>
                              <div className="d-flex align-items-center mb-2">
                                <i className={`bi ${isQuestionCorrect(currentQuestion) ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} me-2 fs-5`}></i>
                                <h6 className="mb-0 fw-bold">
                                  {isQuestionCorrect(currentQuestion) ? '🎉 Excellent Work!' : '💡 Learning Opportunity'}
                                </h6>
                              </div>
                              {isQuestionIncorrect(currentQuestion) && currentQuestion.explanation && (
                                <div className="explanation mt-3 p-3 bg-light rounded-2">
                                  <div className="d-flex align-items-start">
                                    <i className="bi bi-lightbulb-fill text-warning me-2 mt-1"></i>
                                    <div>
                                      <strong>Explanation:</strong> {currentQuestion.explanation}
                                      {currentQuestion.timeSpent && (
                                        <div className="mt-2 small text-muted">
                                          <i className="bi bi-clock me-1"></i>
                                          Time spent: {Math.round(currentQuestion.timeSpent/1000)}s
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Action Button */}
                        <div className="action-section mt-4">
                            <button 
                            className="btn btn-lg w-100 fw-semibold"
                            style={{
                              background: isQuestionAttempted(currentQuestion) ? '#6c757d' : 
                                (!quizState.selectedAnswer ? '#dee2e6' :
                                `linear-gradient(135deg, ${getOperationColors().primary}, ${getOperationColors().secondary})`),
                              borderWidth: '0',
                              borderStyle: 'none',
                              borderRadius: '12px',
                              color: isQuestionAttempted(currentQuestion) || !quizState.selectedAnswer ? '#6c757d' : 'white',
                              padding: '12px'
                            }}
                            onClick={handleCheckAnswer}
                            disabled={!quizState.selectedAnswer || isQuestionAttempted(currentQuestion)}
                          >
                            <i className={`bi ${isQuestionAttempted(currentQuestion) ? 'bi-check-lg' : 'bi-send'} me-2`}></i>
                            {isQuestionAttempted(currentQuestion) ? 'Answer Submitted' : 'Submit Answer'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Panel */}
              <div className="col-lg-5">
                <div className="progress-panel p-4">
                  {/* Progress Header */}
                  <div className="progress-header mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="mb-0 fw-bold text-dark">
                        <i className="bi bi-graph-up me-2" style={{color: getOperationColors().primary}}></i>
                        Your Progress
                      </h5>
                      <span className="badge px-3 py-2" style={{
                        background: getOperationColors().light,
                        color: getOperationColors().dark
                      }}>
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    
                    <div className="progress mb-3" style={{height: '12px', borderRadius: '10px'}}>
                      <div 
                        className="progress-bar"
                        style={{
                          background: `linear-gradient(90deg, ${getOperationColors().primary}, ${getOperationColors().secondary})`,
                          borderRadius: '10px',
                          width: `${progressPercentage}%`,
                          transition: 'width 0.8s ease'
                        }}
                      ></div>
                    </div>
                    
                    <div className="progress-stats text-center">
                      <span className="badge bg-success me-2 px-3 py-2">
                        <i className="bi bi-check-circle me-1"></i>
                        {attemptedCount} Answered
                      </span>
                      <span className="badge bg-secondary px-3 py-2">
                        <i className="bi bi-circle me-1"></i>
                        {quizState.questions.length - attemptedCount} Remaining
                      </span>
                    </div>
                  </div>

                  {/* Question Navigation Grid */}
                  <div className="question-navigation mb-4">
                    <h6 className="fw-semibold mb-3 text-dark">Question Navigation</h6>
                    <div className="row g-2">
                      {quizState.questions.map((question, index) => {
                        const questionStatus = getQuestionStatus(question);
                        
                        let buttonStyle = {
                          width: '45px', height: '45px',
                          borderRadius: '10px',
                          borderWidth: '2px',
                          borderStyle: 'solid',
                          borderColor: '#e9ecef',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '14px',
                          fontWeight: '600',
                          position: 'relative'
                        };
                        
                        if (index === quizState.currentQuestionIndex) {
                          // Current question
                          buttonStyle.background = `linear-gradient(135deg, ${getOperationColors().primary}, ${getOperationColors().secondary})`;
                          buttonStyle.borderColor = getOperationColors().primary;
                          buttonStyle.color = 'white';
                          buttonStyle.transform = 'scale(1.05)';
                        } else if (questionStatus === 'correct') {
                          buttonStyle.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
                          buttonStyle.borderColor = '#28a745';
                          buttonStyle.color = '#155724';
                        } else if (questionStatus === 'incorrect') {
                          buttonStyle.background = 'linear-gradient(135deg, #f8d7da, #f5c6cb)';
                          buttonStyle.borderColor = '#dc3545';
                          buttonStyle.color = '#721c24';
                        }
                        
                        return (
                          <div key={index} className="col-auto">
                            <div
                              style={buttonStyle}
                              onClick={() => goToQuestion(index)}
                              className="question-nav-btn"
                            >
                              <span>{index + 1}</span>
                              {hasValidResult(question) && (
                                <i className={`bi ${isQuestionCorrect(question) ? 'bi-check' : 'bi-x'}`} 
                                   style={{
                                     position: 'absolute', 
                                     top: '2px', 
                                     right: '2px', 
                                     fontSize: '10px',
                                     backgroundColor: 'rgba(255,255,255,0.9)',
                                     borderRadius: '50%',
                                     width: '14px',
                                     height: '14px',
                                     display: 'flex',
                                     alignItems: 'center',
                                     justifyContent: 'center'
                                   }}></i>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="navigation-controls">
                    <div className="row g-2">
                      <div className="col-6">
                        <button 
                          className="btn btn-outline-secondary w-100 fw-semibold"
                          style={{
                            borderRadius: '10px', 
                            padding: '10px',
                            borderWidth: '1px',
                            borderStyle: 'solid'
                          }}
                          onClick={() => navigate(-1)}
                          disabled={quizState.currentQuestionIndex === 0}
                        >
                          <i className="bi bi-chevron-left me-1"></i>Previous
                        </button>
                      </div>
                      <div className="col-6">
                        <button 
                          className="btn btn-outline-secondary w-100 fw-semibold"
                          style={{
                            borderRadius: '10px', 
                            padding: '10px',
                            borderWidth: '1px',
                            borderStyle: 'solid'
                          }}
                          onClick={() => navigate(1)}
                          disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
                        >
                          Next<i className="bi bi-chevron-right ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Panel - Remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4">
            <div className="card">
              <div className="card-header">
                <h6>Debug Info</h6>
              </div>
              <div className="card-body small">
                <strong>Current Question:</strong> {quizState.currentQuestionIndex + 1}<br/>
                <strong>Status:</strong> {getQuestionStatus(currentQuestion)}<br/>
                <strong>Attempted:</strong> {currentQuestion?.attempted?.toString() || 'false'}<br/>
                <strong>User Answer:</strong> {currentQuestion?.userAnswer || 'None'}<br/>
                <strong>Selected Answer:</strong> {quizState.selectedAnswer || 'None'}<br/>
                <strong>Correct Answer:</strong> {currentQuestion?.correctOption}<br/>
                <strong>Is Correct:</strong> {currentQuestion?.isCorrect !== null && currentQuestion?.isCorrect !== undefined ? currentQuestion.isCorrect.toString() : 'N/A'}<br/>
                <strong>Total Attempted:</strong> {attemptedCount} / {quizState.questions.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdditionQuiz;