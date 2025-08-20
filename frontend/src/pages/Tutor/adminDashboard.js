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




// Enhanced Skill Gap Color Coding System
const getSkillGapColor = (skillGap) => {
  const gap = skillGap.toLowerCase();
  
  if (gap.includes('concept') || gap.includes('understanding') || gap.includes('fundamental')) {
    return {
      style: { backgroundColor: '#6f42c1', color: 'white' },
      icon: '🧠',
      priority: 'high',
      description: 'Conceptual Understanding'
    };
  }
  
  if (gap.includes('easy') || gap.includes('basic')) {
    return {
      style: { backgroundColor: '#28a745', color: 'white' },
      icon: '📗',
      priority: 'critical',
      description: 'Basic Skills Gap'
    };
  }
  
  if (gap.includes('medium') || gap.includes('intermediate')) {
    return {
      style: { backgroundColor: '#ffc107', color: '#212529' },
      icon: '📙',
      priority: 'moderate',
      description: 'Intermediate Skills Gap'
    };
  }
  
  if (gap.includes('hard') || gap.includes('advanced') || gap.includes('difficult')) {
    return {
      style: { backgroundColor: '#dc3545', color: 'white' },
      icon: '📕',
      priority: 'low',
      description: 'Advanced Skills Gap'
    };
  }
  
  if (gap.includes('problem') || gap.includes('strategy') || gap.includes('solving')) {
    return {
      style: { backgroundColor: '#17a2b8', color: 'white' },
      icon: '🧩',
      priority: 'moderate',
      description: 'Problem-Solving Skills'
    };
  }
  
  if (gap.includes('fluency') || gap.includes('speed') || gap.includes('timing')) {
    return {
      style: { backgroundColor: '#20c997', color: 'white' },
      icon: '⚡',
      priority: 'low',
      description: 'Fluency & Speed'
    };
  }
  
  return {
    style: { backgroundColor: '#6c757d', color: 'white' },
    icon: '❓',
    priority: 'moderate',
    description: 'General Skills Gap'
  };
};

