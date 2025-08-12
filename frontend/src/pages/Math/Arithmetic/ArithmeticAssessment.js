import React, { useState, useEffect } from 'react';

const ArithmeticAssessment = () => {
  // State variables that exactly match the HTML version
  const [selectedTopic, setSelectedTopic] = useState('decimals');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackIcon, setFeedbackIcon] = useState('');
  const [mathJaxLoaded, setMathJaxLoaded] = useState(false);
  const [showNextTopic, setShowNextTopic] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const topics = [
    
    { value: 'addition', label: 'Addition' },
    { value: 'subtraction', label: 'Subtraction' },
    { value: 'multiplication', label: 'Multiplication' },
    { value: 'division', label: 'Division' },
    { value: 'dealing-with-negative-sign', label: 'Dealing With Negative Sign' },
    { value: 'decimals', label: 'Decimals' },
    { value: 'fractions', label: 'Fractions' },
    { value: 'ratio-proportion-percentage', label: 'Ratio Proportion Percentage' }


  ];

  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;
  const totalRequiredQuestions = 20;

  // Load MathJax
  useEffect(() => {
    const loadMathJax = () => {
      if (window.MathJax) {
        setMathJaxLoaded(true);
        return;
      }

      window.MathJax = {
        tex: {
          inlineMath: [['\\(', '\\)'], ['$', '$']],
          displayMath: [['\\[', '\\]'], ['$$', '$$']],
          processEscapes: true,
          processEnvironments: true
        },
        startup: {
          ready: () => {
            setMathJaxLoaded(true);
            window.MathJax.startup.defaultReady();
          }
        }
      };

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
    };

    loadMathJax();
  }, []);

  // Initialize component - EXACTLY like HTML version
  useEffect(() => {
    setDebugInfo('Component mounted, fetching session info...');
    fetchSessionInfo();
  }, []);

  // Handle topic changes - EXACTLY like HTML version
  useEffect(() => {
    if (selectedTopic && userData.email) {
      setDebugInfo(`Topic changed to: ${selectedTopic}, resetting...`);
      resetForNewTopic();
    }
  }, [selectedTopic]);

  // MathJax rendering
  const renderMathJax = () => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      setTimeout(() => {
        window.MathJax.typesetPromise().then(() => {
          console.log('MathJax rendered successfully');
        }).catch((err) => {
          console.error('MathJax rendering error:', err);
        });
      }, 100);
    }
  };

  const resetForNewTopic = async () => {
    setCurrentQuestion(null);
    setSelectedOption(null);
    setShowExplanation(false);
    setDifficultyLevel('easy');
    setConsecutiveCorrect(0);
    setConsecutiveWrong(0);
    setProgress(0);
    setShowNextTopic(false);
    setFeedbackMessage('');
    
    // FIXED: Wait for score data to be fetched, then fetch question with the updated data
    await fetchScoreDataAndQuestion();
  };

  // EXACT replica of HTML fetchSessionInfo function
  const fetchSessionInfo = async () => {
    try {
      setDebugInfo('Fetching session info...');
      const response = await fetch(`${API_BASE_URL}/session-info`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserData({ username: data.username, email: data.email });
        setDebugInfo(`Session loaded: ${data.username} (${data.email})`);
        console.log(data.username, data.email);
        
        // FIXED: Use the combined function to ensure proper sequencing
        await fetchScoreDataAndQuestion();
      } else {
        setDebugInfo('Failed to fetch session info');
        console.error('Failed to fetch session info');
      }
    } catch (error) {
      setDebugInfo(`Session error: ${error.message}`);
      console.error('Error fetching session info:', error);
    }
  };

  // FIXED: Combined function to ensure proper sequencing like HTML
  const fetchScoreDataAndQuestion = async () => {
    let currentAnsweredQuestions = [];
    let currentDifficultyLevel = 'easy';
    let currentConsecutiveCorrect = 0;
    let currentProgress = 0;

    try {
      setDebugInfo(`Fetching scores for ${userData.email}, topic: ${selectedTopic}`);
      const response = await fetch(`${API_BASE_URL}/algebra_scores?email=${userData.email}&topic=${selectedTopic}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("scores are: ", data, userData.email, selectedTopic);
        
        if (data.length > 0) {
          const topicData = data[0].topics.find(t => t.topic === selectedTopic);
          if (topicData) {
            // EXACTLY like HTML version - get answered questions
            currentAnsweredQuestions = topicData.answeredQuestions || [];
            console.log("Found answered questions:", currentAnsweredQuestions);
            
            // Determine starting level
            if (topicData.questions && topicData.questions.length > 0) {
              const lastThreeQuestions = topicData.questions.slice(-3);
              if (lastThreeQuestions.length === 3 && lastThreeQuestions.every(q => q.correct)) {
                const lastLevel = lastThreeQuestions[0].difficultyLevel;
                if (lastLevel === 'easy') {
                  currentDifficultyLevel = 'medium';
                } else if (lastLevel === 'medium') {
                  currentDifficultyLevel = 'hard';
                } else if (lastLevel === 'hard') {
                  currentDifficultyLevel = 'mastered';
                }
              } else if (lastThreeQuestions.length > 0) {
                currentDifficultyLevel = lastThreeQuestions[0].difficultyLevel;
                currentConsecutiveCorrect = lastThreeQuestions.filter(q => q.correct).length;
              }
            }
            
            // Calculate progress
            if (topicData.questions) {
              const correctAnswers = topicData.questions.filter(q => q.correct).length;
              currentProgress = (correctAnswers / totalRequiredQuestions) * 100;
            }
          }
        }
      } else {
        console.error('Failed to fetch score data');
      }
    } catch (error) {
      console.error('Error fetching score data:', error);
    }

    // Update all state at once
    setAnsweredQuestions(currentAnsweredQuestions);
    setDifficultyLevel(currentDifficultyLevel);
    setConsecutiveCorrect(currentConsecutiveCorrect);
    setProgress(currentProgress);
    
    setDebugInfo(`Found ${currentAnsweredQuestions.length} answered questions: ${currentAnsweredQuestions.join(', ')}`);

    // Now fetch question with the correct answered questions
    await fetchQuestionWithAnsweredQuestions(currentAnsweredQuestions, currentDifficultyLevel);
  };

  // FIXED: Fetch question with specific answered questions to avoid state timing issues
  const fetchQuestionWithAnsweredQuestions = async (answeredQuestionsArray, currentDifficulty) => {
    setShowExplanation(false);
    setSelectedOption(null);
    setFeedbackMessage('');
    setShowNextTopic(false);

    if (currentDifficulty === 'mastered') {
      setShowNextTopic(true);
      setDebugInfo('Topic is mastered');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/algebra_questions?topic=${selectedTopic}&difficultyLevel=${currentDifficulty}`);
      const questions = await response.json();

      console.log("All questions received:", questions.map(q => q._id));
      console.log("Using answered questions:", answeredQuestionsArray);

      // EXACTLY like HTML version - use the passed array instead of state
      const availableQuestions = questions.filter(q => !answeredQuestionsArray.includes(q._id));
      
      console.log("Available questions after filtering:", availableQuestions.map(q => q._id));
      setDebugInfo(`${availableQuestions.length} questions available out of ${questions.length} total`);

      if (availableQuestions.length > 0) {
        const question = availableQuestions[0];
        setCurrentQuestion(question);
        setDebugInfo(`Question loaded: ${question._id}`);
        displayQuestion(question);
      } else {
        setDebugInfo('No more questions available for this topic');
        if (currentDifficulty === 'easy') {
          setDifficultyLevel('medium');
          await fetchQuestionWithAnsweredQuestions(answeredQuestionsArray, 'medium');
        } else if (currentDifficulty === 'medium') {
          setDifficultyLevel('hard');
          await fetchQuestionWithAnsweredQuestions(answeredQuestionsArray, 'hard');
        } else {
          setDifficultyLevel('mastered');
          setShowNextTopic(true);
        }
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple fetchQuestion that uses current state
  const fetchQuestion = async () => {
    await fetchQuestionWithAnsweredQuestions(answeredQuestions, difficultyLevel);
  };

  // EXACT replica of HTML displayQuestion function
  const displayQuestion = (question) => {
    setSelectedOption(null);
    setTimeout(() => {
      renderMathJax();
    }, 100);
  };

  // EXACT replica of HTML selectOption function
  const selectOption = (optionKey, isCorrect) => {
    setSelectedOption({
      key: optionKey,
      correct: isCorrect,
      text: currentQuestion.options[optionKey]
    });
    
    setTimeout(() => {
      renderMathJax();
    }, 50);
  };

  // EXACT replica of HTML showExplanation function
  const submitAnswer = async () => {
    if (!selectedOption || !currentQuestion) return;

    const correct = selectedOption.correct;
    
    // EXACTLY like HTML: add to answeredQuestions immediately
    const newAnsweredQuestions = [...answeredQuestions, currentQuestion._id];
    setAnsweredQuestions(newAnsweredQuestions);
    console.log("Updated answeredQuestions:", newAnsweredQuestions);

    const payload = {
      username: userData.username,
      email: userData.email,
      topic: selectedTopic,
      questionId: currentQuestion._id,
      answer: selectedOption.text,
      correct,
      difficultyLevel
    };

    console.log("Submitting score data:", payload);

    await fetch(`${API_BASE_URL}/algebra_score_add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setShowExplanation(true);

    if (correct) {
      setFeedbackMessage("Hurray!! You've got the correct answer!");
      setFeedbackIcon("fas fa-smile text-success");
      setConsecutiveCorrect(prev => prev + 1);
      setConsecutiveWrong(0);
    } else {
      setFeedbackMessage("Oops! That's not correct.");
      setFeedbackIcon("fas fa-frown text-danger");
      setConsecutiveCorrect(0);
      setConsecutiveWrong(prev => prev + 1);
    }

    setTimeout(() => {
      renderMathJax();
    }, 100);

    // EXACTLY like HTML: promotion logic
    const newConsecutiveCorrect = correct ? consecutiveCorrect + 1 : 0;
    if (newConsecutiveCorrect === 3) {
      if (difficultyLevel === 'easy') {
        setDifficultyLevel('medium');
      } else if (difficultyLevel === 'medium') {
        setDifficultyLevel('hard');
      } else if (difficultyLevel === 'hard') {
        setDifficultyLevel('mastered');
        setShowNextTopic(true);
      }
      setConsecutiveCorrect(0);
    }

    // Demotion logic
    const newConsecutiveWrong = correct ? 0 : consecutiveWrong + 1;
    if (newConsecutiveWrong === 3) {
      if (difficultyLevel === 'hard') {
        setDifficultyLevel('medium');
      } else if (difficultyLevel === 'medium') {
        setDifficultyLevel('easy');
      }
      setConsecutiveCorrect(0);
      setConsecutiveWrong(0);
    }

    updateProgress(correct);
  };

  // EXACT replica of HTML updateProgress function
  const updateProgress = (correct) => {
    if (correct) {
      const newProgress = progress + (1 / totalRequiredQuestions) * 100;
      const clampedProgress = Math.min(newProgress, 100);
      setProgress(clampedProgress);
    }
  };

  const nextQuestion = () => {
    fetchQuestion();
  };

  const nextTopic = () => {
    const currentIndex = topics.findIndex(t => t.value === selectedTopic);
    if (currentIndex < topics.length - 1) {
      setSelectedTopic(topics[currentIndex + 1].value);
    } else {
      setSelectedTopic(topics[0].value);
    }
  };

  // Styles exactly matching HTML version
  const cardStyle = {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    margin: '0 auto'
  };

  const progressBarStyle = {
    position: 'static',
    marginBottom: '20px',
    width: '100%',
    height: '25px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: '#5fcf80',
    width: `${progress}%`,
    transition: 'width 0.5s'
  };

  const optionButtonStyle = (optionKey) => {
    let baseStyle = {
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid #ddd',
      transition: 'background-color 0.3s, color 0.3s',
      width: '100%',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '5px',
      cursor: 'pointer'
    };

    if (showExplanation) {
      if (optionKey === currentQuestion.correctOption) {
        baseStyle.backgroundColor = 'green';
        baseStyle.color = 'white';
      } else if (selectedOption?.key === optionKey && !selectedOption.correct) {
        baseStyle.backgroundColor = 'red';
        baseStyle.color = 'white';
      }
    } else if (selectedOption?.key === optionKey) {
      baseStyle.backgroundColor = '#5fcf80';
      baseStyle.color = 'white';
    }

    return baseStyle;
  };

  const buttonStyle = {
    backgroundColor: '#5fcf80',
    borderColor: '#5fcf80',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    margin: '10px 5px',
    cursor: 'pointer'
  };

  if (difficultyLevel === 'mastered') {
    return (
      <>
        {/* Page Title Section */}
        <div className="page-title" data-aos="fade" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Arithmetic Assessment</h1>
                  <p className="mb-0">
                    Congratulations! You have mastered {topics.find(t => t.value === selectedTopic)?.label}! 
                    Continue your learning journey with our comprehensive arithmetic resources and interactive lessons.
                  </p>
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
                <li className="current">Assessment</li>
              </ol>
            </div>
          </nav>
        </div>

        <main className="main" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
          <div style={cardStyle}>
            <h2>Congratulations! You have mastered this topic.</h2>
            <button onClick={nextTopic} style={buttonStyle}>Next Topic</button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Page Title Section */}
      <div className="page-title" data-aos="fade" style={{marginBottom: '2rem'}}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Arithmetic Assessment</h1>
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
              <li className="current">Assessment</li>
            </ol>
          </div>
        </nav>
      </div>

      <main className="main" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
        <div style={cardStyle}>
          {/* Progress Bar */}
          <label htmlFor="progress-fill" className="h5" style={{display: 'block', textAlign: 'left', marginBottom: '10px', fontWeight: '600', color: '#007bff'}}>
            <i className="fas fa-trophy" style={{marginRight: '8px', color: '#FFD700', fontSize: '1.2em'}}></i> Mastery Meter
          </label>
          <div style={progressBarStyle}>
            <div style={progressFillStyle}></div>
          </div>

          {/* Topic Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              📚 Select Topic:
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: 'white',
                minWidth: '200px'
              }}
              disabled={isLoading}
            >
              {topics.map(topic => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
          </div>

         
          {/* Question Container */}
          {!userData.email ? (
            <div>
              <p style={{ color: '#ef4444', fontSize: '1.1rem' }}>Please login to access the assessment</p>
              <button onClick={fetchSessionInfo} style={buttonStyle}>Check Session</button>
            </div>
          ) : isLoading ? (
            <div>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading question...</p>
            </div>
          ) : currentQuestion ? (
            <>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>
                Difficulty: {difficultyLevel}
              </p>
              
              <p className="h4" style={{marginBottom: '20px'}} dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => selectOption(key, key === currentQuestion.correctOption)}
                    disabled={showExplanation}
                    style={optionButtonStyle(key)}
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
                ))}
              </div>

              {!showExplanation && selectedOption && (
                <button onClick={submitAnswer} style={buttonStyle}>Submit</button>
              )}

              {showExplanation && (
                <div style={{ marginTop: '20px' }}>
                  <p className="mt-3" dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }} />
                  
                  {!selectedOption?.correct && (
                    <p className="mt-2" style={{ color: 'green' }}>
                      Correct Option: <span dangerouslySetInnerHTML={{ __html: currentQuestion.options[currentQuestion.correctOption] }} />
                    </p>
                  )}
                  
                  <button onClick={nextQuestion} style={buttonStyle}>Next</button>
                  
                  <div className="mt-3" style={{ fontSize: '1.2em' }}>
                    <i className={feedbackIcon}></i> <span>{feedbackMessage}</span>
                  </div>

                  {showNextTopic && (
                    <button onClick={nextTopic} style={{...buttonStyle, backgroundColor: '#007bff'}}>Next Topic</button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div>
              <p>No questions available for this topic and difficulty level.</p>
              <button onClick={fetchQuestion} style={buttonStyle}>Try Again</button>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .fas {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
        }
        .text-success {
          color: #28a745 !important;
        }
        .text-danger {
          color: #dc3545 !important;
        }
      `}</style>
    </>
  );
};

export default ArithmeticAssessment;
