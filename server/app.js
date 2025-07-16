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

// Load environment variables
dotenv.config({ path: './.env' });

// CORS configuration for local deployment
const corsOptions = {
    origin: [
      'http://localhost:3000',  // React development
      'http://3.111.49.131:4000',  // Same origin for production
      `http://localhost:${process.env.PORT || 4000}` // Dynamic port
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Cookie',
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Cookie parser
app.use(cookieParser());

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// Session configuration for local deployment
app.use(session({
    name: 'sessionId',
    secret: process.env.SECRET_KEY || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