const EnhancedSkillGapsDisplay = ({ skillGaps, studentName }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!skillGaps || skillGaps.length === 0) {
    return <span className="text-success">✅ No gaps identified</span>;
  }

  const visibleGaps = showAll ? skillGaps : skillGaps.slice(0, 3);
  const remainingCount = skillGaps.length - 3;

  // Sort gaps by priority (critical first)
  const priorityOrder = { critical: 1, high: 2, moderate: 3, low: 4 };
  const sortedGaps = visibleGaps.sort((a, b) => {
    const aColor = getSkillGapColor(a);
    const bColor = getSkillGapColor(b);
    return priorityOrder[aColor.priority] - priorityOrder[bColor.priority];
  });

  return (
    <div>
      <div className="d-flex flex-wrap gap-1">
        {sortedGaps.map((gap, i) => {
          const colorData = getSkillGapColor(gap);
          return (
            <span 
              key={i} 
              className="badge d-flex align-items-center"
              style={{ 
                ...colorData.style, 
                fontSize: '0.75rem',
                position: 'relative'
              }}
              title={`${colorData.description} - Priority: ${colorData.priority}`}
            >
              <span className="me-1">{colorData.icon}</span>
              {gap}
              {colorData.priority === 'critical' && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    fontSize: '8px'
                  }}
                >
                  ⚠️
                </span>
              )}
            </span>
          );
        })}
      </div>
      
      {remainingCount > 0 && (
        <div className="mt-1">
          {!showAll ? (
            <button 
              className="btn btn-link btn-sm p-0 text-decoration-none"
              onClick={() => setShowAll(true)}
              style={{ fontSize: '0.75rem' }}
            >
              <i className="bi bi-plus-circle me-1"></i>
              +{remainingCount} more gaps
            </button>
          ) : (
            <button 
              className="btn btn-link btn-sm p-0 text-decoration-none"
              onClick={() => setShowAll(false)}
              style={{ fontSize: '0.75rem' }}
            >
              <i className="bi bi-dash-circle me-1"></i>
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const EnhancedPrePostDiagnosticTable = ({ comparisonData }) => {
  if (!comparisonData || comparisonData.length === 0) return null;

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student</th>
            <th>Topic Area</th>
            <th>Pre-Test</th>
            <th>Post-Test</th>
            <th>Improvement</th>
            <th>Category</th>
            <th>Skill Gaps</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData
            .sort((a, b) => b.improvement - a.improvement)
            .map((comp, index) => (
              <tr key={index}>
                <td><strong>{comp.username}</strong></td>
                <td>{comp.topicArea}</td>
                <td>{comp.preScore}%</td>
                <td>{comp.postScore}%</td>
                <td>
                  <span className={`badge ${comp.improvement > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {comp.improvement > 0 ? '+' : ''}{comp.improvement.toFixed(1)}%
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    comp.improvementCategory === 'excellent' ? 'bg-success' :
                    comp.improvementCategory === 'good' ? 'bg-info' :
                    comp.improvementCategory === 'moderate' ? 'bg-warning' : 'bg-danger'
                  }`}>
                    {comp.improvementCategory}
                  </span>
                </td>
                <td>
                  <EnhancedSkillGapsDisplay 
                    skillGaps={comp.skillGaps} 
                    studentName={comp.username}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const EnhancedInterventionRecommendations = ({ interventionData }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showAllInterventions, setShowAllInterventions] = useState(true);

  if (!interventionData || interventionData.length === 0) return null;

  const studentOptions = interventionData.map(intervention => ({
    value: intervention.student,
    label: `${intervention.student} - ${intervention.topicArea}`,
    data: intervention
  }));

  const selectedIntervention = selectedStudent 
    ? interventionData.find(i => i.student === selectedStudent)
    : interventionData[0];

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card border-danger">
          <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🚨 Recommended Interventions</h5>
            <div className="d-flex align-items-center gap-2">
              <select 
                className="form-select form-select-sm"
                style={{ minWidth: '200px' }}
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {studentOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={() => setShowAllInterventions(!showAllInterventions)}
              >
                {showAllInterventions ? 'Show Selected' : 'Show All'}
              </button>
            </div>
          </div>
          <div className="card-body">
            {showAllInterventions ? (
              interventionData.map((intervention, index) => (
                <InterventionCard key={index} intervention={intervention} />
              ))
            ) : (
              selectedIntervention && <InterventionCard intervention={selectedIntervention} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InterventionCard = ({ intervention }) => (
  <div className="alert alert-danger mb-3">
    <h6 className="alert-heading">
      {intervention.student} - {intervention.topicArea}
      <span className={`badge ms-2 ${
        intervention.priority === 'critical' ? 'bg-danger' : 'bg-warning'
      }`}>
        {intervention.priority}
      </span>
    </h6>
    <p className="mb-2">{intervention.recommendation}</p>
    
    <div className="mb-3">
      <strong>Specific Actions:</strong>
      <ul className="mb-0 mt-1">
        {intervention.specificActions && intervention.specificActions.map((action, i) => (
          <li key={i}>{action}</li>
        ))}
      </ul>
    </div>
    
    {intervention.skillGaps && intervention.skillGaps.length > 0 && (
      <div>
        <strong>Skill Gaps:</strong>
        <div className="mt-1">
          {intervention.skillGaps.map((gap, i) => (
            <span key={i} className="badge bg-secondary me-1 mb-1">{gap}</span>
          ))}
        </div>
      </div>
    )}
  </div>
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
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // New analytics states
  const [showStudentList, setShowStudentList] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [englishDiagnosticData, setEnglishDiagnosticData] = useState([]);
  const [vocabularyData, setVocabularyData] = useState([]);
  const [vocabularyInsights, setVocabularyInsights] = useState({
    cefrLevelDistribution: {},
    topicPerformance: {},
    difficultyAnalysis: {},
    learningProgress: [],
    weakAreas: [],
    strongAreas: [],
    recommendedTopics: []
  });
  const [vocabularyMetrics, setVocabularyMetrics] = useState({
    averageSessionLength: 0,
    improvementRate: 0,
    engagementScore: 0,
    completionRate: 0
  });
  const [showMoreVocab, setShowMoreVocab] = useState(false);
  const [algebraData, setAlgebraData] = useState([]);
  const [mathDiagnosticData, setMathDiagnosticData] = useState([]);
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
  const [mathInsights, setMathInsights] = useState({
    overallPerformance: {},
    topicMastery: {},
    difficultyAnalysis: [], // ← Must be an empty array
    conceptualGaps: [],
    strengthAreas: [],
    learningTrajectory: [],
    prerequisiteIssues: [],
    gradeAppropriatePerformance: {},
    timeEfficiency: {},
    commonErrors: []
  });

  const [mathMetrics, setMathMetrics] = useState({
    averageMasteryLevel: 0,
    studentsAtRisk: 0,
    conceptualUnderstanding: 0,
    practiceEfficiency: 0,
    overallEngagement: 0
  });

  const [enhancedDiagnosticInsights, setEnhancedDiagnosticInsights] = useState({
    prePostComparison: [], // ← Must be an empty array
    skillProgression: {},
    interventionRecommendations: [], // ← Must be an empty array
    readinessIndicators: {},
    conceptualMisconceptions: [] // ← Must be an empty array
});

// ✅ ADD THESE TWO LINES:
const [programmingInsights, setProgrammingInsights] = useState({
    overallPerformance: {},
    topicMastery: {},
    difficultyAnalysis: [],
    conceptualGaps: [],
    strengthAreas: [],
    learningProgress: [],
    prerequisiteIssues: [],
    codeQuality: {},
    problemSolvingSkills: {},
    commonErrors: []
  });

  const [programmingMetrics, setProgrammingMetrics] = useState({
    averageCompletionRate: 0,
    studentsAtRisk: 0,
    codeEfficiency: 0,
    conceptualUnderstanding: 0,
    overallEngagement: 0
  });
  const arithmeticOperations = [
    'addition', 'subtraction', 'multiplication', 
    'division', 'decimals', 'fractions', 'dealing-with-negative-sign', 'ratio-proportion-percentage'
  ];

  // Chart data states
  const [englishChartData, setEnglishChartData] = useState(null);
  const [algebraChartData, setAlgebraChartData] = useState(null);
  const [pythonChartData, setPythonChartData] = useState(null);

  // Add these custom styles
const customStyles = `
.bg-purple {
  background-color: #6f42c1 !important;
  color: white !important;
}

.text-purple {
  color: #6f42c1 !important;
}

.border-purple {
  border-color: #6f42c1 !important;
}

.bg-cyan {
  background-color: #17a2b8 !important;
  color: white !important;
}

.text-cyan {
  color: #17a2b8 !important;
}

.border-cyan {
  border-color: #17a2b8 !important;
}

.skill-gaps-container .badge {
  position: relative;
  overflow: visible;
}

.skill-gaps-container .badge[title*="critical"]::before {
  content: "⚠️";
  position: absolute;
  top: -2px;
  right: -2px;
  font-size: 8px;
}
`;

// Add this useEffect to inject styles
useEffect(() => {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
  
  return () => {
    document.head.removeChild(styleElement);
  };
}, []);

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classrooms`, {
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
    fetchAnalyticsData(); // ✅ This now handles insights generation internally
  }
}, [classrooms]);

  const fetchAnalyticsData = async () => {
    const students = getAllTutorStudents();
    const studentEmails = students.map(student => student.email);
    
    if (studentEmails.length === 0) return;
    
    try {
      console.log('🚀 Starting analytics data fetch...');
      
      // Fetch all data and wait for completion
      const results = await Promise.all([
        fetchEnglishDiagnosticData(studentEmails),
        fetchVocabularyData(studentEmails),
        fetchAlgebraData(studentEmails),
        fetchReadingComprehensionData(studentEmails),
        fetchCTData(studentEmails),
        fetchPythonFingerData(studentEmails),
        fetchDiagnosticsData(studentEmails),
        fetchArithmeticData(studentEmails),
        fetchMathDiagnosticDataFixed(studentEmails) // ✅ This now returns the data
      ]);
      
      // Get the diagnostic data from the results
      const diagnosticData = results[8]; // Index 8 is fetchMathDiagnosticDataFixed
      
      console.log('⏳ All fetches complete, diagnostic data received:', diagnosticData?.length || 0);
      
      // ✅ Generate insights immediately with the fresh data
      if (diagnosticData && diagnosticData.length > 0) {
        console.log('🔄 Generating insights with fresh diagnostic data...');
        await generateMathInsightsWithData(diagnosticData);
      } else {
        console.log('⚠️ No diagnostic data available, generating insights with existing data...');
        // Small delay to ensure state updates
        await new Promise(resolve => setTimeout(resolve, 200));
        await generateMathInsights();
      }
      
      console.log('✅ All analytics data fetched and insights generated!');
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
};
  const fetchMathDiagnosticData = async (studentEmails) => {
    try {
      // Use your existing diagnostic comparison endpoint
      const diagnosticPromises = studentEmails.map(email => 
        fetch(`${process.env.REACT_APP_API_URL}/api/mathematicsDiagnosticsComparison/${email}/arithmetic`)
          .then(res => res.json())
          .then(data => data.success ? data.data : null)
          .catch(err => {
            console.error(`Error fetching diagnostics for ${email}:`, err);
            return null;
          })
      );
      
      const diagnosticResults = await Promise.all(diagnosticPromises);
      const validDiagnostics = diagnosticResults.filter(Boolean);
      
      // Store in a state variable for math insights
      setMathDiagnosticData(validDiagnostics);
      
    } catch (error) {
      console.error('Error fetching math diagnostic data:', error);
      setMathDiagnosticData([]);
    }
  };

   // FIXED: Update the fetchMathDiagnosticData function to properly set the data
const fetchMathDiagnosticDataFixed = async (studentEmails) => {
  try {
    console.log('🔍 Fetching math diagnostic data for students:', studentEmails);
    
    // Fetch diagnostic comparison data
    const diagnosticPromises = studentEmails.map(email => 
      fetch(`${process.env.REACT_APP_API_URL}/api/mathematicsDiagnosticsComparison/${email}/arithmetic`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log(`✅ Got diagnostic data for ${email}:`, data.data);
            return data.data;
          }
          return null;
        })
        .catch(err => {
          console.error(`❌ Error fetching diagnostics for ${email}:`, err);
          return null;
        })
    );
    
    const diagnosticResults = await Promise.all(diagnosticPromises);
    const validDiagnostics = diagnosticResults.filter(Boolean);
    
    console.log('📊 Valid diagnostic results:', validDiagnostics.length);
    console.log('📊 Diagnostic data details:', validDiagnostics);
    
    // Try to fetch raw diagnostic test data (handle 404 gracefully)
    try {
      console.log('🔍 Attempting to fetch raw diagnostic data...');
      const rawDiagnosticResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/mathematics-diagnostic-scores`);
      console.log('📡 Raw diagnostic response status:', rawDiagnosticResponse.status);
      
      if (rawDiagnosticResponse.ok) {
        const rawData = await rawDiagnosticResponse.json();
        const filteredRawData = rawData.filter(test => studentEmails.includes(test.email));
        console.log('📊 Raw diagnostic data:', filteredRawData.length);
        
        // Combine both datasets
        const combinedData = [...validDiagnostics, ...filteredRawData];
        console.log('🔄 About to set combined data:', combinedData.length);
        setMathDiagnosticData(combinedData);
        console.log('✅ Set math diagnostic data:', combinedData.length, 'records');
        return combinedData; // ✅ Return the data for immediate use
      } else {
        console.log('⚠️ Raw diagnostic endpoint not available, using comparison data only');
        console.log('🔄 About to set comparison data only:', validDiagnostics.length);
        setMathDiagnosticData(validDiagnostics);
        console.log('✅ Set math diagnostic data:', validDiagnostics.length, 'records');
        return validDiagnostics; // ✅ Return the data for immediate use
      }
    } catch (rawError) {
      console.log('⚠️ Raw diagnostic endpoint error, using comparison data only');
      console.log('🔄 About to set comparison data (error case):', validDiagnostics.length);
      setMathDiagnosticData(validDiagnostics);
      console.log('✅ Set math diagnostic data:', validDiagnostics.length, 'records');
      return validDiagnostics; // ✅ Return the data for immediate use
    }
    
  } catch (error) {
    console.error('Error fetching math diagnostic data:', error);
    setMathDiagnosticData([]);
    return []; // ✅ Return empty array on error
  }
};


  const fetchArithmeticData = async (studentEmails) => {
    setLoadingArithmetic(true);
    try {
      // Use your existing endpoint with optional userEmail filter
      const url = studentEmails.length > 0
        ? `${process.env.REACT_APP_API_URL}/api/arithmetic-scores?${studentEmails.map(email => `userEmail=${email}`).join('&')}`
        : `${process.env.REACT_APP_API_URL}/api/arithmetic-scores`;
      
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/eng_diagnostic_scores`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vocabscores`);
      if (!response.ok) throw new Error('Failed to fetch vocabulary data');
      
      const data = await response.json();
      // Filter data to only include students from tutor's classrooms
      const filteredData = data.filter(student => 
        studentEmails.includes(student.email) || studentEmails.includes(student.username)
      );
      
      // Process basic vocabulary data
      const processedData = filteredData.map(user => {
        let totalAssessments = user.assessments.length;
        let totalQuestions = 0;
        let correctAnswers = 0;
        let lastActivity = "No Activity";
        let topic = "No Topic"; // Initialize topic variable

        if (user.assessments.length > 0) {
          lastActivity = new Date(
            Math.max(...user.assessments.map(a => new Date(a.date)))
          ).toLocaleDateString();
          
          // Get the topic from the most recent assessment
          const mostRecentAssessment = user.assessments.reduce((latest, current) => 
            new Date(current.date) > new Date(latest.date) ? current : latest
          );
          topic = mostRecentAssessment.assess_topic || "No Topic";
        }

        user.assessments.forEach(assessment => {
          totalQuestions += assessment.questions.length;
          correctAnswers += assessment.questions.filter(q => q.is_correct).length;
        });

        let averagePercentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : "N/A";

        return {
          username: user.username,
          email: user.email,
          lastActivity,
          topic, // Add topic to the returned object
          totalAssessments,
          totalQuestions,
          correctAnswers,
          averagePercentage,
          rawData: user // Keep raw data for insights processing
        };
      });
      
      setVocabularyData(processedData);
      
      // Generate comprehensive insights
      generateVocabularyInsights(filteredData);
      calculateVocabularyMetrics(filteredData);
      
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

  useEffect(() => {
  console.log('🔍 Math Insights Updated:', {
    topicMastery: Object.keys(mathInsights.topicMastery || {}).length,
    conceptualGaps: mathInsights.conceptualGaps?.length || 0,
    strengthAreas: mathInsights.strengthAreas?.length || 0,
    overallPerformance: Object.keys(mathInsights.overallPerformance || {}).length
  });
}, [mathInsights]);

  useEffect(() => {
    if (ctData.length > 0 || pythonFingerData.size > 0 || diagnosticsData.length > 0) {
      generateAllProgrammingInsights();
    }
  }, [ctData, pythonFingerData, diagnosticsData]);

useEffect(() => {
  console.log('📊 Enhanced Diagnostic Insights Updated:', {
    prePostComparison: enhancedDiagnosticInsights.prePostComparison?.length || 0,
    interventionRecommendations: enhancedDiagnosticInsights.interventionRecommendations?.length || 0,
    conceptualMisconceptions: enhancedDiagnosticInsights.conceptualMisconceptions?.length || 0
  });
}, [enhancedDiagnosticInsights]);

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
        })
      );
      
      setDiagnosticComparisonData(comparisons.filter(Boolean));
    } catch (error) {
      console.error('Error fetching diagnostic comparisons:', error);
    } finally {
      setLoadingDiagnostics(false);
    }
  };
  // FIXED MATH ANALYTICS FUNCTIONS FOR TUTORDASHBOARD
// Replace your existing math analytics functions with these corrected versions

const debugMathData = () => {
  console.log('🔍 DEBUG: Math Data Sources');
  console.log('📊 Arithmetic Data:', {
    count: arithmeticData.length,
    sampleData: arithmeticData[0],
    userEmails: arithmeticData.map(d => d.userEmail)
  });
  
  console.log('📐 Algebra Data:', {
    count: algebraData.length,
    sampleData: algebraData[0],
    hasTopics: algebraData.filter(d => d.topics && d.topics.length > 0).length
  });
  
  console.log('🧮 Math Diagnostic Data:', {
    count: mathDiagnosticData.length,
    sampleData: mathDiagnosticData[0],
    types: mathDiagnosticData.map(d => d.testType || 'comparison')
  });
  
  console.log('👥 Student Emails:', getAllTutorStudents().map(s => s.email));
  
  // Check data filtering
  const studentEmails = getAllTutorStudents().map(s => s.email);
  console.log('🔍 Filtered Data Counts:', {
    arithmetic: arithmeticData.filter(d => studentEmails.includes(d.userEmail)).length,
    algebra: algebraData.filter(d => studentEmails.includes(d.email || d.username)).length,
    diagnostic: mathDiagnosticData.length
  });
};



const generateMathInsights = async () => {
  try {
    console.log('🔍 Generating math insights...');
    debugMathData();
    
    const studentEmails = getAllTutorStudents().map(s => s.email);
    
    // Use existing data that's already been fetched and filtered
    const filteredArithmetic = arithmeticData.filter(d => studentEmails.includes(d.userEmail));
    const filteredAlgebra = algebraData.filter(d => studentEmails.includes(d.email || d.username));
    const filteredDiagnostic = mathDiagnosticData; // This should already be filtered
    
    console.log('📊 Data counts for insights:', {
      arithmetic: filteredArithmetic.length,
      algebra: filteredAlgebra.length,
      diagnostic: filteredDiagnostic.length,
      students: studentEmails.length
    });

    // Generate insights with the filtered data
    await Promise.all([
      analyzeMathPerformanceFixed(filteredArithmetic, filteredAlgebra, filteredDiagnostic),     // NEW
      generateDiagnosticInsightsFixed(filteredDiagnostic),                                       // NEW
      calculateMathMetricsFixed(filteredArithmetic, filteredAlgebra, filteredDiagnostic)       // NEW
    ]);

    console.log('✅ Math insights generated successfully');

  } catch (error) {
    console.error('❌ Error generating math insights:', error);
  }
};

const generateMathInsightsWithData = async (freshDiagnosticData) => {
  try {
    console.log('🔍 Generating math insights with fresh data...');
    
    const studentEmails = getAllTutorStudents().map(s => s.email);
    
    // Use existing state data and fresh diagnostic data
    const filteredArithmetic = arithmeticData.filter(d => studentEmails.includes(d.userEmail));
    const filteredAlgebra = algebraData.filter(d => studentEmails.includes(d.email || d.username));
    const filteredDiagnostic = freshDiagnosticData; // ✅ Use fresh data directly
    
    console.log('📊 Data counts for insights (with fresh data):', {
      arithmetic: filteredArithmetic.length,
      algebra: filteredAlgebra.length,
      diagnostic: filteredDiagnostic.length,
      students: studentEmails.length
    });

    // Generate insights with the filtered data
    await Promise.all([
      analyzeMathPerformanceFixed(filteredArithmetic, filteredAlgebra, filteredDiagnostic),
      generateDiagnosticInsightsFixed(filteredDiagnostic), // ✅ Use fresh data
      calculateMathMetricsFixed(filteredArithmetic, filteredAlgebra, filteredDiagnostic)
    ]);

    console.log('✅ Math insights generated successfully with fresh data');

  } catch (error) {
    console.error('❌ Error generating math insights with fresh data:', error);
  }
};


const analyzeMathPerformanceFixed = async (arithmeticData, algebraData, diagnosticData) => {
  const insights = {
    overallPerformance: {},
    topicMastery: {},
    difficultyAnalysis: [], // ✅ Initialize as array
    conceptualGaps: [],
    strengthAreas: [],
    learningTrajectory: [],
    prerequisiteIssues: [],
    gradeAppropriatePerformance: {},
    timeEfficiency: {},
    commonErrors: []
  };

  // Process Arithmetic Data
  const arithmeticByUser = {};
  arithmeticData.forEach(score => {
    if (!arithmeticByUser[score.userEmail]) {
      arithmeticByUser[score.userEmail] = {
        username: score.username,
        operations: {},
        totalQuestions: 0,
        totalCorrect: 0,
        totalTime: 0,
        weaknesses: new Set(),
        attempts: []
      };
    }

    const userData = arithmeticByUser[score.userEmail];
    userData.totalQuestions += score.totalQuestions;
    userData.totalCorrect += score.correctAnswers;
    userData.totalTime += score.timeTaken;
    userData.attempts.push({
      date: score.createdAt,
      operation: score.operationType,
      accuracy: (score.correctAnswers / score.totalQuestions) * 100,
      speed: score.timeTaken / score.totalQuestions
    });

    if (!userData.operations[score.operationType]) {
      userData.operations[score.operationType] = { correct: 0, total: 0, time: 0 };
    }
    userData.operations[score.operationType].correct += score.correctAnswers;
    userData.operations[score.operationType].total += score.totalQuestions;
    userData.operations[score.operationType].time += score.timeTaken;

    // Collect weaknesses safely
    if (score.weaknesses && Array.isArray(score.weaknesses)) {
      score.weaknesses.forEach(w => userData.weaknesses.add(w));
    }
  });

  // Generate Overall Performance Analysis
  Object.entries(arithmeticByUser).forEach(([email, data]) => {
    const accuracy = data.totalQuestions > 0 ? (data.totalCorrect / data.totalQuestions) * 100 : 0;
    const avgTimePerQuestion = data.totalQuestions > 0 ? data.totalTime / data.totalQuestions : 0;
    
    insights.overallPerformance[email] = {
      username: data.username,
      overallAccuracy: accuracy,
      avgTimePerQuestion,
      operationMastery: Object.entries(data.operations).map(([op, stats]) => ({
        operation: op,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        avgTime: stats.total > 0 ? stats.time / stats.total : 0,
        mastery: stats.total > 0 ? 
          ((stats.correct / stats.total) >= 0.8 ? 'mastered' : 
           (stats.correct / stats.total) >= 0.6 ? 'developing' : 'needs_work') : 'no_data'
      })),
      improvementTrend: calculateImprovementTrendFixed(data.attempts),
      weaknessAreas: Array.from(data.weaknesses)
    };
  });

  // Process Algebra Data for Topic Mastery
  const topicMastery = {};
  algebraData.forEach(user => {
    if (user.topics && Array.isArray(user.topics)) {
      user.topics.forEach(topic => {
        if (!topic.topic) return; // Skip if no topic name
        
        if (!topicMastery[topic.topic]) {
          topicMastery[topic.topic] = {
            totalStudents: 0,
            masteredStudents: 0,
            averageLevel: [],
            questionStats: { total: 0, correct: 0 }
          };
        }
        
        topicMastery[topic.topic].totalStudents++;
        if (topic.current_level === 'mastered') {
          topicMastery[topic.topic].masteredStudents++;
        }
        topicMastery[topic.topic].averageLevel.push(topic.current_level);
        
        if (topic.questions && Array.isArray(topic.questions)) {
          topic.questions.forEach(q => {
            topicMastery[topic.topic].questionStats.total++;
            if (q.correct) topicMastery[topic.topic].questionStats.correct++;
          });
        }
      });
    }
  });

  insights.topicMastery = topicMastery;

  // ✅ FIXED: Difficulty Analysis as Array
  const difficultyStats = { 
    easy: { total: 0, correct: 0 }, 
    medium: { total: 0, correct: 0 }, 
    hard: { total: 0, correct: 0 } 
  };
  
  algebraData.forEach(user => {
    if (user.topics && Array.isArray(user.topics)) {
      user.topics.forEach(topic => {
        if (topic.questions && Array.isArray(topic.questions)) {
          topic.questions.forEach(q => {
            if (q.difficultyLevel && difficultyStats[q.difficultyLevel]) {
              difficultyStats[q.difficultyLevel].total++;
              if (q.correct) difficultyStats[q.difficultyLevel].correct++;
            }
          });
        }
      });
    }
  });

  // Convert to array format
  insights.difficultyAnalysis = Object.entries(difficultyStats).map(([level, stats]) => ({
    level,
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    totalQuestions: stats.total,
    correctAnswers: stats.correct
  }));

  // Identify Conceptual Gaps and Strengths
  Object.entries(topicMastery).forEach(([topic, data]) => {
    const masteryRate = data.totalStudents > 0 ? (data.masteredStudents / data.totalStudents) * 100 : 0;
    const accuracy = data.questionStats.total > 0 ? (data.questionStats.correct / data.questionStats.total) * 100 : 0;
    
    if (masteryRate < 40 || accuracy < 60) {
      insights.conceptualGaps.push({
        topic,
        masteryRate: masteryRate.toFixed(1),
        accuracy: accuracy.toFixed(1),
        studentsStrugglingCount: data.totalStudents - data.masteredStudents,
        totalStudents: data.totalStudents,
        severity: accuracy < 40 ? 'critical' : accuracy < 60 ? 'moderate' : 'mild'
      });
    } else if (masteryRate > 80 && accuracy > 85) {
      insights.strengthAreas.push({
        topic,
        masteryRate: masteryRate.toFixed(1),
        accuracy: accuracy.toFixed(1),
        masteredStudents: data.masteredStudents,
        totalStudents: data.totalStudents
      });
    }
  });

  // Time Efficiency Analysis
  Object.entries(arithmeticByUser).forEach(([email, data]) => {
    const efficiency = calculateTimeEfficiencyFixed(data.operations);
    insights.timeEfficiency[email] = {
      username: data.username,
      overallEfficiency: efficiency.overall,
      operationEfficiency: efficiency.byOperation,
      recommendation: efficiency.recommendation
    };
  });

  console.log('📊 Generated math insights:', {
    overallPerformance: Object.keys(insights.overallPerformance).length,
    topicMastery: Object.keys(insights.topicMastery).length,
    difficultyAnalysis: insights.difficultyAnalysis.length,
    conceptualGaps: insights.conceptualGaps.length,
    strengthAreas: insights.strengthAreas.length
  });

  setMathInsights(insights);
};

const generateDiagnosticInsightsFixed = async (diagnosticData) => {
  console.log('🔍 Generating diagnostic insights from:', diagnosticData.length, 'records');
  
  const insights = {
    prePostComparison: [], // ✅ Initialize as array
    skillProgression: {},
    interventionRecommendations: [], // ✅ Initialize as array
    readinessIndicators: {},
    conceptualMisconceptions: [] // ✅ Initialize as array
  };

  // Process diagnostic comparison data
  diagnosticData.forEach(data => {
    // Handle both possible data structures
    const email = data.email || data.userEmail;
    const username = data.username;
    
    if (!email || !username) {
      console.warn('⚠️ Skipping diagnostic data with missing email/username:', data);
      return;
    }

    // Check if this is comparison data (from diagnosticComparisonData)
    if (data.canCompare && data.hasPreTest && data.hasPostTest) {
      const improvement = data.improvement.scorePercentageImprovement;
      const timeImprovement = data.improvement.timeImprovement;
      
      insights.prePostComparison.push({
        email: email,
        username: username,
        topicArea: data.topic || 'arithmetic',
        preScore: data.preTest.totalScore,
        postScore: data.postTest.totalScore,
        improvement: improvement,
        timeImprovement: timeImprovement,
        improvementCategory: improvement > 20 ? 'excellent' : 
                            improvement > 10 ? 'good' : 
                            improvement > 0 ? 'moderate' : 'needs_attention',
        skillGaps: identifySkillGapsFromComparisonFixed(data.preTest, data.postTest)
      });

      // Generate intervention recommendations for poor performers
      if (improvement <= 0 || data.postTest.totalScore < 60) {
        insights.interventionRecommendations.push({
          student: username,
          topicArea: data.topic || 'arithmetic',
          priority: data.postTest.totalScore < 40 ? 'critical' : 'high',
          recommendation: `Immediate intervention needed in ${data.topic || 'arithmetic'} fundamentals`,
          specificActions: [
            'Review basic arithmetic operations',
            'Practice with manipulatives and visual aids',
            'Provide additional one-on-one support',
            'Break down complex problems into smaller steps'
          ],
          skillGaps: identifySkillGapsFromComparisonFixed(data.preTest, data.postTest)
        });
      }
    }
    // Handle raw diagnostic test data
    else if (data.responses && Array.isArray(data.responses)) {
      // Process individual diagnostic test data
      const misconceptions = new Set();
      data.responses.forEach(response => {
        if (!response.isCorrect && response.questionData.questionMisconceptions) {
          response.questionData.questionMisconceptions.forEach(misc => 
            misconceptions.add(misc)
          );
        }
      });

      if (misconceptions.size > 0) {
        insights.conceptualMisconceptions.push({
          student: username,
          topic: data.topicArea || 'arithmetic',
          misconceptions: Array.from(misconceptions),
          testType: data.testType
        });
      }
    }
  });

  console.log('📊 Generated diagnostic insights:', {
    prePostComparison: insights.prePostComparison.length,
    interventionRecommendations: insights.interventionRecommendations.length,
    conceptualMisconceptions: insights.conceptualMisconceptions.length
  });

  setEnhancedDiagnosticInsights(insights);
};

const calculateMathMetricsFixed = async (arithmeticData, algebraData, diagnosticData) => {
  console.log('📊 Calculating math metrics...');
  
  const studentEmails = getAllTutorStudents().map(s => s.email);
  const metrics = {
    averageMasteryLevel: 0,
    studentsAtRisk: 0,
    conceptualUnderstanding: 0,
    practiceEfficiency: 0,
    overallEngagement: 0
  };

  // Calculate average mastery level from algebra data
  let totalMastery = 0;
  let masteryCount = 0;
  
  algebraData.forEach(user => {
    if (user.topics && Array.isArray(user.topics)) {
      user.topics.forEach(topic => {
        const levelValues = { 
          easy: 25, 
          medium: 50, 
          hard: 75, 
          mastered: 100, 
          intermediate: 62.5 
        };
        const value = levelValues[topic.current_level] || 0;
        totalMastery += value;
        masteryCount++;
      });
    }
  });

  metrics.averageMasteryLevel = masteryCount > 0 ? (totalMastery / masteryCount).toFixed(1) : 0;

  // Students at risk calculation from arithmetic data
  let atRiskCount = 0;
  const userPerformance = {};

  arithmeticData.forEach(score => {
    if (!userPerformance[score.userEmail]) {
      userPerformance[score.userEmail] = { correct: 0, total: 0 };
    }
    userPerformance[score.userEmail].correct += score.correctAnswers;
    userPerformance[score.userEmail].total += score.totalQuestions;
  });

  Object.values(userPerformance).forEach(perf => {
    if (perf.total > 0 && (perf.correct / perf.total) < 0.6) {
      atRiskCount++;
    }
  });

  metrics.studentsAtRisk = studentEmails.length > 0 ? 
    ((atRiskCount / Math.max(studentEmails.length, Object.keys(userPerformance).length)) * 100).toFixed(1) : 0;

  // Conceptual understanding from diagnostic data
  if (diagnosticData.length > 0) {
    const totalScore = diagnosticData.reduce((sum, test) => {
      // Handle different data structures
      if (test.postTest && test.postTest.totalScore) {
        return sum + test.postTest.totalScore;
      } else if (test.totalScore) {
        return sum + test.totalScore;
      } else if (test.hasPostTest) {
        return sum + (test.postTest?.totalScore || 0);
      } else if (test.hasPreTest) {
        return sum + (test.preTest?.totalScore || 0);
      }
      return sum;
    }, 0);
    
    metrics.conceptualUnderstanding = (totalScore / diagnosticData.length).toFixed(1);
  }

  // Practice efficiency from arithmetic timing
  const totalQuestions = arithmeticData.reduce((sum, score) => sum + score.totalQuestions, 0);
  const totalTime = arithmeticData.reduce((sum, score) => sum + score.timeTaken, 0);
  const avgTimePerQuestion = totalQuestions > 0 ? totalTime / totalQuestions : 0;
  
  // Efficiency: lower time = higher efficiency (benchmark: 60 seconds)
  metrics.practiceEfficiency = Math.max(0, Math.min(100, (60 - avgTimePerQuestion) + 50)).toFixed(1);

  // Overall engagement based on active users
  const uniqueArithmeticUsers = new Set(arithmeticData.map(d => d.userEmail));
  const uniqueAlgebraUsers = new Set(algebraData.map(d => d.email || d.username));
  const uniqueDiagnosticUsers = new Set(diagnosticData.map(d => d.email || d.username));
  
  const allActiveUsers = new Set([
    ...uniqueArithmeticUsers,
    ...uniqueAlgebraUsers,
    ...uniqueDiagnosticUsers
  ]);

  metrics.overallEngagement = studentEmails.length > 0 ? 
    ((allActiveUsers.size / studentEmails.length) * 100).toFixed(1) : 0;

  console.log('📊 Calculated metrics:', metrics);
  setMathMetrics(metrics);
};

// Helper Functions
const calculateImprovementTrendFixed = (attempts) => {
  if (!attempts || attempts.length < 2) return 'insufficient_data';
  
  const sortedAttempts = attempts.sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstHalf = sortedAttempts.slice(0, Math.ceil(sortedAttempts.length / 2));
  const secondHalf = sortedAttempts.slice(Math.ceil(sortedAttempts.length / 2));
  
  if (firstHalf.length === 0 || secondHalf.length === 0) return 'insufficient_data';
  
  const firstHalfAvg = firstHalf.reduce((sum, att) => sum + (att.accuracy || 0), 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, att) => sum + (att.accuracy || 0), 0) / secondHalf.length;
  
  const improvement = secondHalfAvg - firstHalfAvg;
  
  if (improvement > 10) return 'strong_improvement';
  if (improvement > 5) return 'moderate_improvement';
  if (improvement > -5) return 'stable';
  return 'declining';
};

const calculateTimeEfficiencyFixed = (operations) => {
  const benchmarks = {
    addition: 30,
    subtraction: 35,
    multiplication: 45,
    division: 60,
    'mixed-operations': 50,
    'word-problems': 120,
    'dealing-with-negative-sign': 40,
    'ratio-proportion-percentage': 70,
    decimals: 45,
    fractions: 60
  };

  let overallEfficiency = 0;
  let operationCount = 0;
  const byOperation = {};

  Object.entries(operations).forEach(([op, stats]) => {
    if (stats.total === 0) return;
    
    const avgTime = stats.time / stats.total;
    const benchmark = benchmarks[op] || 60;
    const efficiency = Math.max(0, Math.min(100, ((benchmark - avgTime) / benchmark) * 100 + 50));
    
    byOperation[op] = {
      avgTime: avgTime.toFixed(1),
      benchmark,
      efficiency: efficiency.toFixed(1),
      status: efficiency > 70 ? 'efficient' : efficiency > 50 ? 'average' : 'needs_improvement'
    };
    
    overallEfficiency += efficiency;
    operationCount++;
  });

  overallEfficiency = operationCount > 0 ? overallEfficiency / operationCount : 0;
  
  return {
    overall: overallEfficiency.toFixed(1),
    byOperation,
    recommendation: overallEfficiency > 70 ? 'maintain_pace' : 
                   overallEfficiency > 50 ? 'practice_speed' : 'focus_on_accuracy_first'
  };
};

const identifySkillGapsFromComparisonFixed = (preTest, postTest) => {
  const gaps = [];
  
  if (!preTest || !postTest) return gaps;
  
  // Compare difficulty levels if available
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const preDiff = preTest[`${difficulty}Questions`];
    const postDiff = postTest[`${difficulty}Questions`];
    
    if (preDiff && postDiff && postDiff.percentage < preDiff.percentage) {
      gaps.push(`${difficulty} level questions showing decline`);
    }
  });
  
  // Compare topic performance if available
  if (preTest.topicPerformance && postTest.topicPerformance) {
    preTest.topicPerformance.forEach(preTopic => {
      const postTopic = postTest.topicPerformance.find(t => t.topic === preTopic.topic);
      if (postTopic && postTopic.percentage < preTopic.percentage) {
        gaps.push(`${preTopic.topic} concept understanding`);
      }
    });
  }
  
  // If no specific gaps identified but performance declined
  if (gaps.length === 0 && postTest.totalScore < preTest.totalScore) {
    gaps.push('General arithmetic fluency', 'Problem-solving strategies');
  }
  
  return gaps;
};

