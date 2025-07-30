import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';



// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const TutorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Existing states
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  
  // New analytics states
  const [showStudentList, setShowStudentList] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [englishDiagnosticData, setEnglishDiagnosticData] = useState([]);
  const [vocabularyData, setVocabularyData] = useState([]);
  const [showMoreVocab, setShowMoreVocab] = useState(false);
  const [algebraData, setAlgebraData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [availableTopics, setAvailableTopics] = useState([]);
  const [readingComprehensionData, setReadingComprehensionData] = useState([]);
  const [rcTopics, setRcTopics] = useState([]);
  
  // Programming states
  const [ctData, setCTData] = useState([]);
  const [pythonFingerData, setPythonFingerData] = useState([]);
  const [pythonTopics, setPythonTopics] = useState([]);
  const [selectedPythonTopic, setSelectedPythonTopic] = useState('');
  const [diagnosticsData, setDiagnosticsData] = useState([]);
  
  //Math states
  const [arithmeticData, setArithmeticData] = useState([]);
  const [selectedArithmeticOperation, setSelectedArithmeticOperation] = useState('');
  const [loadingArithmetic, setLoadingArithmetic] = useState(false);
  const [diagnosticComparisonData, setDiagnosticComparisonData] = useState([]);
  const [selectedDiagnosticTopic, setSelectedDiagnosticTopic] = useState('arithmetic');
  const [loadingDiagnostics, setLoadingDiagnostics] = useState(false);

  const arithmeticOperations = [
    'addition', 'subtraction', 'multiplication', 
    'division', 'decimals', 'fractions', 'dealing-with-negative-sign', 'ratio-proportion-percentage'
  ];

  // Chart data states
  const [englishChartData, setEnglishChartData] = useState(null);
  const [algebraChartData, setAlgebraChartData] = useState(null);
  const [pythonChartData, setPythonChartData] = useState(null);

  // Get all students from tutor's classrooms
  const getAllTutorStudents = () => {
    const allStudentEmails = new Set();
    const allStudentData = [];
    
    classrooms.forEach(classroom => {
      classroom.students.forEach(student => {
        if (!allStudentEmails.has(student.email)) {
          allStudentEmails.add(student.email);
          allStudentData.push(student);
        }
      });
    });
    
    return allStudentData;
  };

  // Fetch classrooms data
  useEffect(() => {
    const fetchClassrooms = async () => {
      if (!user || !user.id) {
        navigate('/login');
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      try {
        const response = await fetch('http://3.111.49.131:4000/api/classrooms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Filter classrooms to show only those belonging to the current tutor
        const tutorClassrooms = data.filter(classroom => 
          classroom.tutor && classroom.tutor._id === user.id
        );
        
        setClassrooms(tutorClassrooms);
        
        // Set all students for analytics
        const students = [];
        tutorClassrooms.forEach(classroom => {
          classroom.students.forEach(student => {
            if (!students.find(s => s.email === student.email)) {
              students.push(student);
            }
          });
        });
        setAllStudents(students);
        
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        setError('Failed to load classroom data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, [user, navigate]);

  // Fetch analytics data when classrooms are loaded
  useEffect(() => {
    if (classrooms.length > 0) {
      fetchAnalyticsData();
    }
  }, [classrooms]);

  const fetchAnalyticsData = async () => {
    const students = getAllTutorStudents();
    const studentEmails = students.map(student => student.email);
    
    if (studentEmails.length === 0) return;

    try {
      // Fetch English Diagnostic Data
      await fetchEnglishDiagnosticData(studentEmails);
      
      // Fetch Vocabulary Data
      await fetchVocabularyData(studentEmails);
      
      // Fetch Algebra Data
      await fetchAlgebraData(studentEmails);
      
      // Fetch Reading Comprehension Data
      await fetchReadingComprehensionData(studentEmails);
      
      // Fetch Programming Data
      await fetchCTData(studentEmails);
      await fetchPythonFingerData(studentEmails);
      await fetchDiagnosticsData(studentEmails);

      // Fetch Arithmetic Data
      await fetchArithmeticData(studentEmails);
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };


  const fetchArithmeticData = async (studentEmails) => {
    setLoadingArithmetic(true);
    try {
      // Use your existing endpoint with optional userEmail filter
      const url = studentEmails.length > 0
        ? `http://3.111.49.131:4000/api/arithmetic-scores?${studentEmails.map(email => `userEmail=${email}`).join('&')}`
        : 'http://3.111.49.131:4000/api/arithmetic-scores';
      
      const response = await fetch(url);
      const data = await response.json();
      setArithmeticData(data);
    } catch (error) {
      console.error('Error fetching arithmetic data:', error);
    } finally {
      setLoadingArithmetic(false);
    }
  };

  const fetchEnglishDiagnosticData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/eng_diagnostic_scores');
      if (!response.ok) throw new Error('Failed to fetch English diagnostic data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      setEnglishDiagnosticData(filteredData);
      prepareEnglishChartData(filteredData);
    } catch (error) {
      console.error('Error fetching English diagnostic data:', error);
    }
  };

  const fetchVocabularyData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/vocabscores');
      if (!response.ok) throw new Error('Failed to fetch vocabulary data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      const processedData = filteredData.map(user => {
        let totalAssessments = user.assessments.length;
        let totalQuestions = 0;
        let correctAnswers = 0;
        let lastActivity = "No Activity";

        if (user.assessments.length > 0) {
          lastActivity = new Date(
            Math.max(...user.assessments.map(a => new Date(a.date)))
          ).toLocaleDateString();
        }

        user.assessments.forEach(assessment => {
          totalQuestions += assessment.questions.length;
          correctAnswers += assessment.questions.filter(q => q.is_correct).length;
        });

        let averagePercentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : "N/A";

        return {
          username: user.username,
          lastActivity,
          totalAssessments,
          totalQuestions,
          correctAnswers,
          averagePercentage
        };
      });
      
      setVocabularyData(processedData);
    } catch (error) {
      console.error('Error fetching vocabulary data:', error);
    }
  };

  const fetchAlgebraData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/algebra_scores');
      if (!response.ok) throw new Error('Failed to fetch algebra data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      setAlgebraData(filteredData);
      
      // Extract topics
      const topics = new Set();
      filteredData.forEach(user => {
        if (Array.isArray(user?.topics)) {
          user.topics.forEach(topicObj => {
            if (topicObj?.topic && typeof topicObj.topic === 'string') {
              const cleanTopic = topicObj.topic.trim();
              if (cleanTopic) topics.add(cleanTopic);
            }
          });
        }
      });
      
      const topicsArray = Array.from(topics);
      setAvailableTopics(topicsArray);
      
      if (topicsArray.length > 0) {
        setSelectedTopic(topicsArray[0]);
        prepareAlgebraChartData(filteredData, topicsArray[0]);
      }
    } catch (error) {
      console.error('Error fetching algebra data:', error);
    }
  };

  const prepareDiagnosticChartData = () => {
    const labels = diagnosticComparisonData.map(data => data.username);
    const preScores = diagnosticComparisonData.map(data => 
      data.hasPreTest ? data.preTest.totalScore : null
    );
    const postScores = diagnosticComparisonData.map(data => 
      data.hasPostTest ? data.postTest.totalScore : null
    );
  
    return {
      labels,
      datasets: [
        {
          label: 'Pre-Test Score',
          data: preScores,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Post-Test Score',
          data: postScores,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };
  
  const diagnosticChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Math Diagnostic Comparison (${selectedDiagnosticTopic})`
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Score (%)' }
      }
    }
  };

  useEffect(() => {
    if (allStudents.length > 0) {
      fetchDiagnosticComparisons();
    }
  }, [allStudents, selectedDiagnosticTopic]);

  const fetchDiagnosticComparisons = async () => {
    setLoadingDiagnostics(true);
    try {
      const comparisons = await Promise.all(
        allStudents.map(async student => {
          try {
            const response = await fetch(
              `http://3.111.49.131:4000/api/mathematicsDiagnosticsComparison/${student.email}/${selectedDiagnosticTopic}`
            );
            const data = await response.json();
            return data.success ? data.data : null;
          } catch (error) {
            console.error(`Error fetching diagnostics for ${student.email}:`, error);
            return null;
          }
        })
      );
      
      setDiagnosticComparisonData(comparisons.filter(Boolean));
    } catch (error) {
      console.error('Error fetching diagnostic comparisons:', error);
    } finally {
      setLoadingDiagnostics(false);
    }
  };

  const fetchReadingComprehensionData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/readingcomprehensionscore');
      if (!response.ok) throw new Error('Failed to fetch reading comprehension data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email)
      );
      
      // Process RC data
      let userMap = {};
      let uniqueTopics = new Set();

      filteredData.forEach(userEntry => {
        let email = userEntry.email;

        if (!userMap[email]) {
          userMap[email] = { totalPassages: 0, totalScore: 0, topicScores: {}, scoreEntries: 0 };
        }

        Object.entries(userEntry.topics).forEach(([topic, topicData]) => {
          uniqueTopics.add(topic);
          let passagesCount = topicData.solvedPassages.length;
          let totalScore = topicData.solvedPassages.reduce((sum, p) => sum + (p.score || 0), 0);
          
          userMap[email].totalPassages += passagesCount;
          userMap[email].totalScore += totalScore;
          userMap[email].scoreEntries += passagesCount;

          userMap[email].topicScores[topic] = {
            passages: passagesCount,
            avgScore: passagesCount ? (totalScore / passagesCount).toFixed(1) : "N/A"
          };
        });
      });

      setReadingComprehensionData(Object.entries(userMap).map(([email, data]) => ({
        email,
        ...data,
        avgOverallScore: data.scoreEntries > 0 ? (data.totalScore / data.scoreEntries).toFixed(1) : 0
      })));
      setRcTopics(Array.from(uniqueTopics));
    } catch (error) {
      console.error('Error fetching reading comprehension data:', error);
    }
  };

  const fetchCTData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/CT_finger_scores');
      if (!response.ok) throw new Error('Failed to fetch CT data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      setCTData(filteredData);
    } catch (error) {
      console.error('Error fetching CT data:', error);
    }
  };

  const fetchPythonFingerData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/finger-exercise');
      if (!response.ok) throw new Error('Failed to fetch Python finger data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      // Process topics
      const topics = new Set();
      const userMap = new Map();

      filteredData.forEach(user => {
        if (!userMap.has(user.username)) {
          userMap.set(user.username, {});
        }
        
        user.topics.forEach(topic => {
          topics.add(topic.topicName);
          const correct = topic.submissions.filter(s => s.isCorrect).length;
          const total = topic.submissions.length;
          
          userMap.get(user.username)[topic.topicName] = {
            correct: correct,
            total: total
          };
        });
      });

      setPythonFingerData(userMap);
      const topicsArray = Array.from(topics);
      setPythonTopics(topicsArray);
      
      // Set default topic
      const defaultTopic = topicsArray.includes('python_basics') ? 'python_basics' : topicsArray[0];
      if (defaultTopic) {
        setSelectedPythonTopic(defaultTopic);
        preparePythonChartData(userMap, defaultTopic);
      }
    } catch (error) {
      console.error('Error fetching Python finger data:', error);
    }
  };

  const fetchDiagnosticsData = async (studentEmails) => {
    try {
      const response = await fetch('http://3.111.49.131:4000/api/programming');
      if (!response.ok) throw new Error('Failed to fetch diagnostics data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      const processedData = filteredData.map(user => {
        const lastAttempt = getLastAttempt(user.quizzes);
        if (!lastAttempt) return null;

        const totalQuestions = lastAttempt.submissions.length;
        const score = lastAttempt.score;
        const successRate = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

        return {
          username: user.username,
          lastAttempt: new Date(lastAttempt.datetime).toLocaleDateString(),
          totalQuestions,
          score,
          successRate: successRate.toFixed(1)
        };
      }).filter(user => user !== null);
      
      setDiagnosticsData(processedData);
    } catch (error) {
      console.error('Error fetching diagnostics data:', error);
    }
  };

  const getLastAttempt = (quizzes) => {
    if (!quizzes || quizzes.length === 0) return null;
    return quizzes.reduce((latest, current) => {
      const currentDate = new Date(current.datetime);
      const latestDate = new Date(latest.datetime);
      return currentDate > latestDate ? current : latest;
    });
  };

  const preparePythonChartData = (userMap, selectedTopic) => {
    const labels = Array.from(userMap.keys());
    const attemptedData = [];
    const correctData = [];

    labels.forEach(username => {
      const stats = userMap.get(username)[selectedTopic] || { correct: 0, total: 0 };
      attemptedData.push(stats.total);
      correctData.push(stats.correct);
    });

    setPythonChartData({
      labels: labels,
      datasets: [
        {
          label: 'Attempted Questions',
          data: attemptedData,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Correct Questions',
          data: correctData,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });
  };

  const prepareEnglishChartData = (data) => {
    const usernames = [];
    const preScoresPercentage = [];
    const postScoresPercentage = [];
    
    data.forEach(user => {
      if (user.username) {
        usernames.push(user.username);
        
        let preScore = null;
        let postScore = null;
        
        if (user.quizzes && user.quizzes.length > 0) {
          user.quizzes.forEach(quiz => {
            if (quiz.diagnosticType === "pre") {
              preScore = (quiz.score / quiz.totalQuestions) * 100;
            } else if (quiz.diagnosticType === "post") {
              postScore = (quiz.score / quiz.totalQuestions) * 100;
            }
          });
        }
        
        preScoresPercentage.push(preScore !== null ? parseFloat(preScore.toFixed(1)) : null);
        postScoresPercentage.push(postScore !== null ? parseFloat(postScore.toFixed(1)) : null);
      }
    });

    setEnglishChartData({
      labels: usernames,
      datasets: [
        {
          label: 'Pre-Diagnostic (%)',
          data: preScoresPercentage,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Post-Diagnostic (%)',
          data: postScoresPercentage,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });
  };

  const prepareAlgebraChartData = (data, topic) => {
    const topicData = data.map(user => {
      const topicInfo = user.topics?.find(t => t?.topic === topic);
      return topicInfo ? {
        username: user.username || 'Anonymous',
        mastered: topicInfo.current_level === "mastered",
        scores: (topicInfo.questions || []).map(q => ({
          questionId: q.questionId,
          correct: q.correct === true,
          difficultyLevel: q.difficultyLevel || 'unknown'
        }))
      } : null;
    }).filter(user => user !== null);

    const usernames = topicData.map(user => user.username);
    const correctScores = topicData.map(user => user.scores.filter(q => q.correct).length);
    const totalScores = topicData.map(user => user.scores.length);
    const masteryColors = topicData.map(user => user.mastered ? 'rgba(75, 192, 192, 0.6)' : 'rgba(54, 162, 235, 0.8)');
    const borderColorMastery = topicData.map(user => user.mastered ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)');

    setAlgebraChartData({
      labels: usernames,
      datasets: [
        {
          label: `Correct Answers in ${topic}`,
          data: correctScores,
          backgroundColor: masteryColors,
          borderColor: borderColorMastery,
          borderWidth: 1
        },
        {
          label: `Total Questions in ${topic}`,
          data: totalScores,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    });
  };

  // Helper function to calculate user stats
  const getArithmeticStats = (email) => {
    const userScores = arithmeticData.filter(score => score.userEmail === email);
    const totalQuestions = userScores.reduce((sum, score) => sum + score.totalQuestions, 0);
    const correctAnswers = userScores.reduce((sum, score) => sum + score.correctAnswers, 0);
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
    return {
      totalQuestions,
      correctAnswers,
      accuracy,
      operations: userScores.map(score => ({
        type: score.operationType,
        questions: score.totalQuestions,
        correct: score.correctAnswers,
        timeTaken: score.timeTaken,
        date: score.createdAt
      }))
    };
  };
  
  const filteredArithmeticData = selectedArithmeticOperation 
    ? arithmeticData.filter(score => score.operationType === selectedArithmeticOperation)
    : arithmeticData;
  
  const arithmeticUsers = [...new Set(filteredArithmeticData.map(score => score.userEmail))].map(email => {
    const userData = filteredArithmeticData.find(score => score.userEmail === email);
    return {
      email,
      username: userData?.username || email,
      ...getArithmeticStats(email)
    };
  });

  // Handle topic change for algebra chart
  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    if (topic && algebraData.length > 0) {
      prepareAlgebraChartData(algebraData, topic);
    }
  };

  // Handle Python topic change
  const handlePythonTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedPythonTopic(topic);
    if (topic && pythonFingerData.size > 0) {
      preparePythonChartData(pythonFingerData, topic);
    }
  };

  const formatTopicName = (topic) => {
    return topic.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Chart options
  const englishChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'English Diagnostic Scores'
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Score Percentage (%)' }
      },
      y: {
        title: { display: true, text: 'Students' }
      }
    }
  };

  const algebraChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Performance in ${selectedTopic}`
      }
    },
    scales: {
      x: { beginAtZero: true },
      y: {
        ticks: { font: { size: 14 }, autoSkip: false }
      }
    }
  };

  const pythonChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Python Performance in ${formatTopicName(selectedPythonTopic)}`
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label;
            const value = context.parsed.x;
            if (label === 'Correct Questions') {
              const attempts = context.chart.data.datasets[0].data[context.dataIndex];
              const percentage = attempts > 0 
                ? ((value / attempts) * 100).toFixed(1) + '%'
                : '0%';
              return `${label}: ${value} (${percentage})`;
            }
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: { 
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' Q';
          }
        }
      },
      y: {
        ticks: { font: { size: 14 }, autoSkip: false }
      }
    }
  };

  // Existing functions
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleShareInvite = (joinCode) => {
    const inviteLink = `${window.location.origin}/register?code=${joinCode}`;
    
    // Just show the link for manual copying
    alert(`Share this link with students:\n\n${inviteLink}`);
    
    // Also try to copy silently
    const textArea = document.createElement('textarea');
    textArea.value = inviteLink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleViewStudents = async (classroomId) => {
    setLoadingStudents(true);
    setError('');
    
    try {
      const response = await fetch(`http://3.111.49.131:4000/api/classroom/${classroomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const classroomData = await response.json();
      setSelectedClassroom(classroomData);
      setStudentList(classroomData.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load student data. Please try again.');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleCloseStudentView = () => {
    setSelectedClassroom(null);
    setStudentList([]);
  };

  if (isLoading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="bi bi-person-workspace me-2"></i>
            Tutor Dashboard
          </span>
          
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-2"></i>
                {user?.name || 'Tutor'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Classrooms Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-house-door me-2"></i>Classroom Details
              </h5>
            </div>
            <div className="card-body">
              {classrooms.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-house-door fs-1 text-muted"></i>
                  <h6 className="mt-3 text-muted">No Classrooms Found</h6>
                  <p className="text-muted">No classrooms available.</p>
                </div>
              ) : (
                <div className="row">
                  {classrooms.map((classroom) => (
                    <div key={classroom._id} className="col-lg-6 col-md-12 mb-4">
                      <div className="card h-100">
                        <div className="card-header bg-success text-white">
                          <h5 className="mb-0">
                            {classroom.name}
                          </h5>
                        </div>
                        <div className="card-body">
                          <p>Students: {classroom.students.length}</p>
                          <p>Join Code: <strong>{classroom.joinCode}</strong></p>
                          <p>Subjects: 
                            {classroom.subjects && classroom.subjects.length > 0 ? (
                              <span className="ms-2">
                                {classroom.subjects.map((subject, index) => (
                                  <span key={index} className="badge bg-info me-1 text-capitalize">
                                    {subject}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <span className="text-muted ms-2">English, Math and Programming</span>
                            )}
                          </p>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => handleShareInvite(classroom.joinCode)}
                            >
                              <i className="bi bi-share me-2"></i>Share Invite Link
                            </button>
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleViewStudents(classroom._id)}
                              disabled={loadingStudents}
                            >
                              <i className="bi bi-people me-2"></i>View Students
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Student List Modal/View */}
          {selectedClassroom && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <i className="bi bi-people me-2"></i>Students in {selectedClassroom.name}
                    </h5>
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={handleCloseStudentView}
                    >
                      <i className="bi bi-x"></i> Close
                    </button>
                  </div>
                  <div className="card-body">
                    {loadingStudents ? (
                      <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading students...</span>
                        </div>
                        <p className="mt-2">Loading students...</p>
                      </div>
                    ) : studentList.length === 0 ? (
                      <div className="text-center py-4">
                        <i className="bi bi-person-plus fs-1 text-muted"></i>
                        <h6 className="mt-3 text-muted">No Students Enrolled</h6>
                        <p className="text-muted">Share the join code <strong>{selectedClassroom.joinCode}</strong> to invite students.</p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Status</th>
                              <th>Last Active</th>
                              <th>Joined Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentList.map((student, index) => (
                              <tr key={student._id || index}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                                      <i className="bi bi-person"></i>
                                    </div>
                                    <strong>{student.name}</strong>
                                  </div>
                                </td>
                                <td>{student.email}</td>
                                <td>
                                  <span className={`badge ${student.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                    {student.status || 'Active'}
                                  </span>
                                </td>
                                <td>{student.lastActive && student.lastActive !== 'Recently' && student.lastActive !== 'Never' ? 
                                  new Date(student.lastActive).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'numeric', 
                                    day: 'numeric'
                                  }) : student.lastActive || 'Recently'}</td>
                                <td>{student.date ? new Date(student.date).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: 'numeric', 
                                  day: 'numeric'
                                }) : 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ENGLISH SECTION */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{border: '1px solid #d4edda'}}>
            <div className="card-header text-dark" style={{backgroundColor: '#d4edda', borderBottom: '1px solid #c3e6cb'}}>
              <h4 className="mb-0">
                <i className="bi bi-book me-2"></i>English Performance
              </h4>
            </div>
            <div className="card-body">
              
              {/* English Diagnostic Chart */}
              {englishDiagnosticData.length > 0 && englishChartData && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">English Diagnostic Scores</h5>
                      </div>
                      <div className="card-body">
                        <Bar data={englishChartData} options={englishChartOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vocabulary Assessment */}
              {vocabularyData.length > 0 ? (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Vocabulary Assessment</h5>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Username</th>
                                <th>Last Activity</th>
                                <th>Total Assessments</th>
                                <th>Total Questions</th>
                                <th>Correct Answers</th>
                                <th>Average Score (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vocabularyData.slice(0, showMoreVocab ? vocabularyData.length : 5).map((user, index) => (
                                <tr key={index}>
                                  <td>{user.username}</td>
                                  <td>{user.lastActivity}</td>
                                  <td>{user.totalAssessments}</td>
                                  <td>{user.totalQuestions}</td>
                                  <td>{user.correctAnswers}</td>
                                  <td>{user.averagePercentage}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {vocabularyData.length > 5 && (
                          <div className="text-center">
                            <button 
                              className="btn btn-secondary"
                              onClick={() => setShowMoreVocab(!showMoreVocab)}
                            >
                              {showMoreVocab ? 'Show Less' : 'Show More'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : allStudents.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Vocabulary Assessment</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center py-4">
                          <i className="bi bi-book fs-1 text-muted"></i>
                          <h6 className="mt-3 text-muted">No Vocabulary Data</h6>
                          <p className="text-muted">No vocabulary assessment data available for your students yet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MATH SECTION */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm" style={{border: '1px solid #bee5eb'}}>
              <div className="card-header text-dark" style={{backgroundColor: '#bee5eb', borderBottom: '1px solid #a6d9e0'}}>
                <h4 className="mb-0">
                  <i className="bi bi-calculator me-2"></i>Math Performance
                </h4>
              </div>
              <div className="card-body">
                {/* Diagnostic Comparison Section */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card shadow-sm">
                      <div className="card-header bg-info text-white">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            <i className="bi bi-graph-up me-2"></i>Math Diagnostic Comparison
                          </h5>
                          <select
                            className="form-select w-auto"
                            value={selectedDiagnosticTopic}
                            onChange={(e) => setSelectedDiagnosticTopic(e.target.value)}
                          >
                            <option value="arithmetic">Arithmetic</option>
                            <option value="pre-algebra">Pre-Algebra</option>
                            <option value="algebra">Algebra</option>
                            <option value="geometry">Geometry</option>
                            <option value="trigonometry">Trigonometry</option>
                            <option value="calculus">Calculus</option>
                            <option value="statistics">Statistics</option>
                            <option value="probability">Probability</option>
                          </select>
                        </div>
                      </div>
                      <div className="card-body">
                        {loadingDiagnostics ? (
                          <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading diagnostic comparisons...</p>
                          </div>
                        ) : diagnosticComparisonData.length > 0 ? (
                          <>
                            <div style={{ height: '500px' }}>
                              <Bar 
                                data={prepareDiagnosticChartData()} 
                                options={diagnosticChartOptions} 
                              />
                            </div>
                            
                            {/* Detailed Comparison Table */}
                            <div className="mt-4">
                              <h6>Detailed Comparison</h6>
                              <div className="table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>Student</th>
                                      <th>Pre-Test</th>
                                      <th>Post-Test</th>
                                      <th>Improvement</th>
                                      <th>Time Improvement</th>
                                      <th>Accuracy Gain</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {diagnosticComparisonData.map((data, index) => (
                                      <tr key={index}>
                                        <td>{data.username}</td>
                                        <td>
                                          {data.hasPreTest ? (
                                            <>
                                              <strong>{data.preTest.totalScore}%</strong>
                                              <div className="progress mt-1" style={{height: '8px'}}>
                                                <div 
                                                  className="progress-bar bg-primary" 
                                                  style={{width: `${data.preTest.totalScore}%`}}
                                                ></div>
                                              </div>
                                            </>
                                          ) : 'N/A'}
                                        </td>
                                        <td>
                                          {data.hasPostTest ? (
                                            <>
                                              <strong>{data.postTest.totalScore}%</strong>
                                              <div className="progress mt-1" style={{height: '8px'}}>
                                                <div 
                                                  className="progress-bar bg-success" 
                                                  style={{width: `${data.postTest.totalScore}%`}}
                                                ></div>
                                              </div>
                                            </>
                                          ) : 'N/A'}
                                        </td>
                                        <td>
                                          {data.canCompare ? (
                                            <>
                                              <span className={`badge ${data.improvement.scorePercentageImprovement >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                                {data.improvement.scorePercentageImprovement >= 0 ? '+' : ''}
                                                {data.improvement.scorePercentageImprovement}%
                                              </span>
                                              <div className="progress mt-1" style={{height: '8px'}}>
                                                <div 
                                                  className={`progress-bar ${data.improvement.scorePercentageImprovement >= 0 ? 'bg-success' : 'bg-danger'}`} 
                                                  style={{width: `${Math.abs(data.improvement.scorePercentageImprovement)}%`}}
                                                ></div>
                                              </div>
                                            </>
                                          ) : 'N/A'}
                                        </td>
                                        <td>
                                          {data.canCompare ? (
                                            <span className={`badge ${data.improvement.timeImprovement >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                              {data.improvement.timeImprovement >= 0 ? '+' : ''}
                                              {Math.abs(data.improvement.timeImprovement).toFixed(1)}s
                                            </span>
                                          ) : 'N/A'}
                                        </td>
                                        <td>
                                          {data.canCompare ? (
                                            <span className={`badge ${data.improvement.accuracyImprovement >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                              {data.improvement.accuracyImprovement >= 0 ? '+' : ''}
                                              {(data.improvement.accuracyImprovement * 100).toFixed(1)}%
                                            </span>
                                          ) : 'N/A'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <i className="bi bi-graph-up fs-1 text-muted"></i>
                            <h6 className="mt-3 text-muted">No Diagnostic Data Available</h6>
                            <p className="text-muted">No diagnostic test results found for your students in this topic area.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Arithmetic Scores Table */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Arithmetic Performance</h5>
                        <select 
                          className="form-select w-auto"
                          value={selectedArithmeticOperation}
                          onChange={(e) => setSelectedArithmeticOperation(e.target.value)}
                        >
                          <option value="">All Operations</option>
                          {arithmeticOperations.map(op => (
                            <option key={op} value={op}>
                              {op.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="card-body">
                        {loadingArithmetic ? (
                          <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading arithmetic data...</p>
                          </div>
                        ) : (
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Student</th>
                                  <th>Overall Accuracy</th>
                                  <th>Operation</th>
                                  <th>Correct</th>
                                  <th>Speed</th>
                                  <th>Last Activity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {arithmeticUsers.map((user, index) => (
                                  <>
                                    {user.operations
                                      .filter(op => 
                                        !selectedArithmeticOperation || 
                                        op.type === selectedArithmeticOperation
                                      )
                                      .map((op, i) => (
                                        <tr key={`${index}-${i}`}>
                                          {i === 0 && (
                                            <>
                                              <td rowSpan={user.operations.filter(op => 
                                                !selectedArithmeticOperation || 
                                                op.type === selectedArithmeticOperation
                                              ).length}>
                                                <strong>{user.username}</strong>
                                              </td>
                                              <td rowSpan={user.operations.filter(op => 
                                                !selectedArithmeticOperation || 
                                                op.type === selectedArithmeticOperation
                                              ).length}>
                                                <div className="d-flex align-items-center">
                                                  <div className="progress flex-grow-1" style={{height: '8px'}}>
                                                    <div 
                                                      className={`progress-bar ${user.accuracy >= 80 ? 'bg-success' : user.accuracy >= 50 ? 'bg-warning' : 'bg-danger'}`}
                                                      style={{ width: `${Math.round(user.accuracy)}%` }}
                                                    ></div>
                                                  </div>
                                                  <span className="ms-2">{Math.round(user.accuracy)}%</span>
                                                </div>
                                              </td>
                                            </>
                                          )}
                                          <td>
                                            {op.type.split('-').map(w => 
                                              w.charAt(0).toUpperCase() + w.slice(1)
                                            ).join(' ')}
                                          </td>
                                          <td>
                                            <span className="badge bg-primary rounded-pill">
                                              {op.correct}/{op.questions}
                                            </span>
                                            <span className="ms-2">
                                              ({Math.round((op.correct / op.questions) * 100)}%)
                                            </span>
                                          </td>
                                          <td>{(op.timeTaken / op.questions).toFixed(1)}s/q</td>
                                          <td>{new Date(op.date).toLocaleDateString()}</td>
                                        </tr>
                                      ))}
                                  </>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
              {/* Algebra Scores */}
              {algebraData.length > 0 ? (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Algebra Scores by Topic</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <select 
                            className="form-select"
                            value={selectedTopic}
                            onChange={handleTopicChange}
                          >
                            <option value="" disabled>Select Topic</option>
                            {availableTopics.map((topic, index) => (
                              <option key={index} value={topic}>
                                {topic.charAt(0).toUpperCase() + topic.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                        {algebraChartData && selectedTopic ? (
                          <Bar data={algebraChartData} options={algebraChartOptions} />
                        ) : (
                          <div className="text-center py-4">
                            <i className="bi bi-graph-up fs-1 text-muted"></i>
                            <p className="text-muted mt-3">
                              {availableTopics.length > 0 ? 'Select a topic to view the chart' : 'Loading topics...'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : allStudents.length > 0 ? (
                <div className="text-center py-4">
                  
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAMMING SECTION */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{border: '1px solid #fdeaa7'}}>
            <div className="card-header text-dark" style={{backgroundColor: '#fdeaa7', borderBottom: '1px solid #fce38a'}}>
              <h4 className="mb-0">
                <i className="bi bi-code-slash me-2"></i>Programming Performance
              </h4>
            </div>
            <div className="card-body">
              
              {/* Computational Thinking Section */}
              {ctData.length > 0 ? (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Computational Thinking Foundation Progress</h5>
                        <small className="text-muted">30 Questions per Topic</small>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Username</th>
                                <th>CT Foundation<br/><small className="text-muted">(out of 30)</small></th>
                                <th>CT Foundation 1<br/><small className="text-muted">(out of 30)</small></th>
                                <th>CT Foundation 2<br/><small className="text-muted">(out of 30)</small></th>
                                <th>Total Solved<br/><small className="text-muted">(out of 90)</small></th>
                              </tr>
                            </thead>
                            <tbody>
                              {ctData.map((user, index) => {
                                const topicScores = {
                                  'CT_foundation': 0,
                                  'CT_foundation_1': 0,
                                  'CT_foundation_2': 0
                                };

                                user.quizzes.forEach(quiz => {
                                  if (topicScores.hasOwnProperty(quiz.topic)) {
                                    topicScores[quiz.topic] += quiz.score;
                                  }
                                });

                                const totalSolved = Object.values(topicScores).reduce((a, b) => a + b, 0);

                                return (
                                  <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>
                                      {topicScores.CT_foundation}
                                      <br/>
                                      <small className="text-success">
                                        ({Math.round((topicScores.CT_foundation/30)*100)}%)
                                      </small>
                                    </td>
                                    <td>
                                      {topicScores['CT_foundation_1']}
                                      <br/>
                                      <small className="text-success">
                                        ({Math.round((topicScores['CT_foundation_1']/30)*100)}%)
                                      </small>
                                    </td>
                                    <td>
                                      {topicScores['CT_foundation_2']}
                                      <br/>
                                      <small className="text-success">
                                        ({Math.round((topicScores['CT_foundation_2']/30)*100)}%)
                                      </small>
                                    </td>
                                    <td>
                                      <strong>{totalSolved}</strong>
                                      <br/>
                                      <small className="text-success">
                                        ({Math.round((totalSolved/90)*100)}%)
                                      </small>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : allStudents.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Computational Thinking Foundation Progress</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center py-4">
                          <i className="bi bi-gear fs-1 text-muted"></i>
                          <h6 className="mt-3 text-muted">No CT Data Available</h6>
                          <p className="text-muted">No computational thinking data available for your students yet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Python Finger Exercise Section */}
              {pythonFingerData.size > 0 ? (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Python Finger Exercise Progress</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <select 
                            className="form-select"
                            value={selectedPythonTopic}
                            onChange={handlePythonTopicChange}
                          >
                            <option value="" disabled>Select Python Topic</option>
                            {pythonTopics.map((topic, index) => (
                              <option key={index} value={topic}>
                                {formatTopicName(topic)}
                              </option>
                            ))}
                          </select>
                        </div>
                        {pythonChartData && selectedPythonTopic ? (
                          <div style={{ height: '400px' }}>
                            <Bar data={pythonChartData} options={pythonChartOptions} />
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <i className="bi bi-graph-up fs-1 text-muted"></i>
                            <p className="text-muted mt-3">
                              {pythonTopics.length > 0 ? 'Select a topic to view the chart' : 'Loading topics...'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : allStudents.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Python Finger Exercise Progress</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center py-4">
                          <i className="bi bi-code fs-1 text-muted"></i>
                          <h6 className="mt-3 text-muted">No Python Exercise Data Available</h6>
                          <p className="text-muted">No Python finger exercise data available for your students yet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Programming Diagnostics Section */}
              {diagnosticsData.length > 0 ? (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Programming Diagnostic Test Scores</h5>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Username</th>
                                <th>Last Attempt Date</th>
                                <th>Total Questions</th>
                                <th>Score</th>
                                <th>Success Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {diagnosticsData.map((user, index) => (
                                <tr key={index}>
                                  <td>{user.username}</td>
                                  <td>{user.lastAttempt}</td>
                                  <td>{user.totalQuestions}</td>
                                  <td>{user.score}</td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <span className="me-2">{user.successRate}%</span>
                                      <div className="progress flex-grow-1" style={{height: '8px'}}>
                                        <div 
                                          className="progress-bar" 
                                          style={{
                                            width: `${user.successRate}%`,
                                            backgroundColor: 
                                              parseFloat(user.successRate) < 40 ? '#dc3545' :
                                              parseFloat(user.successRate) < 70 ? '#ffc107' : '#28a745'
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : allStudents.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Programming Diagnostic Test Scores</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center py-4">
                          <i className="bi bi-clipboard-check fs-1 text-muted"></i>
                          <h6 className="mt-3 text-muted">No Diagnostic Data Available</h6>
                          <p className="text-muted">No programming diagnostic test data available for your students yet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Show message when no programming data at all */}
              {ctData.length === 0 && pythonFingerData.size === 0 && diagnosticsData.length === 0 && allStudents.length > 0 && (
                <div className="text-center py-4">
                  <i className="bi bi-code-slash fs-1 text-muted"></i>
                  <h6 className="mt-3 text-muted">No Programming Data Available</h6>
                  <p className="text-muted">No programming assessment data available for your students yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
