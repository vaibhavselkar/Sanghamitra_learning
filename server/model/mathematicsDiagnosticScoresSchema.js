// File: model/mathematicsDiagnosticScoresSchema.js
// COMPLETE WORKING SCHEMA - Replace your entire file with this

const mongoose = require('mongoose');

// Sub-schema for individual question responses
const questionResponseSchema = new mongoose.Schema({
  questionData: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    questionText: { type: String, required: true },
    questionOptions: {
      optionA: { type: String, required: true },
      optionB: { type: String, required: true },
      optionC: { type: String, required: true },
      optionD: { type: String, required: true }
    },
    questionCorrectAnswer: { 
      type: String, 
      required: true, 
      enum: ['a', 'b', 'c', 'd'] 
    },
    explanationText: { type: String, required: true },
    questionDifficulty: { 
      type: String, 
      required: true, 
      enum: ['easy', 'medium', 'hard'] 
    },
    questionTopicArea: { 
      type: String, 
      required: true,
      enum: ['arithmetic', 'pre-algebra', 'algebra', 'geometry', 'trigonometry', 'calculus', 'statistics', 'probability']
    },
    questionTopic: { type: String, required: true },
    testedConcepts: [{ type: String, required: true }],
    questionMisconceptions: [{ type: String }],
    averageTime: { type: Number, required: true },
    prerequisiteTopics: [{ type: String }],
    gradeLevel: { type: Number, required: true }
  },
  userAnswer: { 
    type: String, 
    required: true,
    enum: ['a', 'b', 'c', 'd', 'unanswered']
  },
  timeSpent: { type: Number, required: true, min: 0 },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

// Sub-schema for difficulty performance (THIS IS THE KEY FIX)
const difficultyPerformanceSchema = new mongoose.Schema({
  total: { type: Number, required: true, min: 0 },
  correct: { type: Number, required: true, min: 0 },
  percentage: { type: Number, required: true, min: 0, max: 100 }
}, { _id: false });

// Sub-schema for topic performance
const topicPerformanceSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  total: { type: Number, required: true, min: 1 },
  correct: { type: Number, required: true, min: 0 },
  percentage: { type: Number, required: true, min: 0, max: 100 }
}, { _id: false });

// Main schema for diagnostic test scores
const mathematicsDiagnosticScoresSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  testType: {
    type: String,
    required: true,
    enum: [
      'arithmeticPre', 'arithmeticPost',
      'pre-algebraPre', 'pre-algebraPost',
      'algebraPre', 'algebraPost',
      'geometryPre', 'geometryPost',
      'trigonometryPre', 'trigonometryPost',
      'calculusPre', 'calculusPost',
      'statisticsPre', 'statisticsPost',
      'probabilityPre', 'probabilityPost'
    ]
  },
  topicArea: {
    type: String,
    required: true,
    enum: ['arithmetic', 'pre-algebra', 'algebra', 'geometry', 'trigonometry', 'calculus', 'statistics', 'probability']
  },
  testPhase: {
    type: String,
    required: true,
    enum: ['pre', 'post']
  },
  responses: [questionResponseSchema],
  
  // Summary statistics
  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  totalCorrect: {
    type: Number,
    required: true,
    min: 0
  },
  totalScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalTimeSpent: {
    type: Number,
    required: true,
    min: 0
  },
  averageTimePerQuestion: {
    type: Number,
    required: true,
    min: 0
  },
  testDuration: {
    type: Number,
    required: true,
    min: 1
  },
  
  // FIXED: Performance by difficulty using proper sub-schemas
  easyQuestions: {
    type: difficultyPerformanceSchema,
    required: true
  },
  mediumQuestions: {
    type: difficultyPerformanceSchema,
    required: true
  },
  hardQuestions: {
    type: difficultyPerformanceSchema,
    required: true
  },
  
  // Topic performance
  topicPerformance: {
    type: [topicPerformanceSchema],
    required: true,
    validate: {
      validator: function(array) {
        return array && array.length > 0;
      },
      message: 'At least one topic performance entry is required'
    }
  },
  
  // Test metadata
  testDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
mathematicsDiagnosticScoresSchema.index({ userEmail: 1, testType: 1 });
mathematicsDiagnosticScoresSchema.index({ topicArea: 1, testPhase: 1 });
mathematicsDiagnosticScoresSchema.index({ testDate: -1 });
mathematicsDiagnosticScoresSchema.index({ userEmail: 1, testDate: -1 });

// Pre-save middleware for logging
mathematicsDiagnosticScoresSchema.pre('save', function(next) {
  console.log('🔍 Schema: Pre-save validation...');
  console.log(`📧 User: ${this.userEmail}`);
  console.log(`📝 Test: ${this.testType}`);
  console.log(`📊 Score: ${this.totalCorrect}/${this.totalQuestions} (${this.totalScore}%)`);
  console.log(`⏰ Duration: ${this.testDuration} minutes`);
  console.log('✅ Schema: Pre-save validation complete');
  next();
});

// Post-save middleware for success logging
mathematicsDiagnosticScoresSchema.post('save', function(doc) {
  console.log(`🎉 Schema: Successfully saved diagnostic test!`);
  console.log(`📄 Document ID: ${doc._id}`);
  console.log(`👤 User: ${doc.userEmail}`);
  console.log(`📝 Test Type: ${doc.testType}`);
  console.log(`📊 Final Score: ${doc.totalScore}%`);
  console.log(`🟢 Easy: ${doc.easyQuestions.correct}/${doc.easyQuestions.total} (${doc.easyQuestions.percentage}%)`);
  console.log(`🟡 Medium: ${doc.mediumQuestions.correct}/${doc.mediumQuestions.total} (${doc.mediumQuestions.percentage}%)`);
  console.log(`🔴 Hard: ${doc.hardQuestions.correct}/${doc.hardQuestions.total} (${doc.hardQuestions.percentage}%)`);
});

const MathematicsDiagnosticScore = mongoose.model('MathematicsDiagnosticScore', mathematicsDiagnosticScoresSchema, 'mathematicsDiagnosticScores');

module.exports = MathematicsDiagnosticScore;