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

const CTFoundation2 = () => {
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
      const sessionResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/session-info`, { 
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger?topic=CT_foundation1`);
      
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger_scores/${email}/CT_foundation_1`, {
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
        topic: 'CT_foundation_1',
        score: isCorrect ? 1 : 0,
        totalQuestions: 1,
        answers: [{
          questionId: questionId,
          userAnswer: userAnswer,
          isCorrect: isCorrect
        }]
      };
      
      fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger_scores`, {
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
        topic: 'CT_foundation_1',
        score: quizState.score,
        totalQuestions: quizState.questions.length,
        date: new Date().toISOString(),
        answers: quizState.questions.map((question, index) => ({
          questionId: question.id,
          userAnswer: quizState.userAnswers[index],
          isCorrect: quizState.userAnswers[index] === question.correctAnswer
        }))
      };
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger_scores`, {
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
    <div className="ct-foundation-2-container">
      <style jsx>{`
        .ct-foundation-2-container {
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
                <p className="mb-0">Learn programming concepts through everyday examples</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">Programming</Link></li>
              <li><Link to="/english/vocabulary">Computational Thinking</Link></li>
            </ol>
          </div>
        </nav>
      </div>

      {/* 1. Variables Section */}
      <div className="container">
        <div className="section">
          <h2>📦 1. Variables - storing things</h2>

          <div className="ct-box">
            <div className="ct-vocab">
              <strong>Variable</strong> is like a container where you can store different things, and what's inside can change whenever you need it.
            </div>

            <div className="explanation">
              <p>Variables are like name tags for information. The information can change, but the name stays the same. Imagine a mailbox - the box stays in the same place, but the letters inside change every day.</p>
            </div>

            <div className="ct-example">
              <h3>Everyday Examples:</h3>
              <ol>
                <li><strong>Your age:</strong> The number changes every year, but we always call it "your age"</li>
                <li><strong>Piggy bank:</strong> The label "savings" stays the same while the money inside grows</li>
              </ol>
            </div>

            <div className="alert alert-success">
              💡 <strong>Key Idea:</strong> Variables help computers remember and update information as things change in a program.
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">Which of these is like a variable?</div>
              
              <StaticQuizOption questionId="q1" option="A" isCorrect={false}>
                A) Your birth name
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="B" isCorrect={true}>
                B) The weather today
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="C" isCorrect={false}>
                C) Your eye color
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="D" isCorrect={false}>
                D) The date you were born
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q1', 'B')}>
                Check Answer
              </button>
              
              {staticAnswers.q1?.checked && (
                <div className={`ct-feedback ${staticAnswers.q1.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q1.isCorrect ? 
                    '✓ Good job! The weather changes (like a variable) while the other options stay the same.' :
                    'Try again: Look for something that changes while keeping the same name.'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Data Types Section */}
      <div className="container">
        <div className="section">
          <h2>📋 2. Data Types – Type of value</h2>

          <div className="ct-box">
            <div className="ct-vocab">
              <strong>Data types</strong> specify the kind of information—such as numbers, text, or true/false values—so it can be used properly in different situations.
            </div>

            <div className="explanation">
              <p>
                Just like you store food in different places in your kitchen (milk in the fridge, cereal in the cupboard), different types of data are organized and used in different ways. You can't add someone's name, and you can't sort numbers alphabetically without changing them first!
              </p>
              <p>
                Common data types include:
              </p>
              <ul>
                <li><strong>Character (Text):</strong> Letters, names, or words like "Apple"</li>
                <li><strong>Integer:</strong> Whole numbers like 5 or -12</li>
                <li><strong>Decimal (Float):</strong> Numbers with a fraction part like 3.14</li>
                <li><strong>Boolean:</strong> True or False (like Yes/No or On/Off)</li>
              </ul>
            </div>

            <div className="ct-example">
              <h3>Everyday Examples:</h3>
              <ol>
                <li><strong>Books in a Library:</strong> 
                  Number of books (count), Book title (text), Price of the book (decimal)
                  <br/>Explanation:
                  <ul>
                    <li><strong>Data types:</strong> 
                      <ul>
                        <li>bookCount (whole number) – The number of books in the library, e.g., 150</li>
                        <li>bookTitle (text) – The title of the book, e.g., "To Kill a Mockingbird"</li>
                        <li>bookPrice (decimal) – The price of the book, e.g., 19.99</li>
                      </ul>
                    </li>
                    <br/>
                    <li><strong>Variable:</strong> bookCount, bookTitle, bookPrice</li>
                  </ul>
                </li>
                <br/>
                <li><strong>Classroom:</strong> 
                  Students (count), teacher's name (text), is the class online? (yes/no)
                  <br/>Explanation:
                  <ul>
                    <li><strong>Data types:</strong> 
                      <ul>
                        <li>studentCount (whole number) – The number of students in the class, e.g., 25</li>
                        <li>teacherName (text) – The name of the teacher, e.g., "Mr. John"</li>
                        <li>isOnline (yes/no) – Whether the class is happening online, e.g., "yes" (online) or "no" (not online)</li>
                      </ul>
                    </li>
                    <br/>
                    <li><strong>Variable:</strong> studentCount, teacherName, isOnline</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="alert alert-success">
              💡 <strong>Key Idea:</strong> Computers need to know what kind of data they're working with so they can handle it the right way.
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">Why do we use different data types?</div>
              
              <StaticQuizOption questionId="q2" option="A" isCorrect={false}>
                A) To make data look more complicated
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="B" isCorrect={true}>
                B) Because different data types behave in different ways
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="C" isCorrect={false}>
                C) To confuse us with extra rules
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="D" isCorrect={false}>
                D) Because data can only be one type at a time
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q2', 'B')}>
                Check Answer
              </button>
              
              {staticAnswers.q2?.checked && (
                <div className={`ct-feedback ${staticAnswers.q2.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q2.isCorrect ? 
                    '✓ Correct! Different types of data have different behaviors, so they need to be treated differently.' :
                    'Oops: Consider how numbers, text, and true/false values act differently from each other.'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Iterators Section */}
      <div className="container">
        <div className="section">
          <h2>➡️ 3. Iterators - Going Through Lists</h2>

          <div className="ct-box">
            <div className="ct-vocab">
              <strong>Iterator</strong> means doing things step by step, one after another, in a specific order.
            </div>

            <div className="explanation">
              <p>Iteration means taking steps in order, like reading a book page by page. It helps us not miss anything when working with lots of information.</p>
            </div>

            <div className="ct-example">
              <h3>Examples:</h3>
              <ol>
                <li><strong>Reading a book:</strong> You read one page at a time until you finish the book</li>
                <li><strong>Grocery shopping:</strong> You pick up one item at a time from the list and put it in your cart</li>
              </ol>
            </div>

            <div className="alert alert-success">
              💡 <strong>Key Idea:</strong> Iteration helps computers process large amounts of data efficiently.
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">What's good about iteration?</div>
              
              <StaticQuizOption questionId="q3" option="A" isCorrect={false}>
                A) It helps you skip steps and finish faster
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="B" isCorrect={true}>
                B) It helps finish tasks completely, step by step
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="C" isCorrect={false}>
                C) It lets you do random tasks in any order
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="D" isCorrect={false}>
                D) It always stops after the first try
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q3', 'B')}>
                Check Answer
              </button>
              
              {staticAnswers.q3?.checked && (
                <div className={`ct-feedback ${staticAnswers.q3.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q3.isCorrect ? 
                    '✓ Yes! Iteration helps complete tasks step by step, ensuring nothing is missed.' :
                    'Oops: Think about how doing things step by step ensures everything gets done properly.'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Conditionals Section */}
      <div className="container">
        <div className="section">
          <h2>🔀 4. Conditionals - Making Choices</h2>

          <div className="ct-box">
            <div className="ct-vocab">
              <strong>Conditionals</strong> are instructions that help decide what to do, like making choices based on different situations.
            </div>

            <div className="explanation">
              <p>Conditionals help decide what to do in different cases. Like choosing clothes based on the weather, they let us respond smartly to different situations.</p>
            </div>

            <div className="ct-example">
              <h3>Examples:</h3>
              <ol>
                <li><strong>Exercise routine:</strong> If it's a cardio day, go for a run; if it's a strength day, lift weights</li>
                <li><strong>Movie Selection:</strong> If you're in the mood for something funny, pick a comedy; if you want something serious, pick a drama.</li>
              </ol>
            </div>

            <div className="alert alert-success">
              💡 <strong>Key Idea:</strong> Conditionals help programs make decisions based on different situations.
            </div>

            <div className="ct-quiz">
              <div className="quiz-question">When are conditionals useful?</div>
              
              <StaticQuizOption questionId="q4" option="A" isCorrect={false}>
                A) When you always do the same thing
              </StaticQuizOption>
              <StaticQuizOption questionId="q4" option="B" isCorrect={false}>
                B) When making random choices
              </StaticQuizOption>
              <StaticQuizOption questionId="q4" option="C" isCorrect={true}>
                C) When different situations need different actions
              </StaticQuizOption>
              <StaticQuizOption questionId="q4" option="D" isCorrect={false}>
                D) When you don't want to think
              </StaticQuizOption>
              
              <button className="button" onClick={() => checkStaticAnswer('q4', 'C')}>
                Check Answer
              </button>
              
              {staticAnswers.q4?.checked && (
                <div className={`ct-feedback ${staticAnswers.q4.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q4.isCorrect ? 
                    '✓ Correct! Conditionals help choose the right action for each situation.' :
                    'Oops: Think about how you change your behavior based on different conditions.'
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

      {/* Next Steps Section */}
      <div className="container">
        <div className="section" style={{ textAlign: 'center' }}>
          <h2>Ready to Learn More?</h2>
          <p>Now that you understand the basics of Computational Thinking, let's explore how these concepts apply to programming!</p>
          <Link to="/programming/ct-foundation-2" className="btn btn-primary">
            Continue to Next Lesson
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTFoundation2;