const generateProgrammingInsights = (ctData, pythonData, diagnosticsData) => {
  console.log('🔍 Generating programming insights...');
  
  const insights = {
    overallPerformance: {},
    topicMastery: {},
    difficultyAnalysis: [],
    conceptualGaps: [],
    strengthAreas: [],
    learningProgress: [],
    prerequisiteIssues: [],
    codeQuality: {},
    problemSolvingSkills: {},
    commonErrors: []
  };

  // Process Computational Thinking Data
  const ctByUser = {};
  ctData.forEach(user => {
    ctByUser[user.email] = {
      username: user.username,
      totalScore: 0,
      totalQuestions: 0,
      topicScores: {},
      attempts: []
    };

    user.quizzes.forEach(quiz => {
      ctByUser[user.email].totalScore += quiz.score;
      ctByUser[user.email].totalQuestions += quiz.totalQuestions;
      
      if (!ctByUser[user.email].topicScores[quiz.topic]) {
        ctByUser[user.email].topicScores[quiz.topic] = { score: 0, total: 0 };
      }
      ctByUser[user.email].topicScores[quiz.topic].score += quiz.score;
      ctByUser[user.email].topicScores[quiz.topic].total += quiz.totalQuestions;
      
      ctByUser[user.email].attempts.push({
        date: quiz.date,
        topic: quiz.topic,
        accuracy: (quiz.score / quiz.totalQuestions) * 100,
        score: quiz.score
      });
    });
  });

  // Process Python Finger Exercise Data
  const pythonByUser = {};
  pythonData.forEach(user => {
    pythonByUser[user.email] = {
      username: user.username,
      totalCorrect: 0,
      totalAttempted: 0,
      topicPerformance: {},
      progressionPath: []
    };

    user.topics.forEach(topic => {
      const correct = topic.submissions.filter(s => s.isCorrect).length;
      const total = topic.submissions.length;
      
      pythonByUser[user.email].totalCorrect += correct;
      pythonByUser[user.email].totalAttempted += total;
      
      pythonByUser[user.email].topicPerformance[topic.topicName] = {
        correct,
        total,
        accuracy: total > 0 ? (correct / total) * 100 : 0,
        lastActivity: topic.submissions.length > 0 ? 
          new Date(Math.max(...topic.submissions.map(s => new Date(s.timestamp)))) : null
      };
    });
  });

  // Generate Overall Performance Analysis
  const allUsers = new Set([...Object.keys(ctByUser), ...Object.keys(pythonByUser)]);
  
  allUsers.forEach(email => {
    const ctUser = ctByUser[email];
    const pythonUser = pythonByUser[email];
    
    const ctAccuracy = ctUser ? (ctUser.totalQuestions > 0 ? (ctUser.totalScore / ctUser.totalQuestions) * 100 : 0) : 0;
    const pythonAccuracy = pythonUser ? (pythonUser.totalAttempted > 0 ? (pythonUser.totalCorrect / pythonUser.totalAttempted) * 100 : 0) : 0;
    
    insights.overallPerformance[email] = {
      username: ctUser?.username || pythonUser?.username || 'Unknown',
      ctAccuracy,
      pythonAccuracy,
      overallAccuracy: (ctAccuracy + pythonAccuracy) / 2,
      ctProgress: ctUser ? Object.keys(ctUser.topicScores).length : 0,
      pythonProgress: pythonUser ? Object.keys(pythonUser.topicPerformance).length : 0,
      improvementTrend: calculateProgrammingTrend(ctUser?.attempts || [], pythonUser),
      weakAreas: identifyProgrammingWeaknesses(ctUser, pythonUser),
      strongAreas: identifyProgrammingStrengths(ctUser, pythonUser)
    };
  });

  // Topic Mastery Analysis
  const topicMastery = {};
  
  // CT Topic Mastery
  Object.values(ctByUser).forEach(user => {
    Object.entries(user.topicScores).forEach(([topic, data]) => {
      if (!topicMastery[topic]) {
        topicMastery[topic] = {
          type: 'computational_thinking',
          totalStudents: 0,
          masteredStudents: 0,
          averageAccuracy: 0,
          accuracySum: 0
        };
      }
      
      const accuracy = data.total > 0 ? (data.score / data.total) * 100 : 0;
      topicMastery[topic].totalStudents++;
      topicMastery[topic].accuracySum += accuracy;
      
      if (accuracy >= 80) {
        topicMastery[topic].masteredStudents++;
      }
    });
  });

  // Python Topic Mastery
  Object.values(pythonByUser).forEach(user => {
    Object.entries(user.topicPerformance).forEach(([topic, data]) => {
      const topicKey = `python_${topic}`;
      if (!topicMastery[topicKey]) {
        topicMastery[topicKey] = {
          type: 'python_programming',
          totalStudents: 0,
          masteredStudents: 0,
          averageAccuracy: 0,
          accuracySum: 0
        };
      }
      
      topicMastery[topicKey].totalStudents++;
      topicMastery[topicKey].accuracySum += data.accuracy;
      
      if (data.accuracy >= 80) {
        topicMastery[topicKey].masteredStudents++;
      }
    });
  });

  // Calculate average accuracies
  Object.keys(topicMastery).forEach(topic => {
    if (topicMastery[topic].totalStudents > 0) {
      topicMastery[topic].averageAccuracy = topicMastery[topic].accuracySum / topicMastery[topic].totalStudents;
    }
  });

  insights.topicMastery = topicMastery;

  // Difficulty Analysis (from diagnostics data)
  const difficultyStats = { easy: { total: 0, correct: 0 }, medium: { total: 0, correct: 0 }, hard: { total: 0, correct: 0 } };
  
  diagnosticsData.forEach(user => {
    user.quizzes?.forEach(quiz => {
      quiz.submissions?.forEach(submission => {
        // Categorize by test cases passed (simple heuristic)
        const passRate = submission.test_cases_passed || 0;
        let difficulty = 'medium';
        if (passRate >= 80) difficulty = 'easy';
        else if (passRate <= 40) difficulty = 'hard';
        
        difficultyStats[difficulty].total++;
        if (passRate > 60) difficultyStats[difficulty].correct++;
      });
    });
  });

  insights.difficultyAnalysis = Object.entries(difficultyStats).map(([level, stats]) => ({
    level,
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    totalQuestions: stats.total,
    correctAnswers: stats.correct
  }));

  // Identify Gaps and Strengths
  Object.entries(topicMastery).forEach(([topic, data]) => {
    const masteryRate = data.totalStudents > 0 ? (data.masteredStudents / data.totalStudents) * 100 : 0;
    
    if (masteryRate < 40 || data.averageAccuracy < 60) {
      insights.conceptualGaps.push({
        topic: topic.replace('python_', ''),
        type: data.type,
        masteryRate: masteryRate.toFixed(1),
        accuracy: data.averageAccuracy.toFixed(1),
        studentsStrugglingCount: data.totalStudents - data.masteredStudents,
        totalStudents: data.totalStudents,
        severity: data.averageAccuracy < 40 ? 'critical' : data.averageAccuracy < 60 ? 'moderate' : 'mild',
        recommendations: generateTopicRecommendations(topic, data.type, data.averageAccuracy)
      });
    } else if (masteryRate > 75 && data.averageAccuracy > 80) {
      insights.strengthAreas.push({
        topic: topic.replace('python_', ''),
        type: data.type,
        masteryRate: masteryRate.toFixed(1),
        accuracy: data.averageAccuracy.toFixed(1),
        masteredStudents: data.masteredStudents,
        totalStudents: data.totalStudents
      });
    }
  });

  // Learning Progress Analysis
  Object.entries(insights.overallPerformance).forEach(([email, perf]) => {
    if (perf.improvementTrend !== 'insufficient_data') {
      insights.learningProgress.push({
        email,
        username: perf.username,
        ctProgress: perf.ctProgress,
        pythonProgress: perf.pythonProgress,
        overallAccuracy: perf.overallAccuracy,
        trend: perf.improvementTrend,
        recommendation: generateProgressRecommendation(perf)
      });
    }
  });

  console.log('📊 Generated programming insights:', {
    overallPerformance: Object.keys(insights.overallPerformance).length,
    topicMastery: Object.keys(insights.topicMastery).length,
    conceptualGaps: insights.conceptualGaps.length,
    strengthAreas: insights.strengthAreas.length
  });

  setProgrammingInsights(insights);
}; // ✅ PROPER CLOSING OF generateProgrammingInsights

