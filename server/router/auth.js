const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
router.use(cookieParser());
env = require('dotenv').config();
const authenticate = require('../middleware/authenticate');
const VocabQuestion = require('../model/vocabSchema');
const { VocabScore, addOrUpdateAssessment } = require('../model/vocabScoreSchema');
const { Topic, WritingResponse } = require('../model/writingSchema'); 
const FractionQuestion = require('../model/MathData');
const AlgebraQuestion = require('../model/algebraSchema');
const AlgebraScores = require('../model/algebraScoreAdd');
const ArithmeticQuestion = require('../model/arithmetic-questions.schema');
const ArithmeticScore = require('../model/arithmetic-scores.schema');
const ReadingPassages = require('../model/readingPassages');
const RC_Guide = require('../model/readingcomprehensionguide');
const ReadingComprehensionScore = require('../model/readingcomprehensionscore');
const Programming = require('../model/programming');
const ProgrammingFinger = require('../model/programming_finger');
const FingerQuestion = require('../model/programming_finger_questions');
const CTFoundationQuestion = require('../model/CT_foundation_question');
const MathQuestion = require('../model/math-question.schema');
const MathScores = require('../model/math-scores.schema');
const { Types } = mongoose;
const CTFingerScore = require('../model/CT_foundation_score');
const EngDiagnosticQuestion = require('../model/eng_diagnostic');
const EngDiagnosticScore = require('../model/eng_diagnostics_scores');
const Classroom = require('../model/classroom_schema');
const validator = require('validator');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('Hello World from router');
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 2. Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }
    
    // 3. Find user by email (case insensitive to match registration)
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // 4. Verify password - SIMPLIFIED (no double hashing)
    // Compare plain password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.userId = user._id;
    req.session.email = user.email;
    req.session.username = user.name; // or user.username if you have that field
    req.session.name = user.name;
    req.session.role = user.role;
    req.session.classroomCode = user.classroomCode;
    // 5. Generate token - with error handling
    let token;
    try {
      token = await user.generateAuthToken();
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      return res.status(500).json({ error: "Authentication token generation failed" });
    }
    
    // 6. Update login history - with error handling
    try {
      await user.updateLoginHistory();
    } catch (historyError) {
      console.error('Login history update error:', historyError);
      // Don't fail the login for this, just log the error
    }
    
    // 7. Check if tutor has classroom
    let hasClassroom = false;
    let classroomName = null;
    let classroom = null;
   
    if (user.role === 'tutor') {
      if (user.classroomCode) {
        try {
          classroom = await Classroom.findOne({
            joinCode: user.classroomCode
          }).select('name subjects');
          hasClassroom = !!classroom;
          classroomName = classroom?.name;
        } catch (classroomError) {
          console.error('Classroom fetch error:', classroomError);
          // Continue without classroom info
        }
      }
    }
    
    // 8. Prepare response that matches your frontend expectations
    const response = {
      message: 'Login successful',
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      userId: user._id,
      hasClassroom,
      classroomCode: user.classroomCode || null
    };
    
    // Add classroom info for tutors
    if (user.role === 'tutor' && hasClassroom && classroom) {
      response.classroomName = classroomName;
      response.classroom = {
        id: classroom._id,
        name: classroom.name,
        subjects: classroom.subjects
      };
    }
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Signin error:', error);
    
    // Handle specific error types
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid request format" });
    }
    
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

router.get('/students-count', async (req, res) => {
  try {
    // Fetch all users (excluding sensitive fields like password)
    const users = await User.find({}, { password: 0 });

    // Count the total number of users
    const totalUsers = await User.countDocuments();

    // Return both the count and the list of users
    res.status(200).json({ totalUsers, users });
  } catch (err) {
      console.error('Error fetching users and count:', err);
      res.status(500).json({ error: 'Server error, failed to fetch users' });
  }
});


// Endpoint to fetch login history for a specific user by email
router.get('/login-history', async (req, res) => {
  const { email } = req.query; // Expect email as a query parameter

  try {
    // Check if the email parameter is provided
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the login history
    const loginHistory = user.loginHistory || [];

    // Return the login history
    res.status(200).json({ email: user.email, loginHistory });
  } catch (error) {
    console.error('Error fetching login history:', error);
    res.status(500).json({ message: 'Server error, failed to fetch login history'});
  }
});

