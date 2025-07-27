const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    diet: {
        type: String,
        enum: ['balanced', 'low-carb', 'high-protein', 'vegetarian', 'vegan'],
        default: 'balanced'
    },
    goal: {
        type: String,
        enum: ['lose', 'maintain', 'gain'],
        default: 'maintain'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
