const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ShoppingItem = require('../models/ShoppingItem');

// Get all shopping items for a user
router.get('/', auth, async (req, res) => {
    try {
        const items = await ShoppingItem.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new shopping item
router.post('/', auth, async (req, res) => {
    try {
        const newItem = new ShoppingItem({
            userId: req.user.id,
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            completed: req.body.completed || false
        });

        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a shopping item
router.patch('/:id', auth, async (req, res) => {
    try {
        let item = await ShoppingItem.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        // Make sure user owns the item
        if (item.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        item = await ShoppingItem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a shopping item
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await ShoppingItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        // Make sure user owns the item
        if (item.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await item.remove();
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
