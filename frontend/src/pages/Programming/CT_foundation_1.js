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
const CTFoundation = () => {
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
      const response = await fetch('http://3.111.49.131:4000/api/CT_finger?topic=CT_foundation');
      
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
      const response = await fetch(`http://3.111.49.131:4000/api/CT_finger_scores/${email}/CT_foundation`, {
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
        topic: 'CT_foundation',
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
        topic: 'CT_foundation',
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
                    <p className="mb-0">Learn to solve problems like a computer scientist!</p>
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

      {/* 1. What is Computational Thinking? */}
      <div className="container">
        <div className="section">
          <h2>🖥️ 1. What is Computational Thinking?</h2>

          <div className="ct-box">
            <p>
              Computation are used in daily life without even realizing it. When we search for things—like groceries in a shop, a book on a shelf, or a file in a folder—we follow a method we've learned. Even when we make a to-do list and check off each task, we are using step-by-step thinking to stay organized and complete our work.
            </p>

            <div className="alert alert-success">
              <strong>💡 Key Idea:</strong> You don't need a computer to use computational thinking! It's a problem-solving method we can use everywhere.
            </div>

            <div className="ct-example">
              <h3>☕ Routine Example: Morning Routine</h3>
              <p>
                Your morning routine uses computational thinking: (1) Wake up, (2) Brush teeth, (3) Get dressed, (4) Eat breakfast. If you do these steps out of order (like eating before brushing), things don't work as well!
              </p>
            </div>

            <div className="ct-example">
              <h3>📚 Library Example: Finding a Book</h3>
              <p>
                To find a book: (1) Decide what you like, (2) Check the catalog, (3) Note the shelf number, (4) Follow signs to the section. This step-by-step approach helps you find books efficiently among thousands!
              </p>
            </div>

            <div className="ct-concepts">
              <h3>🔧 The 4 Super Skills</h3>
              <div className="ct-step">
                <strong>1. Breaking Down:</strong> Dividing big problems into smaller, manageable pieces
              </div>
              <div className="ct-step">
                <strong>2. Pattern Recognition:</strong> Finding similarities that help solve problems faster
              </div>
              <div className="ct-step">
                <strong>3. Focusing on Main Details:</strong> Identifying what's truly important to solve the problem
              </div>
              <div className="ct-step">
                <strong>4. Creating Clear Steps:</strong> Writing instructions so clear anyone could follow them
              </div>
            </div>

            <div className="ct-vocab">
              <h3>📖 CT Dictionary</h3>
              <p><strong>Computational Thinking:</strong> A method for solving problems by organizing thoughts systematically</p>
              <p><strong>Algorithm:</strong> A set of clear steps to solve a problem (like a recipe)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Breaking Down Problems */}
      <div className="container">
        <div className="section">
          <h2>🧩 2. Breaking Down Problems</h2>

          <div className="ct-box">
            <h3>💡 Why It Matters</h3>
            <p>Big problems feel overwhelming! Breaking them into smaller pieces makes them manageable - like eating a pizza slice by slice instead of whole.</p>

            <div className="ct-example">
              <h3>🏠 Example: Cleaning Your Room</h3>
              <p>
                Instead of "clean room" (too big!):<br/>
                (1) Pick up clothes, (2) Organize books, (3) Make bed, (4) Sweep floor.<br/>
                Each small task feels achievable!
              </p>
            </div>

            <div className="ct-example">
              <h3>🧮 Math Example: Solving 25 × 4</h3>
              <p>
                Use the distributive property: <br/>
                25 × 4 = (20 + 5) × 4 <br/>
                = (20 × 4) + (5 × 4) <em>(Distributive Property: a × (b + c) = a × b + a × c)</em><br/>
                = 80 + 20 <br/>
                = <strong>100</strong><br/>
                Breaking numbers makes the calculation easier!
              </p>
            </div>
          </div>

          <div className="ct-vocab">
            <h3>📖 CT Dictionary</h3>
            <p><strong>Decomposition:</strong> Breaking problems into smaller parts</p>
            <p><strong>Sub-task:</strong> One piece of a larger problem</p>
          </div>

          <div className="ct-quiz">
            <p><strong>Quick Check:</strong> What's the BEST way to solve this problem: "A box has 3 rows with 5 apples in each row. How many apples are there in total?"</p>
            
            <StaticQuizOption questionId="q1" option="A" isCorrect={false}>
              A) Add 3 + 5, then multiply by 3
            </StaticQuizOption>
            <StaticQuizOption questionId="q1" option="B" isCorrect={false}>
              B) Draw 15 apples and count them one by one
            </StaticQuizOption>
            <StaticQuizOption questionId="q1" option="C" isCorrect={true}>
              C) Break it down: 3 rows × 5 apples = 15 apples
            </StaticQuizOption>
            <StaticQuizOption questionId="q1" option="D" isCorrect={false}>
              D) Subtract 5 from 3, then multiply by 5
            </StaticQuizOption>
            
            <button className="button" onClick={() => checkStaticAnswer('q1', 'C')}>
              Check Answer
            </button>
            
            {staticAnswers.q1?.checked && (
              <div className={`ct-feedback ${staticAnswers.q1.isCorrect ? 'correct' : 'incorrect'}`}>
                {staticAnswers.q1.isCorrect ? 
                  '✔️ Excellent! Breaking the problem into multiplication (3×5) is the most efficient way to solve it.' :
                  '❌ Nice try! The other methods are confusing or unnecessarily complicated. The best way is to multiply 3 rows by 5 apples per row: 3×5 = 15 apples.'
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Finding Patterns */}
      <div className="container">
        <div className="section">
          <h2>🔍 3. Pattern Recognition</h2>

          <div className="ct-box">
            <h3>💡 Why It Matters</h3>
            <p>
              Finding patterns helps solve new problems faster by applying what worked for similar problems before. By recognizing these patterns, we can predict solutions without starting from scratch every time.
            </p>

            <div className="ct-example">
              <h3>🛒 Shopping Example</h3>
              <p>
                At the store, you notice:<br/><br/>
                - Fruits are always in aisle 1<br/>
                - Cereals are in aisle 4<br/><br/>
                This pattern helps you shop faster!
              </p>
            </div>

            <div className="ct-example">
              <h3>📅 Daily Routine Example</h3>
              <p>
                Notice that:<br/><br/>
                - Math class always comes after lunch<br/>
                - Library day is every Tuesday<br/><br/>
                Recognizing these patterns helps you prepare!
              </p>
            </div>
          </div>

          <div className="ct-vocab">
            <h3>📖 CT Dictionary</h3>
            <p><strong>Pattern:</strong> When things repeat in a predictable way</p>
            <p><strong>Generalization:</strong> Applying patterns to solve similar problems</p>
          </div>

          <div className="ct-quiz">
            <p><strong>Quick Check:</strong> What number comes next in this pattern?<br/>
               1, 4, 9, 16, 25, ?</p>
            
            <StaticQuizOption questionId="q2" option="A" isCorrect={false}>
              A) 30
            </StaticQuizOption>
            <StaticQuizOption questionId="q2" option="B" isCorrect={false}>
              B) 35
            </StaticQuizOption>
            <StaticQuizOption questionId="q2" option="C" isCorrect={false}>
              C) 38
            </StaticQuizOption>
            <StaticQuizOption questionId="q2" option="D" isCorrect={true}>
              D) 36
            </StaticQuizOption>
            
            <button className="button" onClick={() => checkStaticAnswer('q2', 'D')}>
              Check Answer
            </button>
            
            {staticAnswers.q2?.checked && (
              <div className={`ct-feedback ${staticAnswers.q2.isCorrect ? 'correct' : 'incorrect'}`}>
                {staticAnswers.q2.isCorrect ? 
                  '✔️ Great job! These numbers are perfect squares: 1², 2², 3², and so on. So, the next is 6² = 36.' :
                  '❌ Oops! Look again. The pattern follows square numbers (1×1, 2×2, 3×3…). Recognizing these number patterns is a key part of solving problems faster!'
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Focus on What Matters */}
      <div className="container">
        <div className="section">
          <h2>🎯 4. Focusing on Main Details</h2>

          <div className="ct-box">
            <h3>💡 Why It Matters</h3>
            <p>Problems often have extra information that distracts from what's truly important to find the solution.</p>

            <div className="ct-example">
              <h3>📍 Example: Giving Directions</h3>
              <p>
                To direct someone:<br/>
                ✅ Important: "Turn left at the big red bank"<br/>
                ✅ Important: "Turn right at the traffic light, and your destination will be on the left."<br/>
                ❌ Not important: "There's a cute dog that barks there sometimes"
              </p>
            </div>

            <div className="ct-example">
              <h3>🛒 Shopping Example: Buying Cereal</h3>
              <p>
                When choosing cereal:<br/>
                ✅ Important: Price, ingredients, nutrition<br/>
                ✅ Important: Brand reputation or customer reviews<br/>
                ❌ Not important: Box design, shelf placement
              </p>
            </div>
          </div>

          <div className="ct-vocab">
            <h3>📖 CT Dictionary</h3>
            <p><strong>Abstraction:</strong> Focusing only on details that matter for the solution</p>
            <p><strong>Filtering:</strong> Ignoring unnecessary information</p>
          </div>

          <div className="ct-quiz">
            <p><strong>Quick Check:</strong> For this math problem: "Rahul has 3 cats. Each cat eats 2 meals daily. How many meals total?", what information is NOT needed?</p>
            
            <StaticQuizOption questionId="q3" option="A" isCorrect={true}>
              A) The cats' names
            </StaticQuizOption>
            <StaticQuizOption questionId="q3" option="B" isCorrect={false}>
              B) Number of cats (3)
            </StaticQuizOption>
            <StaticQuizOption questionId="q3" option="C" isCorrect={false}>
              C) Meals per cat (2)
            </StaticQuizOption>
            <StaticQuizOption questionId="q3" option="D" isCorrect={false}>
              D) The word "total"
            </StaticQuizOption>
            
            <button className="button" onClick={() => checkStaticAnswer('q3', 'A')}>
              Check Answer
            </button>
            
            {staticAnswers.q3?.checked && (
              <div className={`ct-feedback ${staticAnswers.q3.isCorrect ? 'correct' : 'incorrect'}`}>
                {staticAnswers.q3.isCorrect ? 
                  '✔️ Perfect! The cats\' names don\'t help solve the math problem. Good abstraction means focusing only on the numbers needed for calculation (3 cats × 2 meals).' :
                  '❌ Let\'s analyze: While "total" seems like just a word, it actually tells us we need to add/multiply. The numbers (3 cats, 2 meals) are clearly needed. The cats\' names are irrelevant to calculating meal quantities - this is the kind of detail we learn to filter out when focusing on what matters.'
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Plan Step by Step */}
      <div className="container">
        <div className="section">
          <h2>✅ 5. Creating Clear Steps</h2>

          <div className="ct-box">
            <h3>💡 Why It Matters</h3>
            <p>Clear, ordered steps prevent mistakes and ensure anyone (or a computer) can follow the solution.</p>

            <div className="ct-example">
              <h3>⏰ Example: Brushing Teeth</h3>
              <p>
                Correct order:<br/>
                1. Wet toothbrush<br/>
                2. Add toothpaste<br/>
                3. Brush teeth<br/>
                4. Rinse mouth<br/>
                Doing these out of order doesn't work!
              </p>
            </div>

            <div className="ct-example">
              <h3>🚦 Example: Crossing the Road</h3>
              <p>
                Safe steps:<br/>
                1. Stop at curb<br/>
                2. Look left-right-left<br/>
                3. Cross when clear<br/>
                4. Keep looking while crossing<br/>
                Clear steps prevent accidents!
              </p>
            </div>
          </div>

          <div className="ct-vocab">
            <h3>📖 CT Dictionary</h3>
            <p><strong>Algorithm:</strong> A set of clear, ordered instructions to solve a problem</p>
            <p><strong>Sequence:</strong> The specific order steps must follow</p>
          </div>

          <div className="ct-quiz">
            <p><strong>Quick Check:</strong> What's the BEST set of instructions for planting a seed?</p>
            
            <StaticQuizOption questionId="q4" option="A" isCorrect={false}>
              A) "Just put it in dirt and hope"
            </StaticQuizOption>
            <StaticQuizOption questionId="q4" option="B" isCorrect={false}>
              B) "Do whatever looks right"
            </StaticQuizOption>
            <StaticQuizOption questionId="q4" option="C" isCorrect={true}>
              C) "1. Dig hole 2. Put seed in 3. Cover with soil 4. Water lightly"
            </StaticQuizOption>
            <StaticQuizOption questionId="q4" option="D" isCorrect={false}>
              D) "Ask a plant to grow itself"
            </StaticQuizOption>
            
            <button className="button" onClick={() => checkStaticAnswer('q4', 'C')}>
              Check Answer
            </button>
            
            {staticAnswers.q4?.checked && (
              <div className={`ct-feedback ${staticAnswers.q4.isCorrect ? 'correct' : 'incorrect'}`}>
                {staticAnswers.q4.isCorrect ? 
                  '✔️ Perfect! Numbered, clear steps in the right order make the best algorithm. This ensures the seed has the best chance to grow because each step prepares for the next.' :
                  '❌ Think about recipes - they work because steps are clear and ordered. Planting needs specific preparation (digging) before placing the seed, then protection (covering), then care (watering). Skipping or rearranging steps (like watering before putting seed in) wouldn\'t work well.'
                }
              </div>
            )}
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
          <p>Now that you understand the basics of Computational Thinking, let's explore further topics in Computational Thinking!</p>
          <a href="ct-foundation-1" className="btn btn-primary">
            Continue to Next Lesson
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTFoundation;
