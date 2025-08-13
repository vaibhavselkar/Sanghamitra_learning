// server/model/Question.js - UNIFIED MODEL FOR ANALYTICS
const mongoose = require('mongoose');

// Import your existing models
const MathQuestion = require('./math-question.schema');
const ArithmeticQuestion = require('./arithmetic-questions.schema');
const FractionTestQuestion = require('./MathData'); // assuming this is the fraction model

const questionSchema = new mongoose.Schema({
  // ============ UNIFIED FIELDS (compatible with all your models) ============
  questionText: {
    type: String,
    required: true
  },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true }
  },
  correctOption: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D']
  },
  explanation: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced', 'easy', 'medium', 'hard'] // supports both formats
  },
  
  // ============ CATEGORIZATION (unified from your models) ============
  subject: {
    type: String,
    default: 'Math'
  },
  topicArea: {
    type: String,
    enum: [
      'geometry', 'algebra', 'trigonometry', 'calculus', 'coordinate geometry',
      'arithmetic', 'statistics', 'data interpretation', 'number theory',
      'combinatorics', 'probability', 'logic', 'set theory', 'matrices',
      'linear algebra', 'differential equations', 'complex analysis'
    ]
  },
  topic: {
    type: String
  },
  arithmeticCategory: {
    type: String,
    enum: [
      'basic-operations', 'fractions-decimals', 
      'number-sense', 'measurement', 
      'ratios-proportions', 'problem-solving'
    ]
  },
  operationType: {
    type: String,
    enum: [
      'addition', 'subtraction', 'multiplication', 'division',
      'mixed-operations', 'word-problems', 'dealing-with-negative-sign', 
      'ratio-proportion-percentage', 'fractions', 'decimals'
    ]
  },
  
  // ============ SKILLS & REQUIREMENTS ============
  coreSkills: [{
    type: String
  }],
  conceptsTested: [{
    type: String
  }],
  prerequisiteSkills: [{
    type: String
  }],
  prerequisiteConcepts: [{
    type: String
  }],
  foundationalRequirements: [{
    type: String
  }],
  
  // ============ ERROR ANALYSIS ============
  commonErrors: [{
    type: String
  }],
  commonMisconceptions: [{
    type: String
  }],
  errorTypes: {
    type: Map,
    of: {
      description: String,
      frequency: {
        type: String,
        enum: ['low', 'medium', 'high']
      },
      remediation: String
    },
    default: new Map()
  },
  
  // ============ TIMING & FORMAT ============
  timeAllocation: {
    type: Number,
    default: 30
  },
  timeSpent: {
    type: Number
  },
  problemFormat: {
    type: String,
    enum: ['multiple-choice', 'fill-in-blank', 'word-problem'],
    default: 'multiple-choice'
  },
  
  // ============ GRADE & DIFFICULTY ============
  gradeLevel: {
    type: Number,
    required: true
  },
  
  // ============ METADATA ============
  tags: [{
    type: String,
    default: ['finger-exercise']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  sourceModel: {
    type: String,
    enum: ['MathQuestion', 'ArithmeticQuestion', 'FractionTestQuestion'],
    required: true
  },
  originalId: {
    type: mongoose.Schema.Types.ObjectId
  },
  
  // ============ ANALYTICS FIELDS ============
  totalAttempts: {
    type: Number,
    default: 0
  },
  totalCorrectAttempts: {
    type: Number,
    default: 0
  },
  averageResponseTime: {
    type: Number,
    default: 0
  },
  
  url: {
    type: String // for FractionTestQuestion compatibility
  }
}, {
  timestamps: true
});

// ============ INDEXES ============
questionSchema.index({ operationType: 1 });
questionSchema.index({ topicArea: 1, topic: 1 });
questionSchema.index({ difficultyLevel: 1 });
questionSchema.index({ gradeLevel: 1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ sourceModel: 1 });

