const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');         // <-- you need to create this
const profileRoutes = require('./routes/profile');   // <-- and this
const activityRoutes = require('./routes/activity');
const goalRoutes = require('./routes/goal');

const app = express();

app.use(cors());
app.use(cors({
  origin: 'https://fit-trackr3.vercel.app', // your Vercel frontend URL
  credentials: true // if you're using cookies/auth
}));
app.use(express.json());

app.use('/api/auth', authRoutes);          // POST /api/auth/login, /api/auth/register
app.use('/api/profile', profileRoutes);    // GET/PUT/DELETE /api/profile
app.use('/api/activities', activityRoutes);
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => res.send('Fitness Tracker API'));

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.log(err));

module.exports = app;