// ✅ SEPARATE calculateProgrammingMetrics FUNCTION
const calculateProgrammingMetrics = (ctData, pythonData, diagnosticsData) => {
  const metrics = {
    averageCompletionRate: 0,
    studentsAtRisk: 0,
    codeEfficiency: 0,
    conceptualUnderstanding: 0,
    overallEngagement: 0
  };

  const allStudentEmails = getAllTutorStudents().map(s => s.email);
  const activeStudents = new Set();

  // Calculate average completion rate
  let totalCompletionRate = 0;
  let studentCount = 0;

  // CT completion analysis
  ctData.forEach(user => {
    activeStudents.add(user.email);
    const maxPossibleQuestions = 90; // 3 topics × 30 questions each
    const completedQuestions = user.quizzes.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
    totalCompletionRate += (completedQuestions / maxPossibleQuestions) * 100;
    studentCount++;
  });

  // Python completion analysis
  pythonData.forEach(user => {
    activeStudents.add(user.email);
    if (!ctData.find(ct => ct.email === user.email)) {
      // Only count if not already counted in CT
      const totalAttempted = user.topics.reduce((sum, topic) => sum + topic.submissions.length, 0);
      const estimatedMaxQuestions = user.topics.length * 10; // Estimate 10 questions per topic
      if (estimatedMaxQuestions > 0) {
        totalCompletionRate += (totalAttempted / estimatedMaxQuestions) * 100;
        studentCount++;
      }
    }
  });

  metrics.averageCompletionRate = studentCount > 0 ? (totalCompletionRate / studentCount).toFixed(1) : 0;

  // Students at risk calculation
  let atRiskCount = 0;
  const performanceMap = {};

  ctData.forEach(user => {
    const totalScore = user.quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
    const totalQuestions = user.quizzes.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
    const accuracy = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
    
    performanceMap[user.email] = { accuracy, hasData: true };
    if (accuracy < 50) atRiskCount++;
  });

  pythonData.forEach(user => {
    if (!performanceMap[user.email]) {
      const totalCorrect = user.topics.reduce((sum, topic) => 
        sum + topic.submissions.filter(s => s.isCorrect).length, 0);
      const totalAttempted = user.topics.reduce((sum, topic) => sum + topic.submissions.length, 0);
      const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;
      
      performanceMap[user.email] = { accuracy, hasData: true };
      if (accuracy < 50) atRiskCount++;
    }
  });

  const totalActiveStudents = Object.keys(performanceMap).length;
  metrics.studentsAtRisk = totalActiveStudents > 0 ? ((atRiskCount / totalActiveStudents) * 100).toFixed(1) : 0;

  // Code efficiency from diagnostics
  let totalEfficiency = 0;
  let efficiencyCount = 0;

  diagnosticsData.forEach(user => {
    user.quizzes?.forEach(quiz => {
      quiz.submissions?.forEach(submission => {
        const efficiency = (submission.test_cases_passed || 0);
        totalEfficiency += efficiency;
        efficiencyCount++;
      });
    });
  });

  metrics.codeEfficiency = efficiencyCount > 0 ? (totalEfficiency / efficiencyCount).toFixed(1) : 0;

  // Conceptual understanding
  const totalAccuracy = Object.values(performanceMap).reduce((sum, perf) => sum + perf.accuracy, 0);
  metrics.conceptualUnderstanding = totalActiveStudents > 0 ? (totalAccuracy / totalActiveStudents).toFixed(1) : 0;

  // Overall engagement
  metrics.overallEngagement = allStudentEmails.length > 0 ? 
    ((activeStudents.size / allStudentEmails.length) * 100).toFixed(1) : 0;

  setProgrammingMetrics(metrics);
};

