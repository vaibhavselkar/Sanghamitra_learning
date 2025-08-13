// Copy the UserProgress schema from my previous response
const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  selectedOption: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D']
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  responseTime: {
    type: Number,
    default: 0
  },
  sessionId: {
    type: String,
    required: true
  },
  exerciseType: {
    type: String,
    default: 'finger-exercise'
  },
  errorType: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserProgress', userProgressSchema);