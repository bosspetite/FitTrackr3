const express = require('express');
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new activity
router.post('/', auth, async (req, res) => {
  try {
    const { type, duration, note } = req.body;
    const activity = new Activity({
      user: req.user.userId,
      type,
      duration,
      note,
    });
    await activity.save();
    res.json({ activity }); // Respond with { activity: ... }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all activities for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.userId }).sort({ date: -1 });
    res.json({ activities }); // Respond with { activities: [...] }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;