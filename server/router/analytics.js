const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import all your existing models
let UserProgress;
let MathematicsDiagnosticScore;
let MathScores;
let CTFingerScore;
let EngDiagnosticScore;
let Programming;
let ProgrammingFinger;
let VocabScore;
let ReadingComprehensionScore;
let WritingResponse;

// Load all available models
const models = {};

try {
  UserProgress = require('../model/UserProgress');
  models.UserProgress = UserProgress;
  console.log('✅ UserProgress model loaded');
} catch (error) {
  console.log('⚠️ UserProgress model not found');
}

try {
  MathematicsDiagnosticScore = require('../model/mathematicsDiagnosticScoresSchema');
  models.MathematicsDiagnosticScore = MathematicsDiagnosticScore;
  console.log('✅ MathematicsDiagnosticScore model loaded');
} catch (error) {
  console.log('⚠️ MathematicsDiagnosticScore model not found');
}

try {
  MathScores = require('../model/math-scores.schema');
  models.MathScores = MathScores;
  console.log('✅ MathScores model loaded');
} catch (error) {
  console.log('⚠️ MathScores model not found');
}

try {
  CTFingerScore = require('../model/CT_foundation_score');
  models.CTFingerScore = CTFingerScore;
  console.log('✅ CTFingerScore model loaded');
} catch (error) {
  console.log('⚠️ CTFingerScore model not found');
}

try {
  EngDiagnosticScore = require('../model/eng_diagnostics_scores');
  models.EngDiagnosticScore = EngDiagnosticScore;
  console.log('✅ EngDiagnosticScore model loaded');
} catch (error) {
  console.log('⚠️ EngDiagnosticScore model not found');
}

try {
  Programming = require('../model/programming');
  models.Programming = Programming;
  console.log('✅ Programming model loaded');
} catch (error) {
  console.log('⚠️ Programming model not found');
}

try {
  ProgrammingFinger = require('../model/programming_finger');
  models.ProgrammingFinger = ProgrammingFinger;
  console.log('✅ ProgrammingFinger model loaded');
} catch (error) {
  console.log('⚠️ ProgrammingFinger model not found');
}

try {
  VocabScore = require('../model/vocabScoreSchema');
  models.VocabScore = VocabScore;
  console.log('✅ VocabScore model loaded');
} catch (error) {
  console.log('⚠️ VocabScore model not found');
}

try {
  ReadingComprehensionScore = require('../model/readingcomprehensionscore');
  models.ReadingComprehensionScore = ReadingComprehensionScore;
  console.log('✅ ReadingComprehensionScore model loaded');
} catch (error) {
  console.log('⚠️ ReadingComprehensionScore model not found');
}

try {
  WritingResponse = require('../model/writingSchema');
  models.WritingResponse = WritingResponse.WritingResponse;
  console.log('✅ WritingResponse model loaded');
} catch (error) {
  console.log('⚠️ WritingResponse model not found');
}

// Helper function to get student emails from student IDs
async function getStudentEmails(studentIds) {
  try {
    const User = require('../model/userSchema');
    const students = await User.find({
      _id: { $in: studentIds.map(id => new mongoose.Types.ObjectId(id)) }
    }).select('email username name').lean();
    
    return students.map(student => ({
      id: student._id,
      email: student.email,
      username: student.username || student.name
    }));
  } catch (error) {
    console.error('❌ Error getting student emails:', error);
    return [];
  }
}

// Helper function to calculate date filter
function getDateFilter(timeRange) {
  let dateFilter = {};
  const now = new Date();
  
  switch(timeRange) {
    case 'day':
      dateFilter = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
      break;
    case 'week':
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { $gte: weekAgo };
      break;
    case 'month':
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { $gte: monthAgo };
      break;
    default:
      dateFilter = {}; // All time
  }
  
  return dateFilter;
}

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Analytics endpoint is working!', 
    availableModels: Object.keys(models),
    endpoints: [
      'GET /api/analytics/test',
      'POST /api/analytics/math-progress',
      'POST /api/analytics/math-diagnostic',
      'POST /api/analytics/english-progress',
      'POST /api/analytics/programming-progress',
      'POST /api/analytics/overall-progress',
      'GET /api/analytics/debug-all-data'
    ],
    timestamp: new Date()
  });
});