// Endpoint to get session data
router.get('/session-info', (req, res) => {
  if (req.session.userId) {
      return res.status(200).json({
          authenticated: true,
          email: req.session.email,
          username: req.session.username,
          userid: req.session.userId
      });
  } else {
      return res.status(200).json({ 
          authenticated: false 
      });
  }
});

router.post('/reset-password/check-email', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Email found, proceed to reset password' });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/reset-password/set-new-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all topics
router.get('/gre_writing_topics', async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to save writing response
router.post('/gre_writing_response', async (req, res) => {
  const { username, email, topic_id, topic_text, time, response_text } = req.body;

  if (!username || !email || !topic_id || !topic_text || !time || !response_text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find existing entry for the user by email
    let userResponse = await WritingResponse.findOne({ email });

    if (userResponse) {
      // Add new response to the existing user's responses array
      userResponse.responses.push({
        topic_id,
        topic_text,
        response_text,
        time,
        date_submitted: new Date()
      });
    } else {
      // Create a new entry for the user
      userResponse = new WritingResponse({
        username,
        email,
        responses: [{
          topic_id,
          topic_text,
          response_text,
          time,
          date_submitted: new Date()
        }]
      });
    }

    // Save the document
    await userResponse.save();
    res.status(200).json({ message: 'Response saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to check for the JWT token
router.get('/check-auth', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ 
            authenticated: true,
            user: {
                id: req.session.userId,
                email: req.session.email,
                name: req.session.name || req.session.username,
                role: req.session.role,                    
                classroomCode: req.session.classroomCode,    
                hasClassroom: !!req.session.classroomCode
            }
        });
    } else {
        res.status(200).json({ authenticated: false });
    }
});

// Get questions by operation type (GET)
router.get('/arithmeticQuestionsDatabase', async (req, res) => {
  try {
    const questions = await ArithmeticQuestion.find({
        operationType: req.query.operationType
    }).select('questionText options correctOption explanation difficultyLevel arithmeticCategory coreSkills commonErrors foundationalRequirements gradeLevel');
    
    res.json({ questions });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


// Store arithmetic score
router.post('/arithmetic-scores', async (req, res) => {
  try {
    const scoreData = {
        userEmail: req.body.userEmail,
        username: req.body.username,
        operationType: req.body.operationType,
        $inc: {
            totalQuestions: req.body.totalQuestions,
            correctAnswers: req.body.correctAnswers
        },
        $push: {
            questionsAttempted: {
                $each: req.body.questionsAttempted
            }
        },
        timeTaken: req.body.timeTaken,
        $setOnInsert: {
            weaknesses: [],
            createdAt: new Date()
        }
    };

    const updatedScore = await ArithmeticScore.findOneAndUpdate(
        { 
            userEmail: req.body.userEmail,
            operationType: req.body.operationType 
        },
        scoreData,
        { 
            upsert: true,
            new: true,
            setDefaultsOnInsert: true 
        }
    );

    res.status(200).json(updatedScore);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Get scores for user and operation type
router.get('/arithmetic-scores', async (req, res) => {
  try {
    const scores = await ArithmeticScore.findOne({
        userEmail: req.query.userEmail,
        operationType: req.query.operationType
    }).populate({
        path: 'questionsAttempted.questionId',
        select: 'questionText options correctOption explanation'
    });

    res.json(scores || {
        questionsAttempted: [],
        totalQuestions: 0,
        correctAnswers: 0,
        timeTaken: 0
    });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


router.get('/dashboard', async (req, res) => {
  try {
      console.log('Inside /dashboard route');
      console.log('User Data:', req.rootUser);

      // ✅ Update login history when the dashboard is accessed
      await req.rootUser.updateLoginHistory();

      res.json({
          name: req.rootUser.name,
          email: req.rootUser.email,
          token: req.token
      });

  } catch (error) {
      console.error('Error in dashboard route:', error);
      res.status(500).json({ error: 'Server error, failed to load dashboard' });
  }
});


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('sessionId', {
            path: '/',
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Route to get all algebra questions
router.get('/algebra_questions', async (req, res) => {
  const { topic, difficultyLevel } = req.query;

  try {
    let questions;

    if (topic) {
      if (difficultyLevel) {
        // Fetch questions for the specific topic and difficulty level
        questions = await AlgebraQuestion.find({ topic: topic, difficultyLevel: difficultyLevel });
      } else {
        // Fetch questions for the specific topic only
        questions = await AlgebraQuestion.find({ topic: topic });
      }
    } else {
      // Fetch all questions if no topic is provided
      questions = await AlgebraQuestion.find({});
    }

    return res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while fetching algebra questions' });
  }
});

// Store algebra quiz attempt
router.post('/algebra_score_add', async (req, res) => {
  const { username, email, topic, questionId, answer, correct, difficultyLevel, current_level } = req.body;

  try {
    // Find user by username and email
    let userScore = await AlgebraScores.findOne({ username, email });

    if (!userScore) {
      // If user doesn't exist, create a new entry with default level
      userScore = new AlgebraScores({
        username,
        email,
        topics: [{
          topic,
          answeredQuestions: [questionId],
          current_level,  // Ensure current_level is saved here
          questions: [{ questionId, answer, correct, difficultyLevel }]
         
        }]
      });
    } else {
      // Find the topic index
      let topicIndex = userScore.topics.findIndex(t => t.topic === topic);

      if (topicIndex === -1) {
        // If topic doesn't exist, create a new topic entry with current_level
        userScore.topics.push({
          topic,
          answeredQuestions: [questionId],
          current_level,  // Ensure current_level is saved here
          questions: [{ questionId, answer, correct, difficultyLevel }]
          
        });
      } else {
        // Add the new question to the existing topic
        userScore.topics[topicIndex].questions.push({ questionId, answer, correct, difficultyLevel });

        // Add the question ID to the answeredQuestions array if not already present
        if (!userScore.topics[topicIndex].answeredQuestions.includes(questionId)) {
          userScore.topics[topicIndex].answeredQuestions.push(questionId);
        }

        // Update the current_level in the existing topic
        userScore.topics[topicIndex].current_level = current_level;
      }
    }

    // Save the updated userScore to the database
    await userScore.save();

    // Return the updated user score as a response
    return res.status(200).json(userScore);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while storing quiz attempt' });
  }
});

router.get('/algebra_scores', async (req, res) => {
  try {
    const { email, topic } = req.query;

    // Step 1: Fetch all data
    let userScores = await AlgebraScores.find().exec();

    // Step 2: Filter by email if provided
    if (email) {
      userScores = userScores.filter(userScore => userScore.email === email);
    }

    // Step 3: Filter by topic if provided
    if (topic) {
      userScores = userScores.map(userScore => {
        return {
          ...userScore.toObject(),
          topics: userScore.topics.filter(t => t.topic === topic)
        };
      }).filter(userScore => userScore.topics.length > 0);
    }

    // Step 4: Return response based on the presence of filtered data
    if (userScores.length === 0) {
      return res.json({});
    }

    // Step 5: Return the filtered data or all data if no filters applied
    res.json(userScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/eng_diagnostic_questions', async (req, res) => {
  const { topic } = req.query;
  const filter = topic ? { topic } : {};

  try {
    const questions = await EngDiagnosticQuestion.find(filter);
    res.status(200).json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Submit score
router.post('/eng_diagnostic_scores', async (req, res) => {
  try {
    const { email, diagnosticType } = req.body;

    // Check if quiz of same type already exists
    const existing = await EngDiagnosticScore.findOne({
      email,
      quizzes: {
        $elemMatch: { diagnosticType }
      }
    });

    if (existing) {
      return res.status(400).json({
        error: `${diagnosticType}-diagnostic already taken`
      });
    }

    // Either update or create new user
    let scoreRecord = await EngDiagnosticScore.findOne({ email });

    if (!scoreRecord) {
      scoreRecord = new EngDiagnosticScore({
        email: req.body.email,
        username: req.body.username,
        quizzes: [req.body.quizzes[0]]
      });
    } else {
      scoreRecord.quizzes.push(req.body.quizzes[0]);
    }

    await scoreRecord.save();
    res.status(201).json(scoreRecord);
  } catch (err) {
    console.error('Score POST error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get scores
router.get('/eng_diagnostic_scores/:email?/:type(pre|post)?', async (req, res) => {
  try {
    let query = {};
    const { email, type } = req.params;

    if (email) query.email = email;
    if (type) query['quizzes.diagnosticType'] = type;

    const scores = await EngDiagnosticScore.find(query)
      .select('-__v -_id')
      .sort({ 'quizzes.date': -1 });

    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Progress by Email
router.get('/progress-rc-guide', async (req, res) => {
  const { email } = req.query; // Extract email from the query parameter

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Find guide by email
    const guide = await RC_Guide.findOne({ email });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found for the provided email' });
    }

    res.status(200).json({
      message: 'User progress fetched successfully',
      guide,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a Single Category by Email
router.post('/save-rc-guide', async (req, res) => {
  const { email, categoryName, value } = req.body;

  if (!email || !categoryName || value === undefined) {
    return res.status(400).json({ message: 'Email, category name, and value are required' });
  }

  try {
    // Check if the categoryName is valid
    const validCategories = ['mainIdea', 'authorsPurpose', 'supportingDetails', 'inferences', 'vocabulary'];
    if (!validCategories.includes(categoryName)) {
      return res.status(400).json({ message: 'Invalid category name' });
    }

    // Find guide by email
    let guide = await RC_Guide.findOne({ email });

    if (!guide) {
      // If guide does not exist, create it with default values
      guide = new RC_Guide({
        email,
        categories: { [categoryName]: value },
      });
    } else {
      // Update only the specified category
      guide.categories[categoryName] = value;
      guide.updatedAt = Date.now(); // Update timestamp
    }

    await guide.save();
    res.status(200).json({ message: `Category '${categoryName}' updated successfully`, guide });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to fetch passages by topic and level
// Route to fetch passages by topic and level or by passage ID
router.get('/reading_passages', async (req, res) => {
  const { topic, level, _id } = req.query;

  try {
    //if nothing is provided, fetch all the data
    if (!topic && !level && !_id) {
      // Add new response to the existing user's responses array
      const allpassages = await ReadingPassages.find();

      return res.status(200).send({ allpassages
      });
    }
    
    // If passage_id is provided, fetch the passage by its ID
    if (_id) {
      // Validate passage_id
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send({ message: 'Invalid passage ID.' });
      }

      const passage = await ReadingPassages.findById(_id);

      // Check if passage exists
      if (!passage) {
        return res.status(404).send({ message: 'No passage found with the specified ID.' });
      }

      // Respond with the specific passage
      return res.status(200).send({
        message: 'Passage retrieved successfully.',
        passage
      });
    }

    // Validate topic and level if passage_id is not provided
    if (!topic || !level) {
      return res.status(400).send({ message: 'Both topic and level are required unless passage_id is provided.' });
    }

    // Fetch passages matching the topic and level
    const passages = await ReadingPassages.find({
      topic_category: topic,
      passage_level: level
    });

    // Check if passages are found
    if (passages.length === 0) {
      return res.status(404).send({ message: 'No passages found for the specified topic and level.' });
    }

    // Respond with the retrieved passages
    res.status(200).send({
      message: 'Passages retrieved successfully.',
      passages
    });
  } catch (error) {
    console.error('Error fetching passages:', error);
    res.status(500).send({
      message: 'Failed to fetch passages.',
      error
    });
  }
});



// Save quiz data and score
router.post('/rc_score', async (req, res) => {
  const { email, topic, level, correctAnswers, totalQuestions, solvedPassages, passageName, quizData } = req.body;

  // Validation for required fields
  if (!email || !topic ) {
      return res.status(400).send({ message: 'Invalid data' });
  }

  const normalizedLevel = level.toLowerCase();
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  try {
      // Find or create user progress
      let userProgress = await ReadingComprehensionScore.findOne({ email });

      if (!userProgress) {
          userProgress = new ReadingComprehensionScore({ email });
      }

      // Check if the topic exists, if not, initialize it
      if (!userProgress.topics.has(topic)) {
          userProgress.topics.set(topic, {
              topic,
              solvedPassages: [],
              currentPassage: null,
              current_level: 'easy',
              consecutivePerfectScores: 0,
          });
      }

      const topicData = userProgress.topics.get(topic);

      // Prevent re-solving the same passage
      if (topicData.solvedPassages.some((passage) => passage.passageId.toString() === solvedPassages)) {
          return res.status(400).send({ message: 'Passage already solved' });
      }

      // Add the solved passage data
      topicData.solvedPassages.push({
          passageId: solvedPassages,
          passageName: passageName,
          score: scorePercentage,
          timestamp: new Date(),
          quizData, // Include full quiz data
      });

      // Handle consecutive perfect scores for level upgrade
      if (scorePercentage === 100) {
          topicData.consecutivePerfectScores += 1;

          if (topicData.consecutivePerfectScores >= 3) {
              topicData.current_level = getNextLevel(normalizedLevel);
              topicData.consecutivePerfectScores = 0;

              userProgress.topics.set(topic, topicData);
              await userProgress.save();

              return res.status(200).send({
                  message: 'Score saved successfully.',
                  upgraded: true,
                  newLevel: topicData.current_level,
              });
          }
      } else {
          topicData.consecutivePerfectScores = 0;
      }

      // Update current level
      topicData.current_level = normalizedLevel;
      userProgress.topics.set(topic, topicData);

      // Save the progress
      await userProgress.save();

      res.status(201).send({ message: 'Score saved successfully.', upgraded: false });
  } catch (error) {
      console.error('Error saving score:', error);
      res.status(500).send({ message: 'Failed to save score', error });
  }
});

// Helper function to determine the next level
function getNextLevel(currentLevel) {
  const levels = ['easy', 'medium', 'hard', 'mastered'];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
}


router.get('/readingcomprehensionscore', async (req, res) => {
  const { topic, email } = req.query;

  try {
      if (!email && !topic) {
          const allData = await ReadingComprehensionScore.find();
          return res.status(200).send(allData);
      }

      if (!email && topic) {
          const topicData = await ReadingComprehensionScore.find({ [`topics.${topic}`]: { $exists: true } });
          if (topicData.length === 0) {
              return res.status(404).send({ message: `No data found for topic: ${topic}` });
          }
          return res.status(200).send(topicData);
      }

      if (email && !topic) {
          const userData = await ReadingComprehensionScore.findOne({ email });
          if (!userData) {
              return res.status(404).send({ message: `No data found for email: ${email}` });
          }
          return res.status(200).send(userData);
      }

      if (email && topic) {
          const userData = await ReadingComprehensionScore.findOne({ email });
          if (!userData) {
              return res.status(404).send({ message: `No data found for email: ${email}` });
          }
          const topicData = userData.topics.get(topic);
          if (!topicData) {
              return res.status(404).send({ message: `No data found for topic: ${topic}` });
          }
          return res.status(200).send(topicData);
      }

      return res.status(400).send({ message: 'Invalid query parameters' });
  } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).send({ message: 'Failed to fetch scores', error });
  }
});








// Endpoint to get all vocabulary questions or filtered by CEFR level and/or topic
router.get('/vocab-questions', async (req, res) => {
  try {
    const { cefrLevel, topic } = req.query;
    let filter = {};

    if (cefrLevel) {
      filter.CEFRLevel = cefrLevel;
    }

    if (topic) {
      filter.topic = topic;
    }

    const questions = await VocabQuestion.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get vocab scores
router.get('/vocabscores', async (req, res) => {
  const { email, date } = req.query;

  try {
    if (!email) {
      // Fetch all scores if no email is provided
      const scores = await VocabScore.find({});
      return res.status(200).json(scores);
    }

    // Fetch scores for the specific user
    const userScores = await VocabScore.findOne({ email: email });
    
    if (!userScores) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (date && date !== 'null') {
      // Find the specific assessment by date
      const assessment = userScores.assessments.find(assessment => assessment.date.toISOString() === date);
      if (!assessment) {
        return res.status(404).json({ message: 'Assessment not found for the provided date' });
      }
      return res.status(200).json({ email: userScores.email, assessments: [assessment] });
    }

    // Return all scores for the user if no date is provided or if date is 'null'
    res.status(200).json(userScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



  // POST route to add a new score
  router.post('/vocabscoreadd', async (req, res) => {
    const { username, email, assessments } = req.body;
  
    if (!username || !email || !assessments) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
  
    try {
      // Assume assessments is an array of assessment objects
      const newAssessment = assessments[0];
  
      await addOrUpdateAssessment(username, email, newAssessment);
  
      res.status(201).json({ message: 'Score added successfully' });
    } catch (error) {
      console.error('Error adding score:', error);
      res.status(500).json({ error: 'Server error, failed to add score' });
    }
  });



  router.get('/fraction_questions', async (req, res) => {
      try {
          const questions = await FractionQuestion.find();
          res.json(questions);
      } catch (err) {
          res.status(500).send(err);
      }
  });

  router.post('/programming/submit', async (req, res) => {
    try {
      console.log("Received submission request:", req.body);
      const { email, username, submissions } = req.body;
      
      if (!email || !username || !submissions) {
        console.log("Missing required fields");
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Calculate quiz score based on test cases passed
      const totalScore = submissions.reduce((sum, sub) => sum + sub.test_cases_passed, 0);
      console.log("Calculated score:", totalScore);
      
      let user = await Programming.findOne({ email });
      console.log("Existing user found:", !!user);
      
      if (!user) {
        // Create a new user if not found
        console.log("Creating new user");
        user = new Programming({
          email,
          username,
          quizzes: [{
            score: totalScore,
            submissions,
          }]
        });
      } else {
        // Update existing user by adding a new quiz
        console.log("Updating existing user");
        user.quizzes.push({
          score: totalScore,
          submissions,
        });
      }
      
      const savedUser = await user.save();
      console.log("User saved successfully:", savedUser._id);
      res.status(201).json({ message: "Quiz submitted successfully!", user: savedUser });
    } catch (error) {
      console.error("Error in /programming/submit:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  router.get('/programming', async (req, res) => {
    try {
        const { email } = req.query;

        if (email) {
            // Fetch a single user by email
            const user = await Programming.findOne({ email }, { _id: 0 });

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            return res.json({ email: user.email, username: user.username, quizzes: user.quizzes });
        } else {
            // Fetch all users
            const users = await Programming.find({}, { _id: 0 });
            return res.json(users);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 📥 POST: Submit a coding answer for a topic
  router.post('/finger-exercise/submit', async (req, res) => {
    try {
      const { username, email, topic, questionId, userAnswer, isCorrect } = req.body;

      let user = await ProgrammingFinger.findOne({ email });

      if (!user) {
        // Create new user entry
        user = new ProgrammingFinger({
          username,
          email,
          topics: [{
            topicName: topic,
            submissions: [{
              questionId,
              userAnswer,
              isCorrect,
              timestamp: new Date()
            }]
          }]
        });
      } else {
        // Check if topic exists
        const topicObj = user.topics.find(t => t.topicName === topic);

        if (topicObj) {
          // Append submission to topic
          topicObj.submissions.push({
            questionId,
            userAnswer,
            isCorrect,
            timestamp: new Date()
          });
        } else {
          // Add new topic
          user.topics.push({
            topicName: topic,
            submissions: [{
              questionId,
              userAnswer,
              isCorrect,
              timestamp: new Date()
            }]
          });
        }
      }

      await user.save();
      res.status(200).json({ message: 'Submission saved successfully' });

    } catch (error) {
      console.error('Submission error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 📤 GET: Get all submissions of a user for a specific topic
  router.get('/finger-exercise', async (req, res) => {
    const { email, topic } = req.query;
  
    try {
      // 1. No email = Return everything
      if (!email) {
        const allUsers = await ProgrammingFinger.find();
        return res.status(200).json(allUsers);
      }
  
      // 2. Email only = Return all topics for that user
      const user = await ProgrammingFinger.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!topic) {
        return res.status(200).json(user); // full user data
      }
  
      // 3. Email + Topic = Return specific topic submissions
      const topicData = user.topics.find(t => t.topicName === topic);
      if (!topicData) {
        return res.status(404).json({ message: 'Topic not found for this user' });
      }
  
      return res.status(200).json(topicData);
  
    } catch (error) {
      console.error('Error fetching finger exercise data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/finger-questions', async (req, res) => {
    const { topic } = req.query;
  
    try {
      let questions;
      if (topic) {
        questions = await FingerQuestion.find({ topic });
      } else {
        questions = await FingerQuestion.find();
      }
      res.json(questions);
    } catch (err) {
      console.error('❌ Error fetching questions:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Add this route to your Express server
  router.get('/finger-questions/:id', async (req, res) => {
    try {
      const question = await FingerQuestion.findOne({ id: req.params.id });
      res.json(question);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Add this route to your Express server
  router.put('/programming-finger-questions/:id', async (req, res) => {
    try {
      const updated = await FingerQuestion.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, upsert: true } // upsert to create if not exists
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/CT_finger', async (req, res) => {
    try {
      const { topic } = req.query;
      
      // If topic is provided, filter by it, otherwise get all questions
      const filter = topic ? { topic } : {};
      
      const questions = await CTFoundationQuestion.find(filter);
      
      res.json({
        success: true,
        count: questions.length,
        data: questions
      });
    } catch (error) {
      console.error('Error fetching CT foundation questions:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching questions',
        error: error.message
      });
    }
  });

  // POST endpoint to save quiz scores
  router.post('/CT_finger_scores', async (req, res) => {
    try {
      const { email, topic, username, score, totalQuestions, answers } = req.body;
      
      // Validate required fields
      if (!email || !username || !topic || score === undefined || !totalQuestions || !answers) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Find user by email or create new record if doesn't exist
      let userScore = await CTFingerScore.findOne({ email });
      
      if (!userScore) {
        userScore = new CTFingerScore({
          email,
          username,
          quizzes: []
        });
      }
      
      // Add new quiz attempt
      userScore.quizzes.push({
        topic,
        score,
        totalQuestions,
        date: new Date(),
        answers
      });
      
      // Save to database
      await userScore.save();
      
      return res.status(201).json({
        message: 'Quiz score saved successfully',
        data: {
          email,
          username, 
          topic,
          score,
          totalQuestions
        }
      });
      
    } catch (error) {
      console.error('Error saving quiz score:', error);
      return res.status(500).json({ error: 'An error occurred while saving the quiz score' });
    }
  });

  // GET endpoint to retrieve user scores
  router.get('/CT_finger_scores/:email?', async (req, res) => {
    try {
      const { email } = req.params;
  
      if (email) {
        const userScore = await CTFingerScore.findOne({ email });
  
        if (!userScore) {
          return res.status(404).json({ error: 'No scores found for this user' });
        }
  
        return res.status(200).json(userScore);
      } else {
        const allScores = await CTFingerScore.find({});
        return res.status(200).json(allScores);
      }
  
    } catch (error) {
      console.error('Error retrieving quiz scores:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving quiz scores' });
    }
  });

  // GET endpoint to retrieve scores for a specific topic
  router.get('/CT_finger_scores/:email/:topic', async (req, res) => {
    try {
      const { email, topic } = req.params;
      
      const userScore = await CTFingerScore.findOne({ email });
      
      if (!userScore) {
        return res.status(404).json({ error: 'No scores found for this user' });
      }
      
      // Filter quizzes by topic
      const topicQuizzes = userScore.quizzes.filter(quiz => quiz.topic === topic);
      
      if (topicQuizzes.length === 0) {
        return res.status(404).json({ error: `No scores found for topic: ${topic}` });
      }
      
      return res.status(200).json({
        email,
        topic,
        quizzes: topicQuizzes
      });
      
    } catch (error) {
      console.error('Error retrieving topic scores:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving topic scores' });
    }
  });
  
  // Route to get all math questions with filters
router.get('/mathUpdatedSchema', async (req, res) => {
  const { topic, difficultyLevel, topicArea, gradeLevel, conceptsTested } = req.query;
  try {
    const query = {};
   
    // Build query filters
    if (topic) query.topic = topic;
    if (difficultyLevel) query.difficultyLevel = difficultyLevel;
    if (topicArea) query.topicArea = topicArea;
    if (gradeLevel) query.gradeLevel = parseInt(gradeLevel);

    // Handle array of concepts tested properly
    if (conceptsTested) {
      const conceptsArray = conceptsTested.split(',').map(concept => concept.trim());
      query.conceptsTested = { $in: conceptsArray };
    }

    const questions = await MathQuestion.find(query);
    return res.status(200).json(questions);
  } catch (err) {
    console.error('Error fetching math questions:', err);
    return res.status(500).json({ error: 'Error fetching questions', details: err.message });
  }
});

// Store math quiz attempt
router.post('/mathUpdatedScoreAdd', async (req, res) => {
  const { username, email, topics } = req.body;

  // Input validation
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  
  if (!topics || !Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ error: 'Topics array is required and cannot be empty' });
  }

  try {
    // Validate each topic entry
    for (const topicEntry of topics) {
      const { topic, current_level, questions } = topicEntry;
      
      if (!topic || !current_level || !Array.isArray(questions)) {
        return res.status(400).json({ 
          error: 'Invalid topic entry', 
          details: 'Each topic entry must include topic, current_level, and questions array'
        });
      }
      
      // Validate each question
      for (const question of questions) {
        if (!question.questionId || !mongoose.Types.ObjectId.isValid(question.questionId)) {
          return res.status(400).json({ 
            error: 'Invalid question entry', 
            details: `Invalid questionId: ${question.questionId}`
          });
        }
      }
    }

    // Find or create user profile
    let userProfile = await MathScores.findOne({ username, email });
    
    if (!userProfile) {
      userProfile = new MathScores({
        username,
        email,
        topics: [],
        lastActive: new Date()
      });
    } else {
      // Update last active time
      userProfile.lastActive = new Date();
    }

    // Process each topic
    for (const topicEntry of topics) {
      const { topic, current_level, questions } = topicEntry;
      
      // Find topic in user profile or create new entry
      const topicIndex = userProfile.topics.findIndex(t => t.topic === topic);
      
      // Format questions with proper ObjectId handling
      const formattedQuestions = questions.map(q => ({
        questionId: new Types.ObjectId(q.questionId),  // This line was causing the error
        answer: q.answer,
        correct: q.correct,
        difficultyLevel: q.difficultyLevel,
        conceptsTested: Array.isArray(q.conceptsTested) ? q.conceptsTested : [],
        topicArea: q.topicArea,
        timeSpent: q.timeSpent || 0,
        commonMisconceptions: Array.isArray(q.commonMisconceptions) ? q.commonMisconceptions : [],
        prerequisiteConcepts: Array.isArray(q.prerequisiteConcepts) ? q.prerequisiteConcepts : [],
        gradeLevel: q.gradeLevel
      }));
      
      const questionIds = formattedQuestions.map(q => q.questionId);
      
      if (topicIndex === -1) {
        // Topic doesn't exist, create new
        userProfile.topics.push({
          topic,
          current_level,
          questions: formattedQuestions,
          answeredQuestions: questionIds,
          masteryProgress: calculateMasteryProgress(formattedQuestions)
        });
      } else {
        // Topic exists, update existing
        const topicObj = userProfile.topics[topicIndex];
        topicObj.current_level = current_level;
        
        // Add new questions and avoid duplicates
        for (const question of formattedQuestions) {
          const existingQuestionIndex = topicObj.questions.findIndex(q => 
            q.questionId.toString() === question.questionId.toString()
          );
          
          if (existingQuestionIndex === -1) {
            // Question doesn't exist, add it
            topicObj.questions.push(question);
            topicObj.answeredQuestions.push(question.questionId);
          } else {
            // Update existing question with new data
            topicObj.questions[existingQuestionIndex] = question;
          }
        }
        
        // Update mastery progress
        topicObj.masteryProgress = calculateMasteryProgress(topicObj.questions);
      }
    }
    
    // Calculate overall mastery across all topics
    if (userProfile.topics.length > 0) {
      const totalMastery = userProfile.topics.reduce((sum, topic) => sum + topic.masteryProgress, 0);
      userProfile.overallMastery = Math.round(totalMastery / userProfile.topics.length);
    }

    // Save user profile
    await userProfile.save();
    res.status(200).json(userProfile);
  } catch (err) {
    console.error('Error during bulk score update:', err);
    res.status(500).json({ error: 'Error saving score', details: err.message });
  }
});

// Helper function to calculate mastery progress based on question performance
function calculateMasteryProgress(questions) {
  if (!questions || questions.length === 0) return 0;
  
  const correctAnswers = questions.filter(q => q.correct).length;
  return Math.round((correctAnswers / questions.length) * 100);
}


module.exports = router