// Helper functions for programming insights
const calculateProgrammingTrend = (ctAttempts, pythonUser) => {
  if (ctAttempts.length < 2 && (!pythonUser || Object.keys(pythonUser.topicPerformance || {}).length < 2)) {
    return 'insufficient_data';
  }

  let improvement = 0;
  let dataPoints = 0;

  // Analyze CT improvement
  if (ctAttempts.length >= 2) {
    const sortedAttempts = ctAttempts.sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstHalf = sortedAttempts.slice(0, Math.ceil(sortedAttempts.length / 2));
    const secondHalf = sortedAttempts.slice(Math.ceil(sortedAttempts.length / 2));
    
    if (firstHalf.length > 0 && secondHalf.length > 0) {
      const firstAvg = firstHalf.reduce((sum, att) => sum + att.accuracy, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, att) => sum + att.accuracy, 0) / secondHalf.length;
      improvement += secondAvg - firstAvg;
      dataPoints++;
    }
  }

  // Analyze Python improvement (simplified)
  if (pythonUser && Object.keys(pythonUser.topicPerformance || {}).length >= 2) {
    const topicAccuracies = Object.values(pythonUser.topicPerformance).map(t => t.accuracy);
    const avgAccuracy = topicAccuracies.reduce((a, b) => a + b, 0) / topicAccuracies.length;
    if (avgAccuracy > 70) improvement += 10;
    dataPoints++;
  }

  if (dataPoints === 0) return 'insufficient_data';

  const avgImprovement = improvement / dataPoints;
  
  if (avgImprovement > 15) return 'strong_improvement';
  if (avgImprovement > 5) return 'moderate_improvement';
  if (avgImprovement > -5) return 'stable';
  return 'declining';
};

const identifyProgrammingWeaknesses = (ctUser, pythonUser) => {
  const weaknesses = [];
  
  if (ctUser) {
    Object.entries(ctUser.topicScores || {}).forEach(([topic, data]) => {
      const accuracy = data.total > 0 ? (data.score / data.total) * 100 : 0;
      if (accuracy < 60) {
        weaknesses.push(`CT: ${topic}`);
      }
    });
  }
  
  if (pythonUser) {
    Object.entries(pythonUser.topicPerformance || {}).forEach(([topic, data]) => {
      if (data.accuracy < 60) {
        weaknesses.push(`Python: ${topic}`);
      }
    });
  }
  
  return weaknesses;
};

const identifyProgrammingStrengths = (ctUser, pythonUser) => {
  const strengths = [];
  
  if (ctUser) {
    Object.entries(ctUser.topicScores || {}).forEach(([topic, data]) => {
      const accuracy = data.total > 0 ? (data.score / data.total) * 100 : 0;
      if (accuracy >= 85) {
        strengths.push(`CT: ${topic}`);
      }
    });
  }
  
  if (pythonUser) {
    Object.entries(pythonUser.topicPerformance || {}).forEach(([topic, data]) => {
      if (data.accuracy >= 85) {
        strengths.push(`Python: ${topic}`);
      }
    });
  }
  
  return strengths;
};

const generateTopicRecommendations = (topic, type, accuracy) => {
  const recommendations = [];
  
  if (type === 'computational_thinking') {
    if (topic.includes('foundation')) {
      recommendations.push('Practice pattern recognition exercises');
      recommendations.push('Work on decomposition skills');
      recommendations.push('Use visual learning aids for algorithm understanding');
    }
  } else if (type === 'python_programming') {
    recommendations.push('Review basic Python syntax');
    recommendations.push('Practice with simpler examples');
    recommendations.push('Use debugging tools to understand code flow');
  }
  
  if (accuracy < 40) {
    recommendations.push('Provide one-on-one tutoring support');
    recommendations.push('Break down complex concepts into smaller steps');
  }
  
  return recommendations;
};

const generateProgressRecommendation = (performance) => {
  if (performance.overallAccuracy >= 85) {
    return 'Ready for advanced programming concepts';
  } else if (performance.overallAccuracy >= 70) {
    return 'Continue current pace with occasional challenges';
  } else if (performance.overallAccuracy >= 50) {
    return 'Focus on reinforcing fundamental concepts';
  } else {
    return 'Needs immediate intervention and support';
  }
};

