import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/main.css";
import '../../assets/css/main.css';
import '../../assets/css/breadcrumb.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import '../../assets/css/main.css';
import '../../assets/css/breadcrumb.css';

// Initialize AOS (Animate On Scroll) if needed
import 'aos/dist/aos.css';

// Initialize GLightbox if needed
import 'glightbox/dist/css/glightbox.min.css';

const CTFoundation3 = () => {
  // Quiz state management
  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: Array(30).fill(null),
    answersChecked: Array(30).fill(false),
    score: 0,
    isLoading: true,
    showResults: false
  });

  const [userInfo, setUserInfo] = useState({
    username: null,
    email: null
  });

  // Static quiz examples state
  const [staticAnswers, setStaticAnswers] = useState({});

  // Fetch session info and initialize quiz
  useEffect(() => {
    fetchSessionInfo();
  }, []);

  const fetchSessionInfo = async () => {
    try {
      const sessionResponse = await fetch('http://3.111.49.131:4000/api/session-info', { 
        credentials: 'include' 
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        setUserInfo({
          email: sessionData.email,
          username: sessionData.username
        });
        
        await initializeQuiz(sessionData.email);
        await fetchPreviousAnswers(sessionData.email);
      } else {
        // Redirect to login - in a real app you'd use React Router
        window.location.href = 'user_login.html';
      }
    } catch (error) {
      console.error('Error fetching session info:', error);
      setQuizState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get session information. Please refresh or log in again.'
      }));
    }
  };

  const initializeQuiz = async (email) => {
    try {
      const response = await fetch('/api/CT_finger?topic=CT_foundation2');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }
      
      const data = await response.json();
      
      if (data.data.length < 30) {
        throw new Error('Not enough questions available');
      }
      
      setQuizState(prev => ({
        ...prev,
        questions: data.data,
        userAnswers: Array(data.data.length).fill(null),
        answersChecked: Array(data.data.length).fill(false),
        isLoading: false
      }));
      
    } catch (error) {
      console.error('Error initializing quiz:', error);
      setQuizState(prev => ({
        ...prev,
        isLoading: false,
        error: `Failed to load quiz: ${error.message}. Please refresh the page to try again.`
      }));
    }
  };

  const fetchPreviousAnswers = async (email) => {
    try {
      const response = await fetch(`http://3.111.49.131:4000/api/CT_finger_scores/${email}/CT_foundation_2`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.quizzes && data.quizzes.length > 0) {
          const answeredQuestions = new Map();
          const sortedQuizzes = data.quizzes.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
          );
          
          let newScore = 0;
          const newUserAnswers = [...quizState.userAnswers];
          const newAnswersChecked = [...quizState.answersChecked];
          
          sortedQuizzes.forEach(quiz => {
            quiz.answers.forEach(answer => {
              if (!answeredQuestions.has(answer.questionId)) {
                answeredQuestions.set(answer.questionId, answer);
                
                const questionIndex = quizState.questions.findIndex(q => q.id === answer.questionId);
                
                if (questionIndex !== -1) {
                  newUserAnswers[questionIndex] = answer.userAnswer;
                  newAnswersChecked[questionIndex] = true;
                  
                  if (answer.isCorrect) {
                    newScore++;
                  }
                }
              }
            });
          });
          
          setQuizState(prev => ({
            ...prev,
            userAnswers: newUserAnswers,
            answersChecked: newAnswersChecked,
            score: newScore
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching previous answers:', error);
    }
  };

  // Static quiz handlers
  const handleStaticOption = (questionId, optionElement) => {
    setStaticAnswers(prev => ({
      ...prev,
      [questionId]: { selected: optionElement, checked: false }
    }));
  };

  const checkStaticAnswer = (questionId, correctOption) => {
    const answer = staticAnswers[questionId];
    if (!answer || !answer.selected) {
      alert('Please select an answer first!');
      return;
    }

    setStaticAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        checked: true,
        isCorrect: answer.selected === correctOption
      }
    }));
  };

  // Main quiz handlers
  const selectQuizOption = (optionIndex) => {
    if (quizState.answersChecked[quizState.currentQuestionIndex]) return;

    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentQuestionIndex] = optionIndex;
    
    setQuizState(prev => ({
      ...prev,
      userAnswers: newUserAnswers
    }));
  };

  const navigateToQuestion = (index) => {
    if (index >= 0 && index < quizState.questions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: index
      }));
    }
  };

  const checkQuizAnswer = async () => {
    const currentIndex = quizState.currentQuestionIndex;
    const userAnswer = quizState.userAnswers[currentIndex];
    const correctAnswer = quizState.questions[currentIndex].correctAnswer;
    const questionId = quizState.questions[currentIndex].id;
    
    const isCorrect = userAnswer === correctAnswer;
    
    const newAnswersChecked = [...quizState.answersChecked];
    newAnswersChecked[currentIndex] = true;
    
    const newScore = quizState.score + (isCorrect ? 1 : 0);
    
    setQuizState(prev => ({
      ...prev,
      answersChecked: newAnswersChecked,
      score: newScore
    }));

    // Save answer to database
    try {
      const result = {
        email: userInfo.email,
        username: userInfo.username,
        topic: 'CT_foundation_2',
        score: isCorrect ? 1 : 0,
        totalQuestions: 1,
        answers: [{
          questionId: questionId,
          userAnswer: userAnswer,
          isCorrect: isCorrect
        }]
      };
      
      fetch('http://3.111.49.131:4000/api/CT_finger_scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result),
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const submitQuiz = async () => {
    setQuizState(prev => ({ ...prev, showResults: true }));

    try {
      const result = {
        email: userInfo.email,
        username: userInfo.username,
        topic: 'CT_foundation_2',
        score: quizState.score,
        totalQuestions: quizState.questions.length,
        date: new Date().toISOString(),
        answers: quizState.questions.map((question, index) => ({
          questionId: question.id,
          userAnswer: quizState.userAnswers[index],
          isCorrect: quizState.userAnswers[index] === question.correctAnswer
        }))
      };
      
      const response = await fetch('http://3.111.49.131:4000/api/CT_finger_scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to save quiz results');
      }
    } catch (error) {
      console.error('Error saving complete quiz results:', error);
      alert('There was a problem saving your quiz results. Please try again later.');
    }
  };

  const resetQuiz = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      userAnswers: Array(prev.questions.length).fill(null),
      answersChecked: Array(prev.questions.length).fill(false),
      score: 0,
      showResults: false
    }));
  };

  // Static Quiz Option Component
  const StaticQuizOption = ({ questionId, option, isCorrect, children }) => {
    const answer = staticAnswers[questionId];
    const isSelected = answer?.selected === option;
    const isChecked = answer?.checked;
    
    let className = 'ct-option';
    if (isSelected) className += ' selected';
    if (isChecked) {
      if (isCorrect) className += ' correct';
      else if (isSelected) className += ' incorrect';
    }

    return (
      <div 
        className={className}
        onClick={() => handleStaticOption(questionId, option)}
      >
        {children}
      </div>
    );
  };

  // Current question data
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isAnswered = currentQuestion && quizState.answersChecked[quizState.currentQuestionIndex];
  const allAnswered = quizState.answersChecked.every(Boolean);
  const answeredCount = quizState.answersChecked.filter(Boolean).length;

  return (
    <div className="ct-foundation-3-container">
      <style jsx>{`
        .ct-foundation-3-container {
          font-family: 'Open Sans', sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .container h2 {
          font-family: 'Comic Sans MS', cursive;
          font-size: 20px;
          color: #3498db;
          margin-bottom: 1rem;
        }

        .text-success { color: #28a745 !important; }
        .text-danger { color: #dc3545 !important; }

        .section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .ct-box {
          background: #e8f4fc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #3498db;
        }

        .ct-step {
          padding-left: 25px;
          margin-bottom: 15px;
          position: relative;
        }

        .ct-example {
          background: #e8f8f5;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          border-left: 4px solid #2ecc71;
        }

        .ct-vocab {
          background: #fef9e7;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #f39c12;
        }

        .ct-quiz {
          background: #f5eef8;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .ct-option {
          padding: 12px 15px;
          margin: 10px 0;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid #ddd;
        }

        .ct-option:hover {
          background-color: #eaf2f8;
          border-color: #3498db;
        }

        .ct-option.selected {
          background-color: #d4e6f1;
          border-left: 4px solid #3498db;
        }

        .ct-option.correct {
          background-color: #d5f5e3;
          border-left: 4px solid #2ecc71;
        }

        .ct-option.incorrect {
          background-color: #fadbd8;
          border-left: 4px solid #e74c3c;
        }

        .ct-feedback {
          padding: 12px;
          margin-top: 15px;
          border-radius: 5px;
          display: block;
        }

        .ct-feedback.correct {
          background-color: #d5f5e3;
          border-left: 4px solid #2ecc71;
        }

        .ct-feedback.incorrect {
          background-color: #fadbd8;
          border-left: 4px solid #e74c3c;
        }

        .alert {
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        }

        .alert-success {
          background-color: #d4edda;
          color: #155724;
          border-left: 4px solid #28a745;
        }

        .alert-info {
          background-color: #d1ecf1;
          color: #0c5460;
          border-left: 4px solid #17a2b8;
        }

        .alert-danger {
          background-color: #f8d7da;
          color: #721c24;
          border-left: 4px solid #dc3545;
        }

        .alert-warning {
          background-color: #fff3cd;
          color: #856404;
          border-left: 4px solid #ffc107;
        }

        .explanation {
          background: #ffffff;
          margin: 1.5rem 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 15px;
          border-radius: 8px;
        }

        .button {
          padding: 0.8rem 1.5rem;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          margin: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .button:hover {
          background-color: #2980b9;
          transform: translateY(-1px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .button:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
          transform: none;
        }

        .btn {
          padding: 0.8rem 1.5rem;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          margin: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn:hover {
          background-color: #2980b9;
          transform: translateY(-1px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          color: white;
          text-decoration: none;
        }

        .btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-primary {
          background-color: #3498db;
        }

        .btn-primary:hover {
          background-color: #2980b9;
        }

        .btn-success {
          background-color: #28a745;
        }

        .btn-success:hover {
          background-color: #218838;
        }

        .btn-danger {
          background-color: #dc3545;
        }

        .btn-outline-primary {
          background-color: transparent;
          color: #3498db;
          border: 1px solid #3498db;
        }

        .btn-outline-secondary {
          background-color: transparent;
          color: #6c757d;
          border: 1px solid #6c757d;
        }

        .quiz-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .quiz-progress {
          margin-bottom: 20px;
        }

        .progress {
          background-color: #e9ecef;
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
          margin-top: 10px;
        }

        .progress-bar {
          background-color: #3498db;
          height: 100%;
          transition: width 0.3s ease;
        }

        .question-numbers {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 4px;
          margin-top: 10px;
        }

        .question-num-btn {
          width: 40px;
          height: 30px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          border-radius: 3px;
          font-size: 0.9rem;
          border: 1px solid #6c757d;
          background: transparent;
          color: #6c757d;
          cursor: pointer;
        }

        .question-num-btn.active {
          background-color: #3498db;
          color: white;
          border-color: #3498db;
        }

        .question-num-btn.btn-success {
          background-color: #28a745;
          color: white;
          border-color: #28a745;
        }

        .question-num-btn.btn-danger {
          background-color: #dc3545;
          color: white;
          border-color: #dc3545;
        }

        .question-numbers-container {
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 20px;
          height: fit-content;
        }

        .quiz-navigation {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
        }

        .quiz-actions {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }

        .row {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }

        .col-md-8 {
          flex: 2;
        }

        .col-md-4 {
          flex: 1;
        }

        .quiz-question {
          font-weight: bold;
          margin-bottom: 15px;
        }

        .loop-type {
          margin-bottom: 20px;
        }

        .function-step {
          margin-bottom: 20px;
          padding-left: 30px;
          position: relative;
        }

        .function-step .ct-step-number {
          position: absolute;
          left: 0;
          top: 0;
          font-weight: bold;
          color: #3498db;
          font-size: 1.2em;
        }

        .game-example {
          background: #fff3cd;
          padding: 10px;
          border-radius: 5px;
          border-left: 4px solid #ffc107;
          margin: 10px 0;
        }

        .classroom-example {
          background: #e2e3e5;
          padding: 10px;
          border-radius: 5px;
          border-left: 4px solid #6c757d;
          margin: 10px 0;
        }

        .ct-concept-icon {
          font-size: 1.5rem;
          margin-right: 10px;
          color: #3498db;
        }

        @media (max-width: 768px) {
          .row {
            flex-direction: column;
          }
          
          .question-numbers {
            grid-template-columns: repeat(6, 1fr);
          }
          
          .container {
            padding: 20px;
            margin: 10px;
          }
        }
      `}</style>

      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Computational Thinking</h1>
                <p className="mb-0">Advanced programming concepts using real life examples</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/programming">Programming</Link></li>
              <li><Link to="/programming/ct-foundation">Computational Thinking</Link></li>
              <li className="current">CT Advanced Concepts</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Enhanced Loops Section */}
      <div className="container">
        <div className="section">
          <h2>🔄 5. Loops - Repeating Tasks</h2>

          <div className="ct-box">
            <div className="ct-vocab">
              <strong>Loops:</strong> Doing something over and over until finished.
            </div>

            <div className="explanation">
              <p>Loops help with repetitive work. Like washing dishes until the sink is empty, they do the same action multiple times until done.</p>
            </div>

            <div className="ct-example">
              <h3>CT Loop Types:</h3>

              <div className="loop-type">
                <div className="alert alert-warning">
                  <span className="ct-concept-icon">🔢</span>
                  <strong>Counted Repetition (For Loop):</strong> When you know exactly how many times to repeat
                </div>
                <ol>
                  <li className="game-example">
                    <strong>Game Example:</strong> In cricket, the bowler gets exactly 6 attempts (balls) per over - this is a counted loop
                  </li>
                  <li className="classroom-example">
                    <strong>Classroom Example:</strong> Teacher asking each of 25 students to solve one math problem on the board
                  </li>
                  <li>
                    <strong>Daily Life:</strong> Eating exactly 3 meals a day (breakfast, lunch, dinner)
                  </li>
                </ol>
              </div>

              <div className="loop-type">
                <div className="alert alert-warning">
                  <span className="ct-concept-icon">❓</span>
                  <strong>Conditional Repetition (While Loop):</strong> When you repeat until something changes
                </div>
                <ol>
                  <li className="game-example">
                    <strong>Game Example:</strong> Jumping in a skipping rope game until someone misses a jump
                  </li>
                  <li className="classroom-example">
                    <strong>Classroom Example:</strong> Solving math problems until the bell rings for next period
                  </li>
                  <li>
                    <strong>Daily Life:</strong> Brushing your teeth until they feel clean (not for a set time)
                  </li>
                </ol>
              </div>
            </div>

            <div className="alert alert-success">
              💡 <strong>Key Idea:</strong> Choose Counted Repetition when you know how many times, Conditional Repetition when you're waiting for something to change.
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">When should you use a loop?</div>
              
              <StaticQuizOption questionId="q1" option="A" isCorrect={true}>
                A) When you need to repeat similar actions
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="B" isCorrect={false}>
                B) When doing something just once
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="C" isCorrect={false}>
                C) When every step is completely different
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="D" isCorrect={false}>
                D) When you want to skip steps
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q1', 'A')}>
                Check Answer
              </button>
              
              {staticAnswers.q1?.checked && (
                <div className={`ct-feedback ${staticAnswers.q1.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q1.isCorrect ? 
                    '✓ Good! Loops save time on repetitive work like stirring until mixed.' :
                    'Think: What tasks do you repeat until they\'re finished?'
                  }
                </div>
              )}
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">When should you use a While loop?</div>
              
              <StaticQuizOption questionId="q2" option="A" isCorrect={true}>
                A) When you don't know how many times an action will be repeated, but you want to keep repeating it until a condition is met
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="B" isCorrect={false}>
                B) When you know exactly how many times an action will be repeated
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="C" isCorrect={false}>
                C) When the action should never be repeated
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="D" isCorrect={false}>
                D) When the action should be repeated exactly 10 times
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q2', 'A')}>
                Check Answer
              </button>
              
              {staticAnswers.q2?.checked && (
                <div className={`ct-feedback ${staticAnswers.q2.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q2.isCorrect ? 
                    '✓ Correct! While loops are used when we don\'t know the exact number of repetitions, but we want to repeat until a condition is met.' :
                    'Think: When do you want something to repeat until it satisfies a condition, like continuing until you solve a problem?'
                  }
                </div>
              )}
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">When should you use a For loop?</div>
              
              <StaticQuizOption questionId="q3" option="A" isCorrect={true}>
                A) When you know exactly how many times you need to repeat an action
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="B" isCorrect={false}>
                B) When you want to repeat until a condition is met, but don't know how many times
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="C" isCorrect={false}>
                C) When you need to perform the same action once
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="D" isCorrect={false}>
                D) When you want to repeat the action randomly
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q3', 'A')}>
                Check Answer
              </button>
              
              {staticAnswers.q3?.checked && (
                <div className={`ct-feedback ${staticAnswers.q3.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q3.isCorrect ? 
                    '✓ Exactly! A For loop is used when you know exactly how many times you need to repeat an action.' :
                    'Consider: When do you need to repeat something a specific number of times, like iterating through items in a list?'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Functions Section */}
      <div className="container">
        <div className="section">
          <h2>🧩 6. Functions - Ready-Made Solutions</h2>

          <div className="ct-box">
            <div className="ct-vocab">
              <strong>Functions:</strong> A set of steps you can use again and again. They help us avoid doing the same thing over and over, and let us use the same solution when we face similar problems.
            </div>

            <div className="explanation">
              <p>Functions are like machines that take an input, follow a set of steps, and give an output.</p>
              <p><strong>How a Function is Made:</strong> You first decide what task you repeat often. Then, you define what can change (inputs), and what steps you follow (the process) to get the answer (output).</p>
              <p><strong>Real-Life Example 1:</strong> A juice machine takes <em>fruit</em> (input) and gives <em>juice</em> (output).</p>
              <p><strong>Real-Life Example 2:</strong> A washing machine takes <em>dirty clothes</em> (input), follows a cleaning process, and gives <em>clean clothes</em> (output).</p>
              <p><strong>Real-Life Example 3:</strong> In school, a math formula like area = length × width takes two numbers (inputs) and gives an area (output).</p>
            </div>

            <div className="ct-example">
              <h3>CT Function Building:</h3>

              <div className="function-step">
                <span className="ct-step-number">1.</span>
                <strong>Identify the Repeatable Task:</strong> What do you do the same way each time?
                <div className="ct-example mt-2">
                  <strong>Example:</strong> Your morning routine (wake up → brush teeth → get dressed → eat breakfast)
                </div>
              </div>

              <div className="function-step">
                <span className="ct-step-number">2.</span>
                <strong>Define the Ingredients (Parameters):</strong> What can change each time?
                <div className="ct-example mt-2">
                  <strong>Example:</strong> Breakfast choice (could be idli, cereal, or paratha)
                </div>
              </div>

              <div className="function-step">
                <span className="ct-step-number">3.</span>
                <strong>Write the Steps:</strong> The exact sequence that works every time
                <div className="ct-example mt-2 game-example">
                  <strong>Game Example:</strong> In a maze game, the player always follows these steps to move to a goal:
                  <br/>1) Check the current position → 2) Decide the direction (up, down, left, right) → 3) Move one step → 4) Repeat until the goal is reached
                  <br/><br/>
                  These same steps are used again and again, no matter where the player starts. This is like a function — you give the current position as input, and it gives the next move as output.
                </div>
              </div>

              <div className="function-step">
                <span className="ct-step-number">4.</span>
                <strong>Test Your Function:</strong> Try it with different inputs
                <div className="ct-example mt-2 classroom-example">
                  <strong>Classroom Example:</strong> A math formula works the same whether you're calculating for circles (πr²) or rectangles (l×w)
                </div>
              </div>
            </div>

            <div className="alert alert-success">
              💡 <strong>Key Idea:</strong> Good functions are like reliable tools - they work the same way every time when given the right inputs.
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">What's great about functions?</div>
              
              <StaticQuizOption questionId="q4" option="A" isCorrect={false}>
                A) They make you start over each time
              </StaticQuizOption>
              <StaticQuizOption questionId="q4" option="B" isCorrect={true}>
                B) They let you reuse working solutions
              </StaticQuizOption>
              <StaticQuizOption questionId="q4" option="C" isCorrect={false}>
                C) They change randomly
              </StaticQuizOption>
              <StaticQuizOption questionId="q4" option="D" isCorrect={false}>
                D) They only work once
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q4', 'B')}>
                Check Answer
              </button>
              
              {staticAnswers.q4?.checked && (
                <div className={`ct-feedback ${staticAnswers.q4.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q4.isCorrect ? 
                    '✓ Exactly! Like using the same cookie recipe whenever you want cookies.' :
                    'Remember: Functions help avoid repeating work you\'ve already done.'
                  }
                </div>
              )}
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">What makes functions different from regular code?</div>
              
              <StaticQuizOption questionId="q5" option="A" isCorrect={false}>
                A) They can only be used once
              </StaticQuizOption>
              <StaticQuizOption questionId="q5" option="B" isCorrect={false}>
                B) They must be written in a different language
              </StaticQuizOption>
              <StaticQuizOption questionId="q5" option="C" isCorrect={true}>
                C) They can be called multiple times from different places
              </StaticQuizOption>
              <StaticQuizOption questionId="q5" option="D" isCorrect={false}>
                D) They automatically delete after running
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q5', 'C')}>
                Check Answer
              </button>
              
              {staticAnswers.q5?.checked && (
                <div className={`ct-feedback ${staticAnswers.q5.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q5.isCorrect ? 
                    '✓ Exactly! Functions are like reusable tools in your programming toolbox.' :
                    'Remember: The power of functions comes from their reusability.'
                  }
                </div>
              )}
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">Which is NOT a good reason to use functions?</div>
              
              <StaticQuizOption questionId="q6" option="A" isCorrect={false}>
                A) To avoid rewriting the same code
              </StaticQuizOption>
              <StaticQuizOption questionId="q6" option="B" isCorrect={false}>
                B) To make programs more organized
              </StaticQuizOption>
              <StaticQuizOption questionId="q6" option="C" isCorrect={true}>
                C) To make every program unique and unrepeatable
              </StaticQuizOption>
              <StaticQuizOption questionId="q6" option="D" isCorrect={false}>
                D) To break complex problems into smaller parts
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q6', 'C')}>
                Check Answer
              </button>
              
              {staticAnswers.q6?.checked && (
                <div className={`ct-feedback ${staticAnswers.q6.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q6.isCorrect ? 
                    '✓ Good catch! Functions actually help create repeatable, reliable solutions.' :
                    'Consider: Functions are about creating reliable, reusable solutions.'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Section */}
      <div className="container">
        <div className="section">
          <h2>❓ Computational Thinking Quiz</h2>
          
          <div className="ct-box">
            {quizState.isLoading ? (
              <div>Loading quiz questions...</div>
            ) : quizState.error ? (
              <div className="alert alert-danger">
                {quizState.error}
              </div>
            ) : (
              <>
                <div className="quiz-header">
                  <div className="quiz-progress">
                    <span>Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}</span>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  {/* Quiz content - Left side */}
                  <div className="col-md-8">
                    {currentQuestion && (
                      <div>
                        <h3>{currentQuestion.question}</h3>
                        <div className="options-container">
                          {currentQuestion.options.map((option, optionIndex) => {
                            let className = 'ct-option';
                            
                            if (quizState.userAnswers[quizState.currentQuestionIndex] === optionIndex) {
                              className += ' selected';
                            }
                            
                            if (isAnswered) {
                              if (optionIndex === currentQuestion.correctAnswer) {
                                className += ' correct';
                              } else if (quizState.userAnswers[quizState.currentQuestionIndex] === optionIndex) {
                                className += ' incorrect';
                              }
                            }
                            
                            return (
                              <div
                                key={optionIndex}
                                className={className}
                                onClick={() => selectQuizOption(optionIndex)}
                              >
                                {option}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {isAnswered && (
                      <div className="explanation-container">
                        <div className={`alert ${quizState.userAnswers[quizState.currentQuestionIndex] === currentQuestion.correctAnswer ? 'alert-success' : 'alert-danger'}`}>
                          {quizState.userAnswers[quizState.currentQuestionIndex] === currentQuestion.correctAnswer ? 
                            '✔️ Correct! Great job!' : '❌ Not quite right.'}
                        </div>
                        <div className="alert alert-info">
                          {currentQuestion.explanation}
                        </div>
                      </div>
                    )}
                    
                    <div className="quiz-navigation">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => navigateToQuestion(quizState.currentQuestionIndex - 1)}
                        disabled={quizState.currentQuestionIndex === 0}
                      >
                        Previous
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => navigateToQuestion(quizState.currentQuestionIndex + 1)}
                        disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
                      >
                        Next
                      </button>
                    </div>
                    
                    <div className="quiz-actions">
                      <button 
                        className="btn btn-success"
                        onClick={checkQuizAnswer}
                        disabled={quizState.userAnswers[quizState.currentQuestionIndex] === null || isAnswered}
                      >
                        Check Answer
                      </button>
                      {allAnswered && (
                        <button 
                          className="btn btn-primary"
                          onClick={submitQuiz}
                          style={{ display: quizState.showResults ? 'none' : 'inline-block' }}
                        >
                          Submit Quiz
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Question numbers - Right side */}
                  <div className="col-md-4">
                    <div className="question-numbers-container">
                      <h4>Question Navigator</h4>
                      
                      {/* Progress Summary */}
                      <div className="alert alert-info">
                        <div><strong>Completed:</strong> {answeredCount}/{quizState.questions.length}</div>
                        <div><strong>Correct:</strong> {quizState.score}/{answeredCount}</div>
                      </div>
                      
                      <div className="question-numbers">
                        {quizState.questions.map((_, index) => {
                          let className = 'question-num-btn';
                          
                          if (index === quizState.currentQuestionIndex) {
                            className += ' active';
                          } else if (quizState.answersChecked[index]) {
                            const isCorrect = quizState.userAnswers[index] === quizState.questions[index].correctAnswer;
                            className += isCorrect ? ' btn-success' : ' btn-danger';
                          }
                          
                          return (
                            <button
                              key={index}
                              className={className}
                              onClick={() => navigateToQuestion(index)}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {quizState.showResults && (
                  <div className="quiz-results">
                    <h3>Quiz Results</h3>
                    <div className="alert alert-info">
                      <p>You scored: <strong>{quizState.score}</strong> out of {quizState.questions.length}</p>
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${(quizState.score / quizState.questions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="btn btn-outline-primary" onClick={resetQuiz}>
                      Try Again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container">
        <div className="section" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/programming/ct-foundation-2" className="btn btn-outline-primary">
              ← Previous: Programming Basics
            </Link>
            <h2 style={{ margin: '0', flex: '1', textAlign: 'center' }}>Congratulations!</h2>
            <Link to="/programming/python-basics" className="btn btn-primary">
              Next: Python Basics →
            </Link>
          </div>
          <p style={{ marginTop: '1rem' }}>You've mastered Loops and Functions! Ready to start coding with Python?</p>
        </div>
      </div>
    </div>
  );
};

// CRITICAL: Make sure this is the ONLY export statement in the file
export default CTFoundation3;
