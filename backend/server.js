const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user.model'); 

const app = express();
const PORT = process.env.PORT || 5000; // Only declare PORT once

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fitness-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/workouts/weekly', async (req, res) => {
  const { userId } = req.query;

  try {
    const startOfWeek = new Date(); 
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to the beginning of the week

    const workouts = await Workout.find({
      userId,
      dateTime: { $gte: startOfWeek }
    });

    if (!workouts.length) {
      return res.status(404).json({ message: 'No workouts found for this week' });
    }

    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch weekly data' });
  }
});
app.get('/api/workouts/monthly', async (req, res) => {
  const { userId } = req.query;

  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Set to the beginning of the month

    const workouts = await Workout.find({
      userId,
      dateTime: { $gte: startOfMonth }
    });

    if (!workouts.length) {
      return res.status(404).json({ message: 'No workouts found for this month' });
    }

    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch monthly data' });
  }
});


// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ userId: user._id });  // Return user ID
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Save Workout
app.post('/api/workouts', async (req, res) => {
  const { userId, typeOfWorkout, countValue, completedCountValue, timeTaken, dateTime } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newWorkout = {
      typeOfWorkout,
      countValue,
      completedCountValue,
      timeTaken,
      dateTime,
    };
    user.workouts.push(newWorkout);
    await user.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Workouts
app.get('/api/workouts', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user.workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