const generateAllProgrammingInsights = async () => {
  const studentEmails = getAllTutorStudents().map(s => s.email);
  
  // Filter data for current students
  const filteredCT = ctData.filter(d => studentEmails.includes(d.email));
  
  // ✅ FIXED: Correct Python data transformation
  const filteredPython = Array.from(pythonFingerData.entries()).map(([username, topics]) => {
    const email = getAllTutorStudents().find(s => s.name === username)?.email || username;
    
    // Transform topics correctly - create mock submissions from correct/total data
    const transformedTopics = Object.entries(topics).map(([topicName, data]) => ({
      topicName,
      submissions: Array.from({length: data.total || 0}, (_, i) => ({
        isCorrect: i < (data.correct || 0),
        timestamp: new Date() // Mock timestamp
      }))
    }));
    
    return { 
      username, 
      email, 
      topics: transformedTopics 
    };
  }).filter(d => studentEmails.includes(d.email));
  
  const filteredDiagnostics = diagnosticsData.filter(d => studentEmails.includes(d.email || d.username));
  
  // Add debug logging
  console.log('🔍 Programming Insights Data:', {
    ctCount: filteredCT.length,
    pythonCount: filteredPython.length,
    samplePython: filteredPython[0],
    pythonTopics: filteredPython[0]?.topics?.map(t => t.topicName)
  });
  
  await Promise.all([
    generateProgrammingInsights(filteredCT, filteredPython, filteredDiagnostics),
    calculateProgrammingMetrics(filteredCT, filteredPython, filteredDiagnostics)
  ]);
};


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

  const generateVocabularyInsights = (rawData) => {
    const insights = {
      cefrLevelDistribution: {},
      topicPerformance: {},
      difficultyAnalysis: {},
      learningProgress: [],
      weakAreas: [],
      strongAreas: [],
      recommendedTopics: []
    };

    const allQuestions = [];
    const userProgress = {};

    // Collect all questions and track user progress
    rawData.forEach(user => {
      userProgress[user.username] = {
        assessments: user.assessments.map(assessment => ({
          date: new Date(assessment.date),
          score: assessment.total_score,
          questions: assessment.questions
        })).sort((a, b) => a.date - b.date)
      };

      user.assessments.forEach(assessment => {
        assessment.questions.forEach(question => {
          allQuestions.push({
            ...question,
            username: user.username,
            assessmentDate: assessment.date
          });
        });
      });
    });

    // CEFR Level Distribution Analysis
    allQuestions.forEach(q => {
      if (!insights.cefrLevelDistribution[q.CEFR_level]) {
        insights.cefrLevelDistribution[q.CEFR_level] = { total: 0, correct: 0 };
      }
      insights.cefrLevelDistribution[q.CEFR_level].total++;
      if (q.is_correct) {
        insights.cefrLevelDistribution[q.CEFR_level].correct++;
      }
    });

    // Topic Performance Analysis
    allQuestions.forEach(q => {
      if (!insights.topicPerformance[q.topic]) {
        insights.topicPerformance[q.topic] = { total: 0, correct: 0, users: new Set() };
      }
      insights.topicPerformance[q.topic].total++;
      insights.topicPerformance[q.topic].users.add(q.username);
      if (q.is_correct) {
        insights.topicPerformance[q.topic].correct++;
      }
    });

    // Difficulty Analysis
    allQuestions.forEach(q => {
      if (!insights.difficultyAnalysis[q.difficulty_level]) {
        insights.difficultyAnalysis[q.difficulty_level] = { total: 0, correct: 0 };
      }
      insights.difficultyAnalysis[q.difficulty_level].total++;
      if (q.is_correct) {
        insights.difficultyAnalysis[q.difficulty_level].correct++;
      }
    });

    // Learning Progress Analysis
    Object.entries(userProgress).forEach(([username, data]) => {
      if (data.assessments.length >= 2) {
        const firstAssessment = data.assessments[0];
        const lastAssessment = data.assessments[data.assessments.length - 1];
        const improvementRate = ((lastAssessment.score - firstAssessment.score) / firstAssessment.score) * 100;
        
        insights.learningProgress.push({
          username,
          firstScore: firstAssessment.score,
          lastScore: lastAssessment.score,
          improvementRate,
          assessmentCount: data.assessments.length,
          timeSpan: Math.ceil((lastAssessment.date - firstAssessment.date) / (1000 * 60 * 60 * 24))
        });
      }
    });

    // Identify weak and strong areas
    Object.entries(insights.topicPerformance).forEach(([topic, data]) => {
      const accuracy = (data.correct / data.total) * 100;
      const engagement = data.users.size;
      
      if (accuracy < 60) {
        insights.weakAreas.push({
          topic,
          accuracy: accuracy.toFixed(1),
          totalQuestions: data.total,
          studentsAttempted: engagement
        });
      } else if (accuracy > 85) {
        insights.strongAreas.push({
          topic,
          accuracy: accuracy.toFixed(1),
          totalQuestions: data.total,
          studentsAttempted: engagement
        });
      }
    });

    // Generate topic recommendations based on CEFR progression
    const cefrOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentCefrPerformance = Object.entries(insights.cefrLevelDistribution)
      .map(([level, data]) => ({
        level,
        accuracy: (data.correct / data.total) * 100
      }))
      .sort((a, b) => cefrOrder.indexOf(a.level) - cefrOrder.indexOf(b.level));

    currentCefrPerformance.forEach((cefrData, index) => {
      if (cefrData.accuracy > 80 && index < currentCefrPerformance.length - 1) {
        const nextLevel = currentCefrPerformance[index + 1];
        if (!nextLevel || nextLevel.accuracy < 70) {
          insights.recommendedTopics.push({
            recommendation: `Students are ready for ${nextLevel ? nextLevel.level : 'advanced'} level vocabulary`,
            currentLevel: cefrData.level,
            nextLevel: nextLevel ? nextLevel.level : 'C2+',
            reason: `High accuracy (${cefrData.accuracy.toFixed(1)}%) at ${cefrData.level} level`
          });
        }
      }
    });

    setVocabularyInsights(insights);
  };

  const calculateVocabularyMetrics = (rawData) => {
    let totalSessions = 0;
    let totalQuestions = 0;
    let completedAssessments = 0;
    let totalEngagementTime = 0;
    let studentsWithImprovement = 0;

    rawData.forEach(user => {
      totalSessions += user.assessments.length;
      
      user.assessments.forEach(assessment => {
        totalQuestions += assessment.questions.length;
        completedAssessments++;
        
        // Estimate engagement time based on questions answered
        totalEngagementTime += assessment.questions.length * 1.5; // 1.5 minutes per question average
      });

      // Check for improvement
      if (user.assessments.length >= 2) {
        const scores = user.assessments.map(a => a.total_score);
        const firstHalf = scores.slice(0, Math.ceil(scores.length / 2));
        const secondHalf = scores.slice(Math.ceil(scores.length / 2));
        
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        if (secondAvg > firstAvg) {
          studentsWithImprovement++;
        }
      }
    });

    const metrics = {
      averageSessionLength: totalSessions > 0 ? (totalQuestions / totalSessions).toFixed(1) : 0,
      improvementRate: rawData.length > 0 ? ((studentsWithImprovement / rawData.length) * 100).toFixed(1) : 0,
      engagementScore: rawData.length > 0 ? (totalEngagementTime / rawData.length).toFixed(1) : 0,
      completionRate: totalSessions > 0 ? ((completedAssessments / totalSessions) * 100).toFixed(1) : 100
    };

    setVocabularyMetrics(metrics);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classroom/${classroomId}`, {
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

// Add this component before the return statement
const OverviewTab = () => (
    <div className="row mb-4">
      {/* Subject Cards Row */}
      <div className="col-12 mb-4">
        <div className="row">
          {/* English Card */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm" style={{border: '1px solid #d4edda'}}>
              <div className="card-header text-dark" style={{backgroundColor: '#d4edda'}}>
                <h5 className="mb-0">📚 English Performance</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-6">
                    <h3 className="text-primary">{vocabularyData.length}</h3>
                    <small className="text-muted">Active Students</small>
                  </div>
                  <div className="col-6">
                    <h3 className="text-success">{vocabularyMetrics?.improvementRate || 0}%</h3>
                    <small className="text-muted">Improvement Rate</small>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small>Avg Session Length:</small>
                    <small>{vocabularyMetrics?.averageSessionLength || 0} questions</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small>Engagement Score:</small>
                    <small>{vocabularyMetrics?.engagementScore || 0}%</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small>Weak Areas:</small>
                    <small className="badge bg-warning">{vocabularyInsights?.weakAreas?.length || 0}</small>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => setActiveTab('english')}
                >
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>

          {/* Math Card */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm" style={{border: '1px solid #bee5eb'}}>
              <div className="card-header text-dark" style={{backgroundColor: '#bee5eb'}}>
                <h5 className="mb-0">🧮 Math Performance</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-6">
                    <h3 className="text-primary">{getAllTutorStudents().length}</h3>
                    <small className="text-muted">Total Students</small>
                  </div>
                  <div className="col-6">
                    <h3 className="text-warning">{mathMetrics?.studentsAtRisk || 0}%</h3>
                    <small className="text-muted">Students At Risk</small>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small>Avg Mastery Level:</small>
                    <small>{mathMetrics?.averageMasteryLevel || 0}%</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small>Practice Efficiency:</small>
                    <small>{mathMetrics?.practiceEfficiency || 0}%</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small>Conceptual Gaps:</small>
                    <small className="badge bg-danger">{mathInsights?.conceptualGaps?.length || 0}</small>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => setActiveTab('math')}
                >
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>

          {/* Programming Card */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm" style={{border: '1px solid #fdeaa7'}}>
              <div className="card-header text-dark" style={{backgroundColor: '#fdeaa7'}}>
                <h5 className="mb-0">💻 Programming Performance</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-6">
                    <h3 className="text-primary">{ctData.length + pythonFingerData.size}</h3>
                    <small className="text-muted">Active Students</small>
                  </div>
                  <div className="col-6">
                    <h3 className="text-warning">{programmingMetrics?.studentsAtRisk || 0}%</h3>
                    <small className="text-muted">Students At Risk</small>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small>Completion Rate:</small>
                    <small>{programmingMetrics?.averageCompletionRate || 0}%</small>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <small>Code Efficiency:</small>
                    <small>{programmingMetrics?.codeEfficiency || 0}%</small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small>Concept Gaps:</small>
                    <small className="badge bg-warning">{programmingInsights?.conceptualGaps?.length || 0}</small>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => setActiveTab('programming')}
                >
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Stats */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">📊 Overall Class Performance Summary</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="text-center p-3 border rounded bg-light">
                  <h4 className="text-primary">{getAllTutorStudents().length}</h4>
                  <p className="mb-0 text-muted">Total Students</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 border rounded bg-light">
                  <h4 className="text-success">{(vocabularyData.length + Object.keys(mathInsights?.overallPerformance || {}).length + Object.keys(programmingInsights?.overallPerformance || {}).length) / 3 || 0}</h4>
                  <p className="mb-0 text-muted">Avg Active/Subject</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 border rounded bg-light">
                  <h4 className="text-warning">
                    {Math.round((
                      (vocabularyInsights?.weakAreas?.length || 0) +
                      (mathInsights?.conceptualGaps?.length || 0) +
                      (programmingInsights?.conceptualGaps?.length || 0)
                    ) / 3) || 0}
                  </h4>
                  <p className="mb-0 text-muted">Avg Areas Needing Attention</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 border rounded bg-light">
                  <h4 className="text-info">
                    {Math.round((
                      parseFloat(vocabularyMetrics?.engagementScore || 0) +
                      parseFloat(mathMetrics?.overallEngagement || 0) +
                      parseFloat(programmingMetrics?.overallEngagement || 0)
                    ) / 3) || 0}%
                  </h4>
                  <p className="mb-0 text-muted">Overall Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  

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

     
      {/* ADD THIS: Tab Navigation */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs nav-justified">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="bi bi-speedometer2 me-2"></i>📊 Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'english' ? 'active' : ''}`}
                onClick={() => setActiveTab('english')}
              >
                <i className="bi bi-book me-2"></i>📚 English
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'math' ? 'active' : ''}`}
                onClick={() => setActiveTab('math')}
              >
                <i className="bi bi-calculator me-2"></i>🧮 Math
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'programming' ? 'active' : ''}`}
                onClick={() => setActiveTab('programming')}
              >
                <i className="bi bi-code-slash me-2"></i>💻 Programming
              </button>
            </li>
          </ul>
        </div>
      </div>



      {/* Tab Content */}
      {/* English SECTION - ENHANCED */}
      {activeTab === 'overview' && <OverviewTab />}

      {activeTab === 'english' && (
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{border: '1px solid #d4edda'}}>
            <div className="card-header text-dark" style={{backgroundColor: '#d4edda', borderBottom: '1px solid #c3e6cb'}}>
              <h4 className="mb-0">
                <i className="bi bi-book me-2"></i>English Performance
              </h4>
            </div>
            {/* Traditional Table (Enhanced) */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Detailed Student Performance</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Last Activity</th>
                              <th>Topic</th>
                              <th>Questions</th>
                              <th>Accuracy</th>
                              <th>Performance Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vocabularyData.slice(0, showMoreVocab ? vocabularyData.length : 5).map((user, index) => {
                              const progressData = vocabularyInsights.learningProgress.find(p => p.username === user.username);
                              return (
                                <tr key={index}>
                                  <td><strong>{user.username}</strong></td>
                                  <td>{user.lastActivity}</td>
                                  <td>
                                    <span className="badge bg-primary">{user.topic}</span>
                                  </td>
                                  <td>{user.totalQuestions}</td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="progress me-2" style={{width: '60px', height: '8px'}}>
                                        <div 
                                          className={`progress-bar ${user.averagePercentage >= 80 ? 'bg-success' : user.averagePercentage >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                          style={{width: `${user.averagePercentage}%`}}
                                        ></div>
                                      </div>
                                      <span>{user.averagePercentage}%</span>
                                    </div>
                                  </td>
                                  <td>
                                    {progressData ? (
                                      <span className={`badge ${progressData.improvementRate > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                        {progressData.improvementRate > 0 ? '↗️' : '➡️'} 
                                        {progressData.improvementRate.toFixed(1)}%
                                      </span>
                                    ) : (
                                      <span className="text-muted">Need more data</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
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
            <div className="card-body">

              
              {/* CEFR Level Distribution */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">CEFR Level Performance</h5>
                      <small className="text-muted">Common European Framework of Reference</small>
                    </div>
                    <div className="card-body">
                      {Object.entries(vocabularyInsights.cefrLevelDistribution).map(([level, data]) => {
                        const accuracy = ((data.correct / data.total) * 100).toFixed(1);
                        return (
                          <div key={level} className="mb-3">
                            <div className="d-flex justify-content-between">
                              <span><strong>{level}</strong> ({data.total} questions)</span>
                              <span>{accuracy}%</span>
                            </div>
                            <div className="progress" style={{height: '8px'}}>
                              <div 
                                className={`progress-bar ${accuracy >= 80 ? 'bg-success' : accuracy >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                style={{width: `${accuracy}%`}}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Topic Performance */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Topic Performance Overview</h5>
                    </div>
                    <div className="card-body" style={{maxHeight: '400px', overflowY: 'auto'}}>
                      {Object.entries(vocabularyInsights.topicPerformance)
                        .sort(([,a], [,b]) => (b.correct/b.total) - (a.correct/a.total))
                        .map(([topic, data]) => {
                          const accuracy = ((data.correct / data.total) * 100).toFixed(1);
                          return (
                            <div key={topic} className="mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <small><strong>{topic}</strong></small>
                                <div className="d-flex align-items-center">
                                  <span className="badge bg-secondary me-2">{data.users.size} students</span>
                                  <span className="text-muted">{accuracy}%</span>
                                </div>
                              </div>
                              <div className="progress" style={{height: '4px'}}>
                                <div 
                                  className={`progress-bar ${accuracy >= 75 ? 'bg-success' : accuracy >= 50 ? 'bg-warning' : 'bg-danger'}`}
                                  style={{width: `${accuracy}%`}}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weak and Strong Areas */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border-danger">
                    <div className="card-header bg-danger text-white">
                      <h5 className="mb-0">Areas Needing Attention</h5>
                    </div>
                    <div className="card-body">
                    {vocabularyInsights.weakAreas.length === 0 ? (
                      <p className="text-muted">No weak areas identified. Great job!</p>
                    ) : (
                      vocabularyInsights.weakAreas
                        .sort((a, b) => a.accuracy - b.accuracy) // Sort by accuracy (lowest first)
                        .slice(0, 3) // Take only the first 3 (top 3 weakest)
                        .map((area, index) => (
                          <div key={index} className="mb-3 p-3 border-start border-danger border-3">
                            <h6 className="text-danger">{area.topic}</h6>
                            <p className="mb-1">Accuracy: <strong>{area.accuracy}%</strong></p>
                            <p className="mb-0 text-muted">{area.studentsAttempted} students, {area.totalQuestions} questions</p>
                          </div>
                        ))
                    )}
                  </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-success">
                    <div className="card-header bg-success text-white">
                      <h5 className="mb-0">Strong Performance Areas</h5>
                    </div>
                    <div className="card-body">
                      {vocabularyInsights.strongAreas.length === 0 ? (
                        <p className="text-muted">Keep working to identify strong areas!</p>
                      ) : (
                        vocabularyInsights.strongAreas.map((area, index) => (
                          <div key={index} className="mb-3 p-3 border-start border-success border-3">
                            <h6 className="text-success">{area.topic}</h6>
                            <p className="mb-1">Accuracy: <strong>{area.accuracy}%</strong></p>
                            <p className="mb-0 text-muted">{area.studentsAttempted} students, {area.totalQuestions} questions</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}


     {/* Math SECTION - ENHANCED */}
      {activeTab === 'math' && (
            
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{border: '1px solid #bee5eb'}}>
            <div className="card-header text-dark" style={{backgroundColor: '#bee5eb', borderBottom: '1px solid #a6d9e0'}}>
              <h4 className="mb-0">
                <i className="bi bi-calculator me-2"></i>Math Performance
              </h4>
            </div>
            <div className="card-body">
              
              {/* Enhanced Math Analytics Section */}
              {/* Math Performance Metrics Dashboard */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-info text-white">
                      <h5 className="mb-0">Math Learning Metrics Overview</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md">
                          <div className="text-center p-3 border rounded bg-light">
                            <h3 className="text-primary">{mathMetrics?.averageMasteryLevel || 0}%</h3>
                            <p className="mb-0 text-muted">Average Mastery Level</p>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="text-center p-3 border rounded bg-light">
                            <h3 className="text-warning">{mathMetrics?.studentsAtRisk || 0}%</h3>
                            <p className="mb-0 text-muted">Students At Risk</p>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="text-center p-3 border rounded bg-light">
                            <h3 className="text-success">{mathMetrics?.conceptualUnderstanding || 0}%</h3>
                            <p className="mb-0 text-muted">Conceptual Understanding</p>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="text-center p-3 border rounded bg-light">
                            <h3 className="text-info">{mathMetrics?.practiceEfficiency || 0}%</h3>
                            <p className="mb-0 text-muted">Practice Efficiency</p>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="text-center p-3 border rounded bg-light">
                            <h3 className="text-secondary">{mathMetrics?.overallEngagement || 0}%</h3>
                            <p className="mb-0 text-muted">Student Engagement</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Mastery Analysis */}
              <div className="row mb-4">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Topic Mastery Overview</h5>
                    </div>
                    <div className="card-body" style={{maxHeight: '400px', overflowY: 'auto'}}>
                      {mathInsights?.topicMastery && Object.entries(mathInsights.topicMastery).length > 0 ? (
                        Object.entries(mathInsights.topicMastery)
                          .sort(([,a], [,b]) => (b.masteredStudents/b.totalStudents) - (a.masteredStudents/a.totalStudents))
                          .map(([topic, data]) => {
                            const masteryRate = data.totalStudents > 0 ? (data.masteredStudents / data.totalStudents) * 100 : 0;
                            const accuracy = data.questionStats.total > 0 ? (data.questionStats.correct / data.questionStats.total) * 100 : 0;
                            return (
                              <div key={topic} className="mb-3 p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h6 className="mb-0">{topic.charAt(0).toUpperCase() + topic.slice(1)}</h6>
                                  <div className="d-flex gap-2">
                                    <span className="badge bg-primary">{data.masteredStudents}/{data.totalStudents} mastered</span>
                                    <span className="badge bg-secondary">{accuracy.toFixed(1)}% accuracy</span>
                                  </div>
                                </div>
                                <div className="progress mb-2" style={{height: '8px'}}>
                                  <div 
                                    className={`progress-bar ${masteryRate >= 80 ? 'bg-success' : masteryRate >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                    style={{width: `${accuracy}%`}}
                                  ></div>
                                </div>
                                <small className="text-muted">
                                  {masteryRate.toFixed(1)}% mastery rate • {data.questionStats.total} questions attempted
                                </small>
                              </div>
                            );
                          })
                      ) : (
                        <div className="text-center py-4">
                          <i className="bi bi-trophy fs-2 text-muted"></i>
                          <p className="text-muted mt-2 mb-0">No topic mastery data available yet.</p>
                          <small className="text-muted">Data will appear once students complete algebra assessments.</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Difficulty Analysis - SAFE VERSION */}
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Performance by Difficulty</h5>
                    </div>
                    <div className="card-body">
                      {Array.isArray(mathInsights?.difficultyAnalysis) && mathInsights.difficultyAnalysis.length > 0 ? (
                        mathInsights.difficultyAnalysis.map((diff, index) => (
                          <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold text-capitalize">{diff.level}</span>
                              <span>{diff.accuracy ? diff.accuracy.toFixed(1) : 0}%</span>
                            </div>
                            <div className="progress mb-1" style={{height: '10px'}}>
                              <div 
                                className={`progress-bar ${
                                  diff.level === 'easy' ? 'bg-success' : 
                                  diff.level === 'medium' ? 'bg-warning' : 'bg-danger'
                                }`}
                                style={{width: `${diff.accuracy || 0}%`}}
                              ></div>
                            </div>
                            <small className="text-muted">{diff.correctAnswers || 0}/{diff.totalQuestions || 0} correct</small>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <i className="bi bi-bar-chart fs-2 text-muted"></i>
                          <p className="text-muted mt-2 mb-0">No difficulty analysis data available yet.</p>
                          <small className="text-muted">Data will appear once students complete assessments.</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Areas Needing Attention & Strengths - SAFE VERSION */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border-warning">
                    <div className="card-header bg-warning text-dark">
                      <h5 className="mb-0">⚠️ Conceptual Gaps Identified</h5>
                    </div>
                    <div className="card-body">
                      {Array.isArray(mathInsights?.conceptualGaps) ? (
                        mathInsights.conceptualGaps.length === 0 ? (
                          <div className="text-center py-3">
                            <i className="bi bi-check-circle fs-2 text-success"></i>
                            <p className="text-muted mt-2 mb-0">No significant conceptual gaps identified.</p>
                            <small className="text-success">Excellent progress!</small>
                          </div>
                        ) : (
                          mathInsights.conceptualGaps
                            .sort((a, b) => a.severity === 'critical' ? -1 : 1)
                            .map((gap, index) => (
                              <div key={index} className={`alert alert-${gap.severity === 'critical' ? 'danger' : gap.severity === 'moderate' ? 'warning' : 'info'} mb-3`}>
                                <h6 className="alert-heading">{gap.topic}</h6>
                                <div className="row">
                                  <div className="col-6">
                                    <small><strong>Mastery Rate:</strong> {gap.masteryRate || 0}%</small>
                                  </div>
                                  <div className="col-6">
                                    <small><strong>Accuracy:</strong> {gap.accuracy || 0}%</small>
                                  </div>
                                </div>
                                <small className="text-muted">
                                  {gap.studentsStrugglingCount || 0} of {gap.totalStudents || 0} students need support
                                </small>
                              </div>
                            ))
                        )
                      ) : (
                        <div className="text-center py-3">
                          <i className="bi bi-hourglass-split fs-2 text-muted"></i>
                          <p className="text-muted mt-2 mb-0">Loading gap analysis...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-success">
                    <div className="card-header bg-success text-white">
                      <h5 className="mb-0">💪 Strength Areas</h5>
                    </div>
                    <div className="card-body">
                      {Array.isArray(mathInsights?.strengthAreas) ? (
                        mathInsights.strengthAreas.length === 0 ? (
                          <div className="text-center py-3">
                            <i className="bi bi-arrow-up fs-2 text-muted"></i>
                            <p className="text-muted mt-2 mb-0">Continue building strengths across all topics.</p>
                            <small className="text-muted">Strength areas will appear as students improve.</small>
                          </div>
                        ) : (
                          mathInsights.strengthAreas.map((strength, index) => (
                            <div key={index} className="alert alert-success mb-3">
                              <h6 className="alert-heading">{strength.topic}</h6>
                              <div className="row">
                                <div className="col-6">
                                  <small><strong>Mastery Rate:</strong> {strength.masteryRate || 0}%</small>
                                </div>
                                <div className="col-6">
                                  <small><strong>Accuracy:</strong> {strength.accuracy || 0}%</small>
                                </div>
                              </div>
                              <small className="text-muted">
                                {strength.masteredStudents || 0} of {strength.totalStudents || 0} students have mastered this topic
                              </small>
                            </div>
                          ))
                        )
                      ) : (
                        <div className="text-center py-3">
                          <i className="bi bi-hourglass-split fs-2 text-muted"></i>
                          <p className="text-muted mt-2 mb-0">Loading strength analysis...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Student Performance Analysis - SAFE VERSION */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Individual Student Analysis</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Overall Accuracy</th>
                              <th>Learning Trend</th>
                              <th>Time Efficiency</th>
                              <th>Weak Areas</th>
                              <th>Recommendation</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mathInsights?.overallPerformance && Object.keys(mathInsights.overallPerformance).length > 0 ? (
                              Object.entries(mathInsights.overallPerformance).map(([email, perf]) => (
                                <tr key={email}>
                                  <td><strong>{perf.username || 'Unknown'}</strong></td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="progress me-2" style={{width: '60px', height: '8px'}}>
                                        <div 
                                          className={`progress-bar ${(perf.overallAccuracy || 0) >= 80 ? 'bg-success' : (perf.overallAccuracy || 0) >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                          style={{width: `${perf.overallAccuracy || 0}%`}}
                                        ></div>
                                      </div>
                                      <span>{(perf.overallAccuracy || 0).toFixed(1)}%</span>
                                    </div>
                                  </td>
                                  <td>
                                    <span className={`badge ${
                                      perf.improvementTrend === 'strong_improvement' ? 'bg-success' :
                                      perf.improvementTrend === 'moderate_improvement' ? 'bg-info' :
                                      perf.improvementTrend === 'stable' ? 'bg-secondary' :
                                      perf.improvementTrend === 'declining' ? 'bg-danger' : 'bg-warning'
                                    }`}>
                                      {perf.improvementTrend === 'strong_improvement' ? '📈 Excellent' :
                                      perf.improvementTrend === 'moderate_improvement' ? '📊 Good' :
                                      perf.improvementTrend === 'stable' ? '➡️ Stable' :
                                      perf.improvementTrend === 'declining' ? '📉 Declining' : '❓ Need Data'}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="text-muted">{(perf.avgTimePerQuestion || 0).toFixed(1)}s/q</span>
                                  </td>
                                  <td>
                                    {Array.isArray(perf.weaknessAreas) && perf.weaknessAreas.length > 0 ? (
                                      <div>
                                        {perf.weaknessAreas.slice(0, 2).map((weak, i) => (
                                          <span key={i} className="badge bg-warning me-1">{weak}</span>
                                        ))}
                                        {perf.weaknessAreas.length > 2 && <span className="text-muted">+{perf.weaknessAreas.length - 2} more</span>}
                                      </div>
                                    ) : (
                                      <span className="text-success">No major weaknesses</span>
                                    )}
                                  </td>
                                  <td>
                                    <small className="text-muted">
                                      {(perf.overallAccuracy || 0) < 60 ? 'Focus on fundamentals' :
                                      perf.improvementTrend === 'declining' ? 'Needs intervention' :
                                      (perf.overallAccuracy || 0) >= 85 ? 'Ready for advanced topics' :
                                      'Continue current pace'}
                                    </small>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center py-4">
                                  <i className="bi bi-person-plus fs-2 text-muted"></i>
                                  <p className="text-muted mt-2 mb-0">No student performance data available yet.</p>
                                  <small className="text-muted">Data will appear once students complete math assessments.</small>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            
              {/* Enhanced Pre-Post Diagnostic Analysis */}
              {enhancedDiagnosticInsights?.prePostComparison && enhancedDiagnosticInsights.prePostComparison.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header bg-primary text-white">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            <i className="bi bi-graph-up me-2"></i>
                            Pre-Post Diagnostic Analysis
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
                            
                            <div className="mt-4">
                              <EnhancedPrePostDiagnosticTable 
                                comparisonData={enhancedDiagnosticInsights.prePostComparison} 
                              />
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-muted">No diagnostic comparison data available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Common Misconceptions - SAFE VERSION */}
              {Array.isArray(enhancedDiagnosticInsights?.conceptualMisconceptions) && enhancedDiagnosticInsights.conceptualMisconceptions.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card border-warning">
                      <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">🧠 Common Misconceptions Identified</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          {enhancedDiagnosticInsights.conceptualMisconceptions
                            .sort((a, b) => b.frequency - a.frequency)
                            .slice(0, 6)
                            .map((misconception, index) => (
                              <div key={index} className="col-md-6 mb-3">
                                <div className="card border-warning h-100">
                                  <div className="card-body">
                                    <h6 className="card-title text-warning">{misconception.topic}</h6>
                                    <p className="card-text">{misconception.misconception}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="badge bg-warning">{misconception.frequency} occurrences</span>
                                      <small className="text-muted">{misconception.students ? misconception.students.size : 0} students affected</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Intervention Recommendations - SAFE VERSION */}
              
                {enhancedDiagnosticInsights?.interventionRecommendations && enhancedDiagnosticInsights.interventionRecommendations.length > 0 && (
                  <EnhancedInterventionRecommendations interventionData={enhancedDiagnosticInsights.interventionRecommendations} />
                )}
              {/* EXISTING ORIGINAL SECTIONS - Updated and preserved */}        
            </div>
          </div>
        </div>
      </div>
            )}



       {/* PROGRAMMING SECTION - ENHANCED */}
      {activeTab === 'programming' && (
       
        <div className="row mb-4">
          <div className="col-12">
           <div className="card shadow-sm" style={{border: '1px solid #fdeaa7'}}>
             <div className="card-header text-dark" style={{backgroundColor: '#fdeaa7', borderBottom: '1px solid #fce38a'}}>
                <h4 className="mb-0">
                  <i className="bi bi-code-slash me-2"></i>Programming Performance
                </h4>
              </div>
              <div className="card-body">
                
                {/* Programming Performance Metrics Dashboard */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">Programming Learning Metrics Overview</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md">
                            <div className="text-center p-3 border rounded bg-light">
                              <h3 className="text-primary">{programmingMetrics?.averageCompletionRate || 0}%</h3>
                              <p className="mb-0 text-muted">Average Completion Rate</p>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="text-center p-3 border rounded bg-light">
                              <h3 className="text-warning">{programmingMetrics?.studentsAtRisk || 0}%</h3>
                              <p className="mb-0 text-muted">Students At Risk</p>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="text-center p-3 border rounded bg-light">
                              <h3 className="text-success">{programmingMetrics?.conceptualUnderstanding || 0}%</h3>
                              <p className="mb-0 text-muted">Conceptual Understanding</p>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="text-center p-3 border rounded bg-light">
                              <h3 className="text-info">{programmingMetrics?.codeEfficiency || 0}%</h3>
                              <p className="mb-0 text-muted">Code Efficiency</p>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="text-center p-3 border rounded bg-light">
                              <h3 className="text-secondary">{programmingMetrics?.overallEngagement || 0}%</h3>
                              <p className="mb-0 text-muted">Student Engagement</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topic Mastery Analysis */}
                <div className="row mb-4">
                  <div className="">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Programming Topic Mastery Overview</h5>
                      </div>
                      <div className="card-body" style={{maxHeight: '400px', overflowY: 'auto'}}>
                        {programmingInsights?.topicMastery && Object.entries(programmingInsights.topicMastery).length > 0 ? (
                          Object.entries(programmingInsights.topicMastery)
                            .sort(([,a], [,b]) => (b.masteredStudents/b.totalStudents) - (a.masteredStudents/a.totalStudents))
                            .map(([topic, data]) => {
                              const masteryRate = data.totalStudents > 0 ? (data.masteredStudents / data.totalStudents) * 100 : 0;
                              return (
                                <div key={topic} className="mb-3 p-3 border rounded">
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">
                                      {topic.charAt(0).toUpperCase() + topic.slice(1).replace('_', ' ')}
                                      <span className={`badge ms-2 ${data.type === 'computational_thinking' ? 'bg-info' : 'bg-success'}`}>
                                        {data.type === 'computational_thinking' ? 'CT' : 'Python'}
                                      </span>
                                    </h6>
                                    <div className="d-flex gap-2">
                                      <span className="badge bg-primary">{data.masteredStudents}/{data.totalStudents} mastered</span>
                                      <span className="badge bg-secondary">{data.averageAccuracy.toFixed(1)}% avg accuracy</span>
                                    </div>
                                  </div>
                                  <div className="progress mb-2" style={{height: '8px'}}>
                                    <div 
                                      className={`progress-bar ${masteryRate >= 80 ? 'bg-success' : masteryRate >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                      style={{width: `${Math.max(masteryRate, 2)}%`}}
                                    ></div>
                                  </div>
                                  <small className="text-muted">
                                    {masteryRate.toFixed(1)}% mastery rate
                                  </small>
                                </div>
                              );
                            })
                        ) : (
                          <div className="text-center py-4">
                            <i className="bi bi-trophy fs-2 text-muted"></i>
                            <p className="text-muted mt-2 mb-0">No programming mastery data available yet.</p>
                            <small className="text-muted">Data will appear once students complete programming assessments.</small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Programming Gaps and Strengths */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="card border-warning">
                      <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">⚠️ Programming Gaps Identified</h5>
                      </div>
                      <div className="card-body">
                        {Array.isArray(programmingInsights?.conceptualGaps) ? (
                          programmingInsights.conceptualGaps.length === 0 ? (
                            <div className="text-center py-3">
                              <i className="bi bi-check-circle fs-2 text-success"></i>
                              <p className="text-muted mt-2 mb-0">No significant programming gaps identified.</p>
                              <small className="text-success">Excellent progress!</small>
                            </div>
                          ) : (
                            programmingInsights.conceptualGaps
                              .sort((a, b) => a.severity === 'critical' ? -1 : 1)
                              .slice(0, 3)
                              .map((gap, index) => (
                                <div key={index} className={`alert alert-${gap.severity === 'critical' ? 'danger' : gap.severity === 'moderate' ? 'warning' : 'info'} mb-3`}>
                                  <h6 className="alert-heading">
                                    {gap.topic}
                                    <span className={`badge ms-2 ${gap.type === 'computational_thinking' ? 'bg-info' : 'bg-success'}`}>
                                      {gap.type === 'computational_thinking' ? 'CT' : 'Python'}
                                    </span>
                                  </h6>
                                  <div className="row">
                                    <div className="col-6">
                                      <small><strong>Mastery Rate:</strong> {gap.masteryRate || 0}%</small>
                                    </div>
                                    <div className="col-6">
                                      <small><strong>Accuracy:</strong> {gap.accuracy || 0}%</small>
                                    </div>
                                  </div>
                                  <small className="text-muted">
                                    {gap.studentsStrugglingCount || 0} of {gap.totalStudents || 0} students need support
                                  </small>
                                  {gap.recommendations && (
                                    <div className="mt-2">
                                      <small><strong>Recommendations:</strong></small>
                                      <ul className="small mb-0 mt-1">
                                        {gap.recommendations.slice(0, 2).map((rec, i) => (
                                          <li key={i}>{rec}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))
                          )
                        ) : (
                          <div className="text-center py-3">
                            <i className="bi bi-hourglass-split fs-2 text-muted"></i>
                            <p className="text-muted mt-2 mb-0">Loading gap analysis...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-success">
                      <div className="card-header bg-success text-white">
                        <h5 className="mb-0">💪 Programming Strengths</h5>
                      </div>
                      <div className="card-body">
                        {Array.isArray(programmingInsights?.strengthAreas) ? (
                          programmingInsights.strengthAreas.length === 0 ? (
                            <div className="text-center py-3">
                              <i className="bi bi-arrow-up fs-2 text-muted"></i>
                              <p className="text-muted mt-2 mb-0">Continue building programming strengths.</p>
                              <small className="text-muted">Strength areas will appear as students improve.</small>
                            </div>
                          ) : (
                            programmingInsights.strengthAreas.map((strength, index) => (
                              <div key={index} className="alert alert-success mb-3">
                                <h6 className="alert-heading">
                                  {strength.topic}
                                  <span className={`badge ms-2 ${strength.type === 'computational_thinking' ? 'bg-info' : 'bg-success'}`}>
                                    {strength.type === 'computational_thinking' ? 'CT' : 'Python'}
                                  </span>
                                </h6>
                                <div className="row">
                                  <div className="col-6">
                                    <small><strong>Mastery Rate:</strong> {strength.masteryRate || 0}%</small>
                                  </div>
                                  <div className="col-6">
                                    <small><strong>Accuracy:</strong> {strength.accuracy || 0}%</small>
                                  </div>
                                </div>
                                <small className="text-muted">
                                  {strength.masteredStudents || 0} of {strength.totalStudents || 0} students have mastered this topic
                                </small>
                              </div>
                            ))
                          )
                        ) : (
                          <div className="text-center py-3">
                            <i className="bi bi-hourglass-split fs-2 text-muted"></i>
                            <p className="text-muted mt-2 mb-0">Loading strength analysis...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Student Programming Analysis */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Individual Student Programming Analysis</h5>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Student</th>
                                <th>CT Accuracy</th>
                                <th>Python Accuracy</th>
                                <th>Overall Progress</th>
                                <th>Learning Trend</th>
                                <th>Weak Areas</th>
                                <th>Strong Areas</th>
                                <th>Recommendation</th>
                              </tr>
                            </thead>
                            <tbody>
                              {programmingInsights?.overallPerformance && Object.keys(programmingInsights.overallPerformance).length > 0 ? (
                                Object.entries(programmingInsights.overallPerformance).map(([email, perf]) => (
                                  <tr key={email}>
                                    <td><strong>{perf.username || 'Unknown'}</strong></td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="progress me-2" style={{width: '50px', height: '6px'}}>
                                          <div 
                                            className={`progress-bar ${(perf.ctAccuracy || 0) >= 80 ? 'bg-success' : (perf.ctAccuracy || 0) >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                            style={{width: `${perf.ctAccuracy || 0}%`}}
                                          ></div>
                                        </div>
                                        <span className="small">{(perf.ctAccuracy || 0).toFixed(1)}%</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="progress me-2" style={{width: '50px', height: '6px'}}>
                                          <div 
                                            className={`progress-bar ${(perf.pythonAccuracy || 0) >= 80 ? 'bg-success' : (perf.pythonAccuracy || 0) >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                            style={{width: `${perf.pythonAccuracy || 0}%`}}
                                          ></div>
                                        </div>
                                        <span className="small">{(perf.pythonAccuracy || 0).toFixed(1)}%</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="progress me-2" style={{width: '50px', height: '6px'}}>
                                          <div 
                                            className={`progress-bar ${(perf.overallAccuracy || 0) >= 80 ? 'bg-success' : (perf.overallAccuracy || 0) >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                            style={{width: `${perf.overallAccuracy || 0}%`}}
                                          ></div>
                                        </div>
                                        <span className="small">{(perf.overallAccuracy || 0).toFixed(1)}%</span>
                                      </div>
                                      <small className="text-muted d-block">
                                        CT: {perf.ctProgress || 0} topics, Python: {perf.pythonProgress || 0} topics
                                      </small>
                                    </td>
                                    <td>
                                      <span className={`badge ${
                                        perf.improvementTrend === 'strong_improvement' ? 'bg-success' :
                                        perf.improvementTrend === 'moderate_improvement' ? 'bg-info' :
                                        perf.improvementTrend === 'stable' ? 'bg-secondary' :
                                        perf.improvementTrend === 'declining' ? 'bg-danger' : 'bg-warning'
                                      }`}>
                                        {perf.improvementTrend === 'strong_improvement' ? '📈 Excellent' :
                                        perf.improvementTrend === 'moderate_improvement' ? '📊 Good' :
                                        perf.improvementTrend === 'stable' ? '➡️ Stable' :
                                        perf.improvementTrend === 'declining' ? '📉 Declining' : '❓ Need Data'}
                                      </span>
                                    </td>
                                    <td>
                                      {Array.isArray(perf.weakAreas) && perf.weakAreas.length > 0 ? (
                                        <div>
                                          {perf.weakAreas.slice(0, 2).map((weak, i) => (
                                            <span key={i} className="badge bg-warning me-1 mb-1 small">{weak}</span>
                                          ))}
                                          {perf.weakAreas.length > 2 && <small className="text-muted d-block">+{perf.weakAreas.length - 2} more</small>}
                                        </div>
                                      ) : (
                                        <span className="text-success small">No major weaknesses</span>
                                      )}
                                    </td>
                                    <td>
                                      {Array.isArray(perf.strongAreas) && perf.strongAreas.length > 0 ? (
                                        <div>
                                          {perf.strongAreas.slice(0, 2).map((strong, i) => (
                                            <span key={i} className="badge bg-success me-1 mb-1 small">{strong}</span>
                                          ))}
                                          {perf.strongAreas.length > 2 && <small className="text-muted d-block">+{perf.strongAreas.length - 2} more</small>}
                                        </div>
                                      ) : (
                                        <span className="text-muted small">Building strengths</span>
                                      )}
                                    </td>
                                    <td>
                                      <small className="text-muted">
                                        {(perf.overallAccuracy || 0) < 50 ? 'Needs immediate support' :
                                        perf.improvementTrend === 'declining' ? 'Requires intervention' :
                                        (perf.overallAccuracy || 0) >= 85 ? 'Ready for advanced topics' :
                                        'Continue current pace'}
                                      </small>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="8" className="text-center py-4">
                                    <i className="bi bi-person-plus fs-2 text-muted"></i>
                                    <p className="text-muted mt-2 mb-0">No student programming data available yet.</p>
                                    <small className="text-muted">Data will appear once students complete programming assessments.</small>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Progress Insights */}
                {Array.isArray(programmingInsights?.learningProgress) && programmingInsights.learningProgress.length > 0 && (
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="card border-info">
                        <div className="card-header bg-info text-white">
                          <h5 className="mb-0">📈 Programming Learning Progress Insights</h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            {programmingInsights.learningProgress
                              .sort((a, b) => b.overallAccuracy - a.overallAccuracy)
                              .slice(0, 6)
                              .map((progress, index) => (
                                <div key={index} className="col-md-6 col-lg-4 mb-3">
                                  <div className="card border-info h-100">
                                    <div className="card-body">
                                      <h6 className="card-title">{progress.username}</h6>
                                      <div className="mb-2">
                                        <div className="d-flex justify-content-between">
                                          <small>Overall Progress</small>
                                          <small>{progress.overallAccuracy.toFixed(1)}%</small>
                                        </div>
                                        <div className="progress" style={{height: '6px'}}>
                                          <div 
                                            className={`progress-bar ${progress.overallAccuracy >= 80 ? 'bg-success' : progress.overallAccuracy >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                            style={{width: `${progress.overallAccuracy}%`}}
                                          ></div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6">
                                          <small className="text-muted">CT Topics: {progress.ctProgress}</small>
                                        </div>
                                        <div className="col-6">
                                          <small className="text-muted">Python Topics: {progress.pythonProgress}</small>
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        <span className={`badge ${
                                          progress.trend === 'strong_improvement' ? 'bg-success' :
                                          progress.trend === 'moderate_improvement' ? 'bg-info' :
                                          progress.trend === 'stable' ? 'bg-secondary' : 'bg-warning'
                                        }`}>
                                          {progress.trend.replace('_', ' ')}
                                        </span>
                                      </div>
                                      <small className="text-muted d-block mt-2">{progress.recommendation}</small>
                                    </div>
                                  </div>
                                </div>
                              ))}
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
                                  <th>Analysis</th>
                                </tr>
                              </thead>
                              <tbody>
                                {diagnosticsData.map((user, index) => (
                                  <tr key={index}>
                                    <td><strong>{user.username}</strong></td>
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
                                    <td>
                                      <span className={`badge ${
                                        parseFloat(user.successRate) >= 80 ? 'bg-success' :
                                        parseFloat(user.successRate) >= 60 ? 'bg-warning' :
                                        'bg-danger'
                                      }`}>
                                        {parseFloat(user.successRate) >= 80 ? 'Excellent' :
                                        parseFloat(user.successRate) >= 60 ? 'Good' : 'Needs Support'}
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
      )}
    </div>
  );
};
export default TutorDashboard;
