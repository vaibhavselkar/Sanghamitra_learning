const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./model/userSchema');
const authRouter = require('./router/auth');
const classroomRoutes = require('./router/classroom');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const app = express();
// CORS configuration
const corsOptions = {
    origin: [
      'http://3.111.49.131:4000', 'https://sanghamitra-learn.vercel.app'
    ],
    credentials: true,  // Important: allows cookies/credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    optionsSuccessStatus: 200 // For legacy browser support
  };
  
  // Apply CORS middleware BEFORE your routes
  app.use(cors(corsOptions));

// Load environment variables
dotenv.config({ path: './.env' });

// CORS configuration - MUST be before other middleware

// Cookie parser BEFORE session
app.use(cookieParser());

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session configuration
app.use(session({
    name: 'sessionId',
    secret: process.env.SECRET_KEY || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: 'lax'
    }
}));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.error("MongoDB connection error:", err));


// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
app.use('/api', authRouter);
app.use('/api', classroomRoutes);

app.get('/api/', (req, res) => {
    res.json({ message: 'Server is running!', port: process.env.PORT || 4000 });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'CORS is working!', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Serve React app for any non-API routes (MUST BE LAST)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
    console.log(`API endpoints available at: http://localhost:${PORT}/api`);
    console.log(`Frontend served from: http://localhost:${PORT}`);
});