// ============ STATIC METHODS ============
questionSchema.statics.getAllFromAllCollections = async function() {
  try {
    // Get all questions from all your collections
    const mathQuestions = await MathQuestion.find({});
    const arithmeticQuestions = await ArithmeticQuestion.find({});
    const fractionQuestions = await FractionTestQuestion.find({});
    
    // Normalize all questions to unified format
    const normalizedQuestions = [
      ...mathQuestions.map(q => this.normalizeMathQuestion(q)),
      ...arithmeticQuestions.map(q => this.normalizeArithmeticQuestion(q)),
      ...fractionQuestions.map(q => this.normalizeFractionQuestion(q))
    ];
    
    return normalizedQuestions;
  } catch (error) {
    console.error('Error getting all questions:', error);
    return [];
  }
};

questionSchema.statics.normalizeMathQuestion = function(mathQ) {
  return {
    questionText: mathQ.question,
    options: {
      A: mathQ.options.a,
      B: mathQ.options.b,
      C: mathQ.options.c,
      D: mathQ.options.d
    },
    correctOption: mathQ.correctAnswer.toUpperCase(),
    explanation: mathQ.explanation,
    difficultyLevel: this.mapDifficulty(mathQ.difficultyLevel),
    topicArea: mathQ.topicArea,
    topic: mathQ.topic,
    conceptsTested: mathQ.conceptsTested,
    commonMisconceptions: mathQ.commonMisconceptions,
    timeSpent: mathQ.timeSpent,
    prerequisiteConcepts: mathQ.prerequisiteConcepts,
    gradeLevel: mathQ.gradeLevel,
    sourceModel: 'MathQuestion',
    originalId: mathQ._id,
    operationType: this.deriveOperationType(mathQ.topicArea, mathQ.topic),
    url: mathQ.url
  };
};

questionSchema.statics.normalizeArithmeticQuestion = function(arithQ) {
  return {
    questionText: arithQ.questionText,
    options: arithQ.options,
    correctOption: arithQ.correctOption,
    explanation: arithQ.explanation,
    difficultyLevel: arithQ.difficultyLevel,
    topicArea: 'arithmetic',
    topic: arithQ.operationType,
    arithmeticCategory: arithQ.arithmeticCategory,
    operationType: arithQ.operationType,
    coreSkills: arithQ.coreSkills,
    commonErrors: arithQ.commonErrors,
    timeAllocation: arithQ.timeAllocation,
    foundationalRequirements: arithQ.foundationalRequirements,
    gradeLevel: arithQ.gradeLevel,
    problemFormat: arithQ.problemFormat,
    sourceModel: 'ArithmeticQuestion',
    originalId: arithQ._id
  };
};

questionSchema.statics.normalizeFractionQuestion = function(fracQ) {
  return {
    questionText: fracQ.question,
    options: {
      A: fracQ.options.a,
      B: fracQ.options.b,
      C: fracQ.options.c,
      D: fracQ.options.d
    },
    correctOption: fracQ.correctOption.toUpperCase(),
    explanation: fracQ.explanation,
    difficultyLevel: this.mapDifficulty(fracQ.difficultyLevel),
    topicArea: fracQ.topicArea,
    topic: fracQ.topic,
    gradeLevel: fracQ.gradeLevel || 5, // default grade level for fractions
    sourceModel: 'FractionTestQuestion',
    originalId: fracQ._id,
    operationType: 'fractions',
    url: fracQ.url
  };
};

questionSchema.statics.mapDifficulty = function(difficulty) {
  const mapping = {
    'easy': 'beginner',
    'medium': 'intermediate', 
    'hard': 'advanced'
  };
  return mapping[difficulty] || difficulty;
};

questionSchema.statics.deriveOperationType = function(topicArea, topic) {
  // Logic to derive operationType from topicArea and topic
  if (topicArea === 'arithmetic') {
    if (topic === 'basic_operations') return 'mixed-operations';
    if (topic === 'fractions') return 'fractions';
    if (topic === 'decimals') return 'decimals';
  }
  return topic || 'mixed-operations';
};

module.exports = mongoose.model('Question', questionSchema);