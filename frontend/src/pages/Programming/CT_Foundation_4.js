import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/main.css";
import '../../assets/css/breadcrumb.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.min.css';

const CTFoundation4 = () => {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger?topic=CT_foundation3`);
      
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger_scores/${email}/CT_foundation3`, {
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
        topic: 'CT_foundation3',
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
        topic: 'CT_foundation_4',
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
    <div className="ct-foundation-container">
      <style jsx>{`
        .ct-foundation-container {
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
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .ct-example {
          background-color: #e9ecef;
          border-left: 4px solid #0d6efd;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 5px 5px 0;
        }

        .ct-step {
          padding: 10px;
          margin: 10px 0;
          background-color: white;
          border-radius: 5px;
        }

        .ct-step-number {
          display: inline-block;
          width: 30px;
          height: 30px;
          background-color: #0d6efd;
          color: white;
          text-align: center;
          border-radius: 50%;
          margin-right: 10px;
        }

        .ct-concepts {
          margin-top: 20px;
        }

        .ct-concepts .ct-step {
          padding-left: 25px;
          margin-bottom: 15px;
          position: relative;
        }

        .ct-quiz {
          background-color: #e9ecef;
          padding: 20px;
          border-radius: 10px;
          margin-top: 30px;
        }

        .ct-option {
          padding: 10px;
          margin: 5px 0;
          background-color: white;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .ct-option:hover {
          background-color: #f1f1f1;
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

        .correct-option {
          border-left: 4px solid #198754;
        }

        .ct-feedback {
          padding: 15px;
          margin-top: 15px;
          border-radius: 5px;
          display: block;
        }

        .ct-feedback.correct {
          background-color: #d1e7dd;
          border-left: 4px solid #198754;
        }

        .ct-feedback.incorrect {
          background-color: #f8d7da;
          border-left: 4px solid #dc3545;
        }

        .ct-btn {
          margin-top: 10px;
          background-color: #0d6efd;
          color: white;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .ct-btn:hover {
          background-color: #0b5ed7;
          transform: translateY(-1px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
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

        .btn {
          padding: 0.375rem 0.75rem;
          margin: 0.25rem;
          border: 1px solid transparent;
          border-radius: 0.25rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          font-size: 1rem;
          line-height: 1.5;
          transition: all 0.15s ease-in-out;
        }

        .btn-primary {
          color: #fff;
          background-color: #007bff;
          border-color: #007bff;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #004085;
        }

        .btn-success {
          color: #fff;
          background-color: #28a745;
          border-color: #28a745;
        }

        .btn-outline-primary {
          color: #007bff;
          border-color: #007bff;
          background-color: transparent;
        }

        .btn-outline-primary:hover {
          color: #fff;
          background-color: #007bff;
          border-color: #007bff;
        }

        .btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
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

        pre {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          margin: 10px 0;
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
                <h1>Advanced Computational Thinking</h1>
                <p className="mb-0">Mastering structured problem solving</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/programming">Programming</Link></li>
              <li className="current">Advanced CT</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* 1. Basic Data Structures */}
      <div className="container guide-content">
        <div className="section">
          <h2><i className="bi bi-diagram-2"></i> 1. Basic Data Structures</h2>

          <div className="ct-box">
            <p>
              Data structures are special ways to organize information so it can be used efficiently. Like choosing the right container for your stuff - you wouldn't use a shopping bag to store liquids!
            </p>

            <div className="alert alert-success">
              <i className="bi bi-lightbulb"></i> <b>Key Idea:</b> The right data structure makes solving problems easier, just like the right tool makes a job easier.
            </div>

            <div className="ct-concepts">
              <h3><i className="bi bi-diagram-3"></i> Common Structures</h3>
              <div className="ct-step">
                <span className="ct-step-number"><i className="bi bi-1-circle"></i></span>
                <b>Arrays/Lists:</b> Ordered collections where each item has a position (like a bookshelf)
              </div>
              <div className="ct-step">
                <span className="ct-step-number"><i className="bi bi-2-circle"></i></span>
                <b>Dictionaries:</b> Key-value pairs for quick lookups (like a real dictionary)
              </div>
              <div className="ct-step">
                <span className="ct-step-number"><i className="bi bi-3-circle"></i></span>
                <b>Sets:</b> Collections of unique items (like your friend list)
              </div>
            </div>

            <div className="ct-example">
              <h3><i className="bi bi-book"></i> Library Example</h3>
              <p>
                <b>Array:</b> Books ordered by shelf position [A1, A2, A3...]<br/>
                <b>Dictionary:</b> {`{ISBN: "Location"}`} for quick book finding<br/>
                <b>Set:</b> Unique genre tags {`{Mystery, SciFi, Romance}`}
              </p>
            </div>

            <div className="ct-quiz">
              <p><b>Quick Check:</b> Which data structure would best store student ID numbers where each must be unique?</p>
              
              <StaticQuizOption questionId="q1" option="A" isCorrect={false}>
                A) Array ordered by enrollment date
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="B" isCorrect={false}>
                B) Dictionary matching IDs to names
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="C" isCorrect={true}>
                C) Set of ID numbers
              </StaticQuizOption>
              <StaticQuizOption questionId="q1" option="D" isCorrect={false}>
                D) List sorted alphabetically
              </StaticQuizOption>
              
              <button className="ct-btn" onClick={() => checkStaticAnswer('q1', 'C')}>
                Check Answer
              </button>
              
              {staticAnswers.q1?.checked && (
                <div className={`ct-feedback ${staticAnswers.q1.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q1.isCorrect ? 
                    '✔️ Correct! Sets automatically enforce uniqueness, perfect for ID numbers.' :
                    '❌ While other options could work, Sets are specifically designed to handle unique collections most efficiently.'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Nested Iteration */}
      <div className="container guide-content">
        <div className="section">
          <h2><i className="bi bi-arrow-repeat"></i> 2. Nested Iteration</h2>

          <div className="ct-box">
            <p>
              Nested iteration means loops within loops - like searching every aisle and every shelf in a supermarket.
            </p>

            <div className="alert alert-success">
              <i className="bi bi-lightbulb"></i> <b>Key Idea:</b> Nested loops help systematically explore all combinations in multi-layered problems.
            </div>

            <div className="ct-example">
              <h3><i className="bi bi-calendar"></i> School Schedule Example</h3>
              <p>
                To plan all class combinations:<br/>
                <pre>{`for each grade_level:
    for each subject:
        for each classroom:
            create schedule`}</pre>
                This checks every possible combination systematically.
              </p>
            </div>

            <div className="ct-example">
              <h3><i className="bi bi-grid"></i> Multiplication Table</h3>
              <p>
                Creating a 10x10 table requires:<br/>
                <pre>{`for each row from 1 to 10:
    for each column from 1 to 10:
        calculate row × column`}</pre>
                The outer loop handles rows, the inner loop handles columns.
              </p>
            </div>

            <div className="ct-quiz">
              <p><b>Quick Check:</b> When would you NOT use nested iteration?</p>
              
              <StaticQuizOption questionId="q2" option="A" isCorrect={false}>
                A) Checking all seats in a theater (rows × columns)
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="B" isCorrect={false}>
                B) Finding all possible pizza toppings combinations
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="C" isCorrect={true}>
                C) Calculating a single student's test average
              </StaticQuizOption>
              <StaticQuizOption questionId="q2" option="D" isCorrect={false}>
                D) Searching through a 2D grid or map
              </StaticQuizOption>
              
              <button className="ct-btn" onClick={() => checkStaticAnswer('q2', 'C')}>
                Check Answer
              </button>
              
              {staticAnswers.q2?.checked && (
                <div className={`ct-feedback ${staticAnswers.q2.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q2.isCorrect ? 
                    '✔️ Right! A single average needs just one loop through the scores - no nesting required.' :
                    '❌ Nested iteration is for multi-dimensional problems. Simple averages only need one level of processing.'
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Binning */}
      <div className="container guide-content">
        <div className="section">
          <h2><i className="bi bi-collection"></i> 3. Binning</h2>

          <div className="ct-box">
            <p>
              Binning means grouping similar items together - like sorting laundry into color categories before washing.
            </p>

            <div className="alert alert-success">
              <i className="bi bi-lightbulb"></i> <b>Key Idea:</b> Binning helps simplify complex data by organizing it into meaningful categories.
            </div>

            <div className="ct-example">
              <h3><i className="bi bi-shop"></i> Grocery Store Example</h3>
              <p>
                Products are binned by:<br/>
                - Category (dairy, produce, frozen)<br/>
                - Price range ($1-$5, $5-$10 etc.)<br/>
                - Dietary needs (gluten-free, organic)<br/>
                This makes shopping and inventory much easier!
              </p>
            </div>

            <div className="ct-example">
              <h3><i className="bi bi-graph-up"></i> Data Analysis Example</h3>
              <p>
                Age groups for survey analysis:<br/>
                0-18 (Children)<br/>
                19-35 (Young Adults)<br/>
                36-55 (Adults)<br/>
                55+ (Seniors)<br/>
                Binning continuous data reveals patterns.
              </p>
            </div>

            <div className="ct-quiz">
              <p><b>Quick Check:</b> What's the main benefit of binning data?</p>
              
              <StaticQuizOption questionId="q3" option="A" isCorrect={false}>
                A) It makes all values exactly equal
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="B" isCorrect={true}>
                B) It reveals patterns by grouping similar items
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="C" isCorrect={false}>
                C) It permanently changes the original data
              </StaticQuizOption>
              <StaticQuizOption questionId="q3" option="D" isCorrect={false}>
                D) It always reduces the number of items
              </StaticQuizOption>
              
              <button className="ct-btn" onClick={() => checkStaticAnswer('q3', 'B')}>
                Check Answer
              </button>
              
              {staticAnswers.q3?.checked && (
                <div className={`ct-feedback ${staticAnswers.q3.isCorrect ? 'correct' : 'incorrect'}`}>
                  {staticAnswers.q3.isCorrect ? 
                    '✔️ Exactly! Binning helps us see trends and patterns that aren\'t obvious in raw data.' :
                    '❌ Binning organizes but doesn\'t modify original values or necessarily reduce item count - its power is in revealing meaningful groupings.'
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
          <h2>❓ Advanced Computational Thinking Quiz</h2>
          
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
      <div className="container guide-content">
        <div className="section" style={{ textAlign: 'center' }}>
          <h2>Ready for More?</h2>
          <p>Now that you understand these advanced CT concepts, try applying them to real problems!</p>
          <Link to="/ct/applications" className="btn btn-primary">
            See Practical Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTFoundation4;
