const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Meal = require('../models/Meal');
const axios = require('axios');

// Get all meals for a user
router.get('/', auth, async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(meals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add new meal
router.post('/', auth, async (req, res) => {
    try {
        const newMeal = new Meal({
            userId: req.user.id,
            ...req.body
        });

        const meal = await newMeal.save();
        res.json(meal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update meal
router.put('/:id', async (req, res) => {
    try {
        let meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ message: 'Meal not found' });

        // Make sure user owns meal
        if (meal.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        meal = await Meal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(meal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete meal
router.delete('/:id', async (req, res) => {
    try {
        let meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ message: 'Meal not found' });

        // Make sure user owns meal
        if (meal.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Meal.findByIdAndRemove(req.params.id);
        res.json({ message: 'Meal removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Analyze food using Nutritionix API
router.post('/analyze-food', auth, async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ message: 'Please provide a food description' });
        }

        // Call Nutritionix API
        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', 
            { query: description },
            {
                headers: {
                    'x-app-id': process.env.NUTRITIONIX_APP_ID,
                    'x-app-key': process.env.NUTRITIONIX_APP_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract relevant nutrition information
        const foods = response.data.foods;
        const totalNutrients = foods.reduce((acc, food) => {
            acc.calories += food.nf_calories || 0;
            acc.protein += food.nf_protein || 0;
            acc.carbs += food.nf_total_carbohydrate || 0;
            acc.fats += food.nf_total_fat || 0;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

        res.json(totalNutrients);
    } catch (err) {
        console.error('Error analyzing food:', err.message);
        res.status(500).json({ message: 'Failed to analyze food' });
    }
});

module.exports = router;
