// models/Classroom.js
const mongoose = require('mongoose');
const classroomSchema = new mongoose.Schema({
    name: String,
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'USER' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'USER' }],
    subjects: {
      type: [String],
      enum: ['math', 'english', 'programming', 'statistics'], // Your subject list
      required: true
    },
    joinCode: { 
      type: String, 
      unique: true,
      index: true 
    },
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Classroom', classroomSchema);