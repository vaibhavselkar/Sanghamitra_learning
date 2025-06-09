const express = require('express');
const router = express.Router();
const Classroom = require('../model/classroom_schema');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const mongoose = require('mongoose');
const { 
  authenticate, 
  authorizeClassroom, 
  authorizeRole, 
  applyTenantFilter,
  validateClassroomJoin 
} = require('../middleware/authenticate');

// Helper function to generate unique join code
const generateJoinCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Enhanced registration route
router.post('/register', async (req, res) => {
  const { 
      name, 
      email, 
      password, 
      role = 'student', 
      tutorCode, 
      classroomName,
      subjects = ['math'] // default subject
  } = req.body;

  try {
      // Enhanced validation
      if (!name || !email || !password) {
          return res.status(422).json({ error: 'Please add all required fields' });
      }

      // Validate email format
      if (!validator.isEmail(email)) {
          return res.status(422).json({ error: 'Please enter a valid email address' });
      }

      // Validate password strength
      if (password.length < 6) {
          return res.status(422).json({ error: 'Password must be at least 6 characters long' });
      }

      // Role-specific validation
      if (role === 'tutor' && !classroomName) {
          return res.status(422).json({ error: 'Classroom name is required for tutors' });
      }

      if (role === 'student' && tutorCode && tutorCode.trim().length === 0) {
          return res.status(422).json({ error: 'Invalid tutor enrollment code' });
      }

      // Check if user already exists
      const userExist = await User.findOne({ email: email.toLowerCase() });
      if (userExist) {
          return res.status(422).json({ error: 'User already exists with this email' });
      }

      let classroom = null;
      let classroomCode = null;

      if (role === 'tutor') {
          // Create classroom for tutor
          let joinCode = generateJoinCode();
          
          // Ensure join code is unique
          let existingClassroom = await Classroom.findOne({ joinCode });
          while (existingClassroom) {
              joinCode = generateJoinCode();
              existingClassroom = await Classroom.findOne({ joinCode });
          }

          classroom = new Classroom({
              name: classroomName.trim(),
              joinCode: joinCode,
              subjects: Array.isArray(subjects) ? subjects : [subjects]
          });

          await classroom.save();
          classroomCode = joinCode;

      } else if (role === 'student' && tutorCode) {
          // Student with tutor code - find classroom
          classroom = await Classroom.findOne({ joinCode: tutorCode.trim() });
          if (!classroom) {
              return res.status(400).json({ error: 'Invalid tutor enrollment code' });
          }
          classroomCode = tutorCode.trim();
      }

      // Hash password before saving
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user with hashed password
      const user = new User({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          role,
          classroomCode: classroomCode
      });

      await user.save();

      // Update classroom relationships
      if (classroom) {
          if (role === 'tutor') {
              classroom.tutor = user._id;
              user.ownedClassrooms.push(classroom._id);
          } else if (role === 'student') {
              classroom.students.push(user._id);
          }
          
          await classroom.save();
          await user.save();
      }

      // Prepare response data (never send password back)
      const responseData = {
          message: 'User registered successfully',
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              classroomCode: user.classroomCode
          }
      };

      // Add classroom info for tutors
      if (role === 'tutor' && classroom) {
          responseData.classroom = {
              id: classroom._id,
              name: classroom.name,
              joinCode: classroom.joinCode,
              subjects: classroom.subjects
          };
      }

      res.status(201).json(responseData);

  } catch (err) {
      console.error('Registration error:', err);
      
      // Handle specific MongoDB errors
      if (err.code === 11000) {
          return res.status(422).json({ error: 'User already exists with this email' });
      }
      
      if (err.name === 'ValidationError') {
          const validationErrors = Object.values(err.errors).map(e => e.message);
          return res.status(422).json({ error: validationErrors.join(', ') });
      }
      
      res.status(500).json({ error: 'Internal server error during registration' });
  }
});

router.get('/classrooms', async (req, res) => {
  try {
    const classrooms = await Classroom.find()
      .populate('tutor', 'name email') // Optional: only return selected tutor fields
      .populate('students', 'name email'); // Optional: same for students
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving classrooms', error: err });
  }
});


// Get specific classroom (with access control)
router.get('/classroom/:classroomId', 
  authenticate, 
  authorizeClassroom, 
  (req, res) => {
    res.json(req.classroom);
  }
);

// Join classroom (students only)
router.post('/classroom/join', 
  authenticate, 
  authorizeRole('student'), 
  validateClassroomJoin, 
  async (req, res) => {
    try {
      const user = req.user;
      const classroom = req.classroom;

      // Add student to classroom
      classroom.students.push(user._id);
      await classroom.save();

      // Update user's classroom code
      user.classroomCode = classroom.joinCode;
      await user.save();

      res.json({ 
        message: 'Successfully joined classroom',
        classroom: {
          id: classroom._id,
          name: classroom.name,
          joinCode: classroom.joinCode,
          tutor: classroom.tutor
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error during classroom join' });
    }
  }
);

// Create new classroom (tutors only)
router.post('/classroom', 
  authenticate, 
  authorizeRole('tutor'), 
  async (req, res) => {
    try {
      const { name, subjects } = req.body;
      
      // Generate unique join code
      const generateJoinCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
      let joinCode = generateJoinCode();
      
      // Ensure uniqueness
      while (await Classroom.findOne({ joinCode })) {
        joinCode = generateJoinCode();
      }

      const classroom = new Classroom({
        name,
        tutor: req.user._id,
        subjects: subjects || ['math'],
        joinCode
      });

      await classroom.save();

      // Add to tutor's owned classrooms
      req.user.ownedClassrooms.push(classroom._id);
      await req.user.save();

      res.status(201).json({
        message: 'Classroom created successfully',
        classroom: {
          id: classroom._id,
          name: classroom.name,
          joinCode: classroom.joinCode,
          subjects: classroom.subjects
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error during classroom creation' });
    }
  }
);

// Get classroom students (tutor only)
router.get('/classroom/:classroomId/students', 
  authenticate, 
  authorizeRole('tutor'), 
  authorizeClassroom, 
  (req, res) => {
    res.json({
      students: req.classroom.students,
      total: req.classroom.students.length
    });
  }
);

// Remove student from classroom (tutor only)
router.delete('/classroom/:classroomId/students/:studentId',
  authenticate,
  authorizeRole('tutor'),
  authorizeClassroom,
  async (req, res) => {
    try {
      const { studentId } = req.params;
      const classroom = req.classroom;

      // Remove student from classroom
      classroom.students = classroom.students.filter(
        student => student._id.toString() !== studentId
      );
      await classroom.save();

      // Remove classroom code from student
      await User.findByIdAndUpdate(studentId, { 
        $unset: { classroomCode: "" } 
      });

      res.json({ message: 'Student removed from classroom successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error during student removal' });
    }
  }
);

// Admin routes (admin only)
router.get('/admin/all-classrooms', 
  authenticate, 
  authorizeRole('admin'), 
  async (req, res) => {
    try {
      const classrooms = await Classroom.find({})
        .populate('tutor', 'name email')
        .populate('students', 'name email');
      
      res.json(classrooms);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;