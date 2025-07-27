const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());
app.use(express.static('../'));

// MongoDB Connection
// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutrient-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✓ MongoDB Connected successfully');
    console.log('✓ Database URL:', process.env.MONGODB_URI || 'mongodb://localhost:27017/nutrient-tracker');
})
.catch(err => {
    console.error('✗ MongoDB Connection Error:');
    console.error(err);
    process.exit(1);
});

// Log when database connection is lost
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/meals', require('./routes/meals'));
app.use('/api/shopping-list', require('./routes/shopping-list'));

// Root route redirect to login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
