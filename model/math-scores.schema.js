// math-scores.schema.js
const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const mathQuestionSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'MathQuestion',
    required: true
  },
  answer: String,
  correct: Boolean,
  difficultyLevel: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  conceptsTested: [String],
  topicArea: {
    type: String,
    enum: [
      'geometry', 'algebra', 'trigonometry', 'calculus', 'coordinate geometry',
      'arithmetic', 'statistics', 'data interpretation', 'number theory',
      'combinatorics', 'probability', 'logic', 'set theory', 'matrices',
      'linear algebra', 'differential equations', 'complex analysis'
    ],
    required: true
  },
  // New fields
  timeSpent: Number,
  commonMisconceptions: [String],
  prerequisiteConcepts: [String],
  gradeLevel: {
    type: Number,
    min: 1,
    max: 12,
    required: true
  }
});

const mathTopicSchema = new Schema({
  topic: {
    type: String,
    enum: [
        'equations', 'inequalities', 'exponents', 'roots', 'fractions', 'decimals',
        'polynomials', 'rational expressions', 'functions', 'arithmetic',
        'logarithms', 'sequences', 'series', 'basic_operations'
    ],
    required: true
  },
  answeredQuestions: [Schema.Types.ObjectId],
  questions: [mathQuestionSchema],
  current_level: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'mastered', 'intermediate'],
    default: 'easy'
  },
  // Additional metadata
  masteryProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const userMathProfileSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  topics: [mathTopicSchema],
  // Overall progress tracking
  overallMastery: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'mathUpdatedScoreAdd'
});

// Create a compound index for username and email
userMathProfileSchema.index({ username: 1, email: 1 }, { unique: true });

const MathScores = mongoose.model('MathScores', userMathProfileSchema);
module.exports = MathScores;