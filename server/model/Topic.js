// server/model/Topic.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  // Topic details
  name: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  
  // Hierarchy
  subject: {
    type: String,
    required: true,
    default: 'Math'
  },
  parentTopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    default: null
  },
  subtopics: [{
    type: String
  }],
  
  // Requirements
  prerequisites: [{
    type: String
  }],
  coreSkills: [{
    type: String
  }],
  gradeLevel: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  
  // Learning objectives
  learningObjectives: [{
    type: String
  }],
  
  // Content organization
  questionPool: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  estimatedTimeToMaster: {
    type: Number,
    default: 120 // minutes
  },
  minimumQuestionsForMastery: {
    type: Number,
    default: 20
  },
  masteryThreshold: {
    type: Number,
    default: 0.8,
    min: 0,
    max: 1
  },
  
  // Administrative
  isActive: {
    type: Boolean,
    default: true
  },
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
topicSchema.index({ subject: 1, gradeLevel: 1 });
topicSchema.index({ name: 1 });
topicSchema.index({ isActive: 1 });

module.exports = mongoose.model('Topic', topicSchema);