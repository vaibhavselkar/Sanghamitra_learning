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
// Enhanced registration route - FIXED
router.post('/register', async (req, res) => {
  const { 
      name, 
      email, 
      password, 
      role = 'student', 
      tutorCode, 
      classroomName,
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
              joinCode: joinCode
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

      // REMOVED MANUAL HASHING - Let the pre('save') middleware handle it
      // Create user with plain password (will be hashed by middleware)
      const user = new User({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password: password, // Plain password - will be hashed by pre('save')
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
              joinCode: classroom.joinCode
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

router.get('/auth/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('ownedClassrooms', 'name joinCode subjects createdAt')
      .select('-password -tokens'); // Don't send sensitive data

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        classroomCode: user.classroomCode,
        ownedClassrooms: user.ownedClassrooms.map(classroom => classroom._id),
        classroomDetails: user.ownedClassrooms, // Full classroom details
        loginHistory: user.loginHistory
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// Helper function to determine student status
const getStudentStatus = (student) => {
  if (!student.loginHistory || student.loginHistory.length === 0) {
    return 'inactive';
  }

  const lastLogin = new Date(student.loginHistory[student.loginHistory.length - 1].loginTimestamp);
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  return lastLogin > threeDaysAgo ? 'active' : 'inactive';
};

// Helper function to get last active date
const getLastActiveDate = (student) => {
  if (!student.loginHistory || student.loginHistory.length === 0) {
    return 'Never';
  }

  const lastLogin = new Date(student.loginHistory[student.loginHistory.length - 1].loginTimestamp);
  return lastLogin.toISOString().split('T')[0]; // Return YYYY-MM-DD format
};

// Get classroom statistics
router.get('/classroom/:classroomId/stats', authenticate, async (req, res) => {
  try {
    const { classroomId } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(classroomId)
      .populate('tutor', '_id')
      .populate('students', 'loginHistory date');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Check access
    const hasAccess = (
      (user.role === 'tutor' && classroom.tutor._id.toString() === user._id.toString()) ||
      user.role === 'admin'
    );

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied to this classroom' });
    }

    // Calculate statistics
    const totalStudents = classroom.students.length;
    const activeStudents = classroom.students.filter(student => 
      getStudentStatus(student) === 'active'
    ).length;

    // Mock progress data (replace with real progress tracking)
    const avgProgress = totalStudents > 0 ? Math.floor(Math.random() * 30) + 60 : 0;
    const avgScore = totalStudents > 0 ? Math.floor(Math.random() * 20) + 75 : 0;

    res.json({
      totalStudents,
      activeStudents,
      avgProgress,
      avgScore,
      activityRate: totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Server error fetching statistics' });
  }
});

// Get tutor's classrooms overview (for tutors with multiple classrooms)
router.get('/tutor/classrooms', authenticate, authorizeRole('tutor', 'admin'), async (req, res) => {
  try {
    const user = req.user;
    
    let classroomsQuery;
    if (user.role === 'admin') {
      classroomsQuery = Classroom.find({});
    } else {
      classroomsQuery = Classroom.find({ tutor: user._id });
    }

    const classrooms = await classroomsQuery
      .populate('tutor', 'name email')
      .populate('students', 'name email loginHistory');

    const classroomsWithStats = classrooms.map(classroom => {
      const totalStudents = classroom.students.length;
      const activeStudents = classroom.students.filter(student => 
        getStudentStatus(student) === 'active'
      ).length;

      return {
        _id: classroom._id,
        name: classroom.name,
        joinCode: classroom.joinCode,
        subjects: classroom.subjects,
        createdAt: classroom.createdAt,
        tutor: classroom.tutor,
        stats: {
          totalStudents,
          activeStudents,
          activityRate: totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0
        }
      };
    });

    res.json(classroomsWithStats);
  } catch (error) {
    console.error('Tutor classrooms fetch error:', error);
    res.status(500).json({ error: 'Server error fetching classrooms' });
  }
});

// Update classroom information
router.get('/classroom/:classroomId', async (req, res) => {
  try {
    const { classroomId } = req.params;

    // Find classroom and populate with your exact schema fields
    const classroom = await Classroom.findById(classroomId)
      .populate('tutor', 'name email')
      .populate('students', 'name email date loginHistory classroomCode role');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Helper function to determine student status
    const getStudentStatus = (student) => {
      if (!student.loginHistory || student.loginHistory.length === 0) {
        return 'inactive';
      }
      const lastLogin = new Date(student.loginHistory[student.loginHistory.length - 1].loginTimestamp);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return lastLogin > threeDaysAgo ? 'active' : 'inactive';
    };

    // Helper function to get last active date
    const getLastActiveDate = (student) => {
      if (!student.loginHistory || student.loginHistory.length === 0) {
        return 'Never';
      }
      const lastLogin = new Date(student.loginHistory[student.loginHistory.length - 1].loginTimestamp);
      return lastLogin.toISOString().split('T')[0];
    };

    res.json({
      _id: classroom._id,
      name: classroom.name,
      joinCode: classroom.joinCode,
      subjects: classroom.subjects,
      createdAt: classroom.createdAt,
      tutor: classroom.tutor,
      students: classroom.students.map(student => ({
        _id: student._id,
        name: student.name,
        email: student.email,
        date: student.date,
        loginHistory: student.loginHistory,
        status: getStudentStatus(student),
        lastActive: getLastActiveDate(student)
      }))
    });
  } catch (error) {
    console.error('Classroom fetch error:', error);
    res.status(500).json({ error: 'Server error fetching classroom' });
  }
});
// Remove student from classroom (enhanced)
router.delete('/classroom/:classroomId/student/:studentId', 
  authenticate, 
  authorizeRole('tutor', 'admin'), 
  async (req, res) => {
    try {
      const { classroomId, studentId } = req.params;
      const user = req.user;

      const classroom = await Classroom.findById(classroomId);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }

      // Check access
      if (user.role !== 'admin' && classroom.tutor.toString() !== user._id.toString()) {
        return res.status(403).json({ error: 'Access denied to this classroom' });
      }

      // Check if student is in classroom
      if (!classroom.students.includes(studentId)) {
        return res.status(400).json({ error: 'Student is not in this classroom' });
      }

      // Remove student from classroom
      classroom.students = classroom.students.filter(
        student => student.toString() !== studentId
      );
      await classroom.save();

      // Remove classroom code from student
      await User.findByIdAndUpdate(studentId, { 
        $unset: { classroomCode: "" } 
      });

      res.json({ 
        message: 'Student removed from classroom successfully',
        remainingStudents: classroom.students.length
      });
    } catch (error) {
      console.error('Student removal error:', error);
      res.status(500).json({ error: 'Server error removing student' });
    }
  }
);

// Get student details (for individual student view)
router.get('/student/:studentId', authenticate, async (req, res) => {
  try {
    const { studentId } = req.params;
    const user = req.user;

    const student = await User.findById(studentId)
      .select('-password -tokens')
      .populate('classroomCode');

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check access - tutor can only see students in their classrooms
    if (user.role === 'tutor') {
      const classroom = await Classroom.findOne({ 
        tutor: user._id, 
        students: studentId 
      });
      
      if (!classroom) {
        return res.status(403).json({ error: 'Access denied to this student' });
      }
    }

    res.json({
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        classroomCode: student.classroomCode,
        registrationDate: student.date,
        loginHistory: student.loginHistory,
        status: getStudentStatus(student),
        lastActive: getLastActiveDate(student)
      }
    });
  } catch (error) {
    console.error('Student fetch error:', error);
    res.status(500).json({ error: 'Server error fetching student' });
  }
});

// Search students within tutor's classrooms
router.get('/tutor/students/search', authenticate, authorizeRole('tutor'), async (req, res) => {
  try {
    const { q } = req.query; // search query
    const user = req.user;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    // Find tutor's classrooms
    const classrooms = await Classroom.find({ tutor: user._id })
      .populate({
        path: 'students',
        match: {
          $or: [
            { name: { $regex: q.trim(), $options: 'i' } },
            { email: { $regex: q.trim(), $options: 'i' } }
          ]
        },
        select: 'name email date loginHistory classroomCode'
      });

    // Flatten students from all classrooms
    const students = classrooms.reduce((acc, classroom) => {
      const studentsWithClassroom = classroom.students.map(student => ({
        ...student.toObject(),
        classroom: {
          _id: classroom._id,
          name: classroom.name,
          joinCode: classroom.joinCode
        }
      }));
      return acc.concat(studentsWithClassroom);
    }, []);

    res.json({
      students: students.map(student => ({
        _id: student._id,
        name: student.name,
        email: student.email,
        registrationDate: student.date,
        status: getStudentStatus(student),
        lastActive: getLastActiveDate(student),
        classroom: student.classroom
      })),
      total: students.length
    });
  } catch (error) {
    console.error('Student search error:', error);
    res.status(500).json({ error: 'Server error searching students' });
  }
});

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