// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const Classroom = require('../model/classroom_schema');

// Base authentication - verifies user identity
const authenticate = async (req, res, next) => {
  try {
    let token;
    
    // 1. Extract token from multiple sources
    if (req.header('Authorization') && req.header('Authorization').startsWith('Bearer ')) {
      token = req.header('Authorization').replace('Bearer ', '');
    } else if (req.session && req.session.userId) {
      // Fallback to session-based auth
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: 'Session invalid - user not found' });
      }
      req.user = user;
      req.userID = user._id;
      return next();
    }

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // 2. Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token - user not found' });
    }

    // 3. Check if token exists in user's token array (for logout functionality)
    const tokenExists = user.tokens.some(tokenObj => tokenObj.token === token);
    if (!tokenExists) {
      return res.status(401).json({ error: 'Token has been invalidated' });
    }

    // 4. Attach user info to request
    req.user = user;
    req.userID = user._id;
    req.token = token;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Classroom access control - ensures user can access specific classroom
const authorizeClassroom = async (req, res, next) => {
  try {
    let targetClassroomId = req.params.classroomId;
    let targetJoinCode = req.params.joinCode || req.body.joinCode;

    // If no classroom specified, skip this middleware
    if (!targetClassroomId && !targetJoinCode) {
      return next();
    }

    const user = req.user;
    let classroom;

    // Find classroom by ID or join code
    if (targetClassroomId) {
      classroom = await Classroom.findById(targetClassroomId)
        .populate('tutor', 'name email')
        .populate('students', 'name email');
    } else if (targetJoinCode) {
      classroom = await Classroom.findOne({ joinCode: targetJoinCode })
        .populate('tutor', 'name email')
        .populate('students', 'name email');
    }

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    // Check user's access to this classroom
    const hasAccess = (
      // User is the tutor
      (user.role === 'tutor' && classroom.tutor._id.toString() === user._id.toString()) ||
      // User is a student in this classroom
      (user.role === 'student' && classroom.students.some(student => 
        student._id.toString() === user._id.toString()
      )) ||
      // Admin has access to all classrooms
      user.role === 'admin'
    );

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied to this classroom' });
    }

    // Attach classroom to request
    req.classroom = classroom;
    next();

  } catch (error) {
    console.error('Classroom authorization error:', error);
    res.status(500).json({ error: 'Server error during classroom authorization' });
  }
};

// Role-based access control
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}` 
      });
    }

    next();
  };
};

// Multi-tenancy filter - ensures data isolation
const applyTenantFilter = (req, res, next) => {
  const user = req.user;
  
  // For students, always filter by their classroom
  if (user.role === 'student' && user.classroomCode) {
    req.tenantFilter = { classroomCode: user.classroomCode };
  }
  
  // For tutors, filter by their owned classrooms
  else if (user.role === 'tutor') {
    req.tenantFilter = { 
      $or: [
        { classroomCode: { $in: user.ownedClassrooms?.map(c => c.joinCode) || [] } },
        { tutor: user._id }
      ]
    };
  }
  
  // Admins see everything (no filter)
  
  next();
};

// Classroom join validation (for new students joining)
const validateClassroomJoin = async (req, res, next) => {
  try {
    const { joinCode } = req.body;
    const user = req.user;

    if (!joinCode) {
      return res.status(400).json({ error: 'Join code is required' });
    }

    // Check if student is already in a classroom
    if (user.role === 'student' && user.classroomCode) {
      return res.status(400).json({ 
        error: 'You are already enrolled in a classroom. Contact admin to switch.' 
      });
    }

    // Find classroom
    const classroom = await Classroom.findOne({ joinCode });
    if (!classroom) {
      return res.status(404).json({ error: 'Invalid join code' });
    }

    // Check if student is already in this classroom
    if (classroom.students.includes(user._id)) {
      return res.status(400).json({ error: 'You are already a member of this classroom' });
    }

    req.classroom = classroom;
    next();

  } catch (error) {
    console.error('Classroom join validation error:', error);
    res.status(500).json({ error: 'Server error during join validation' });
  }
};

module.exports = {
  authenticate,
  authorizeClassroom,
  authorizeRole,
  applyTenantFilter,
  validateClassroomJoin
};