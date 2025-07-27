const mongoose = require('mongoose');

const ShoppingItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['produce', 'dairy', 'meat', 'pantry', 'frozen', 'other'],
        default: 'other'
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ShoppingItem', ShoppingItemSchema);
