// server/model/UserLearningProfile.js
const mongoose = require('mongoose');

const userLearningProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Current status
  currentGradeLevel: {
    type: Number,
    default: 1
  },
  overallMasteryLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  
  // Topic-wise progress
  topicProgress: {
    type: Map,
    of: {
      masteryLevel: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
      },
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
      lastPracticedAt: {
        type: Date
      },
      status: {
        type: String,
        enum: ['struggling', 'improving', 'mastered'],
        default: 'improving'
      }
    },
    default: new Map()
  },
  
  // Skill gaps and strengths
  masteredSkills: [{
    type: String
  }],
  strugglingSkills: [{
    type: String
  }],
  recommendedTopics: [{
    type: String
  }],
  
  // Learning patterns
  learningStyle: {
    type: String,
    enum: ['visual', 'auditory', 'kinesthetic'],
    default: 'visual'
  },
  averageSessionDuration: {
    type: Number,
    default: 15 // minutes
  },
  preferredDifficulty: {
    type: String,
    enum: ['gradual', 'challenging'],
    default: 'gradual'
  },
  
  // Error patterns
  commonErrorTypes: [{
    errorType: String,
    frequency: Number,
    topics: [String],
    trend: {
      type: String,
      enum: ['increasing', 'stable', 'decreasing'],
      default: 'stable'
    }
  }],
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
userLearningProfileSchema.index({ userId: 1 });
userLearningProfileSchema.index({ 'topicProgress.lastPracticedAt': -1 });

module.exports = mongoose.model('UserLearningProfile', userLearningProfileSchema);