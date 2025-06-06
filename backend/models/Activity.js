const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  notes: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);