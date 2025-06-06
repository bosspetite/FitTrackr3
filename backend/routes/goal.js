const express = require('express');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new goal
router.post('/', auth, async (req, res) => {
  try {
    const { description, target, unit } = req.body;
    const goal = new Goal({
      user: req.user.userId,
      description,
      target,
      unit
    });
    await goal.save();
    res.json({ goal }); // Respond with { goal: ... }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all goals for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.userId });
    res.json({ goals }); // Respond with { goals: [...] }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;