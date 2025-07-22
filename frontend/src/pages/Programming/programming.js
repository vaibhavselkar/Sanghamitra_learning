import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Programming = () => {
  const [userInfo, setUserInfo] = useState({
    username: null,
    email: null
  });
  const [topicProgress, setTopicProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Topic mapping similar to your HTML version
  const topicMapping = {
    "Python Basics": "python_basics",
    "Python Conditionals": "python_conditionals", 
    "Python Loops": "python_loops",
    "Python Functions": "python_functions",
    "Programming Diagnostic": "programming_diagnostic"
  };

  const ctTopics = [
    "CT_foundation",
    "CT_foundation_1", 
    "CT_foundation_2",
    "CT_foundation_3"
  ];

  const MAX_QUESTIONS = 20; // For Python topics
  const CT_QUESTIONS_PER_TOPIC = 30; // For CT topics

  // Define all courses with their configurations
  const courses = [
    {
      icon: "bi-clipboard-check",
      title: "Weekly Assessments",
      desc: "Regular evaluations to track your learning progress",
      bg: "bg-warning",
      href: "/programming/weekly-assessments",
      type: "special"
    },
    {
      icon: "bi-cpu",
      title: "CT Foundation",
      desc: "Develop problem-solving skills using computational methods",
      bg: "bg-primary",
      href: "/programming/ct_foundation",
      topicId: "CT_foundation",
      type: "ct"
    },
    {
      icon: "bi-cpu-fill", 
      title: "CT Foundation 1",
      desc: "Advance your computational thinking skills",
      bg: "bg-primary",
      href: "/programming/ct-foundation-1", 
      topicId: "CT_foundation_1",
      type: "ct"
    },
    {
      icon: "bi-layers",
      title: "CT Foundation 2", 
      desc: "Master complex computational problem-solving",
      bg: "bg-primary",
      href: "/programming/ct-foundation-2",
      topicId: "CT_foundation_2", 
      type: "ct"
    },
    {
      icon: "bi-arrow-repeat",
      title: "CT Foundation 3",
      desc: "Advanced computational problem-solving techniques", 
      bg: "bg-primary",
      href: "/programming/ct-foundation-3",
      topicId: "CT_foundation_3",
      type: "ct"
    },
    {
      icon: "bi-code-slash",
      title: "Python Basics",
      desc: "Master fundamental Python syntax and concepts",
      bg: "bg-success", 
      href: "/programming/python-basics",
      topicId: "python_basics",
      type: "python"
    },
    {
      icon: "bi-diagram-3",
      title: "Python Conditionals",
      desc: "Implement decision-making in your code",
      bg: "bg-success",
      href: "/programming/python-conditionals",
      topicId: "python_conditionals", 
      type: "python"
    },
    {
      icon: "bi-arrow-repeat",
      title: "Python Loops", 
      desc: "Automate repetitive tasks efficiently",
      bg: "bg-success",
      href: "/programming/python-loops",
      topicId: "python_loops",
      type: "python"
    },
    {
      icon: "bi-box",
      title: "Python Functions",
      desc: "Create reusable code components", 
      bg: "bg-success",
      href: "/programming/python-functions",
      topicId: "python_functions",
      type: "python"
    },
    {
      icon: "bi-clipboard-check",
      title: "Programming Diagnostic",
      desc: "Assess your programming knowledge and identify areas for improvement",
      bg: "bg-info", 
      href: "/programming/programming-diagnostic",
      topicId: "programming_diagnostic",
      type: "diagnostic"
    }
  ];

  useEffect(() => {
    initializeProgressTracking();
  }, []);

  // Debug effect to log topicProgress changes
  useEffect(() => {
    console.log('Topic Progress State Updated:', topicProgress);
  }, [topicProgress]);

  const initializeProgressTracking = async () => {
    try {
      console.log('=== Starting initialization ===');
      
      // First, get session info and wait for it to complete
      const sessionData = await fetchSessionInfo();
      console.log('Session data received:', sessionData);
      
      if (sessionData) {
        console.log('=== Starting progress fetch ===');
        
        // Test with just one topic first
        console.log('Testing CT_foundation fetch...');
        await fetchCTProgress('CT_foundation', sessionData.email);
        
        console.log('Testing python_basics fetch...');
        await fetchPythonProgress('python_basics', sessionData.email);
        
        // Now fetch all progress
        const progressPromises = [
          ...ctTopics.map(topic => fetchCTProgress(topic, sessionData.email)),
          ...Object.values(topicMapping).map(topic => fetchPythonProgress(topic, sessionData.email))
        ];
        
        console.log('Starting all progress fetches...');
        await Promise.all(progressPromises);
        console.log('All progress fetches completed');
      }
      
      setIsLoading(false);
      console.log('=== Initialization completed ===');
    } catch (error) {
      console.error('Initialization error:', error);
      setError('Failed to initialize progress tracking');
      setIsLoading(false);
    }
  };

  const fetchSessionInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/session-info', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Session expired');
      }
      
      const data = await response.json();
      const sessionData = {
        email: data.email,
        username: data.username
      };
      
      setUserInfo(sessionData);
      return sessionData; // Return the session data for immediate use
    } catch (error) {
      console.error('Session error:', error);
      // Redirect to login - adjust path as needed
      window.location.href = '/user_login.html';
      throw error;
    }
  };

  const fetchCTProgress = async (topic, email) => {
    try {
      console.log(`Fetching CT progress for ${topic} with email: ${email}`);
      const response = await fetch(
        `http://localhost:4000/api/CT_finger_scores/${email}/${topic}`,
        { credentials: 'include' }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log(`CT Data received for ${topic}:`, data);
        const progress = calculateCTProgress(data);
        console.log(`CT Progress calculated for ${topic}:`, progress);
        setTopicProgress(prev => ({
          ...prev,
          [topic]: progress
        }));
      } else {
        console.log(`No CT data found for ${topic}, status: ${response.status}`);
        // Set default progress for topics with no data
        setTopicProgress(prev => ({
          ...prev,
          [topic]: { completed: 0, total: CT_QUESTIONS_PER_TOPIC, score: 0, percentage: 0 }
        }));
      }
    } catch (error) {
      console.error(`CT Progress fetch failed for ${topic}:`, error);
      setTopicProgress(prev => ({
        ...prev,
        [topic]: { completed: 0, total: CT_QUESTIONS_PER_TOPIC, score: 0, percentage: 0 }
      }));
    }
  };

  const fetchPythonProgress = async (topic, email) => {
    try {
      console.log(`Fetching Python progress for ${topic} with email: ${email}`);
      const response = await fetch(
        `http://localhost:4000/api/finger-exercise?email=${email}&topic=${topic}`,
        { credentials: 'include' }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Python Data received for ${topic}:`, data);
        const progress = calculatePythonProgress(data);
        console.log(`Python Progress calculated for ${topic}:`, progress);
        setTopicProgress(prev => ({
          ...prev,
          [topic]: progress
        }));
      } else {
        console.log(`No Python data found for ${topic}, status: ${response.status}`);
        setTopicProgress(prev => ({
          ...prev,
          [topic]: { completed: 0, total: MAX_QUESTIONS, score: 0, percentage: 0 }
        }));
      }
    } catch (error) {
      console.error(`Python Progress fetch failed for ${topic}:`, error);
      setTopicProgress(prev => ({
        ...prev,
        [topic]: { completed: 0, total: MAX_QUESTIONS, score: 0, percentage: 0 }
      }));
    }
  };

  const calculateCTProgress = (data) => {
    try {
      console.log('Calculating CT progress with data:', data);
      
      if (!data || !data.quizzes || data.quizzes.length === 0) {
        console.log('No quizzes found in CT data');
        return { completed: 0, total: CT_QUESTIONS_PER_TOPIC, score: 0, percentage: 0 };
      }
      
      // Count unique answered questions (latest attempt for each question)
      const answeredQuestions = new Map();
      let correctAnswers = 0;

      // Sort by date (latest first) and process answers
      const sortedQuizzes = data.quizzes.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );

      console.log('Sorted quizzes:', sortedQuizzes);

      sortedQuizzes.forEach(quiz => {
        if (quiz.answers && Array.isArray(quiz.answers)) {
          quiz.answers.forEach(answer => {
            if (!answeredQuestions.has(answer.questionId)) {
              answeredQuestions.set(answer.questionId, answer);
              if (answer.isCorrect) {
                correctAnswers++;
              }
            }
          });
        }
      });

      const completed = answeredQuestions.size;
      const percentage = Math.round((completed / CT_QUESTIONS_PER_TOPIC) * 100);
      
      const result = {
        completed,
        total: CT_QUESTIONS_PER_TOPIC,
        score: correctAnswers,
        percentage
      };
      
      console.log('CT Progress result:', result);
      return result;
    } catch (error) {
      console.error('CT progress calculation error:', error);
      return { completed: 0, total: CT_QUESTIONS_PER_TOPIC, score: 0, percentage: 0 };
    }
  };

  const calculatePythonProgress = (data) => {
    try {
      console.log('Calculating Python progress with data:', data);
      
      if (!data || !data.submissions) {
        console.log('No submissions found in Python data');
        return { completed: 0, total: MAX_QUESTIONS, score: 0, percentage: 0 };
      }
      
      console.log('Submissions:', data.submissions);
      
      // Count unique correct question IDs
      const uniqueCorrect = new Set(
        data.submissions
          .filter(s => s.isCorrect)
          .map(s => s.questionId)
      );
      
      console.log('Unique correct questions:', uniqueCorrect);
      
      const completed = uniqueCorrect.size;
      const percentage = Math.round((completed / MAX_QUESTIONS) * 100);
      
      const result = {
        completed,
        total: MAX_QUESTIONS,
        score: completed, // For Python, completed = score since we only count correct ones
        percentage
      };
      
      console.log('Python Progress result:', result);
      return result;
    } catch (error) {
      console.error('Python progress calculation error:', error);
      return { completed: 0, total: MAX_QUESTIONS, score: 0, percentage: 0 };
    }
  };

  const getProgressInfo = (course) => {
    if (course.type === 'special' || course.type === 'diagnostic') {
      return { percentage: 0, text: course.type === 'diagnostic' ? 'Assessment Available' : 'Available' };
    }
    
    const progress = topicProgress[course.topicId] || { completed: 0, total: course.type === 'ct' ? 30 : 20, percentage: 0 };
    console.log(`Getting progress for ${course.title} (${course.topicId}):`, progress);
    
    return {
      percentage: progress.percentage,
      text: `${progress.completed}/${progress.total} Complete`
    };
  };

  if (isLoading) {
    return (
      <div className="main">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading your progress...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <div className="container">
          <div className="alert alert-danger mt-3">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" style={{ marginBottom: '2rem' }}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Programming</h1>
                <p className="mb-0">
                  Welcome to our Programming Learning Hub. Enhance your coding skills with our comprehensive resources
                  and interactive lessons. Join our community and embark on an enriching journey towards mastering
                  programming.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Programming</li>
            </ol>
          </div>
        </nav>
      </div>

      <div className="container">
        {/* User Welcome */}
        {userInfo.username && (
          <div className="alert alert-info border-0 shadow-sm mb-4">
            <h5 className="alert-heading mb-2">
              <i className="bi bi-person-circle me-2"></i>
              Welcome back, {userInfo.username}! 👋
            </h5>
            <p className="mb-0">Continue your programming journey and track your progress below.</p>
          </div>
        )}

        {/* Special Diagnostic Section */}
        <div className="mb-4">
          <div className="alert alert-warning border-0 shadow-sm">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h5 className="alert-heading mb-2">
                  <i className="bi bi-clipboard-check me-2"></i>
                  Start with a Diagnostic Assessment
                </h5>
                <p className="mb-0">
                  Not sure where to begin? Take our comprehensive diagnostic test to assess your current 
                  programming knowledge and get personalized learning recommendations.
                </p>
              </div>
              <div className="col-md-4 text-end">
                <Link to="/programming/programming-diagnostic" className="btn btn-warning">
                  <i className="bi bi-play-circle me-2"></i>
                  Take Diagnostic Test
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="course-list" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {courses.map((course) => {
            const progressInfo = getProgressInfo(course);
            const isSpecial = course.type === 'special' || course.type === 'diagnostic';
            
            return (
              <div key={course.title} className="course-item mb-3">
                <div className="card course-card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      <div className="col-lg-1 col-md-2 text-center">
                        <div 
                          className={`icon-box ${course.bg} text-white rounded-circle p-2 d-flex align-items-center justify-content-center`} 
                          style={{ width: 40, height: 40 }}
                        >
                          <i className={`bi ${course.icon} fs-5`}></i>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-6">
                        <h4 className="mb-1 fs-5">
                          {course.title}
                          {course.type === 'diagnostic' && <span className="badge bg-info ms-2" style={{ fontSize: '0.7rem' }}>Assessment</span>}
                        </h4>
                        <p className="text-muted mb-2 fs-6">{course.desc}</p>
                        
                        {!isSpecial && (
                          <>
                            <div className="progress" style={{ height: 6 }}>
                              <div 
                                className={`progress-bar ${course.bg.replace('bg-', 'bg-')}`} 
                                role="progressbar" 
                                style={{ width: `${progressInfo.percentage}%` }}
                                aria-valuenow={progressInfo.percentage} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <small className="text-muted" style={{ fontSize: '0.85rem' }}>{progressInfo.text}</small>
                          </>
                        )}
                        
                        {course.type === 'diagnostic' && (
                          <small className="text-info" style={{ fontSize: '0.85rem' }}>
                            <i className="bi bi-info-circle me-1"></i>
                            Evaluate your skills and get personalized recommendations
                          </small>
                        )}
                      </div>
                      <div className="col-lg-4 col-md-4 text-end">
                        <Link 
                          to={course.href} 
                          className={`btn ${course.bg} btn-sm d-inline-flex align-items-center justify-content-between`}
                          style={{ minWidth: '120px', padding: '0.4rem 1rem' }}
                        >
                          <span>{course.type === 'diagnostic' ? 'Start Assessment' : 'Continue'}</span>
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
      </div>

      <style>{`
        .hover-shadow:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease !important;
        }
        
        .course-card {
          transition: all 0.3s ease;
          border-radius: 12px !important;
        }
        
        .icon-box {
          transition: all 0.3s ease;
        }
        
        .course-card:hover .icon-box {
          transform: scale(1.1);
        }
        
        .progress {
          background-color: #f0f0f0 !important;
        }
        
        .btn {
          border-radius: 8px !important;
        }
        
        .course-list {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 15px;
        }
      `}</style>
    </main>
  );
};

export default Programming;