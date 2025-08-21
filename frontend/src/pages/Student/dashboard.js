import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/css/main.css';
import '../../assets/css/breadcrumb.css';

// Initialize GLightbox if needed
import 'glightbox/dist/css/glightbox.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    name: ''
  });
  const [userStreak, setUserStreak] = useState(0);
  const [quizCounts, setQuizCounts] = useState({
    math: 0,
    rc: 0,
    vocab: 0,
    prog: 0
  });
  const [vocabScores, setVocabScores] = useState({ assessments: [] });
  const [mathTopics, setMathTopics] = useState([]);
  // Mathematics specific state (added from the math section)
  const [diagnosticData, setDiagnosticData] = useState({
    preTest: null,
    postTest: null
  });
  const [fingerExercises, setFingerExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [classroomName, setClassroomName] = useState('');
  const [rcData, setRcData] = useState(null);
  const [programmingData, setProgrammingData] = useState(null);
  const [ctFingerData, setCTFingerData] = useState({ quizzes: [] });
  const [progFingerData, setProgFingerData] = useState({ topics: [] });
  const [loading, setLoading] = useState(true);

  const chartRefs = useRef({});

  // API Helper function
  const apiCall = async (url, options = {}) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API call failed for ${url}:`, error);
      return null;
    }
  };

  // Calculate streak
  const calculateStreak = (loginHistory) => {
    const uniqueDays = new Set(
      loginHistory.map(entry => new Date(entry.loginTimestamp).setHours(0, 0, 0, 0))
    );
    const sortedLogins = Array.from(uniqueDays).sort((a, b) => b - a);
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedLogins.length; i++) {
      const expectedDate = new Date(today - i * 86400000);
      if (sortedLogins[i] === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Fetch user streak
  const fetchUserStreak = async (email) => {
    const data = await apiCall(`/api/login-history?email=${email}`);
    if (data && data.loginHistory) {
      const streak = calculateStreak(data.loginHistory);
      setUserStreak(streak);
      return streak;
    }
    return 0;
  };

  // Fetch vocabulary scores
  const fetchVocabScores = async (email) => {
    const data = await apiCall(`/api/vocabscores?email=${email}`);
    setVocabScores(data || { assessments: [] });
  };

  // Fetch math topics scores
  const fetchMathTopicsScores = async (email) => {
    const data = await apiCall(`/api/algebra_scores?email=${email}`);
    if (data && Array.isArray(data) && data.length > 0) {
      setMathTopics(data[0].topics || []);
    }
  };

  const fetchMathDiagnostics = async (email) => {
    try {
      const response = await apiCall(`/api/mathematicsDiagnosticsAnalytics?email=${email}`);
     
      if (response && response.success && Array.isArray(response.data)) {
        // Find the most recent pre and post tests
        const sortedData = response.data.sort((a, b) => 
          new Date(b.testDate) - new Date(a.testDate)
        );
        
        const preTest = sortedData.find(test => test.testPhase === 'pre');
        const postTest = sortedData.find(test => test.testPhase === 'post');
         
        
        setDiagnosticData({ preTest, postTest });
        
        return { preTest, postTest };
      } else {
        
        return null;
      }
    } catch (error) {
      
      return null;
    }
  };

  // NEW: Fetch finger exercises
  const fetchFingerExercises = async (email) => {
    try {
      const response = await apiCall(`/api/arithmetic-scores?userEmail=${email}`);
      
      // Handle both array and object responses
      let exercisesData = [];
      if (Array.isArray(response)) {
        exercisesData = response;
      } else if (response && typeof response === 'object' && !response.questionsAttempted) {
        // This handles when the API returns multiple exercises as object properties
        exercisesData = Object.values(response);
      } else if (response) {
        // This handles when the API returns a single exercise
        exercisesData = [response];
      }

      // Transform data with proper fallbacks
      const transformedData = exercisesData
        .filter(ex => ex && ex.operationType) // Ensure we have valid exercises with operationType
        .map((item) => ({
          _id: item._id,
          operationType: item.operationType,
          correctAnswers: item.correctAnswers || 0,
          totalQuestions: item.totalQuestions || (item.questionsAttempted?.length || 0),
          ...item
        }))
        .filter(ex => ex.totalQuestions > 0); // Only include exercises with attempts

      
      setFingerExercises(transformedData);
      
      if (transformedData.length > 0) {
        setSelectedExercise(transformedData[0].operationType);
      } else {
        setSelectedExercise('');
      }
      
      return transformedData;
    } catch (error) {
      setFingerExercises([]);
      setSelectedExercise('');
      return [];
    }
  };

  // Fetch RC scores
  const fetchRCScores = async (email) => {
    const data = await apiCall(`/api/readingcomprehensionscore?email=${email}`);
    setRcData(data);
  };

  // Fetch programming scores
  const fetchProgrammingScores = async (email) => {
    const data = await apiCall(`/api/programming?email=${email}`);
    setProgrammingData(data);
  };

  // Fetch CT finger exercises
  const fetchCTFingerExercises = async (email) => {
    const data = await apiCall(`/api/CT_finger_scores/${email}`);
    setCTFingerData(data || { quizzes: [] });
  };

  // Fetch programming finger exercises
  const fetchProgrammingFingerExercises = async (email) => {
    const data = await apiCall(`/api/finger-exercise?email=${email}`);
    setProgFingerData(data || { topics: [] });
  };

  // Calculate completed topics for programming
  const calculateCompletedTopics = async (email) => {
    let progQuizCount = 0;
    let ctTopics = new Set();
    let progTopics = new Set();

    try {
      const progData = await apiCall(`/api/programming?email=${email}`);
      if (progData && progData.quizzes && progData.quizzes.length > 0) {
        progQuizCount = 1;
      }
    } catch (err) {
      console.warn("Error fetching programming quizzes:", err);
    }

    try {
      const ctData = await apiCall(`/api/CT_finger_scores/${email}`);
      const quizzes = ctData?.quizzes || ctData || [];
      quizzes.forEach(quiz => {
        if (quiz.topic) ctTopics.add(quiz.topic);
      });
    } catch (err) {
      console.warn("Error fetching CT finger scores:", err);
    }

    try {
      const fingerData = await apiCall(`/api/finger-exercise?email=${email}`);
      const topics = fingerData?.topics || fingerData || [];
      topics.forEach(topic => {
        if (topic.topicName) progTopics.add(topic.topicName);
      });
    } catch (err) {
      console.warn("Error fetching programming finger exercises:", err);
    }

    return progQuizCount + ctTopics.size + progTopics.size;
  };

  // Fetch quiz counts
  const fetchQuizCounts = async (email) => {
    try {
      // Math count (includes algebra topics + diagnostics + finger exercises)
      const algebraData = await apiCall(`/api/algebra_scores?email=${email}`);
      const algebraCount = Array.isArray(algebraData) && algebraData.length > 0 
        ? algebraData.reduce((count, entry) => count + (entry.topics ? entry.topics.length : 0), 0)
        : 0;

      // Get diagnostic count
      const diagnosticResponse = await apiCall(`/api/mathematicsDiagnosticsAnalytics?email=${email}`);
      let diagnosticCount = 0;
      if (diagnosticResponse && diagnosticResponse.success && Array.isArray(diagnosticResponse.data)) {
        const sortedData = diagnosticResponse.data.sort((a, b) => 
          new Date(b.testDate) - new Date(a.testDate)
        );
        const preTest = sortedData.find(test => test.testPhase === 'pre');
        const postTest = sortedData.find(test => test.testPhase === 'post');
        diagnosticCount = (preTest ? 1 : 0) + (postTest ? 1 : 0);
      }

      // Get finger exercises count
      const fingerResponse = await apiCall(`/api/arithmetic-scores?userEmail=${email}`);
      let fingerCount = 0;
      if (fingerResponse) {
        let exercisesData = [];
        if (Array.isArray(fingerResponse)) {
          exercisesData = fingerResponse;
        } else if (fingerResponse && typeof fingerResponse === 'object' && !fingerResponse.questionsAttempted) {
          exercisesData = Object.values(fingerResponse);
        } else if (fingerResponse) {
          exercisesData = [fingerResponse];
        }
        fingerCount = exercisesData
          .filter(ex => ex && ex.operationType && (ex.totalQuestions || ex.questionsAttempted?.length) > 0)
          .length;
      }

      const totalMathCount = algebraCount + diagnosticCount + fingerCount;


      // Vocab count
      const vocabData = await apiCall(`/api/vocabscores?email=${email}`);
      const vocabCount = vocabData?.assessments ? vocabData.assessments.length : 0;

      // RC count
      const rcData = await apiCall(`/api/readingcomprehensionscore?email=${email}`);
      const rcCount = rcData?.topics 
        ? Object.values(rcData.topics).reduce((total, topic) => total + (topic.solvedPassages ? topic.solvedPassages.length : 0), 0)
        : 0;

      // Programming count
      const progCount = await calculateCompletedTopics(email);

      setQuizCounts({
        math: totalMathCount,
        vocab: vocabCount,
        rc: rcCount,
        prog: progCount
      });
    } catch (error) {
      console.error('Error fetching quiz counts:', error);
    }
  };

   // Create doughnut chart
  const createDoughnutChart = (canvasId, correctAnswers, incorrectAnswers) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear any existing chart
    if (chartRefs.current[canvasId]) {
      chartRefs.current[canvasId].destroy();
    }

    chartRefs.current[canvasId] = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [{
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ['#1C4E80', '#A5D8DD'],
          hoverBackgroundColor: ['#1C4E80', '#A5D8DD'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
        }
      }
    });
  };

  // NEW: Chart update effect for finger exercises
  useEffect(() => {
    // Don't try to render chart while still loading
    if (loading) {
      return;
    }

    // If no exercises available, show no data message
    if (fingerExercises.length === 0) {

      const canvasId = 'finger-exercise-chart';
      const canvas = document.getElementById(canvasId);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add a message when no data is available
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No data available', canvas.width/2, canvas.height/2);
      }
      return;
    }

    // Set default exercise if none selected
    if (!selectedExercise && fingerExercises.length > 0) {
      setSelectedExercise(fingerExercises[0].operationType);
      return; // This will trigger a re-render
    }

    // Find the selected exercise data
    const selectedData = fingerExercises.find(
      ex => ex.operationType === selectedExercise
    );


    if (!selectedData) {
      return;
    }

    const canvasId = 'finger-exercise-chart';
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    
    // Destroy previous chart if exists
    if (chartRefs.current[canvasId]) {
      chartRefs.current[canvasId].destroy();
      chartRefs.current[canvasId] = null;
    }

    const correctAnswers = selectedData.correctAnswers || 0;
    const totalQuestions = selectedData.totalQuestions || 1;
    const incorrectAnswers = Math.max(0, totalQuestions - correctAnswers);


    // Create new chart
    try {
      chartRefs.current[canvasId] = new ChartJS(ctx, {
        type: ['Correct Answers', 'Incorrect Answers'],
          datasets: [{
            data: [correctAnswers, incorrectAnswers],
            backgroundColor: ['#4CAF50', '#F44336'],
            borderWidth: 1,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          },
          cutout: '65%'
        }
      });
    } catch (error) {
    }
  };

  // Add a small delay to ensure DOM is ready
  const timeoutId = setTimeout(updateFingerExerciseChart, 100);

  return () => {
    clearTimeout(timeoutId);
    // Cleanup on unmount
    Object.values(chartRefs.current).forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
  };
}, [selectedExercise, fingerExercises, loading]); // Added loading dependency
  
  // Initialize dashboard
  useEffect(() => {
    const initDashboard = async () => {
      // Check if user is authenticated
      if (!isAuthenticated || !user || !user.id) {
        navigate('/login');
        return;
      }

      setLoading(true);

      // Set user data from AuthContext
      setUserData({
        username: user.username || user.name || '',
        email: user.email || '',
        name: user.name || user.username || ''
      });

      const email = user.email;
      
      if (email) {
        // Fetch all dashboard data
        await Promise.all([
          fetchUserStreak(email),
          fetchQuizCounts(email),
          fetchVocabScores(email),
          fetchMathTopicsScores(email),
          fetchMathDiagnostics(email), 
          fetchFingerExercises(email),
          fetchRCScores(email),
          fetchProgrammingScores(email),
          fetchCTFingerExercises(email),
          fetchProgrammingFingerExercises(email),
          fetchClassroomInfo() 
        ]);
      }

      setLoading(false);
    };

    initDashboard();
  }, [user, isAuthenticated, navigate]);


  useEffect(() => {
    if (mathTopics.length > 0) {
      setTimeout(() => {
        mathTopics.forEach((topic) => {
          const correctAnswers = topic.questions.filter(q => q.correct).length;
          const incorrectAnswers = topic.questions.length - correctAnswers;
          createDoughnutChart(`${topic.topic}-performance-chart`, correctAnswers, incorrectAnswers);
        });
      }, 100);
    }
  }, [mathTopics]);
  
  // Utility functions
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const goToQuizAnalytics = (quizId) => {
    navigate(`/vocab-analytics/${encodeURIComponent(quizId)}`);
  };
  
  const exploreTopic = (topicName) => {
    navigate(`/english/RC/${topicName}`, { state: { email: userData.email } });
  };
  
  const viewProgrammingQuiz = (quizId) => {
    navigate(`/coding/${quizId}`);
  };

  const redirectToVocab = () => {
    navigate("/vocabulary");
  };
  
  const redirectToMath = () => {
    navigate("/math");
  };
  
  const redirectToRC = () => {
    navigate("/english/RC");
  };
  
  const redirectToProgramming = () => {
    navigate("/programming");
  };

  const renderDiagnosticTests = () => {
    const { preTest, postTest } = diagnosticData;

    // Check if data exists and has the expected structure
    const isValidTest = (test) => {
      return test && typeof test === 'object' && 
             'totalCorrect' in test && 'totalQuestions' in test;
    };

    return (
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Pre-Diagnostic Test</h5>
            </div>
            <div className="card-body">
              {isValidTest(preTest) ? (
                <>
                  <p><strong>Topic Area:</strong> {preTest.topicArea || 'General Math'}</p>
                  <p><strong>Score:</strong> {preTest.totalCorrect}/{preTest.totalQuestions}</p>
                  <p><strong>Percentage:</strong> {Math.round((preTest.totalCorrect / preTest.totalQuestions) * 100)}%</p>
                  {preTest.testDate && (
                    <p><strong>Date:</strong> {new Date(preTest.testDate).toLocaleDateString()}</p>
                  )}
                  <div className="progress mt-3">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ 
                        width: `${(preTest.totalCorrect / preTest.totalQuestions) * 100}%` 
                      }}
                    ></div>
                  </div>
                </>
              ) : (
                <div className="text-center py-3">
                  <p className="text-muted">No pre-test data available</p>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate('/math/diagnostic')}
                  >
                    Take Pre-Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card h-100">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Post-Diagnostic Test</h5>
            </div>
            <div className="card-body">
              {isValidTest(postTest) ? (
                <>
                  <p><strong>Topic Area:</strong> {postTest.topicArea || 'General Math'}</p>
                  <p><strong>Score:</strong> {postTest.totalCorrect}/{postTest.totalQuestions}</p>
                  <p><strong>Percentage:</strong> {Math.round((postTest.totalCorrect / postTest.totalQuestions) * 100)}%</p>
                  {postTest.testDate && (
                    <p><strong>Date:</strong> {new Date(postTest.testDate).toLocaleDateString()}</p>
                  )}
                  <div className="progress mt-3">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ 
                        width: `${(postTest.totalCorrect / postTest.totalQuestions) * 100}%` 
                      }}
                    ></div>
                  </div>
                </>
              ) : (
                <div className="text-center py-3">
                  <p className="text-muted">No post-test data available</p>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate('/math/diagnostic')}
                  >
                    Take Post-Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Render finger exercises
  const renderFingerExercises = () => {

    if (loading) {
      return (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (fingerExercises.length === 0) {
      return (
        <div className="text-center py-3">
          <p className="text-muted">No finger exercises data available</p>
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => navigate('/math/practice')}
          >
            Start Practicing
          </button>
        </div>
      );
    }

    const currentSelected = selectedExercise || fingerExercises[0]?.operationType || '';
    const selectedData = fingerExercises.find(
      ex => ex.operationType === currentSelected
    ) || fingerExercises[0];

    

    return (
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Finger Exercises</h5>
          <div className="exercise-selector">
            <select
              className="form-select form-select-sm"
              value={selectedExercise || ''}
              onChange={(e) => {
                setSelectedExercise(e.target.value);
              }}
              style={{ width: '200px' }}
            >
              {fingerExercises.map((exercise) => (
                <option 
                  key={exercise._id} 
                  value={exercise.operationType}
                >
                  {exercise.operationType.replace(/-/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="exercise-stats">
                <p>
                  <strong>Type:</strong> {(selectedData?.operationType || '').replace(/-/g, ' ').toUpperCase()}
                </p>
                <p>
                  <strong>Attempted:</strong> {selectedData?.totalQuestions || 0}
                </p>
                <p>
                  <strong>Correct:</strong> {selectedData?.correctAnswers || 0}
                </p>
                <p>
                  <strong>Accuracy:</strong> {selectedData?.totalQuestions ? 
                    Math.round(
                      (selectedData.correctAnswers / selectedData.totalQuestions) * 100
                    ) : 0}%
                </p>
              </div>
            </div>
            
            <div className="col-md-8">
              <div style={{ height: '200px', position: 'relative' }}>
                <canvas id="finger-exercise-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  // Render vocabulary scores
  const renderVocabScores = () => {
    if (!vocabScores.assessments || vocabScores.assessments.length === 0) {
      return (
        <div>
          <p className="no-data">Start learning and improve your Vocabulary</p>
          <button className="btn btn-success start-learning-btn" onClick={redirectToVocab}>
            Start Learning
          </button>
        </div>
      );
    }

    const recentAssessments = vocabScores.assessments.slice(-6).reverse();

    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Date</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentAssessments.map((assessment, index) => {
            const totalQuestions = assessment.questions.length;
            const correctAnswers = assessment.questions.filter(q => q.is_correct).length;
            const percentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : '0.00';

            return (
              <tr key={index}>
                <td>{assessment.assess_topic || 'N/A'}</td>
                <td>{new Date(assessment.date).toLocaleDateString()}</td>
                <td>{percentage}%</td>
                {/*<td>
                  <button 
                    className="btn btn-primary"
                    onClick={() => goToQuizAnalytics(assessment.date)}
                  >
                    Analytics
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  
  const fetchClassroomInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/student/classroom-info`, {
        method: 'GET',
        credentials: 'include', // Important: sends session cookie
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        const classroomName = data.classroomName;
        
        // Store the name_Data in state or variable
        setClassroomName(classroomName); // If using React state
        
        // Or store in a variable
        window.classroomNameData = classroomName;
        
        console.log('Classroom name fetched:', classroomName);
        return classroomName;
      } else {
        console.error('Failed to fetch classroom info');
        return null;
      }
    } catch (error) {
      console.error('Error fetching classroom info:', error);
      return null;
    }
  };

  // Render RC scores
  const renderRCScores = () => {
    if (!rcData || !rcData.topics || Object.keys(rcData.topics).length === 0) {
      return (
        <div>
          <p className="no-data">Start learning and improve your Reading Comprehension</p>
          <button className="btn btn-success start-learning-btn" onClick={redirectToRC}>
            Start Learning
          </button>
        </div>
      );
    }

    const rows = [];
    Object.entries(rcData.topics).forEach(([topicName, topicDetails]) => {
      if (Array.isArray(topicDetails.solvedPassages)) {
        const totalPassages = topicDetails.solvedPassages.length;
        const currentLevel = topicDetails.current_level || 'N/A';
        
        const lastActivity = topicDetails.solvedPassages.reduce((latest, passage) => {
          const passageDate = new Date(passage.timestamp);
          return passageDate > latest ? passageDate : latest;
        }, new Date(0));

        const lastActivityFormatted = lastActivity.getTime() !== 0
          ? lastActivity.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'N/A';

        rows.push({
          srNo: rows.length + 1,
          topicName,
          totalPassages,
          currentLevel,
          lastActivity: lastActivityFormatted
        });
      }
    });

    if (rows.length === 0) {
      return <p className="no-data">Start Learning and improve your Reading Comprehension</p>;
    }

    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Topic</th>
            <th>Total Passages Solved</th>
            <th>Current Level</th>
            <th>Last Activity</th>
           
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.srNo}</td>
              <td>{row.topicName}</td>
              <td>{row.totalPassages}</td>
              <td>{row.currentLevel}</td>
              <td>{row.lastActivity}</td>
              <td>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => exploreTopic(row.topicName)}
                >
                  Explore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render programming scores
  const renderProgrammingScores = () => {
    if (!programmingData || !programmingData.quizzes || programmingData.quizzes.length === 0) {
      return (
        <div>
          <p className="no-data">Start practicing to improve your programming skills</p>
          <button className="btn btn-success start-learning-btn" onClick={redirectToProgramming}>
            Start Coding
          </button>
        </div>
      );
    }

    const sortedQuizzes = [...programmingData.quizzes].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    const recentQuizzes = sortedQuizzes.slice(0, 1);

    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Score(%)</th>
              <th>Questions Passed Out of 20</th>
              
            </tr>
          </thead>
          <tbody>
            {recentQuizzes.map((quiz, index) => {
              const quizDate = new Date(quiz.datetime).toLocaleDateString();
              const passedQuestions = quiz.submissions.filter(sub => sub.test_cases_passed > 0).length;
              
              return (
                <tr key={index}>
                  <td>{quizDate}</td>
                  <td>{(quiz.score/20*100).toFixed(0)}</td>
                  <td>{passedQuestions}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-primary solve-more-btn mt-3" onClick={redirectToProgramming}>
          Practice More
        </button>
      </div>
    );
  };

  // Render CT finger exercises
  const renderCTFingerExercises = () => {
    const quizzes = ctFingerData.quizzes || [];
    const topicScores = {};
    
    quizzes.forEach(quiz => {
      const correctAnswers = quiz.answers.filter(a => a.isCorrect).length;
      if (!topicScores[quiz.topic]) {
        topicScores[quiz.topic] = 0;
      }
      topicScores[quiz.topic] += correctAnswers;
    });

    const tableData = Object.entries(topicScores).map(([topic, score], index) => ({
      srNo: index + 1,
      topic: topic.replace(/_/g, ' ').toUpperCase(),
      score: score
    }));

    if (tableData.length === 0) {
      return (
        <button className="btn btn-success" onClick={redirectToProgramming}>
          Start Learning
        </button>
      );
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Topic</th>
            <th>Scores(%)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.srNo}</td>
              <td>{row.topic}</td>
              <td>{((row.score/30)*100).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render programming finger exercises
  const renderProgrammingFingerExercises = () => {
    const topics = progFingerData.topics || [];
    const topicScores = {};
    
    topics.forEach(topic => {
      const correctSubmissions = topic.submissions?.filter(sub => sub.isCorrect) || [];
      topicScores[topic.topicName] = correctSubmissions.length;
    });

    const tableData = Object.entries(topicScores).map(([topic, score], index) => ({
      srNo: index + 1,
      topic: topic.replace(/_/g, ' ').toUpperCase(),
      score: score
    }));

    if (tableData.length === 0) {
      return (
        <button className="btn btn-success" onClick={redirectToProgramming}>
          Start Learning
        </button>
      );
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Topic</th>
            <th>Scores(%)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.srNo}</td>
              <td>{row.topic}</td>
              <td>{((row.score/20)*100).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="main">
      <section className="container mt-5">
        <div className="row">
          <div className="col-lg-12 mx-auto">
            <div className="card shadow-sm mb-4 bg-light">
              <div className="card-header text-black d-flex justify-content-between align-items-center" style={{backgroundColor: '#3498db'}}>
              <div className="classroom-info" style={{ width: '100%', marginTop: '10px' }}>
                  <h3><strong>Classroom:</strong> {classroomName || 'Personal Classroom'}</h3>
                  
                </div>
              </div>
              
              <div className="card-body">
                {/* User Information Section */}
                <div className="card-custom mb-4" style={{
                  background: '#fff',
                  padding: '20px',
                  margin: '10px 0',
                  boxShadow: '0 0 10px #6c757d'
                }}>
                  <h3>Student Dashboard</h3>
                  
                  {/* Flexbox Container for User Info & Quiz Count */}
                  <div className="info-container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)'
                  }}>
                    {/* Left Side: User Information */}
                    <div className="user-info" style={{ width: '100%' }}>
                      <h3>User Information</h3>
                      <p><strong>Username:</strong> {userData.username}</p>
                      <p><strong>Email:</strong> {userData.email}</p>
                      
                    </div>
                    
                    {/* Right Side: Quiz Count */}
                    <div className="quiz-count" style={{ width: '100%', textAlign: 'right' }}>
                      <h3>Quiz Count</h3>
                      <p>Math: {quizCounts.math}</p>
                      <p>RC: {quizCounts.rc}</p>
                      <p>Vocabulary: {quizCounts.vocab}</p>
                      <p>Programming: {quizCounts.prog}</p>
                    </div>
                  </div>
                  
                  {/* Streak Section */}
                  <div className="streak-container" style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: '12px',
                    width: '400px',
                    textAlign: 'center',
                    marginTop: '20px'
                  }}>
                    <div className="streak-title" style={{
                      fontSize: '18px',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}>Current Days Streak</div>
                    <div className="streak-circle" style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '4px solid orange',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      position: 'relative'
                    }}>
                      <i className="bi bi-fire" style={{
                        fontSize: '20px',
                        color: 'orange',
                        position: 'absolute',
                        top: '-20px',
                        background: '#1E1E1E',
                        padding: '5px',
                        borderRadius: '50%'
                      }}></i>
                      <span>{userStreak}</span>
                    </div>
                  </div>
                </div>

                {/* Vocabulary and Mathematics Section */}
                <div className="row mb-4">
                  <div className="">
                    <div className="card-custom" style={{
                      background: '#fff',
                      padding: '20px',
                      margin: '10px 0',
                      boxShadow: '0 0 10px #6c757d'
                    }}>
                      <h3>Vocabulary Topic Wise Performance</h3>
                      <div className="mb-4">
                        {renderVocabScores()}
                      </div>
                      <button 
                        className="btn btn-primary solve-more-btn"
                        onClick={redirectToVocab}
                      >
                        Solve More
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="">
                    <div className="card-custom" style={{
                      background: '#fff',
                      padding: '20px',
                      margin: '10px 0',
                      boxShadow: '0 0 10px #6c757d'
                    }}>
                      <h3>Mathematics Performance</h3>
                      
                      {/* NEW: Diagnostic Tests Section */}
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <h4>Diagnostic Tests</h4>
                          {renderDiagnosticTests()}
                        </div>
                        <div className="col-md-6">
                          <h4>Finger Exercises</h4>
                          {renderFingerExercises()}
                        </div>
                      </div>
                      <button 
                        className="btn btn-primary solve-more-btn"
                        onClick={redirectToMath}
                      >
                        Solve More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full-Width Reading Comprehension Section
                <div className="row">
                  <div className="col-12">
                    <div className="card-custom" style={{
                      background: '#fff',
                      padding: '20px',
                      margin: '10px 0',
                      boxShadow: '0 0 10px #6c757d'
                    }}>
                      <h3>Reading Comprehension</h3>
                      <p><strong>Track your progress.</strong></p>
                      <div>
                        {renderRCScores()}
                      </div>
                    </div>
                  </div>
                </div>    */}
                
                {/* Modified Programming Progress Section */}
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="card-custom" style={{
                      background: '#fff',
                      padding: '20px',
                      margin: '10px 0',
                      boxShadow: '0 0 10px #6c757d'
                    }}>
                      <h3>CT Finger Exercises</h3>
                      <div className="mb-4">
                        {renderCTFingerExercises()}
                      </div>
                      
                      <h3>Python Finger Exercises</h3>
                      <div className="mb-4">
                        {renderProgrammingFingerExercises()}
                      </div>
                      
                      <h3>Programming Diagnostic</h3>
                      <div>
                        {renderProgrammingScores()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StudentDashboard;
