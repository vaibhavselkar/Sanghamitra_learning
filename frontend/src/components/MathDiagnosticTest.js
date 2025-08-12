// src/components/MathDiagnosticTest.js
// Complete fixed version that matches your backend schema

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MathDiagnosticTest = ({ 
  diagnosticType,
  testPhase, 
  topicArea,
  displayName,
  description,
  topics,
  difficulties = ['easy', 'medium', 'hard'],
  questionsPerTopic = 3,
  breadcrumbs = [],
  redirectPath = null
}) => {
  const navigate = useNavigate();

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

  // API endpoints - Updated to match your backend
  const QUESTIONS_API = `${process.env.REACT_APP_API_URL}/api/mathematicsDiagnosticQuestionsDatabase`;
  const SUBMIT_API = `${process.env.REACT_APP_API_URL}/api/mathematicsDiagnosticScores`;
  const SESSION_API = `${process.env.REACT_APP_API_URL}/api/session-info`;

  // Initialize test when component mounts
  useEffect(() => {
    // Validate required props
    if (!diagnosticType || !testPhase || !topicArea || !topics || topics.length === 0) {
      setTestState(prev => ({ 
        ...prev, 
        error: 'Missing required test configuration. Please check the component props.',
        loading: false 
      }));
      return;
    }

    initializeTest();
  }, [diagnosticType, testPhase, topicArea]);

  // Track time when question changes
  useEffect(() => {
    trackTime(testState.currentQuestion);
    setTestState(prev => ({ ...prev, startTime: Date.now() }));
  }, [testState.currentQuestion]);

  const initializeTest = async () => {
    try {
      setTestState(prev => ({ ...prev, loading: true, error: null }));
      
      console.log(`Initializing ${displayName}...`);
      console.log('Props received:', { diagnosticType, testPhase, topicArea, displayName });
      
      // Step 1: Get user session
      const userInfo = await fetchUserSession();
      console.log('User info loaded:', userInfo);
      
      // Step 2: Load and select questions
      const selectedQuestions = await loadAndSelectQuestions();
      console.log(`Selected ${selectedQuestions.length} questions`);
      
      // Step 3: Update state with all data
      setTestState(prev => ({
        ...prev,
        user: userInfo,
        questions: selectedQuestions,
        loading: false,
        startTime: Date.now()
      }));

      console.log(`${displayName} initialization complete`);

    } catch (error) {
      console.error(`Error initializing ${displayName}:`, error);
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

  const loadAndSelectQuestions = async () => {
    try {
      // Fetch all questions for the topic area
      const url = `${QUESTIONS_API}?topicArea=${topicArea}&limit=200`;
      console.log('Fetching questions from:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const allQuestions = await response.json();
      console.log(`Total ${topicArea} questions fetched:`, allQuestions.length);
      
      if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
        throw new Error(`No ${topicArea} questions found in database`);
      }

      // Group questions by topic and difficulty
      const questionsByTopic = {};
      
      allQuestions.forEach(question => {
        const topic = question.questionTopic;
        const difficulty = question.questionDifficulty;
        
        if (!questionsByTopic[topic]) {
          questionsByTopic[topic] = {
            easy: [],
            medium: [],
            hard: []
          };
        }
        
        if (questionsByTopic[topic][difficulty]) {
          questionsByTopic[topic][difficulty].push(question);
        }
      });

      console.log(`Available topics in database:`, Object.keys(questionsByTopic));
      console.log(`Required topics for test:`, topics);

      // Select questions for the test
      const selectedQuestions = [];
      const selectionLog = {};

      for (const topic of topics) {
        selectionLog[topic] = {};
        
        if (!questionsByTopic[topic]) {
          console.warn(`No questions found for topic: ${topic}`);
          continue;
        }

        let questionsFromTopic = 0;

        // Try to get questions from each difficulty level
        for (const difficulty of difficulties) {
          if (questionsFromTopic >= questionsPerTopic) break;
          
          const availableQuestions = questionsByTopic[topic][difficulty] || [];
          
          if (availableQuestions.length > 0) {
            // Randomly select one question from this topic/difficulty combination
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const selectedQuestion = availableQuestions[randomIndex];
            
            selectedQuestions.push({
              ...selectedQuestion,
              testTopic: topic,
              testDifficulty: difficulty
            });

            questionsFromTopic++;

            selectionLog[topic][difficulty] = {
              available: availableQuestions.length,
              selected: 1
            };
          } else {
            selectionLog[topic][difficulty] = {
              available: 0,
              selected: 0
            };
          }
        }

        // If we don't have enough questions from this topic, fill from any available difficulty
        while (questionsFromTopic < questionsPerTopic) {
          const allTopicQuestions = [
            ...(questionsByTopic[topic].easy || []),
            ...(questionsByTopic[topic].medium || []),
            ...(questionsByTopic[topic].hard || [])
          ].filter(q => !selectedQuestions.some(sq => sq._id === q._id));

          if (allTopicQuestions.length === 0) {
            console.warn(`Only found ${questionsFromTopic} questions for topic: ${topic}`);
            break;
          }

          const randomIndex = Math.floor(Math.random() * allTopicQuestions.length);
          const selectedQuestion = allTopicQuestions[randomIndex];
          
          selectedQuestions.push({
            ...selectedQuestion,
            testTopic: topic,
            testDifficulty: selectedQuestion.questionDifficulty
          });

          questionsFromTopic++;
        }
      }

      console.log('Question selection log:', selectionLog);
      console.log(`Selected ${selectedQuestions.length} questions`);

      if (selectedQuestions.length === 0) {
        throw new Error(`No questions could be selected for the ${topicArea} test`);
      }

      // Shuffle the selected questions for random order
      const shuffledQuestions = shuffleArray([...selectedQuestions]);
      
      return shuffledQuestions;

    } catch (error) {
      console.error('Error in loadAndSelectQuestions:', error);
      throw error;
    }
  };

  // Utility function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

  // FIXED SUBMIT FUNCTION - Matches your backend schema
  // Updated submitTest function with better error debugging
// Replace the submitTest function in your MathDiagnosticTest.js with this:

  // Complete submitTest function that calculates ALL required fields
// Replace your existing submitTest function in MathDiagnosticTest.js with this:

const submitTest = async () => {
  try {
    trackTime(testState.currentQuestion);
    
    console.log(`Submitting ${displayName}...`);
    
    // Convert diagnosticType to the format expected by backend
    const getTestType = (diagnosticType) => {
      const typeMap = {
        'preArithmetic': 'arithmeticPre',
        'postArithmetic': 'arithmeticPost',
        'preAlgebra': 'algebraPre', 
        'postAlgebra': 'algebraPost',
        'preGeometry': 'geometryPre',
        'postGeometry': 'geometryPost',
        'preStatistics': 'statisticsPre',
        'postStatistics': 'statisticsPost',
        'preProbability': 'probabilityPre',
        'postProbability': 'probabilityPost',
        'preCalculus': 'calculusPre',
        'postCalculus': 'calculusPost'
      };
      return typeMap[diagnosticType] || diagnosticType;
    };

    // Extract topicArea from testType for schema compatibility
    const getTopicAreaFromTestType = (testType) => {
      if (testType.includes('arithmetic')) return 'arithmetic';
      if (testType.includes('algebra') && !testType.includes('pre-algebra')) return 'algebra';
      if (testType.includes('pre-algebra')) return 'pre-algebra';
      if (testType.includes('geometry')) return 'geometry';
      if (testType.includes('trigonometry')) return 'trigonometry';
      if (testType.includes('calculus')) return 'calculus';
      if (testType.includes('statistics')) return 'statistics';
      if (testType.includes('probability')) return 'probability';
      return 'arithmetic'; // default
    };

    // Extract test phase from testType
    const getTestPhaseFromTestType = (testType) => {
      return testType.endsWith('Pre') ? 'pre' : 'post';
    };

    // Validate required data before submission
    if (!testState.user.email || !testState.user.username) {
      throw new Error('User information missing. Please refresh and try again.');
    }

    if (!testState.questions || testState.questions.length === 0) {
      throw new Error('No questions available. Please refresh and try again.');
    }

    // Clean and validate all responses
    const responses = testState.questions.map((question, idx) => {
      const rawUserAnswer = testState.userResponses[idx];
      const cleanedUserAnswer = ['a', 'b', 'c', 'd'].includes(rawUserAnswer) ? rawUserAnswer : 'unanswered';
      const timeSpent = Math.max(0, Number(testState.timeSpent[idx]) || 0);
      const isCorrect = cleanedUserAnswer === question.questionCorrectAnswer;

      return {
        questionData: {
          _id: question._id,
          questionText: String(question.questionText || ''),
          questionOptions: {
            optionA: String(question.questionOptions?.optionA || ''),
            optionB: String(question.questionOptions?.optionB || ''),
            optionC: String(question.questionOptions?.optionC || ''),
            optionD: String(question.questionOptions?.optionD || '')
          },
          questionCorrectAnswer: ['a', 'b', 'c', 'd'].includes(question.questionCorrectAnswer) 
            ? question.questionCorrectAnswer 
            : 'a',
          explanationText: String(question.explanationText || ''),
          questionDifficulty: ['easy', 'medium', 'hard'].includes(question.questionDifficulty) 
            ? question.questionDifficulty 
            : 'easy',
          questionTopicArea: getTopicAreaFromTestType(getTestType(diagnosticType)),
          questionTopic: String(question.questionTopic || ''),
          testedConcepts: Array.isArray(question.testedConcepts) 
            ? question.testedConcepts.map(String) 
            : ['basic-concepts'],
          questionMisconceptions: Array.isArray(question.questionMisconceptions) 
            ? question.questionMisconceptions.map(String) 
            : [],
          averageTime: Number(question.averageTime) || 30,
          prerequisiteTopics: Array.isArray(question.prerequisiteTopics) 
            ? question.prerequisiteTopics.map(String) 
            : [],
          gradeLevel: Number(question.gradeLevel) || 1
        },
        userAnswer: cleanedUserAnswer,
        timeSpent: timeSpent,
        isCorrect: isCorrect
      };
    });

    // Calculate all required summary fields
    const totalQuestions = responses.length;
    const totalCorrect = responses.filter(r => r.isCorrect).length;
    const totalScore = Math.round((totalCorrect / totalQuestions) * 100);
    const totalTimeSpent = responses.reduce((sum, r) => sum + r.timeSpent, 0);
    const averageTimePerQuestion = Math.round(totalTimeSpent / totalQuestions);
    const testDuration = Math.round(totalTimeSpent / 60); // convert to minutes
    
    const convertedTestType = getTestType(diagnosticType);
    const extractedTopicArea = getTopicAreaFromTestType(convertedTestType);
    const extractedTestPhase = getTestPhaseFromTestType(convertedTestType);

    // Calculate performance by difficulty
    const calculateDifficultyPerformance = (difficulty) => {
      const questionsOfDifficulty = responses.filter(r => r.questionData.questionDifficulty === difficulty);
      const correctOfDifficulty = questionsOfDifficulty.filter(r => r.isCorrect);
      return {
        total: questionsOfDifficulty.length,
        correct: correctOfDifficulty.length,
        percentage: questionsOfDifficulty.length > 0 ? 
          Math.round((correctOfDifficulty.length / questionsOfDifficulty.length) * 100) : 0
      };
    };

    // Calculate performance by topic
    const topicMap = new Map();
    responses.forEach(response => {
      const topic = response.questionData.questionTopic;
      if (!topicMap.has(topic)) {
        topicMap.set(topic, { total: 0, correct: 0 });
      }
      topicMap.get(topic).total++;
      if (response.isCorrect) {
        topicMap.get(topic).correct++;
      }
    });

    const topicPerformance = Array.from(topicMap.entries()).map(([topic, stats]) => ({
      topic,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));

    // Complete submission data with ALL required fields
    const submissionData = {
      // Basic required fields
      email: String(testState.user.email).trim(),
      username: String(testState.user.username).trim(),
      testType: convertedTestType,
      topicArea: extractedTopicArea,
      testPhase: extractedTestPhase,
      responses: responses,
      
      // Calculated summary fields (required by schema)
      totalQuestions: totalQuestions,
      totalCorrect: totalCorrect,
      totalScore: totalScore,
      totalTimeSpent: totalTimeSpent,
      averageTimePerQuestion: averageTimePerQuestion,
      testDuration: testDuration,
      
      // Performance by difficulty
      easyQuestions: calculateDifficultyPerformance('easy'),
      mediumQuestions: calculateDifficultyPerformance('medium'),
      hardQuestions: calculateDifficultyPerformance('hard'),
      
      // Performance by topic
      topicPerformance: topicPerformance,
      
      // Test metadata
      testDate: new Date(),
      ipAddress: null, // Will be set by backend
      userAgent: navigator.userAgent
    };

    // 🔍 DEBUG: Log all the calculated values
    console.log('=== COMPLETE SUBMISSION DEBUG INFO ===');
    console.log('Original diagnosticType:', diagnosticType);
    console.log('Converted testType:', convertedTestType);
    console.log('Extracted topicArea:', extractedTopicArea);
    console.log('Extracted testPhase:', extractedTestPhase);
    console.log('User email:', submissionData.userEmail);
    console.log('User name:', submissionData.userName);
    console.log('Total questions:', submissionData.totalQuestions);
    console.log('Total correct:', submissionData.totalCorrect);
    console.log('Total score:', submissionData.totalScore);
    console.log('Total time spent:', submissionData.totalTimeSpent);
    console.log('Average time per question:', submissionData.averageTimePerQuestion);
    console.log('Test duration (minutes):', submissionData.testDuration);
    console.log('Easy questions performance:', submissionData.easyQuestions);
    console.log('Medium questions performance:', submissionData.mediumQuestions);
    console.log('Hard questions performance:', submissionData.hardQuestions);
    console.log('Topic performance:', submissionData.topicPerformance);
    console.log('Total responses:', submissionData.responses.length);
    console.log('Full submission data:', submissionData);

    console.log('Sending request to:', SUBMIT_API);

    const response = await fetch(SUBMIT_API, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData),
      credentials: 'include'
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('=== SERVER ERROR DETAILS ===');
      console.error('Full error response:', errorData);
      
      // Show specific validation errors
      if (errorData.errors && Array.isArray(errorData.errors)) {
        console.error('Validation errors:');
        errorData.errors.forEach((error, index) => {
          console.error(`${index + 1}. Field: ${error.field}, Message: ${error.message}`);
        });
        
        // Create user-friendly error message
        const errorMessages = errorData.errors.map(e => `${e.field}: ${e.message}`).join('\n');
        throw new Error(`Validation failed:\n${errorMessages}`);
      }
      
      throw new Error(errorData.message || 'Submission failed');
    }

    const responseData = await response.json();
    console.log(`✅ ${displayName} submitted successfully:`, responseData);
    
    // Redirect to results page
    const defaultRedirect = `/math/${topicArea}/diagnostic-results?email=${encodeURIComponent(testState.user.email)}&testId=${responseData.data._id || ''}&testType=${convertedTestType}`;
    navigate(redirectPath || defaultRedirect);
    
  } catch (error) {
    console.error('❌ Submission error:', error);
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
            <p className="mt-2">Loading {displayName}...</p>
            <small className="text-muted">
              Selecting {topics.length * questionsPerTopic} questions from {topics.length} {topicArea} topics
            </small>
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
            <strong>No questions available for the {displayName}.</strong>
            <p className="mb-0 mt-2">
              Make sure your database has {topicArea} questions for all required topics:
            </p>
            <ul className="mt-2">
              {topics.map(topic => (
                <li key={topic}>{topic.replace(/-/g, ' ')}</li>
              ))}
            </ul>
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
                <h1>{displayName}</h1>
                <p className="mb-0">
                  {description} - {testState.questions.length} carefully selected questions covering {topics.length} key topics.
                </p>
              </div>
            </div>
          </div>
        </div>
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className={index === breadcrumbs.length - 1 ? 'current' : ''}>
                    {crumb.url && index !== breadcrumbs.length - 1 ? (
                      <a href={crumb.url}>{crumb.text}</a>
                    ) : (
                      crumb.text
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}
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
                    <div className="d-flex gap-2">
                      <div className="badge bg-light text-dark px-3 py-2">
                        <i className="bi bi-check-circle me-2"></i>
                        {answeredCount} Answered
                      </div>
                      <div className={`badge px-3 py-2 text-white ${
                        testPhase === 'pre' ? 'bg-info' : 'bg-success'
                      }`}>
                        {testPhase.toUpperCase()}-TEST
                      </div>
                      {currentQ.testTopic && (
                        <div className="badge bg-secondary text-white px-3 py-2">
                          {currentQ.testTopic.replace(/-/g, ' ')}
                        </div>
                      )}
                      {currentQ.testDifficulty && (
                        <div className={`badge px-3 py-2 text-white ${
                          currentQ.testDifficulty === 'easy' ? 'bg-success' : 
                          currentQ.testDifficulty === 'medium' ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {currentQ.testDifficulty}
                        </div>
                      )}
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
                        <i className="bi bi-check-lg me-2"></i> Submit {testPhase === 'pre' ? 'Pre-Test' : 'Post-Test'}
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
                    {testState.questions.map((question, index) => {
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
                        buttonStyle.background = '#198754';
                        buttonStyle.color = 'white';
                        buttonStyle.borderColor = '#198754';
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
                            title={`Question ${index + 1} - ${question.testTopic || question.questionTopic} (${question.testDifficulty || question.questionDifficulty})`}
                          >
                            {index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Legend */}
                  <div className="legend mt-4 pt-3" style={{borderTop: '1px solid #dee2e6'}}>
                    <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '4px',
                          background: '#198754', marginRight: '6px'
                        }}></div>
                        <small className="text-muted">Answered</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '4px',
                          background: '#0d6efd', marginRight: '6px'
                        }}></div>
                        <small className="text-muted">Current</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '4px',
                          background: '#f8f9fa', border: '2px solid #dee2e6', marginRight: '6px'
                        }}></div>
                        <small className="text-muted">Unanswered</small>
                      </div>
                    </div>
                  </div>

                  {/* Test Info */}
                  <div className="test-info mt-4 pt-3" style={{borderTop: '1px solid #dee2e6'}}>
                    <h6 className="fw-bold mb-2">{testPhase === 'pre' ? 'Pre-Test' : 'Post-Test'} Coverage</h6>
                    <small className="text-muted d-block">
                      ✓ {topics.length} {topicArea} Topics<br/>
                      ✓ {difficulties.length} Difficulty Levels<br/>
                      ✓ {testState.questions.length} Total Questions<br/>
                      📊 {testPhase === 'pre' ? 'Baseline' : 'Progress'} Assessment
                    </small>
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

export default MathDiagnosticTest;