// Debug endpoint to see all available data
router.get('/debug-all-data/:studentEmail', async (req, res) => {
  try {
    const { studentEmail } = req.params;
    console.log('🔍 Debugging all data for:', studentEmail);
    
    const debugInfo = {};
    
    // Check MathematicsDiagnosticScore
    if (models.MathematicsDiagnosticScore) {
      const mathDiagnostics = await models.MathematicsDiagnosticScore.find({ email: studentEmail }).lean();
      debugInfo.mathDiagnostics = {
        count: mathDiagnostics.length,
        data: mathDiagnostics.map(d => ({
          testType: d.testType,
          testPhase: d.testPhase,
          score: d.totalScore,
          date: d.testDate
        }))
      };
    }
    
    // Check MathScores
    if (models.MathScores) {
      const mathScores = await models.MathScores.find({ email: studentEmail }).lean();
      debugInfo.mathScores = {
        count: mathScores.length,
        data: mathScores.map(s => ({
          username: s.username,
          topics: s.topics.length,
          overallMastery: s.overallMastery
        }))
      };
    }
    
    // Check CTFingerScore
    if (models.CTFingerScore) {
      const ctScores = await models.CTFingerScore.find({ email: studentEmail }).lean();
      debugInfo.ctFingerScores = {
        count: ctScores.length,
        data: ctScores.map(s => ({
          username: s.username,
          quizzes: s.quizzes.length
        }))
      };
    }
    
    // Check EngDiagnosticScore
    if (models.EngDiagnosticScore) {
      const engScores = await models.EngDiagnosticScore.find({ email: studentEmail }).lean();
      debugInfo.englishDiagnostics = {
        count: engScores.length,
        data: engScores.map(s => ({
          username: s.username,
          quizzes: s.quizzes.length
        }))
      };
    }
    
    // Check Programming
    if (models.Programming) {
      const programmingScores = await models.Programming.find({ email: studentEmail }).lean();
      debugInfo.programming = {
        count: programmingScores.length,
        data: programmingScores.map(s => ({
          username: s.username,
          quizzes: s.quizzes.length
        }))
      };
    }
    
    res.json({
      message: 'Debug information for student',
      studentEmail,
      debugInfo,
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('❌ Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mathematics Analytics - Comprehensive
router.post('/math-progress', async (req, res) => {
  try {
    console.log('📊 Math progress endpoint hit');
    const { studentIds, timeRange } = req.body;
    
    if (!studentIds || studentIds.length === 0) {
      return res.json({ fingerExercises: [], totalQuestions: 0, totalCorrect: 0 });
    }

    const students = await getStudentEmails(studentIds);
    const studentEmails = students.map(s => s.email);
    const studentUsernames = students.map(s => s.username);
    
    console.log('📧 Student emails:', studentEmails);
    
    let allMathProgress = [];
    
    // 1. Get data from MathematicsDiagnosticScore
    if (models.MathematicsDiagnosticScore) {
      try {
        const diagnosticData = await models.MathematicsDiagnosticScore.find({
          email: { $in: studentEmails }
        }).lean();
        
        console.log(`🧪 Found ${diagnosticData.length} diagnostic records`);
        
        // Convert diagnostic data to progress format
        diagnosticData.forEach(diagnostic => {
          diagnostic.responses.forEach(response => {
            allMathProgress.push({
              userId: diagnostic.email,
              questionId: response.questionData._id,
              questionType: 'math',
              studentAnswer: response.userAnswer,
              correctAnswer: response.questionData.questionCorrectAnswer,
              isCorrect: response.isCorrect,
              responseTime: response.timeSpent,
              score: response.isCorrect ? 100 : 0,
              topicArea: `${diagnostic.topicArea}-diagnostic-${diagnostic.testPhase}`,
              difficulty: response.questionData.questionDifficulty,
              createdAt: diagnostic.testDate,
              sourceCollection: 'MathematicsDiagnosticScore'
            });
          });
        });
      } catch (error) {
        console.error('❌ Error fetching diagnostic data:', error);
      }
    }
    
    // 2. Get data from MathScores
    if (models.MathScores) {
      try {
        const mathScoreData = await models.MathScores.find({
          $or: [
            { email: { $in: studentEmails } },
            { username: { $in: studentUsernames } }
          ]
        }).lean();
        
        console.log(`📈 Found ${mathScoreData.length} math score records`);
        
        mathScoreData.forEach(mathScore => {
          mathScore.topics.forEach(topic => {
            topic.questions.forEach(question => {
              allMathProgress.push({
                userId: mathScore.email,
                questionId: question.questionId,
                questionType: 'math',
                studentAnswer: question.answer,
                correctAnswer: 'N/A',
                isCorrect: question.correct,
                responseTime: question.timeSpent || 30,
                score: question.correct ? 100 : 0,
                topicArea: question.topicArea,
                difficulty: question.difficultyLevel,
                createdAt: mathScore.lastActive,
                sourceCollection: 'MathScores'
              });
            });
          });
        });
      } catch (error) {
        console.error('❌ Error fetching math scores:', error);
      }
    }
    
    // 3. Get data from CTFingerScore (Computational Thinking)
    if (models.CTFingerScore) {
      try {
        const ctData = await models.CTFingerScore.find({
          email: { $in: studentEmails }
        }).lean();
        
        console.log(`🧠 Found ${ctData.length} CT finger score records`);
        
        ctData.forEach(ctScore => {
          ctScore.quizzes.forEach(quiz => {
            quiz.answers.forEach(answer => {
              allMathProgress.push({
                userId: ctScore.email,
                questionId: new mongoose.Types.ObjectId(),
                questionType: 'math',
                studentAnswer: answer.userAnswer,
                correctAnswer: 'N/A',
                isCorrect: answer.isCorrect,
                responseTime: 45,
                score: answer.isCorrect ? 100 : 0,
                topicArea: `computational-thinking-${quiz.topic}`,
                difficulty: 'medium',
                createdAt: quiz.date,
                sourceCollection: 'CTFingerScore'
              });
            });
          });
        });
      } catch (error) {
        console.error('❌ Error fetching CT data:', error);
      }
    }
    
    // 4. Also check UserProgress as fallback
    if (models.UserProgress) {
      try {
        const objectIds = studentIds.map(id => {
          try {
            return new mongoose.Types.ObjectId(id);
          } catch {
            return null;
          }
        }).filter(id => id !== null);

        const userProgressData = await models.UserProgress.find({
          userId: { $in: objectIds },
          $or: [
            { questionType: 'math' },
            { topicArea: { $regex: /math|algebra|geometry|calculus|arithmetic|trigonometry/i } }
          ]
        }).lean();

        console.log(`📊 Found ${userProgressData.length} UserProgress math records`);
        allMathProgress = [...allMathProgress, ...userProgressData];
      } catch (error) {
        console.error('❌ Error fetching UserProgress:', error);
      }
    }
    
    console.log(`📈 Total math progress entries: ${allMathProgress.length}`);
    
    const response = {
      fingerExercises: allMathProgress,
      totalQuestions: allMathProgress.length,
      totalCorrect: allMathProgress.filter(p => p.isCorrect).length,
      sources: {
        diagnostic: allMathProgress.filter(p => p.sourceCollection === 'MathematicsDiagnosticScore').length,
        mathScores: allMathProgress.filter(p => p.sourceCollection === 'MathScores').length,
        ctFinger: allMathProgress.filter(p => p.sourceCollection === 'CTFingerScore').length,
        userProgress: allMathProgress.filter(p => !p.sourceCollection).length
      }
    };

    res.json(response);

  } catch (error) {
    console.error('❌ Error in math-progress endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch math analytics', 
      message: error.message 
    });
  }
});

// Mathematics Diagnostic Tests
router.post('/math-diagnostic', async (req, res) => {
  try {
    console.log('🧪 Math diagnostic endpoint hit');
    const { studentIds } = req.body;

    if (!studentIds || studentIds.length === 0) {
      return res.json({ preTest: [], postTest: [] });
    }

    const students = await getStudentEmails(studentIds);
    const studentEmails = students.map(s => s.email);
    
    let preTests = [];
    let postTests = [];

    // Get diagnostic data from MathematicsDiagnosticScore
    if (models.MathematicsDiagnosticScore) {
      try {
        const diagnosticData = await models.MathematicsDiagnosticScore.find({
          email: { $in: studentEmails }
        }).lean();

        console.log(`🧪 Found ${diagnosticData.length} diagnostic records`);

        diagnosticData.forEach(diagnostic => {
          const progressEntry = {
            userId: diagnostic.email,
            testType: diagnostic.testType,
            testPhase: diagnostic.testPhase,
            topicArea: diagnostic.topicArea,
            totalScore: diagnostic.totalScore,
            totalQuestions: diagnostic.totalQuestions,
            totalCorrect: diagnostic.totalCorrect,
            testDate: diagnostic.testDate,
            responses: diagnostic.responses,
            sourceCollection: 'MathematicsDiagnosticScore'
          };

          if (diagnostic.testPhase === 'pre') {
            preTests.push(progressEntry);
          } else if (diagnostic.testPhase === 'post') {
            postTests.push(progressEntry);
          }
        });
      } catch (error) {
        console.error('❌ Error fetching diagnostic data:', error);
      }
    }

    console.log(`✅ Diagnostic results: ${preTests.length} pre-tests, ${postTests.length} post-tests`);

    res.json({
      preTest: preTests,
      postTest: postTests
    });

  } catch (error) {
    console.error('❌ Error in math-diagnostic endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch math diagnostic data', 
      message: error.message 
    });
  }
});

// English Analytics
router.post('/english-progress', async (req, res) => {
  try {
    console.log('📚 English progress endpoint hit');
    const { studentIds, timeRange } = req.body;

    if (!studentIds || studentIds.length === 0) {
      return res.json({ preTest: [], postTest: [], progress: [] });
    }

    const students = await getStudentEmails(studentIds);
    const studentEmails = students.map(s => s.email);
    
    let allEnglishProgress = [];
    let preTests = [];
    let postTests = [];

    // 1. Get data from EngDiagnosticScore
    if (models.EngDiagnosticScore) {
      try {
        const engData = await models.EngDiagnosticScore.find({
          email: { $in: studentEmails }
        }).lean();

        console.log(`📝 Found ${engData.length} English diagnostic records`);

        engData.forEach(engScore => {
          engScore.quizzes.forEach(quiz => {
            const progressEntry = {
              userId: engScore.email,
              testType: quiz.diagnosticType,
              score: quiz.score,
              totalQuestions: quiz.totalQuestions,
              date: quiz.date,
              subtopicScores: quiz.subtopicScores,
              sourceCollection: 'EngDiagnosticScore'
            };

            allEnglishProgress.push(progressEntry);

            if (quiz.diagnosticType === 'pre') {
              preTests.push(progressEntry);
            } else if (quiz.diagnosticType === 'post') {
              postTests.push(progressEntry);
            }
          });
        });
      } catch (error) {
        console.error('❌ Error fetching English diagnostic data:', error);
      }
    }

    // 2. Get data from VocabScore
    if (models.VocabScore) {
      try {
        const vocabData = await models.VocabScore.find({
          email: { $in: studentEmails }
        }).lean();

        console.log(`📖 Found ${vocabData.length} vocabulary records`);

        vocabData.forEach(vocabScore => {
          vocabScore.assessments.forEach(assessment => {
            assessment.questions.forEach(question => {
              allEnglishProgress.push({
                userId: vocabScore.email,
                questionId: question.question_id,
                questionType: 'english',
                studentAnswer: question.user_response,
                correctAnswer: question.correct_option,
                isCorrect: question.is_correct,
                score: question.points_awarded,
                topicArea: `vocabulary-${question.topic}`,
                difficulty: question.difficulty_level,
                createdAt: assessment.date,
                sourceCollection: 'VocabScore'
              });
            });
          });
        });
      } catch (error) {
        console.error('❌ Error fetching vocabulary data:', error);
      }
    }

    // 3. Get data from ReadingComprehensionScore
    if (models.ReadingComprehensionScore) {
      try {
        const rcData = await models.ReadingComprehensionScore.find({
          email: { $in: studentEmails }
        }).lean();

        console.log(`📚 Found ${rcData.length} reading comprehension records`);

        rcData.forEach(rcScore => {
          if (rcScore.topics) {
            Object.entries(rcScore.topics).forEach(([topicName, topicData]) => {
              topicData.solvedPassages.forEach(passage => {
                allEnglishProgress.push({
                  userId: rcScore.email,
                  questionType: 'english',
                  topicArea: `reading-${topicName}`,
                  score: passage.score,
                  passageName: passage.passageName,
                  createdAt: passage.timestamp,
                  sourceCollection: 'ReadingComprehensionScore'
                });
              });
            });
          }
        });
      } catch (error) {
        console.error('❌ Error fetching reading comprehension data:', error);
      }
    }

    console.log(`📚 Total English progress entries: ${allEnglishProgress.length}`);

    res.json({
      preTest: preTests,
      postTest: postTests,
      progress: allEnglishProgress
    });

  } catch (error) {
    console.error('❌ Error in english-progress endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch English analytics', 
      message: error.message 
    });
  }
});

// Programming Analytics
router.post('/programming-progress', async (req, res) => {
  try {
    console.log('💻 Programming progress endpoint hit');
    const { studentIds, timeRange } = req.body;

    if (!studentIds || studentIds.length === 0) {
      return res.json({ fingerExercises: [], totalQuestions: 0, totalCorrect: 0 });
    }

    const students = await getStudentEmails(studentIds);
    const studentEmails = students.map(s => s.email);
    const studentUsernames = students.map(s => s.username);
    
    let allProgrammingProgress = [];

    // 1. Get data from Programming collection
    if (models.Programming) {
      try {
        const programmingData = await models.Programming.find({
          $or: [
            { email: { $in: studentEmails } },
            { username: { $in: studentUsernames } }
          ]
        }).lean();

        console.log(`💻 Found ${programmingData.length} programming records`);

        programmingData.forEach(progData => {
          progData.quizzes.forEach(quiz => {
            quiz.submissions.forEach(submission => {
              allProgrammingProgress.push({
                userId: progData.email,
                questionId: submission.questionId,
                questionType: 'programming',
                studentAnswer: submission.user_code,
                isCorrect: submission.test_cases_passed > 0,
                score: (submission.test_cases_passed / 5) * 100, // Assuming 5 test cases
                topicArea: 'programming-general',
                createdAt: quiz.datetime,
                testCasesPassed: submission.test_cases_passed,
                sourceCollection: 'Programming'
              });
            });
          });
        });
      } catch (error) {
        console.error('❌ Error fetching programming data:', error);
      }
    }

    // 2. Get data from ProgrammingFinger collection
    if (models.ProgrammingFinger) {
      try {
        const progFingerData = await models.ProgrammingFinger.find({
          $or: [
            { email: { $in: studentEmails } },
            { username: { $in: studentUsernames } }
          ]
        }).lean();

        console.log(`🖱️ Found ${progFingerData.length} programming finger records`);

        progFingerData.forEach(progFinger => {
          progFinger.topics.forEach(topic => {
            topic.submissions.forEach(submission => {
              allProgrammingProgress.push({
                userId: progFinger.email,
                questionId: submission.questionId,
                questionType: 'programming',
                studentAnswer: submission.userAnswer,
                isCorrect: submission.isCorrect,
                score: submission.isCorrect ? 100 : 0,
                topicArea: `programming-${topic.topicName}`,
                createdAt: submission.timestamp,
                sourceCollection: 'ProgrammingFinger'
              });
            });
          });
        });
      } catch (error) {
        console.error('❌ Error fetching programming finger data:', error);
      }
    }

    console.log(`💻 Total programming progress entries: ${allProgrammingProgress.length}`);

    res.json({
      fingerExercises: allProgrammingProgress,
      totalQuestions: allProgrammingProgress.length,
      totalCorrect: allProgrammingProgress.filter(p => p.isCorrect).length
    });

  } catch (error) {
    console.error('❌ Error in programming-progress endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch programming analytics', 
      message: error.message 
    });
  }
});

// Individual Student Analysis with Pre/Post Comparison
router.post('/student-individual', async (req, res) => {
  try {
    console.log('👤 Individual student analysis endpoint hit');
    const { studentId, timeRange } = req.body;

    if (!studentId) {
      return res.json({
        error: 'Student ID is required',
        progress: {},
        performance: {},
        diagnosticComparison: {}
      });
    }

    const students = await getStudentEmails([studentId]);
    if (students.length === 0) {
      return res.json({
        error: 'Student not found',
        progress: {},
        performance: {},
        diagnosticComparison: {}
      });
    }

    const student = students[0];
    console.log('👤 Analyzing student:', student);

    let diagnosticComparison = {
      math: { preTest: null, postTest: null, improvement: null },
      english: { preTest: null, postTest: null, improvement: null }
    };

    // Math Diagnostic Analysis
    if (models.MathematicsDiagnosticScore) {
      try {
        const mathDiagnostics = await models.MathematicsDiagnosticScore.find({
          email: student.email
        }).sort({ testDate: 1 }).lean();

        console.log(`🧪 Found ${mathDiagnostics.length} math diagnostic records for ${student.email}`);

        const preTests = mathDiagnostics.filter(d => d.testPhase === 'pre');
        const postTests = mathDiagnostics.filter(d => d.testPhase === 'post');

        if (preTests.length > 0) {
          const latestPre = preTests[preTests.length - 1];
          diagnosticComparison.math.preTest = {
            score: latestPre.totalScore,
            totalQuestions: latestPre.totalQuestions,
            totalCorrect: latestPre.totalCorrect,
            testDate: latestPre.testDate,
            testType: latestPre.testType,
            topicArea: latestPre.topicArea,
            timeSpent: latestPre.totalTimeSpent,
            difficultyBreakdown: {
              easy: {
                correct: latestPre.easyQuestions.correct,
                total: latestPre.easyQuestions.total,
                percentage: latestPre.easyQuestions.percentage
              },
              medium: {
                correct: latestPre.mediumQuestions.correct,
                total: latestPre.mediumQuestions.total,
                percentage: latestPre.mediumQuestions.percentage
              },
              hard: {
                correct: latestPre.hardQuestions.correct,
                total: latestPre.hardQuestions.total,
                percentage: latestPre.hardQuestions.percentage
              }
            },
            topicPerformance: latestPre.topicPerformance || []
          };
        }

        if (postTests.length > 0) {
          const latestPost = postTests[postTests.length - 1];
          diagnosticComparison.math.postTest = {
            score: latestPost.totalScore,
            totalQuestions: latestPost.totalQuestions,
            totalCorrect: latestPost.totalCorrect,
            testDate: latestPost.testDate,
            testType: latestPost.testType,
            topicArea: latestPost.topicArea,
            timeSpent: latestPost.totalTimeSpent,
            difficultyBreakdown: {
              easy: {
                correct: latestPost.easyQuestions.correct,
                total: latestPost.easyQuestions.total,
                percentage: latestPost.easyQuestions.percentage
              },
              medium: {
                correct: latestPost.mediumQuestions.correct,
                total: latestPost.mediumQuestions.total,
                percentage: latestPost.mediumQuestions.percentage
              },
              hard: {
                correct: latestPost.hardQuestions.correct,
                total: latestPost.hardQuestions.total,
                percentage: latestPost.hardQuestions.percentage
              }
            },
            topicPerformance: latestPost.topicPerformance || []
          };
        }

        // Calculate improvement
        if (diagnosticComparison.math.preTest && diagnosticComparison.math.postTest) {
          const preScore = diagnosticComparison.math.preTest.score;
          const postScore = diagnosticComparison.math.postTest.score;
          
          diagnosticComparison.math.improvement = {
            scoreImprovement: postScore - preScore,
            percentageImprovement: ((postScore - preScore) / preScore) * 100,
            difficultyImprovements: {
              easy: diagnosticComparison.math.postTest.difficultyBreakdown.easy.percentage - 
                     diagnosticComparison.math.preTest.difficultyBreakdown.easy.percentage,
              medium: diagnosticComparison.math.postTest.difficultyBreakdown.medium.percentage - 
                       diagnosticComparison.math.preTest.difficultyBreakdown.medium.percentage,
              hard: diagnosticComparison.math.postTest.difficultyBreakdown.hard.percentage - 
                     diagnosticComparison.math.preTest.difficultyBreakdown.hard.percentage
            },
            timeImprovement: diagnosticComparison.math.preTest.timeSpent - diagnosticComparison.math.postTest.timeSpent
          };
        }

      } catch (error) {
        console.error('❌ Error analyzing math diagnostics:', error);
      }
    }

    // English Diagnostic Analysis
    if (models.EngDiagnosticScore) {
      try {
        const engDiagnostics = await models.EngDiagnosticScore.find({
          email: student.email
        }).lean();

        console.log(`📝 Found ${engDiagnostics.length} English diagnostic records for ${student.email}`);

        if (engDiagnostics.length > 0) {
          const engData = engDiagnostics[0];
          const preTests = engData.quizzes.filter(q => q.diagnosticType === 'pre');
          const postTests = engData.quizzes.filter(q => q.diagnosticType === 'post');

          if (preTests.length > 0) {
            const latestPre = preTests[preTests.length - 1];
            diagnosticComparison.english.preTest = {
              score: latestPre.score,
              totalQuestions: latestPre.totalQuestions,
              date: latestPre.date,
              subtopicScores: latestPre.subtopicScores || {}
            };
          }

          if (postTests.length > 0) {
            const latestPost = postTests[postTests.length - 1];
            diagnosticComparison.english.postTest = {
              score: latestPost.score,
              totalQuestions: latestPost.totalQuestions,
              date: latestPost.date,
              subtopicScores: latestPost.subtopicScores || {}
            };
          }

          // Calculate English improvement
          if (diagnosticComparison.english.preTest && diagnosticComparison.english.postTest) {
            const preScore = diagnosticComparison.english.preTest.score;
            const postScore = diagnosticComparison.english.postTest.score;
            
            diagnosticComparison.english.improvement = {
              scoreImprovement: postScore - preScore,
              percentageImprovement: ((postScore - preScore) / preScore) * 100,
              subtopicImprovements: {}
            };

            // Calculate subtopic improvements
            const preSubtopics = diagnosticComparison.english.preTest.subtopicScores;
            const postSubtopics = diagnosticComparison.english.postTest.subtopicScores;

            Object.keys(preSubtopics || {}).forEach(subtopic => {
              if (postSubtopics[subtopic] !== undefined) {
                diagnosticComparison.english.improvement.subtopicImprovements[subtopic] = 
                  postSubtopics[subtopic] - preSubtopics[subtopic];
              }
            });
          }
        }

      } catch (error) {
        console.error('❌ Error analyzing English diagnostics:', error);
      }
    }

    // Get overall progress data for the student
    const studentProgress = {
      math: [],
      english: [],
      programming: []
    };

    // Get math progress
    if (models.MathScores) {
      try {
        const mathData = await models.MathScores.find({
          $or: [{ email: student.email }, { username: student.username }]
        }).lean();

        if (mathData.length > 0) {
          mathData[0].topics.forEach(topic => {
            topic.questions.forEach(question => {
              studentProgress.math.push({
                topicArea: question.topicArea,
                isCorrect: question.correct,
                difficulty: question.difficultyLevel,
                timeSpent: question.timeSpent
              });
            });
          });
        }
      } catch (error) {
        console.error('❌ Error fetching student math progress:', error);
      }
    }

    // Calculate performance metrics
    const performance = {
      math: calculateSubjectPerformance(studentProgress.math),
      english: calculateSubjectPerformance(studentProgress.english),
      programming: calculateSubjectPerformance(studentProgress.programming),
      overall: calculateSubjectPerformance([
        ...studentProgress.math,
        ...studentProgress.english,
        ...studentProgress.programming
      ])
    };

    const response = {
      student: {
        id: studentId,
        email: student.email,
        username: student.username
      },
      diagnosticComparison,
      progress: studentProgress,
      performance,
      recommendations: generateDetailedRecommendations(diagnosticComparison, performance),
      timestamp: new Date()
    };

    console.log('✅ Individual student analysis completed');
    res.json(response);

  } catch (error) {
    console.error('❌ Error in student-individual endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch student progress', 
      message: error.message 
    });
  }
});

// Helper function to calculate subject performance
function calculateSubjectPerformance(progressData) {
  if (!progressData || progressData.length === 0) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      averageTime: 0,
      topicBreakdown: {}
    };
  }

  const correctAnswers = progressData.filter(p => p.isCorrect).length;
  const accuracy = Math.round((correctAnswers / progressData.length) * 100);
  const averageTime = Math.round(
    progressData.reduce((sum, p) => sum + (p.timeSpent || p.responseTime || 30), 0) / progressData.length
  );

  // Group by topic
  const topicBreakdown = {};
  progressData.forEach(progress => {
    const topic = progress.topicArea || 'Unknown';
    
    if (!topicBreakdown[topic]) {
      topicBreakdown[topic] = {
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0
      };
    }
    
    topicBreakdown[topic].totalQuestions++;
    if (progress.isCorrect) {
      topicBreakdown[topic].correctAnswers++;
    }
  });

  // Calculate accuracy for each topic
  Object.keys(topicBreakdown).forEach(topic => {
    const stats = topicBreakdown[topic];
    stats.accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
  });

  return {
    totalQuestions: progressData.length,
    correctAnswers,
    accuracy,
    averageTime,
    topicBreakdown
  };
}

