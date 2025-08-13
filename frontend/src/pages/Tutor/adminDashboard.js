import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const EnhancedTutorDashboard = () => {
  // Core state management
  const [dashboardState, setDashboardState] = useState({
    loading: true,
    error: null,
    lastUpdated: new Date(),
    selectedClassroom: null,
    selectedStudent: null,
    timeRange: 'week',
    activeTab: 'overview'
  });

  const [classroomData, setClassroomData] = useState({
    classrooms: [],
    selectedClassroomStudents: [],
    classroomStats: {}
  });

  const [analyticsData, setAnalyticsData] = useState({
    mathFingerExercises: [],
    mathTopicPerformance: {},
    englishFingerExercises: [],
    englishTopicPerformance: {},
    programmingFingerExercises: [],
    programmingTopicPerformance: {},
    studentProgress: [],
    overallStats: {},
    availableTopics: {
      math: ['Arithmetic', 'Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Computational Thinking'],
      english: ['Reading', 'Writing', 'Vocabulary', 'Grammar'],
      programming: ['Python Basics', 'Python Functions', 'Python Conditionals', 'Python Loops', 'CT Foundation']
    }
  });

  // Get user from context or session (replace with your auth implementation)
  const user = {
    userId: 'user123',
    name: 'John Doe',
    token: 'sample-token'
  };

  // Enhanced API call function with better error handling
  const apiCall = useCallback(async (endpoint, options = {}, retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
<<<<<<< Updated upstream
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classrooms`, {
          method: 'GET',
=======
        const response = await fetch(`http://localhost:4000${endpoint}`, {
          ...options,
          credentials: 'include',
>>>>>>> Stashed changes
          headers: {
            'Content-Type': 'application/json',
            'Authorization': user?.token ? `Bearer ${user.token}` : '',
            ...options.headers
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Error for ${endpoint}:`, response.status, errorText);
          
          if (attempt === retries - 1) {
            throw new Error(`API Error: ${response.status} - ${errorText}`);
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }

        return await response.json();
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed for ${endpoint}:`, error.message);
        if (attempt === retries - 1) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }, [user?.token]);

  // Fetch classrooms with real API integration
  const fetchClassrooms = useCallback(async () => {
    try {
      setDashboardState(prev => ({ ...prev, loading: true, error: null }));
      
      // First get session info
      const sessionResponse = await apiCall('/api/session-info');
      console.log('Session response:', sessionResponse);
      
      // Then fetch tutor's classrooms using your existing endpoint
      const classroomsResponse = await apiCall('/api/tutor/classrooms');
      console.log('Classrooms response:', classroomsResponse);
      
      // Filter classrooms for this tutor
      const tutorClassrooms = Array.isArray(classroomsResponse) 
        ? classroomsResponse.filter(classroom => 
            classroom.tutor?._id === user?.userId || 
            classroom.tutorId === user?.userId ||
            classroom.tutor?.toString() === user?.userId
          )
        : [];

      setClassroomData(prev => ({
        ...prev,
        classrooms: tutorClassrooms
      }));

      // Auto-select first classroom if none selected
      if (tutorClassrooms.length > 0 && !dashboardState.selectedClassroom) {
        setDashboardState(prev => ({
          ...prev,
          selectedClassroom: tutorClassrooms[0]._id
        }));
      }
    } catch (error) {
<<<<<<< Updated upstream
      console.error('Error fetching analytics data:', error);
    }
  };


  const fetchArithmeticData = async (studentEmails) => {
    setLoadingArithmetic(true);
    try {
      // Use your existing endpoint with optional userEmail filter
      const url = studentEmails.length > 0
        ? `${process.env.REACT_APP_API_URL}/api/arithmetic-scores?${studentEmails.map(email => `userEmail=${email}`).join('&')}`
        : `${process.env.REACT_APP_API_URL}/api/arithmetic-scores`;
=======
      console.error('Error fetching classrooms:', error);
      // Fallback to mock data if API fails
      const mockClassrooms = [
        {
          _id: 'classroom1',
          name: 'Grade 8 Mathematics',
          joinCode: 'ABC123',
          students: [
            { _id: 'student1', name: 'Alice Johnson', email: 'alice@example.com' },
            { _id: 'student2', name: 'Bob Smith', email: 'bob@example.com' },
            { _id: 'student3', name: 'Carol Davis', email: 'carol@example.com' }
          ]
        }
      ];
>>>>>>> Stashed changes
      
      setClassroomData(prev => ({ ...prev, classrooms: mockClassrooms }));
      setDashboardState(prev => ({
        ...prev,
        selectedClassroom: mockClassrooms[0]._id,
        error: `Using demo data. API Error: ${error.message}`
      }));
    } finally {
      setDashboardState(prev => ({ ...prev, loading: false }));
    }
  }, [apiCall, user?.userId, dashboardState.selectedClassroom]);

  // Enhanced analytics fetching with real API integration
  const fetchClassroomAnalytics = useCallback(async (classroomId) => {
    if (!classroomId) return;

    try {
<<<<<<< Updated upstream
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/eng_diagnostic_scores`);
      if (!response.ok) throw new Error('Failed to fetch English diagnostic data');
=======
      setDashboardState(prev => ({ ...prev, loading: true, error: null }));
>>>>>>> Stashed changes
      
      // Get classroom details using your existing endpoint
      const classroom = await apiCall(`/api/classroom/${classroomId}`);
      console.log('Classroom details:', classroom);
      
<<<<<<< Updated upstream
      setEnglishDiagnosticData(filteredData);
      prepareEnglishChartData(filteredData);
    } catch (error) {
      console.error('Error fetching English diagnostic data:', error);
    }
  };

  const fetchVocabularyData = async (studentEmails) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vocabscores`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/algebra_scores`);
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
=======
      if (!classroom || !classroom.students) {
        console.warn('No classroom or students found');
        setDashboardState(prev => ({ ...prev, loading: false }));
        return;
>>>>>>> Stashed changes
      }

      const studentIds = classroom.students.map(s => s._id);
      console.log('Student IDs for analytics:', studentIds);

<<<<<<< Updated upstream
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
              `${process.env.REACT_APP_API_URL}/api/mathematicsDiagnosticsComparison/${student.email}/${selectedDiagnosticTopic}`
            );
            const data = await response.json();
            return data.success ? data.data : null;
          } catch (error) {
            console.error(`Error fetching diagnostics for ${student.email}:`, error);
            return null;
          }
=======
      // Fetch analytics data using your existing endpoints
      const [mathResult, englishResult, programmingResult] = await Promise.allSettled([
        apiCall('/api/analytics/math-progress', {
          method: 'POST',
          body: JSON.stringify({ 
            studentIds, 
            timeRange: dashboardState.timeRange 
          })
        }),
        apiCall('/api/analytics/english-progress', {
          method: 'POST',
          body: JSON.stringify({ 
            studentIds, 
            timeRange: dashboardState.timeRange 
          })
        }),
        apiCall('/api/analytics/programming-progress', {
          method: 'POST',
          body: JSON.stringify({ 
            studentIds, 
            timeRange: dashboardState.timeRange 
          })
>>>>>>> Stashed changes
        })
      ]);

      // Process results with fallbacks
      const mathData = mathResult.status === 'fulfilled' ? mathResult.value : getEmptySubjectData('math');
      const englishData = englishResult.status === 'fulfilled' ? englishResult.value : getEmptySubjectData('english');
      const programmingData = programmingResult.status === 'fulfilled' ? programmingResult.value : getEmptySubjectData('programming');

      // If API calls failed, generate mock data
      const finalMathData = mathData.fingerExercises?.length > 0 ? mathData : {
        fingerExercises: generateMockProgressData(studentIds, 'math', 200)
      };
      const finalEnglishData = englishData.fingerExercises?.length > 0 ? englishData : {
        fingerExercises: generateMockProgressData(studentIds, 'english', 150)
      };
      const finalProgrammingData = programmingData.fingerExercises?.length > 0 ? programmingData : {
        fingerExercises: generateMockProgressData(studentIds, 'programming', 100)
      };

      // Calculate topic performances
      const mathTopicPerformance = calculateTopicPerformance(finalMathData.fingerExercises || [], 'math');
      const englishTopicPerformance = calculateTopicPerformance(finalEnglishData.fingerExercises || [], 'english');
      const programmingTopicPerformance = calculateTopicPerformance(finalProgrammingData.fingerExercises || [], 'programming');

      // Update analytics data
      setAnalyticsData(prev => ({
        ...prev,
        mathFingerExercises: finalMathData.fingerExercises || [],
        mathTopicPerformance,
        englishFingerExercises: finalEnglishData.fingerExercises || [],
        englishTopicPerformance,
        programmingFingerExercises: finalProgrammingData.fingerExercises || [],
        programmingTopicPerformance,
        studentProgress: generateStudentProgressSummary(
          classroom.students, 
          finalMathData.fingerExercises || [], 
          finalEnglishData.fingerExercises || [], 
          finalProgrammingData.fingerExercises || []
        )
      }));

      // Update classroom data
      setClassroomData(prev => ({
        ...prev,
        selectedClassroomStudents: classroom.students || [],
        classroomStats: calculateClassroomStats(
          finalMathData.fingerExercises || [], 
          finalEnglishData.fingerExercises || [], 
          finalProgrammingData.fingerExercises || [],
          classroom.students.length
        )
      }));

    } catch (error) {
      console.error('Error fetching classroom analytics:', error);
      setDashboardState(prev => ({
        ...prev,
        error: `Failed to load classroom analytics: ${error.message}`
      }));
      
      // Generate fallback mock data
      const mockStudentIds = ['student1', 'student2', 'student3'];
      const mockMathData = generateMockProgressData(mockStudentIds, 'math', 200);
      const mockEnglishData = generateMockProgressData(mockStudentIds, 'english', 150);
      const mockProgrammingData = generateMockProgressData(mockStudentIds, 'programming', 100);
      
      setAnalyticsData(prev => ({
        ...prev,
        mathFingerExercises: mockMathData,
        mathTopicPerformance: calculateTopicPerformance(mockMathData, 'math'),
        englishFingerExercises: mockEnglishData,
        englishTopicPerformance: calculateTopicPerformance(mockEnglishData, 'english'),
        programmingFingerExercises: mockProgrammingData,
        programmingTopicPerformance: calculateTopicPerformance(mockProgrammingData, 'programming'),
        studentProgress: generateStudentProgressSummary(
          [
            { _id: 'student1', name: 'Alice Johnson', email: 'alice@example.com' },
            { _id: 'student2', name: 'Bob Smith', email: 'bob@example.com' },
            { _id: 'student3', name: 'Carol Davis', email: 'carol@example.com' }
          ], 
          mockMathData, 
          mockEnglishData, 
          mockProgrammingData
        )
      }));
    } finally {
      setDashboardState(prev => ({ 
        ...prev, 
        loading: false,
        lastUpdated: new Date()
      }));
    }
  }, [apiCall, dashboardState.timeRange]);

<<<<<<< Updated upstream
  const fetchReadingComprehensionData = async (studentEmails) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/readingcomprehensionscore`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/CT_finger_scores`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/finger-exercise`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/programming`);
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
=======
  // Helper function to get empty subject data structure
  const getEmptySubjectData = (subject = '') => {
    const emptyTopics = {};
    const availableTopics = analyticsData.availableTopics[subject] || [];
>>>>>>> Stashed changes
    
    availableTopics.forEach(topic => {
      emptyTopics[topic] = {
        totalQuestions: 0,
        correctAnswers: 0,
        students: new Set(),
        totalTime: 0,
        timeCount: 0,
        successRate: 0,
        studentCount: 0,
        averageTime: 0
      };
    });

    return {
      fingerExercises: [],
      topicPerformance: emptyTopics
    };
  };

  // Generate mock progress data (fallback when API fails)
  const generateMockProgressData = (studentIds, subject, count) => {
    const data = [];
    const topics = analyticsData.availableTopics[subject] || [];
    
    for (let i = 0; i < count; i++) {
      const studentId = studentIds[Math.floor(Math.random() * studentIds.length)];
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const isCorrect = Math.random() > 0.3; // 70% success rate
      
      data.push({
        userId: studentId,
        questionId: `q_${i}`,
        questionType: subject,
        studentAnswer: `answer_${i}`,
        correctAnswer: 'correct_answer',
        isCorrect: isCorrect,
        responseTime: Math.floor(Math.random() * 120) + 30, // 30-150 seconds
        score: isCorrect ? 100 : 0,
        topicArea: topic.toLowerCase().replace(/\s+/g, '-'),
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Last 30 days
        sourceCollection: `Mock${subject.charAt(0).toUpperCase() + subject.slice(1)}Data`,
        errorType: !isCorrect ? ['Calculation Error', 'Concept Misunderstanding', 'Time Pressure'][Math.floor(Math.random() * 3)] : null
      });
    }
    
    return data;
  };

  // Enhanced topic performance calculation
  const calculateTopicPerformance = (exerciseData, subject) => {
    const topicStats = {};
    const availableTopics = analyticsData.availableTopics[subject] || [];
    
    // Initialize all available topics with default values
    availableTopics.forEach(topic => {
      topicStats[topic] = {
        totalQuestions: 0,
        correctAnswers: 0,
        students: new Set(),
        totalTime: 0,
        timeCount: 0,
        commonErrors: [],
        difficultyBreakdown: {
          easy: { total: 0, correct: 0 },
          medium: { total: 0, correct: 0 },
          hard: { total: 0, correct: 0 }
        }
      };
    });
    
    if (!Array.isArray(exerciseData)) {
      console.warn(`Exercise data for ${subject} is not an array:`, exerciseData);
      return topicStats;
    }
    
    // Process each exercise
    exerciseData.forEach(exercise => {
      // Extract topic from various possible fields
      let topic = exercise.topicArea || exercise.topic || exercise.questionTopic || exercise.subtopic || 'General';
      
      // Clean up topic names for better matching
      topic = topic.replace(/[-_]/g, ' ').toLowerCase();
      
      // Try to match with available topics
      let matchedTopic = availableTopics.find(availableTopic => 
        availableTopic.toLowerCase().includes(topic) || 
        topic.includes(availableTopic.toLowerCase())
      );
      
      // If no match, use the original topic but add it to stats
      if (!matchedTopic) {
        matchedTopic = topic;
        if (!topicStats[matchedTopic]) {
          topicStats[matchedTopic] = {
            totalQuestions: 0,
            correctAnswers: 0,
            students: new Set(),
            totalTime: 0,
            timeCount: 0,
            commonErrors: [],
            difficultyBreakdown: {
              easy: { total: 0, correct: 0 },
              medium: { total: 0, correct: 0 },
              hard: { total: 0, correct: 0 }
            }
          };
        }
      }
      
      const stats = topicStats[matchedTopic];
      stats.totalQuestions++;
      stats.students.add(exercise.userId || exercise.studentId || exercise.email);
      
      const isCorrect = exercise.isCorrect || exercise.correct || (exercise.score > 50);
      if (isCorrect) {
        stats.correctAnswers++;
      } else {
        if (exercise.errorType) {
          stats.commonErrors.push(exercise.errorType);
        }
      }
      
      const responseTime = exercise.responseTime || exercise.timeSpent || 0;
      if (responseTime > 0) {
        stats.totalTime += responseTime;
        stats.timeCount++;
      }

<<<<<<< Updated upstream
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classroom/${classroomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
=======
      const difficulty = (exercise.difficulty || exercise.questionDifficulty || 'medium').toLowerCase();
      if (stats.difficultyBreakdown[difficulty]) {
        stats.difficultyBreakdown[difficulty].total++;
        if (isCorrect) {
          stats.difficultyBreakdown[difficulty].correct++;
>>>>>>> Stashed changes
        }
      }
    });

    // Calculate derived metrics for all topics
    Object.keys(topicStats).forEach(topic => {
      const stats = topicStats[topic];
      
      stats.successRate = stats.totalQuestions > 0 
        ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
        : 0;
      
      stats.studentCount = stats.students.size;
      
      stats.averageTime = stats.timeCount > 0 
        ? Math.round(stats.totalTime / stats.timeCount)
        : 0;

      // Calculate difficulty breakdown percentages
      Object.keys(stats.difficultyBreakdown).forEach(difficulty => {
        const diffStats = stats.difficultyBreakdown[difficulty];
        diffStats.successRate = diffStats.total > 0 
          ? Math.round((diffStats.correct / diffStats.total) * 100)
          : 0;
      });

      // Find most common error
      stats.mostCommonError = stats.commonErrors.length > 0 
        ? stats.commonErrors.reduce((a, b, i, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
          )
        : null;

      // Generate suggestions
      stats.suggestions = generateTopicSuggestions(stats);
    });

    return topicStats;
  };

  // Helper function to generate topic suggestions
  const generateTopicSuggestions = (topicStats) => {
    const suggestions = [];
    
    if (topicStats.successRate < 50) {
      suggestions.push('Focus on fundamental concepts');
      suggestions.push('Provide additional practice exercises');
    } else if (topicStats.successRate < 70) {
      suggestions.push('Review problem-solving strategies');
      suggestions.push('Practice with guided examples');
    } else if (topicStats.successRate >= 80) {
      suggestions.push('Ready for advanced challenges');
      suggestions.push('Consider moving to next difficulty level');
    }

    if (topicStats.averageTime > 120) {
      suggestions.push('Work on speed and efficiency');
    }

    if (topicStats.mostCommonError) {
      suggestions.push(`Address common error: ${topicStats.mostCommonError}`);
    }

    return suggestions;
  };

  // Calculate classroom-level statistics
  const calculateClassroomStats = (mathExercises, englishExercises, programmingExercises, totalStudents) => {
    const getParticipation = (exercises) => {
      return new Set(exercises.map(e => e.userId || e.studentId || e.email)).size;
    };

    const mathParticipation = getParticipation(mathExercises);
    const englishParticipation = getParticipation(englishExercises);
    const programmingParticipation = getParticipation(programmingExercises);

    return {
      totalStudents,
      mathParticipation,
      englishParticipation,
      programmingParticipation,
      overallEngagement: totalStudents > 0 
        ? Math.round(((mathParticipation + englishParticipation + programmingParticipation) / (totalStudents * 3)) * 100)
        : 0
    };
  };

  // Generate student progress summary
  const generateStudentProgressSummary = (students, mathExercises, englishExercises, programmingExercises) => {
    return students.map(student => {
      const studentId = student._id || student.id;
      const studentEmail = student.email;
      
      // Filter exercises for this student
      const mathQuestions = mathExercises.filter(q => 
        (q.userId && q.userId.toString() === studentId) || 
        (q.email === studentEmail)
      );
      const englishQuestions = englishExercises.filter(q => 
        (q.userId && q.userId.toString() === studentId) || 
        (q.email === studentEmail)
      );
      const programmingQuestions = programmingExercises.filter(q => 
        (q.userId && q.userId.toString() === studentId) || 
        (q.email === studentEmail)
      );
      
      // Calculate accuracy for each subject
      const calculateAccuracy = (questions) => {
        if (questions.length === 0) return 0;
        const correct = questions.filter(q => q.isCorrect || q.correct || (q.score > 50)).length;
        return Math.round((correct / questions.length) * 100);
      };

      const mathAccuracy = calculateAccuracy(mathQuestions);
      const englishAccuracy = calculateAccuracy(englishQuestions);
      const programmingAccuracy = calculateAccuracy(programmingQuestions);
      
      // Find last activity
      const allQuestions = [...mathQuestions, ...englishQuestions, ...programmingQuestions];
      const lastActivity = allQuestions.length > 0 
        ? Math.max(...allQuestions.map(q => new Date(q.createdAt || q.timestamp || 0).getTime()))
        : 0;

      return {
        ...student,
        id: studentId,
        mathAccuracy,
        englishAccuracy,
        programmingAccuracy,
        totalQuestions: allQuestions.length,
        overallAccuracy: allQuestions.length > 0 
          ? Math.round((mathAccuracy + englishAccuracy + programmingAccuracy) / 3) 
          : 0,
        needsAttention: (mathAccuracy < 60 || englishAccuracy < 60 || programmingAccuracy < 60),
        strongSubjects: [
          mathAccuracy >= 80 ? 'Mathematics' : null,
          englishAccuracy >= 80 ? 'English' : null,
          programmingAccuracy >= 80 ? 'Programming' : null
        ].filter(Boolean),
        weakSubjects: [
          mathAccuracy < 60 ? 'Mathematics' : null,
          englishAccuracy < 60 ? 'English' : null,
          programmingAccuracy < 60 ? 'Programming' : null
        ].filter(Boolean),
        lastActivity: lastActivity > 0 ? lastActivity : null,
        recentActivities: allQuestions.slice(0, 10)
      };
    });
  };

  // Helper functions for individual student analysis
  const getStudentActivityTimeline = () => {
    if (!dashboardState.selectedStudent) return [];
    
    const studentData = analyticsData.studentProgress.find(s => s.id === dashboardState.selectedStudent);
    if (!studentData || !studentData.recentActivities) return [];
    
    return studentData.recentActivities
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  };

  const generateSubjectSpecificRecommendations = (subject) => {
    const recommendations = {
      'Mathematics': [
        'Practice foundational arithmetic skills',
        'Work on problem-solving strategies',
        'Review key formulas and concepts'
      ],
      'English': [
        'Focus on reading comprehension exercises',
        'Practice grammar rules',
        'Expand vocabulary with weekly word lists'
      ],
      'Programming': [
        'Debugging practice with sample code',
        'Algorithmic thinking exercises',
        'Pair programming sessions'
      ]
    };
    
    const subjectRecs = recommendations[subject] || ['General practice recommended'];
    const randomIndex = Math.floor(Math.random() * subjectRecs.length);
    return subjectRecs[randomIndex];
  };

  const generateStrengthBasedRecommendations = (subject) => {
    const recommendations = {
      'Mathematics': [
        'Challenge with advanced problems',
        'Peer tutoring opportunities',
        'Math competition preparation'
      ],
      'English': [
        'Creative writing assignments',
        'Literature analysis projects',
        'Debate team participation'
      ],
      'Programming': [
        'Independent coding projects',
        'Open source contributions',
        'Algorithm optimization challenges'
      ]
    };
    
    const subjectRecs = recommendations[subject] || ['Advanced challenges recommended'];
    const randomIndex = Math.floor(Math.random() * subjectRecs.length);
    return subjectRecs[randomIndex];
  };

  // Chart data preparation functions
  const prepareSubjectComparisonChart = () => {
    const data = analyticsData.studentProgress.slice(0, 10).map(student => ({
      name: student.name || `Student ${student.id?.slice(-4) || 'Unknown'}`,
      math: student.mathAccuracy || 0,
      english: student.englishAccuracy || 0,
      programming: student.programmingAccuracy || 0
    }));

    return {
      labels: data.map(d => d.name),
      datasets: [
        {
          label: 'Mathematics',
          data: data.map(d => d.math),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2
        },
        {
          label: 'English',
          data: data.map(d => d.english),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2
        },
        {
          label: 'Programming',
          data: data.map(d => d.programming),
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          borderColor: 'rgb(245, 158, 11)',
          borderWidth: 2
        }
      ]
    };
  };

  const prepareTopicPerformanceChart = (subject) => {
    let topicData = {};
    
    switch(subject) {
      case 'math':
        topicData = analyticsData.mathTopicPerformance;
        break;
      case 'english':
        topicData = analyticsData.englishTopicPerformance;
        break;
      case 'programming':
        topicData = analyticsData.programmingTopicPerformance;
        break;
      default:
        topicData = {};
    }

    // Sort topics by success rate and take top 10
    const sortedTopics = Object.entries(topicData)
      .filter(([, stats]) => stats.totalQuestions > 0)
      .sort(([,a], [,b]) => b.successRate - a.successRate)
      .slice(0, 10);

    if (sortedTopics.length === 0) {
      return { labels: [], datasets: [] };
    }

    const topics = sortedTopics.map(([topic]) => topic);
    const successRates = sortedTopics.map(([, stats]) => stats.successRate);

    return {
      labels: topics.map(topic => topic.replace(/[-_]/g, ' ')),
      datasets: [{
        label: 'Success Rate (%)',
        data: successRates,
        backgroundColor: successRates.map(rate => 
          rate >= 80 ? 'rgba(16, 185, 129, 0.8)' :
          rate >= 60 ? 'rgba(245, 158, 11, 0.8)' :
          'rgba(239, 68, 68, 0.8)'
        ),
        borderColor: successRates.map(rate => 
          rate >= 80 ? 'rgb(16, 185, 129)' :
          rate >= 60 ? 'rgb(245, 158, 11)' :
          'rgb(239, 68, 68)'
        ),
        borderWidth: 2
      }]
    };
  };

  // Mini progress bars component
  const renderMiniProgressBars = (student) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '150px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <small style={{ color: '#6c757d' }}>Math</small>
          <div style={{ 
            width: '100%', 
            height: '6px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '3px', 
            overflow: 'hidden' 
          }}>
            <div 
              style={{ 
                width: `${student.mathAccuracy}%`, 
                height: '100%',
                backgroundColor: student.mathAccuracy >= 80 ? '#28a745' : student.mathAccuracy >= 60 ? '#ffc107' : '#dc3545'
              }}
            />
          </div>
          
          <small style={{ color: '#6c757d', marginTop: '4px' }}>English</small>
          <div style={{ 
            width: '100%', 
            height: '6px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '3px', 
            overflow: 'hidden' 
          }}>
            <div 
              style={{ 
                width: `${student.englishAccuracy}%`, 
                height: '100%',
                backgroundColor: student.englishAccuracy >= 80 ? '#28a745' : student.englishAccuracy >= 60 ? '#ffc107' : '#dc3545'
              }}
            />
          </div>
          
          <small style={{ color: '#6c757d', marginTop: '4px' }}>Programming</small>
          <div style={{ 
            width: '100%', 
            height: '6px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '3px', 
            overflow: 'hidden' 
          }}>
            <div 
              style={{ 
                width: `${student.programmingAccuracy}%`, 
                height: '100%',
                backgroundColor: student.programmingAccuracy >= 80 ? '#28a745' : student.programmingAccuracy >= 60 ? '#ffc107' : '#dc3545'
              }}
            />
          </div>
        </div>
        <small style={{ color: '#6c757d', marginLeft: '8px' }}>{student.overallAccuracy}%</small>
      </div>
    );
  };

  // Effect hooks
  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  useEffect(() => {
    if (dashboardState.selectedClassroom && classroomData.classrooms.length > 0) {
      fetchClassroomAnalytics(dashboardState.selectedClassroom);
    }
  }, [dashboardState.selectedClassroom, dashboardState.timeRange, fetchClassroomAnalytics]);

  // Utility functions for rendering
  const formatPercentage = (value) => `${Math.round(value || 0)}%`;
  
  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  // Loading state
  if (dashboardState.loading && !classroomData.classrooms.length) {
    return (
      <div style={{ 
        fontFamily: "'Open Sans', sans-serif",
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem auto'
          }} />
          <h5 style={{ color: '#6c757d', marginBottom: '0.5rem' }}>Loading Your Classroom Dashboard...</h5>
          <p style={{ color: '#6c757d', margin: 0 }}>Fetching analytics data from MongoDB...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "'Open Sans', sans-serif",
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      lineHeight: 1.6,
      color: '#333'
    }}>
      {/* Header */}
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem 0',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                padding: '0.5rem',
                marginRight: '1rem'
              }}>
                <span style={{ fontSize: '1.25rem', color: 'white' }}>🎓</span>
              </div>
              <div>
                <h5 style={{ margin: 0, color: 'white', fontSize: '1.25rem' }}>Tutor Analytics Dashboard</h5>
                <small style={{ color: 'rgba(255,255,255,0.75)' }}>Real-time Student Progress from MongoDB</small>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <select 
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#3498db',
                  fontWeight: 'bold'
                }}
                value={dashboardState.selectedClassroom || ''}
                onChange={(e) => setDashboardState(prev => ({ ...prev, selectedClassroom: e.target.value }))}
                disabled={dashboardState.loading}
              >
                <option value="">Select Classroom...</option>
                {classroomData.classrooms.map(classroom => (
                  <option key={classroom._id} value={classroom._id}>
                    {classroom.name} ({classroom.students?.length || 0} students)
                  </option>
                ))}
              </select>

              <select
                style={{
                  padding: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: 'white'
                }}
                value={dashboardState.timeRange}
                onChange={(e) => setDashboardState(prev => ({ ...prev, timeRange: e.target.value }))}
                disabled={dashboardState.loading}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>

              <button 
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => dashboardState.selectedClassroom && fetchClassroomAnalytics(dashboardState.selectedClassroom)}
                disabled={dashboardState.loading}
              >
                🔄 Refresh
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  padding: '0.5rem',
                  marginRight: '0.5rem'
                }}>
                  👤
                </div>
                {user?.name || 'Tutor'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Alert */}
      {dashboardState.error && (
        <div style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', padding: '0 1rem' }}>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '8px',
            borderLeft: '4px solid #dc3545'
          }}>
            ⚠️ {dashboardState.error}
            <button 
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#721c24'
              }}
              onClick={() => setDashboardState(prev => ({ ...prev, error: null }))}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!dashboardState.selectedClassroom ? (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '3rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏠</div>
                <h4 style={{ color: '#6c757d', marginBottom: '1rem' }}>Select a Classroom to Begin</h4>
                {classroomData.classrooms.length === 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <p style={{ color: '#6c757d' }}>You don't have any classrooms yet.</p>
                    <button style={{
                      padding: '0.8rem 1.5rem',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ➕ Create Your First Classroom
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Sidebar */}
            <div style={{ width: '280px' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, color: '#3498db', fontWeight: 'bold' }}>
                    {classroomData.classrooms.find(c => c._id === dashboardState.selectedClassroom)?.name || 'Classroom'}
                  </h6>
                </div>
                <div>
                  {['overview', 'mathematics', 'english', 'programming', 'individual'].map(tab => (
                    <button 
                      key={tab}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: 'none',
                        backgroundColor: dashboardState.activeTab === tab ? '#3498db' : 'transparent',
                        color: dashboardState.activeTab === tab ? 'white' : '#333',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f8f9fa',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={() => setDashboardState(prev => ({ ...prev, activeTab: tab }))}
                    >
                      <span style={{ marginRight: '0.5rem' }}>
                        {tab === 'overview' && '📊'}
                        {tab === 'mathematics' && '🧮'}
                        {tab === 'english' && '📚'}
                        {tab === 'programming' && '💻'}
                        {tab === 'individual' && '👤'}
                      </span>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginTop: '1rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, color: '#28a745', fontWeight: 'bold' }}>Classroom Insights</h6>
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>Total Students:</span>
                    <strong>{classroomData.classroomStats.totalStudents || 0}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>Engagement:</span>
                    <strong style={{ color: '#28a745' }}>{classroomData.classroomStats.overallEngagement || 0}%</strong>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #dee2e6' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>Math Active:</span>
                    <strong style={{ color: '#3498db' }}>{classroomData.classroomStats.mathParticipation || 0}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>English Active:</span>
                    <strong style={{ color: '#17a2b8' }}>{classroomData.classroomStats.englishParticipation || 0}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>Programming Active:</span>
                    <strong style={{ color: '#ffc107' }}>{classroomData.classroomStats.programmingParticipation || 0}</strong>
                  </div>
                  
                  {dashboardState.lastUpdated && (
                    <div style={{ 
                      marginTop: '1rem', 
                      paddingTop: '0.5rem', 
                      borderTop: '1px solid #dee2e6' 
                    }}>
                      <small style={{ color: '#6c757d' }}>
                        Last updated: {dashboardState.lastUpdated.toLocaleTimeString()}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1 }}>
              {dashboardState.activeTab === 'overview' && (
                <div>
                  {/* Stats Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.75 }}>👥</div>
                      <h3 style={{ margin: '0 0 0.25rem 0' }}>{classroomData.selectedClassroomStudents.length}</h3>
                      <small>Total Students</small>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.75 }}>📈</div>
                      <h3 style={{ margin: '0 0 0.25rem 0' }}>
                        {analyticsData.studentProgress.length > 0 
                          ? Math.round(analyticsData.studentProgress.reduce((sum, student) => sum + student.overallAccuracy, 0) / analyticsData.studentProgress.length)
                          : 0}%
                      </h3>
                      <small>Class Average</small>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.75 }}>⚠️</div>
                      <h3 style={{ margin: '0 0 0.25rem 0' }}>
                        {analyticsData.studentProgress.filter(s => s.needsAttention).length}
                      </h3>
                      <small>Need Attention</small>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.75 }}>🏆</div>
                      <h3 style={{ margin: '0 0 0.25rem 0' }}>
                        {analyticsData.studentProgress.filter(s => s.overallAccuracy >= 80).length}
                      </h3>
                      <small>High Performers</small>
                    </div>
                  </div>

                  {/* Student Progress Table */}
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Student Progress Overview</h5>
                        <small style={{ color: '#6c757d' }}>Real-time data from MongoDB collections</small>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        {analyticsData.studentProgress.length > 0 ? (
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ 
                              width: '100%', 
                              borderCollapse: 'collapse',
                              fontFamily: "'Open Sans', sans-serif"
                            }}>
                              <thead>
                                <tr style={{ backgroundColor: '#f8f9fa' }}>
                                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Student</th>
                                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Progress</th>
                                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Exercises</th>
                                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Strong Areas</th>
                                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Needs Work</th>
                                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Last Activity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {analyticsData.studentProgress.map((student, index) => (
                                  <tr key={index} style={{ 
                                    backgroundColor: student.needsAttention ? '#fff3cd' : 'transparent',
                                    borderBottom: '1px solid #dee2e6'
                                  }}>
                                    <td style={{ padding: '0.75rem' }}>
                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{
                                          backgroundColor: '#f8f9fa',
                                          borderRadius: '50%',
                                          padding: '0.5rem',
                                          marginRight: '0.75rem'
                                        }}>
                                          👤
                                        </div>
                                        <div>
                                          <h6 style={{ margin: 0 }}>{student.name || `Student ${student.id?.slice(-4) || 'Unknown'}`}</h6>
                                          <small style={{ color: '#6c757d' }}>{student.email}</small>
                                        </div>
                                      </div>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                      {renderMiniProgressBars(student)}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                      <span style={{
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '0.875rem'
                                      }}>
                                        {student.totalQuestions}
                                      </span>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                        {student.strongSubjects.map(subject => (
                                          <span key={subject} style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem'
                                          }}>
                                            {subject}
                                          </span>
                                        ))}
                                        {student.strongSubjects.length === 0 && (
                                          <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>None yet</span>
                                        )}
                                      </div>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                        {student.weakSubjects.map(subject => (
                                          <span key={subject} style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem'
                                          }}>
                                            {subject}
                                          </span>
                                        ))}
                                        {student.weakSubjects.length === 0 && (
                                          <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>Doing well</span>
                                        )}
                                      </div>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                      {student.lastActivity 
                                        ? new Date(student.lastActivity).toLocaleDateString() 
                                        : 'No activity'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                            <p style={{ color: '#6c757d', marginBottom: '0.5rem' }}>No student data available yet</p>
                            <p style={{ color: '#6c757d', margin: 0 }}>Students need to complete exercises to see analytics</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject Comparison Chart */}
                  <div>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Subject Performance Comparison</h5>
                        <small style={{ color: '#6c757d' }}>Based on exercise data from all collections</small>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ height: '400px' }}>
                          {analyticsData.studentProgress.length > 0 ? (
                            <Bar 
                              data={prepareSubjectComparisonChart()} 
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: { position: 'top' },
                                  tooltip: {
                                    callbacks: {
                                      label: (context) => `${context.dataset.label}: ${context.raw}%`
                                    }
                                  }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                    max: 100,
                                    ticks: { callback: (value) => value + '%' }
                                  }
                                }
                              }} 
                            />
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              height: '100%' 
                            }}>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                                <p style={{ color: '#6c757d', margin: 0 }}>No student data available yet</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mathematics Tab */}
              {dashboardState.activeTab === 'mathematics' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '0.5rem', color: '#3498db' }}>🧮</span>
                      Mathematics Analytics
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {analyticsData.mathFingerExercises.length} exercises tracked
                      </span>
                      <button 
                        style={{
                          padding: '0.5rem 1rem',
                          border: '1px solid #3498db',
                          borderRadius: '4px',
                          backgroundColor: 'transparent',
                          color: '#3498db',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                        onClick={() => fetchClassroomAnalytics(dashboardState.selectedClassroom)}
                      >
                        🔄 Refresh
                      </button>
                    </div>
                  </div>

                  {/* Math Topic Performance Chart and Analysis */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Topic Performance</h5>
                        <small style={{ color: '#6c757d' }}>Data from MathScores, Diagnostic, Arithmetic, Algebra & CT collections</small>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ height: '350px' }}>
                          {Object.keys(analyticsData.mathTopicPerformance).length > 0 ? (
                            <Bar 
                              data={prepareTopicPerformanceChart('math')} 
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: { display: false },
                                  tooltip: {
                                    callbacks: {
                                      label: (context) => `Success Rate: ${context.raw}%`
                                    }
                                  }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                    max: 100,
                                    ticks: { callback: (value) => value + '%' }
                                  }
                                }
                              }} 
                            />
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              height: '100%' 
                            }}>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧮</div>
                                <p style={{ color: '#6c757d', marginBottom: '0.5rem' }}>No mathematics data available</p>
                                <p style={{ color: '#6c757d', fontSize: '0.875rem', margin: 0 }}>Students need to complete math exercises</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Data Sources</h5>
                        <small style={{ color: '#6c757d' }}>MongoDB collections</small>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.875rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Diagnostic Tests:</span>
                            <strong>{analyticsData.mathFingerExercises.filter(e => e.sourceCollection === 'MathematicsDiagnosticScore').length}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Math Scores:</span>
                            <strong>{analyticsData.mathFingerExercises.filter(e => e.sourceCollection === 'MathScores').length}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Arithmetic:</span>
                            <strong>{analyticsData.mathFingerExercises.filter(e => e.sourceCollection === 'ArithmeticScore').length}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Algebra:</span>
                            <strong>{analyticsData.mathFingerExercises.filter(e => e.sourceCollection === 'AlgebraScores').length}</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>CT Foundation:</span>
                            <strong>{analyticsData.mathFingerExercises.filter(e => e.sourceCollection === 'CTFingerScore').length}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Topic Analysis Table */}
                  <div>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Detailed Topic Analysis</h5>
                        <small style={{ color: '#6c757d' }}>Class performance across all math topics</small>
                      </div>
                      <div style={{ padding: '1rem', overflowX: 'auto' }}>
                        <table style={{ 
                          width: '100%', 
                          borderCollapse: 'collapse',
                          fontFamily: "'Open Sans', sans-serif"
                        }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Topic</th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Students</th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Questions</th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Success Rate</th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Avg Time</th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(analyticsData.mathTopicPerformance)
                              .filter(([, stats]) => stats.totalQuestions > 0)
                              .sort(([,a], [,b]) => b.totalQuestions - a.totalQuestions)
                              .map(([topic, stats]) => (
                                <tr key={topic} style={{ borderBottom: '1px solid #dee2e6' }}>
                                  <td style={{ padding: '0.75rem', textTransform: 'capitalize' }}>
                                    {topic.replace(/[-_]/g, ' ')}
                                  </td>
                                  <td style={{ padding: '0.75rem' }}>{stats.studentCount}</td>
                                  <td style={{ padding: '0.75rem' }}>{stats.totalQuestions}</td>
                                  <td style={{ padding: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <div style={{
                                        width: '60px',
                                        height: '6px',
                                        backgroundColor: '#e9ecef',
                                        borderRadius: '3px',
                                        marginRight: '0.5rem',
                                        overflow: 'hidden'
                                      }}>
                                        <div 
                                          style={{
                                            width: `${stats.successRate}%`,
                                            height: '100%',
                                            backgroundColor: stats.successRate >= 80 ? '#28a745' : stats.successRate >= 60 ? '#ffc107' : '#dc3545'
                                          }}
                                        />
                                      </div>
                                      <span>{stats.successRate}%</span>
                                    </div>
                                  </td>
                                  <td style={{ padding: '0.75rem' }}>{stats.averageTime}s</td>
                                  <td style={{ padding: '0.75rem' }}>
                                    <span style={{
                                      padding: '0.25rem 0.5rem',
                                      backgroundColor: stats.successRate >= 80 ? '#28a745' : stats.successRate >= 60 ? '#ffc107' : '#dc3545',
                                      color: 'white',
                                      borderRadius: '4px',
                                      fontSize: '0.75rem'
                                    }}>
                                      {stats.successRate >= 80 ? 'Excellent' : 
                                       stats.successRate >= 60 ? 'Good' : 'Needs Work'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* English Tab */}
              {dashboardState.activeTab === 'english' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '0.5rem', color: '#17a2b8' }}>📚</span>
                      English Analytics
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {analyticsData.englishFingerExercises.length} exercises tracked
                      </span>
                    </div>
                  </div>

                  {/* English Topic Performance and Analysis - Similar structure to Math */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>English Topic Performance</h5>
                        <small style={{ color: '#6c757d' }}>Success rates across English skills</small>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ height: '350px' }}>
                          {Object.keys(analyticsData.englishTopicPerformance).length > 0 ? (
                            <Bar 
                              data={prepareTopicPerformanceChart('english')} 
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: { display: false }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                    max: 100,
                                    ticks: { callback: (value) => value + '%' }
                                  }
                                }
                              }} 
                            />
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              height: '100%' 
                            }}>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                                <p style={{ color: '#6c757d', margin: 0 }}>No English data available yet</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>English Skills Breakdown</h5>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        {Object.keys(analyticsData.englishTopicPerformance).length > 0 ? (
                          Object.entries(analyticsData.englishTopicPerformance)
                            .filter(([, stats]) => stats.totalQuestions > 0)
                            .slice(0, 4)
                            .map(([topic, stats]) => (
                              <div key={topic} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                  <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                                    {topic.replace(/[-_]/g, ' ')}
                                  </span>
                                  <strong>{stats.successRate}%</strong>
                                </div>
                                <div style={{
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    width: `${stats.successRate}%`,
                                    height: '100%',
                                    backgroundColor: stats.successRate >= 80 ? '#28a745' : stats.successRate >= 60 ? '#ffc107' : '#dc3545'
                                  }} />
                                </div>
                              </div>
                            ))
                        ) : (
                          <p style={{ color: '#6c757d', textAlign: 'center' }}>No English data available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Programming Tab */}
              {dashboardState.activeTab === 'programming' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '0.5rem', color: '#ffc107' }}>💻</span>
                      Programming Analytics
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {analyticsData.programmingFingerExercises.length} exercises tracked
                      </span>
                    </div>
                  </div>

                  {/* Programming Topic Performance and Analysis */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Programming Topic Performance</h5>
                        <small style={{ color: '#6c757d' }}>Success rates across programming concepts</small>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ height: '350px' }}>
                          {Object.keys(analyticsData.programmingTopicPerformance).length > 0 ? (
                            <Bar 
                              data={prepareTopicPerformanceChart('programming')} 
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: { display: false }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                    max: 100,
                                    ticks: { callback: (value) => value + '%' }
                                  }
                                }
                              }} 
                            />
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              height: '100%' 
                            }}>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
                                <p style={{ color: '#6c757d', margin: 0 }}>No programming data available yet</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h5 style={{ margin: 0 }}>Programming Concepts</h5>
                      </div>
                      <div style={{ padding: '1rem' }}>
                        {Object.keys(analyticsData.programmingTopicPerformance).length > 0 ? (
                          Object.entries(analyticsData.programmingTopicPerformance)
                            .filter(([, stats]) => stats.totalQuestions > 0)
                            .slice(0, 5)
                            .map(([topic, stats]) => (
                              <div key={topic} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                  <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                                    {topic.replace(/[-_]/g, ' ')}
                                  </span>
                                  <strong>{stats.successRate}%</strong>
                                </div>
                                <div style={{
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    width: `${stats.successRate}%`,
                                    height: '100%',
                                    backgroundColor: stats.successRate >= 80 ? '#28a745' : stats.successRate >= 60 ? '#ffc107' : '#dc3545'
                                  }} />
                                </div>
                              </div>
                            ))
                        ) : (
                          <p style={{ color: '#6c757d', textAlign: 'center' }}>No programming data available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Individual Student Analysis Tab */}
              {dashboardState.activeTab === 'individual' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '0.5rem', color: '#6f42c1' }}>👤</span>
                      Individual Student Analysis
                    </h4>
                    <select
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        backgroundColor: 'white'
                      }}
                      value={dashboardState.selectedStudent || ''}
                      onChange={(e) => setDashboardState(prev => ({ ...prev, selectedStudent: e.target.value }))}
                    >
                      <option value="">Select a student...</option>
                      {analyticsData.studentProgress.map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name} ({student.overallAccuracy}% overall)
                        </option>
                      ))}
                    </select>
                  </div>

                  {dashboardState.selectedStudent ? (
                    (() => {
                      const selectedStudentData = analyticsData.studentProgress.find(s => s.id === dashboardState.selectedStudent);
                      return (
                        <div>
                          {/* Individual Student Profile */}
                          <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            padding: '2rem',
                            marginBottom: '2rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                              <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                marginRight: '1.5rem'
                              }}>
                                👤
                              </div>
                              <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{selectedStudentData.name}</h3>
                                <p style={{ color: '#6c757d', margin: '0 0 0.5rem 0' }}>{selectedStudentData.email}</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                  <span style={{
                                    padding: '0.25rem 0.5rem',
                                    backgroundColor: selectedStudentData.overallAccuracy >= 80 ? '#28a745' : selectedStudentData.overallAccuracy >= 60 ? '#ffc107' : '#dc3545',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem'
                                  }}>
                                    Overall: {selectedStudentData.overallAccuracy}%
                                  </span>
                                  <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                                    {selectedStudentData.totalQuestions} exercises completed
                                  </span>
                                  {selectedStudentData.needsAttention && (
                                    <span style={{
                                      padding: '0.25rem 0.5rem',
                                      backgroundColor: '#dc3545',
                                      color: 'white',
                                      borderRadius: '4px',
                                      fontSize: '0.875rem'
                                    }}>
                                      ⚠️ Needs Attention
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Subject Performance Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #dee2e6', borderRadius: '8px' }}>
                                <h5 style={{ margin: '0 0 0.5rem 0', color: '#3498db' }}>Mathematics</h5>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                  {selectedStudentData.mathAccuracy}%
                                </div>
                                <div style={{
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    width: `${selectedStudentData.mathAccuracy}%`,
                                    height: '100%',
                                    backgroundColor: selectedStudentData.mathAccuracy >= 80 ? '#28a745' : selectedStudentData.mathAccuracy >= 60 ? '#ffc107' : '#dc3545'
                                  }} />
                                </div>
                              </div>
                              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #dee2e6', borderRadius: '8px' }}>
                                <h5 style={{ margin: '0 0 0.5rem 0', color: '#17a2b8' }}>English</h5>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                  {selectedStudentData.englishAccuracy}%
                                </div>
                                <div style={{
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    width: `${selectedStudentData.englishAccuracy}%`,
                                    height: '100%',
                                    backgroundColor: selectedStudentData.englishAccuracy >= 80 ? '#28a745' : selectedStudentData.englishAccuracy >= 60 ? '#ffc107' : '#dc3545'
                                  }} />
                                </div>
                              </div>
                              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #dee2e6', borderRadius: '8px' }}>
                                <h5 style={{ margin: '0 0 0.5rem 0', color: '#ffc107' }}>Programming</h5>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                  {selectedStudentData.programmingAccuracy}%
                                </div>
                                <div style={{
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    width: `${selectedStudentData.programmingAccuracy}%`,
                                    height: '100%',
                                    backgroundColor: selectedStudentData.programmingAccuracy >= 80 ? '#28a745' : selectedStudentData.programmingAccuracy >= 60 ? '#ffc107' : '#dc3545'
                                  }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Intelligent Recommendations */}
                          <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            marginBottom: '2rem'
                          }}>
                            <div style={{
                              padding: '1rem',
                              backgroundColor: '#d1ecf1',
                              borderBottom: '1px solid #b6d4db'
                            }}>
                              <h5 style={{ margin: 0, color: '#0c5460', display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '0.5rem' }}>💡</span>
                                Intelligent Recommendations
                              </h5>
                            </div>
                            <div style={{ padding: '1rem' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                {/* Priority Actions */}
                                <div style={{
                                  padding: '1rem',
                                  border: '1px solid #dee2e6',
                                  borderRadius: '8px',
                                  backgroundColor: selectedStudentData.overallAccuracy < 50 ? '#f8d7da' : selectedStudentData.overallAccuracy < 70 ? '#fff3cd' : '#d4edda'
                                }}>
                                  <h6 style={{ margin: '0 0 0.5rem 0', color: selectedStudentData.overallAccuracy < 50 ? '#721c24' : selectedStudentData.overallAccuracy < 70 ? '#856404' : '#155724' }}>
                                    Priority Level: {selectedStudentData.overallAccuracy < 50 ? 'High' : selectedStudentData.overallAccuracy < 70 ? 'Medium' : 'Low'}
                                  </h6>
                                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                                    {selectedStudentData.overallAccuracy < 50 
                                      ? 'Immediate intervention needed. Schedule one-on-one tutoring sessions.'
                                      : selectedStudentData.overallAccuracy < 70 
                                      ? 'Provide additional practice and review sessions.'
                                      : 'Continue current learning path with challenging problems.'
                                    }
                                  </p>
                                </div>

                                {/* Engagement Level */}
                                <div style={{
                                  padding: '1rem',
                                  border: '1px solid #dee2e6',
                                  borderRadius: '8px',
                                  backgroundColor: selectedStudentData.totalQuestions < 10 ? '#f8d7da' : selectedStudentData.totalQuestions < 50 ? '#fff3cd' : '#d4edda'
                                }}>
                                  <h6 style={{ margin: '0 0 0.5rem 0', color: selectedStudentData.totalQuestions < 10 ? '#721c24' : selectedStudentData.totalQuestions < 50 ? '#856404' : '#155724' }}>
                                    Engagement: {selectedStudentData.totalQuestions < 10 ? 'Low' : selectedStudentData.totalQuestions < 50 ? 'Medium' : 'High'}
                                  </h6>
                                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                                    {selectedStudentData.totalQuestions < 10 
                                      ? 'Motivate student to practice more regularly. Consider gamification.'
                                      : selectedStudentData.totalQuestions < 50 
                                      ? 'Good progress! Encourage consistent daily practice.'
                                      : 'Excellent engagement! Ready for advanced challenges.'
                                    }
                                  </p>
                                </div>

                                {/* Next Steps */}
                                <div style={{
                                  padding: '1rem',
                                  border: '1px solid #dee2e6',
                                  borderRadius: '8px',
                                  backgroundColor: '#e7f3ff'
                                }}>
                                  <h6 style={{ margin: '0 0 0.5rem 0', color: '#004085' }}>
                                    Next Steps
                                  </h6>
                                  <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem' }}>
                                    {selectedStudentData.weakSubjects.length > 0 && (
                                      <li>Focus on {selectedStudentData.weakSubjects.join(', ')} fundamentals</li>
                                    )}
                                    {selectedStudentData.strongSubjects.length > 0 && (
                                      <li>Advance {selectedStudentData.strongSubjects.join(', ')} to higher difficulty</li>
                                    )}
                                    <li>Schedule progress review in 1-2 weeks</li>
                                    {selectedStudentData.totalQuestions < 20 && (
                                      <li>Increase practice frequency to daily sessions</li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Recent Activity Timeline */}
                          <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              padding: '1rem',
                              borderBottom: '1px solid #dee2e6'
                            }}>
                              <h5 style={{ margin: 0 }}>Recent Activity Timeline</h5>
                              <small style={{ color: '#6c757d' }}>Latest exercise attempts and performance</small>
                            </div>
                            <div style={{ padding: '1rem' }}>
                              {getStudentActivityTimeline().length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                  {getStudentActivityTimeline().map((activity, i) => (
                                    <div key={i} style={{ 
                                      display: 'flex',
                                      paddingBottom: i < getStudentActivityTimeline().length - 1 ? '1rem' : 0,
                                      borderBottom: i < getStudentActivityTimeline().length - 1 ? '1px dashed #dee2e6' : 'none'
                                    }}>
                                      <div style={{ 
                                        width: '40px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                      }}>
                                        <div style={{
                                          width: '16px',
                                          height: '16px',
                                          borderRadius: '50%',
                                          backgroundColor: activity.isCorrect ? '#28a745' : '#dc3545',
                                          border: '2px solid white',
                                          boxShadow: '0 0 0 2px ' + (activity.isCorrect ? '#28a745' : '#dc3545')
                                        }} />
                                        {i < getStudentActivityTimeline().length - 1 && (
                                          <div style={{
                                            flex: 1,
                                            width: '2px',
                                            backgroundColor: '#dee2e6',
                                            margin: '4px 0'
                                          }} />
                                        )}
                                      </div>
                                      <div style={{ flex: 1, marginLeft: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                          <strong>{activity.topicArea?.replace(/[-_]/g, ' ') || 'General Exercise'}</strong>
                                          <small style={{ color: '#6c757d' }}>
                                            {new Date(activity.createdAt).toLocaleDateString()}
                                          </small>
                                        </div>
                                        <div style={{ 
                                          display: 'flex', 
                                          justifyContent: 'space-between',
                                          marginBottom: '0.25rem'
                                        }}>
                                          <span>{activity.questionType} exercise</span>
                                          <span style={{ 
                                            color: activity.isCorrect ? '#28a745' : '#dc3545',
                                            fontWeight: '500'
                                          }}>
                                            {activity.isCorrect ? '✓ Correct' : '✗ Incorrect'} ({activity.responseTime}s)
                                          </span>
                                        </div>
                                        {!activity.isCorrect && activity.errorType && (
                                          <div style={{ 
                                            backgroundColor: '#fff3cd',
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem'
                                          }}>
                                            <strong>Error Type:</strong> {activity.errorType}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                                  <p style={{ color: '#6c757d', margin: 0 }}>No recent activity recorded</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      padding: '3rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
                      <h5 style={{ color: '#6c757d', marginBottom: '1rem' }}>Select a Student for Individual Analysis</h5>
                      <p style={{ color: '#6c757d', margin: 0 }}>
                        Choose a student from the dropdown above to view detailed performance analytics, 
                        strengths, weaknesses, and personalized recommendations.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        .python-conditionals-container {
          font-family: 'Open Sans', sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .loading-indicator {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          text-align: center;
          color: #856404;
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

        .explanation {
          background: #ffffff;
          margin: 1.5rem 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 15px;
          border-radius: 8px;
        }

        code {
          background-color: #f8f9fa;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9em;
        }

        pre {
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #3498db;
          overflow-x: auto;
        }

        .operators-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          overflow: hidden;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.95rem;
        }

        .operators-table th,
        .operators-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .operators-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #2c3e50;
        }

        .operators-table tr:hover {
          background-color: #f1f1f1;
        }

        .comparison-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 20px 0;
        }

        .code-comparison {
          flex: 1;
          min-width: 300px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .card {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .alert {
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid transparent;
          border-radius: 8px;
        }

        .alert-success {
          color: #155724;
          background-color: #d4edda;
          border-color: #c3e6cb;
          border-left: 4px solid #28a745;
        }

        .alert-info {
          color: #0c5460;
          background-color: #d1ecf1;
          border-color: #b6d4db;
          border-left: 4px solid #17a2b8;
        }

        .alert-warning {
          color: #856404;
          background-color: #fff3cd;
          border-color: #ffeaa7;
          border-left: 4px solid #f39c12;
        }

        .alert-danger {
          color: #721c24;
          background-color: #f8d7da;
          border-color: #f5c6cb;
          border-left: 4px solid #dc3545;
        }

        @media (max-width: 768px) {
          .comparison-container {
            flex-direction: column;
          }
          
          .code-comparison {
            min-width: 100%;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EnhancedTutorDashboard;