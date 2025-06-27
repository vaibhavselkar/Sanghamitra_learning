import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import '../../assets/css/main.css';
import '../../assets/css/breadcrumb.css';

// Initialize AOS (Animate On Scroll) if needed
import 'aos/dist/aos.css';

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
  const [rcData, setRcData] = useState(null);
  const [programmingData, setProgrammingData] = useState(null);
  const [ctFingerData, setCTFingerData] = useState({ quizzes: [] });
  const [progFingerData, setProgFingerData] = useState({ topics: [] });
  const [loading, setLoading] = useState(true);

  const chartRefs = useRef({});

  // API Helper function
  const apiCall = async (url, options = {}) => {
    try {
      const response = await fetch(`http://localhost:4000${url}`, {
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
      // Math count
      const mathData = await apiCall(`/api/algebra_scores?email=${email}`);
      const mathCount = Array.isArray(mathData) && mathData.length > 0 
        ? mathData.reduce((count, entry) => count + (entry.topics ? entry.topics.length : 0), 0)
        : 0;

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
        math: mathCount,
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
            position: 'top',
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
          fetchRCScores(email),
          fetchProgrammingScores(email),
          fetchCTFingerExercises(email),
          fetchProgrammingFingerExercises(email)
        ]);
      }

      setLoading(false);
    };

    initDashboard();
  }, [user, isAuthenticated, navigate]);

  // Create charts after math topics data is loaded
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
    window.location.href = `vocab_analytics.html?quizId=${encodeURIComponent(quizId)}`;
  };

  const exploreTopic = (topicName) => {
    window.location.href = `english/RC_dashboard.html?email=${userData.email}&topic=${topicName}`;
  };

  const viewProgrammingQuiz = (quizId) => {
    window.location.href = `coding/programming_details.html?quizId=${quizId}`;
  };

  const redirectToVocab = () => {
    window.location.href = "vocabulary.html";
  };

  const redirectToMath = () => {
    window.location.href = "algebra/algebra.html";
  };

  const redirectToRC = () => {
    window.location.href = "english/RC_topics.html";
  };

  const redirectToProgramming = () => {
    window.location.href = "coding/programming.html";
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
                <td>
                  <button 
                    className="btn btn-primary"
                    onClick={() => goToQuizAnalytics(assessment.date)}
                  >
                    Analytics
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Render math topics
  const renderMathTopics = () => {
    if (!mathTopics || mathTopics.length === 0) {
      return <p className="text-muted">No data available for any topic</p>;
    }

    return (
      <div className="row">
        {mathTopics.map((topic) => {
          const correctAnswers = topic.questions.filter(q => q.correct).length;
          const incorrectAnswers = topic.questions.length - correctAnswers;

          return (
            <div key={topic.topic} className="col-lg-6 col-md-12 mb-4">
              <div className="card-custom" style={{
                background: '#fff',
                padding: '20px',
                margin: '10px 0',
                boxShadow: '0 0 10px #6c757d'
              }}>
                <div>
                  <h4>{capitalizeFirstLetter(topic.topic)} Performance</h4>
                  <p><strong>Accuracy:</strong> {correctAnswers}/{topic.questions.length}</p>
                  <p><strong>Current Level:</strong> {capitalizeFirstLetter(topic.current_level)}</p>
                </div>
                <div className="canvas-container" style={{ width: '200px', height: '200px' }}>
                  <canvas id={`${topic.topic}-performance-chart`} width="500" height="500"></canvas>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
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
            <th>Actions</th>
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
              <th>Actions</th>
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
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => viewProgrammingQuiz(quiz._id)}
                    >
                      View Details
                    </button>
                  </td>
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
                <h3 className="mb-1 text-white">Student Dashboard</h3>
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
                    }}>Current Streak</div>
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
                  <div className="col-lg-6 col-md-12">
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
                  
                  <div className="col-lg-6 col-md-12">
                    <div className="card-custom" style={{
                      background: '#fff',
                      padding: '20px',
                      margin: '10px 0',
                      boxShadow: '0 0 10px #6c757d'
                    }}>
                      <h3>Mathematics Quizzes Performance</h3>
                      <div className="mb-4">
                        {renderMathTopics()}
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

                {/* Full-Width Reading Comprehension Section */}
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
                </div>
                
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