// Generate detailed recommendations based on diagnostic comparison
function generateDetailedRecommendations(diagnosticComparison, performance) {
  const recommendations = [];

  // Math recommendations based on pre/post comparison
  if (diagnosticComparison.math.preTest && diagnosticComparison.math.postTest) {
    const mathImprovement = diagnosticComparison.math.improvement;
    
    if (mathImprovement.scoreImprovement > 0) {
      recommendations.push({
        type: 'success',
        subject: 'Mathematics',
        message: `Excellent improvement! Score increased by ${mathImprovement.scoreImprovement} points (${mathImprovement.percentageImprovement.toFixed(1)}%)`,
        action: 'Continue practicing challenging problems to maintain momentum'
      });
    } else if (mathImprovement.scoreImprovement === 0) {
      recommendations.push({
        type: 'warning',
        subject: 'Mathematics',
        message: 'No improvement detected between pre and post tests',
        action: 'Focus on fundamental concepts and seek additional support'
      });
    } else {
      recommendations.push({
        type: 'urgent',
        subject: 'Mathematics',
        message: `Score decreased by ${Math.abs(mathImprovement.scoreImprovement)} points`,
        action: 'Review basic concepts and consider additional tutoring'
      });
    }

    // Difficulty-specific recommendations
    if (mathImprovement.difficultyImprovements.easy < 0) {
      recommendations.push({
        type: 'urgent',
        subject: 'Mathematics - Easy Problems',
        message: 'Performance on easy problems declined',
        action: 'Review fundamental concepts and basic operations'
      });
    }

    if (mathImprovement.difficultyImprovements.hard > 10) {
      recommendations.push({
        type: 'success',
        subject: 'Mathematics - Advanced',
        message: 'Significant improvement on hard problems!',
        action: 'Ready for more advanced challenging material'
      });
    }
  } else if (diagnosticComparison.math.preTest && !diagnosticComparison.math.postTest) {
    recommendations.push({
      type: 'info',
      subject: 'Mathematics',
      message: 'Pre-test completed, post-test pending',
      action: 'Complete the post-diagnostic test to measure improvement'
    });
  }

  // English recommendations
  if (diagnosticComparison.english.preTest && diagnosticComparison.english.postTest) {
    const engImprovement = diagnosticComparison.english.improvement;
    
    if (engImprovement.scoreImprovement > 0) {
      recommendations.push({
        type: 'success',
        subject: 'English',
        message: `Good progress! Score improved by ${engImprovement.scoreImprovement} points`,
        action: 'Continue reading and vocabulary practice'
      });
    }

    // Subtopic specific recommendations
    Object.entries(engImprovement.subtopicImprovements || {}).forEach(([subtopic, improvement]) => {
      if (improvement < 0) {
        recommendations.push({
          type: 'warning',
          subject: `English - ${subtopic}`,
          message: `Needs improvement in ${subtopic}`,
          action: `Focus on ${subtopic} exercises and practice`
        });
      }
    });
  }

  return recommendations;
}
router.post('/overall-progress', async (req, res) => {
  try {
    console.log('📊 Overall progress endpoint hit');
    const { studentIds, timeRange } = req.body;

    if (!studentIds || studentIds.length === 0) {
      return res.json({
        totalQuestions: 0,
        totalCorrect: 0,
        averageAccuracy: 0,
        averageTime: 0,
        uniqueStudents: 0,
        progressByDay: []
      });
    }

    // Get data from all endpoints
    const mathData = await new Promise(resolve => {
      const mockReq = { body: { studentIds, timeRange } };
      const mockRes = {
        json: (data) => resolve(data),
        status: () => mockRes
      };
      router.handle({ method: 'POST', url: '/math-progress' }, mockReq, mockRes);
    });

    const englishData = await new Promise(resolve => {
      const mockReq = { body: { studentIds, timeRange } };
      const mockRes = {
        json: (data) => resolve(data),
        status: () => mockRes
      };
      router.handle({ method: 'POST', url: '/english-progress' }, mockReq, mockRes);
    });

    const programmingData = await new Promise(resolve => {
      const mockReq = { body: { studentIds, timeRange } };
      const mockRes = {
        json: (data) => resolve(data),
        status: () => mockRes
      };
      router.handle({ method: 'POST', url: '/programming-progress' }, mockReq, mockRes);
    });

    const allProgress = [
      ...(mathData.fingerExercises || []),
      ...(englishData.progress || []),
      ...(programmingData.fingerExercises || [])
    ];

    const stats = {
      totalQuestions: allProgress.length,
      totalCorrect: allProgress.filter(p => p.isCorrect).length,
      averageAccuracy: allProgress.length > 0 
        ? Math.round((allProgress.filter(p => p.isCorrect).length / allProgress.length) * 100)
        : 0,
      averageTime: allProgress.length > 0
        ? Math.round(allProgress.reduce((sum, p) => sum + (p.responseTime || 30), 0) / allProgress.length)
        : 0,
      uniqueStudents: [...new Set(allProgress.map(p => p.userId?.toString() || p.userId))].length,
      progressByDay: calculateDailyProgress(allProgress)
    };

    console.log('✅ Overall stats calculated:', stats);
    res.json(stats);

  } catch (error) {
    console.error('❌ Error in overall-progress endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to fetch overall analytics', 
      message: error.message 
    });
  }
});

// Helper function to calculate daily progress
function calculateDailyProgress(progressData) {
  const dailyStats = {};
  
  progressData.forEach(progress => {
    const date = (progress.createdAt || progress.date || new Date()).toISOString().split('T')[0];
    
    if (!dailyStats[date]) {
      dailyStats[date] = {
        totalQuestions: 0,
        correctAnswers: 0,
        uniqueStudents: new Set()
      };
    }
    
    dailyStats[date].totalQuestions++;
    if (progress.isCorrect) {
      dailyStats[date].correctAnswers++;
    }
    dailyStats[date].uniqueStudents.add((progress.userId || progress.email || '').toString());
  });

  return Object.entries(dailyStats).map(([date, stats]) => ({
    date,
    totalQuestions: stats.totalQuestions,
    correctAnswers: stats.correctAnswers,
    accuracy: stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0,
    uniqueStudents: stats.uniqueStudents.size
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
}

module.exports = router;