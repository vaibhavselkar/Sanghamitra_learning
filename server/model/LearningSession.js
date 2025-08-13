// server/model/LearningSession.js
const mongoose = require('mongoose');

const learningSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Session details
  sessionType: {
    type: String,
    default: 'finger-exercise',
    enum: ['finger-exercise', 'diagnostic-test', 'practice', 'assessment']
  },
  topic: {
    type: String,
    required: true
  },
  subtopic: {
    type: String
  },
  operationType: {
    type: String // addition, subtraction, etc.
  },
  
  // Performance metrics
  questionsAttempted: {
    type: Number,
    default: 0
  },
  questionsCorrect: {
    type: Number,
    default: 0
  },
  averageResponseTime: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0 // in seconds
  },
  
  // Session outcome
  masteryLevel: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  recommendedNextTopics: [{
    type: String
  }],
  identifiedWeaknesses: [{
    type: String
  }],
  
  // Questions in this session
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    isCorrect: Boolean,
    responseTime: Number,
    selectedOption: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Status
  isCompleted: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
learningSessionSchema.index({ userId: 1, startedAt: -1 });
learningSessionSchema.index({ sessionId: 1 });
learningSessionSchema.index({ userId: 1, topic: 1 });

module.exports = mongoose.model('LearningSession', learningSessionSchema);