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
    classroomCode: {  // For classroom isolation
        type: String,
        index: true
    },
    ownedClassrooms: [{  // For tutors who manage multiple classrooms
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }],
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
        } 
    }]
});

// Password hashing (preserved)
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Login history tracking (preserved)
userSchema.methods.updateLoginHistory = async function () {
    try {
        this.loginHistory.push({ loginTimestamp: Date.now() });
        await this.save();
    } catch (error) {
        console.log(error);
    }
}

// Enhanced token generation with tenant context
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            { 
                _id: this._id,
                role: this.role,
                classroomCode: this.classroomCode  // Added for multi-tenancy
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

// New method for classroom management
userSchema.methods.generateClassroomCode = async function() {
    if (this.role === 'tutor') {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.classroomCode = code;
        await this.save();
        return code;
    }
    throw new Error('Only tutors can generate classroom codes');
};

const User = mongoose.model('USER', userSchema);
module.exports = User;