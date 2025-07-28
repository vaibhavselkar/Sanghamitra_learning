// Schema Definition (mathematicsDiagnosticQuestionsSchema.js)
const mongoose = require('mongoose');

const mathematicsDiagnosticQuestionsSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
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
  explanationText: {
    type: String,
    required: true,
    trim: true
  },
  questionDifficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  questionTopicArea: {
    type: String,
    required: true,
    enum: ['arithmetic', 'algebra', 'geometry', 'statistics', 'probability']
  },
  questionTopic: {
    type: String,
    required: true
  },
  testedConcepts: [{
    type: String,
    required: true
  }],
  questionMisconceptions: [{
    type: String
  }],
  averageTime: {
    type: Number,
    required: true,
    min: 1
  },
  prerequisiteTopics: [{
    type: String
  }],
  gradeLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  }
}, {
  timestamps: true
});

// Index for efficient querying
mathematicsDiagnosticQuestionsSchema.index({ questionTopicArea: 1, questionTopic: 1, questionDifficulty: 1 });

const MathematicsDiagnosticQuestion = mongoose.model('MathematicsDiagnosticQuestion', mathematicsDiagnosticQuestionsSchema, 'mathematicsDiagnosticQuestionsDatabase');

module.exports = MathematicsDiagnosticQuestion;