// src/pages/English/vocabulary/VocabularyDiagnosticTest.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaQuestion } from 'react-icons/fa';
import '../../../assets/css/main.css';
import '../../../assets/css/breadcrumb.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import '../../../assets/css/main.css';
import '../../../assets/css/breadcrumb.css';

// Initialize AOS (Animate On Scroll) if needed
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize GLightbox if needed
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

const VocabularyDiagnosticTest = () => {
  // State management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizRunning, setQuizRunning] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [cefrScores, setCefrScores] = useState({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
  const [correctAnswers, setCorrectAnswers] = useState({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
  const [totalQuestions, setTotalQuestions] = useState({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
  const [currentPage, setCurrentPage] = useState('quiz');
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // ✅ ADD THIS: Quiz ID for analytics linking
  const [currentQuizId, setCurrentQuizId] = useState(null);

  // CSS Styles
  const styles = {
    page: {
      display: 'none',
      textAlign: 'center'
    },
    activePage: {
      display: 'block'
    },
    quizContainer: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '800px',
      margin: '20px auto',
      backgroundColor: '#f9f9f9'
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px'
    },
    option: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      color: 'black'
    },
    selectedOption: {
      backgroundColor: '#5fcf80'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px'
    },
    questionNav: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    questionCircle: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      position: 'relative'
    },
    activeQuestionCircle: {
      backgroundColor: '#5fcf80',
      color: '#fff'
    },
    analysisQuestion: {
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      backgroundColor: '#f9f9f9'
    },
    questionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      marginRight: '10px'
    },
    correctIcon: {
      color: '#28a745'
    },
    incorrectIcon: {
      color: '#dc3545'
    },
    skippedIcon: {
      color: '#6c757d'
    },
    hidden: {
      display: 'none'
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      minWidth: '150px'
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      minWidth: '150px'
    },
    dangerButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      minWidth: '150px'
    },
    expandButton: {
      padding: '5px 10px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '10px 0'
    },
    pageHeader: {
      backgroundColor: '#f8f9fa',
      padding: '40px 0',
      marginBottom: '20px'
    },
    breadcrumb: {
      backgroundColor: '#f8f9fa',
      padding: '10px 0'
    },
    loadingMessage: {
      padding: '40px 0',
      textAlign: 'center'
    },
    errorMessage: {
      color: '#dc3545',
      textAlign: 'center',
      padding: '20px'
    }
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Initialize GLightbox if needed
    GLightbox({
      selector: '.glightbox'
    });

    fetchSessionInfo();
  }, []);

  const fetchSessionInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/session-info`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
        fetchQuestions();
      } else {
        setError('Failed to fetch session info');
      }
    } catch (error) {
      setError('Error fetching session info: ' + error.message);
    }
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    let allQuestions = [];

    try {
      const fetchPromises = cefrLevels.map(level =>
        fetch(`${process.env.REACT_APP_API_URL}/api/vocab-questions?cefrLevel=${level}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch ${level} questions`);
            return response.json();
          })
          .then(data => data.slice(0, 5))
      );

      const questionsByLevel = await Promise.all(fetchPromises);
      questionsByLevel.forEach(levelQuestions => {
        allQuestions = allQuestions.concat(levelQuestions);
      });

      setQuestions(allQuestions.sort(() => 0.5 - Math.random()));
      setAnswers(new Array(allQuestions.length).fill(null));
    } catch (error) {
      setError('Error fetching questions: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuiz = () => {
    if (quizRunning || questions.length === 0) return;
    
    // ✅ CREATE QUIZ ID when starting quiz
    const quizId = new Date().toISOString(); // or generate a better unique ID
    setCurrentQuizId(quizId);
    
    setCurrentPage('quiz');
    setCurrentQuestionIndex(0);
    setTotalPoints(0);
    setAnswers(new Array(questions.length).fill(null));
    setCefrScores({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
    setCorrectAnswers({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
    setTotalQuestions({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
    setExpandedQuestions([]);
    setQuizRunning(true);
    setIsSubmitted(false);
  };

  const recordAnswer = (selectedOption) => {
    const question = questions[currentQuestionIndex];
    const selectedAnswer = question.options[selectedOption];
    const isCorrect = selectedAnswer === question.correctOption;

    const newCorrectAnswers = {...correctAnswers};
    const newTotalQuestions = {...totalQuestions};
    
    if (isCorrect) {
      newCorrectAnswers[question.CEFRLevel]++;
      setTotalPoints(prev => prev + question.points);
    }
    
    newTotalQuestions[question.CEFRLevel]++;
    setCorrectAnswers(newCorrectAnswers);
    setTotalQuestions(newTotalQuestions);

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      question_id: question._id,
      question_text: question.question,
      user_response: selectedAnswer,
      selectedOption: selectedOption,
      correct_option: question.correctOption,
      is_correct: isCorrect,
      points_awarded: isCorrect ? question.points : 0,
      difficulty_level: question.difficultyLevel,
      CEFR_level: question.CEFRLevel,
      topic: question.topic
    };
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const endQuiz = () => {
    const finalAnswers = answers.map((answer, i) => {
      const question = questions[i];
      if (!answer) {
        return {
          question_id: question._id,
          question_text: question.question,
          user_response: "You did not answer this question.",
          correct_option: question.correctOption,
          is_correct: false,
          points_awarded: 0,
          difficulty_level: question.difficultyLevel || 'Unknown',
          CEFR_level: question.CEFRLevel,
          topic: question.topic
        };
      }
      return answer;
    });

    setAnswers(finalAnswers);
    setIsSubmitted(true);
    setCurrentPage('result');
    setQuizRunning(false);

    // ✅ POST DATA WITH QUIZ ID
    postUserData({
      username: username,
      email: email,
      assessments: [{
        total_score: totalPoints,
        assess_topic: "Diagnostic",
        date: currentQuizId, // ✅ Also include in assessment
        questions: finalAnswers
      }]
    });
    window.location.href = `/vocab-analytics/${currentQuizId}`;
  };


  const postUserData = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vocabscoreadd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to post user data');
      }
      
      const result = await response.json();
      console.log('Quiz data saved successfully:', result);
    } catch (error) {
      console.error('Error posting user data:', error);
    }
  };



  const renderQuestionNav = () => (
    <div style={styles.questionNav}>
      {questions.map((_, index) => {
        const answer = answers[index];
        const isCurrent = index === currentQuestionIndex;
        const isCorrect = answer?.is_correct;
        const isSkipped = answer?.user_response === "You did not answer this question.";
        const isAttempted = answer !== null;

        let backgroundColor = '#ddd';
        if (isCurrent) {
          backgroundColor = '#5fcf80';
        } else if (isSubmitted) {
          if (isCorrect) backgroundColor = '#28a745';
          else if (isSkipped) backgroundColor = '#6c757d';
          else if (isAttempted) backgroundColor = '#ffc107';
        } else if (isAttempted) {
          backgroundColor = '#cce5ff';
        }

        let statusIcon = null;
        if (isSubmitted) {
          if (isSkipped) statusIcon = '?';
          else if (isCorrect) statusIcon = '✓';
          else if (isAttempted) statusIcon = '✗';
        }

        return (
          <div
            key={index}
            style={{
              ...styles.questionCircle,
              backgroundColor,
              color: isCurrent ? '#fff' : '#000',
              position: 'relative'
            }}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
            {statusIcon && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: isSkipped ? '#6c757d' : isCorrect ? '#fff' : '#000'
              }}>
                {statusIcon}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderCurrentQuestion = () => {
    if (!questions.length || currentQuestionIndex >= questions.length) return null;

    const question = questions[currentQuestionIndex];
    const answer = answers[currentQuestionIndex];

    return (
      <div style={styles.quizContainer}>
        {renderQuestionNav()}
        <div style={{ margin: '0 auto', maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '20px' }}>{question.question}</h2>
          <div style={styles.optionsContainer}>
            {Object.entries(question.options).map(([key, value]) => (
              <button
                key={key}
                style={{
                  ...styles.option,
                  ...(answer?.selectedOption === key ? styles.selectedOption : {})
                }}
                onClick={() => recordAnswer(key)}
                disabled={isSubmitted}
              >
                {value}
              </button>
            ))}
          </div>
          <div style={styles.buttonsContainer}>
            <button
              style={{
                ...styles.secondaryButton,
                ...(currentQuestionIndex === 0 ? styles.hidden : {})
              }}
              onClick={prevQuestion}
            >
              Previous Question
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                style={styles.primaryButton}
                onClick={nextQuestion}
              >
                Next Question
              </button>
            ) : (
              <button
                style={styles.dangerButton}
                onClick={endQuiz}
              >
                End Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };


  if (isLoading) {
    return (
      <div style={styles.loadingMessage}>
        <h2>Loading questions...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorMessage}>
        <h2>Error</h2>
        <p>{error}</p>
        <button style={styles.primaryButton} onClick={fetchSessionInfo}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="main">
      {/* Page Title Section */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Vocabulary Diagnostic Test</h1>
                <p className="mb-0">Welcome to the Diagnostic Vocabulary Assessment</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">English</Link></li>
              <li><Link to="/vocabulary">Vocabulary</Link></li>
              <li className="current">Vocabulary Diagnostic Test</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Quiz Page */}
      {currentPage === 'quiz' && renderCurrentQuestion()}

    </main>
  );
};

export default VocabularyDiagnosticTest;
