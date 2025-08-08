// Updated User Schema with Google OAuth support

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'tutor', 'admin'],
        default: 'student'
    },
    classroomCode: {
        type: String,
        index: true
    },
    ownedClassrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }],
    
    // Email verification fields
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    
    // Password reset fields
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    lastPasswordResetRequest: Date,
    
    // ✅ GOOGLE OAUTH FIELDS (ADD THESE)
    googleId: {
        type: String,
        sparse: true, // Allows null values but ensures uniqueness when present
        unique: true
    },
    picture: {
        type: String // Store user's profile picture URL from Google
    },
    authProvider: {
        type: String,
        enum: ['email', 'google'],
        default: 'email'
    },
    
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    loginHistory: [{ 
        loginTimestamp: { 
            type: Date, 
            default: Date.now 
        },
        authProvider: {
            type: String,
            enum: ['email', 'google'],
            default: 'email'
        }
    }]
});

// Enhanced password hashing - skip for Google users
userSchema.pre('save', async function (next) {
    // Only hash password if it's modified and user is not a Google user
    if (this.isModified('password') && this.authProvider !== 'google') {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Enhanced login history tracking
userSchema.methods.updateLoginHistory = async function (authProvider = 'email') {
    try {
        this.loginHistory.push({ 
            loginTimestamp: Date.now(),
            authProvider: authProvider
        });
        await this.save();
    } catch (error) {
        console.log(error);
    }
}

// Enhanced token generation with auth provider context
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            { 
                _id: this._id,
                role: this.role,
                classroomCode: this.classroomCode,
                authProvider: this.authProvider
            }, 
            process.env.SECRET_KEY
        );
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

// Method for classroom management (existing)
userSchema.methods.generateClassroomCode = async function() {
    if (this.role === 'tutor') {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.classroomCode = code;
        await this.save();
        return code;
    }
    throw new Error('Only tutors can generate classroom codes');
};

// ✅ NEW METHOD: Check if user can login with password
userSchema.methods.canLoginWithPassword = function() {
    return this.authProvider === 'email';
};

// ✅ NEW METHOD: Check if user is Google user
userSchema.methods.isGoogleUser = function() {
    return this.authProvider === 'google' && this.googleId;
};

// ✅ NEW METHOD: Update profile picture
userSchema.methods.updateProfilePicture = async function(pictureUrl) {
    this.picture = pictureUrl;
    await this.save();
    return this.picture;
};

// ✅ INDEX for efficient Google user lookups
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1, authProvider: 1 });

const User = mongoose.model('USER', userSchema);
module.exports = User;
