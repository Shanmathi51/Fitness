import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import AboutFitness from './Components/AboutFitness';
import Login from './Components/Login';
import FT from './Components/FT';
import Signup from './Components/Signup';
import FitnessTracker from './Components/FitnessTracker';
import WorkoutHistory from './Components/WorkoutHistory'; 
import './App.css';
import FitnessTips from './Components/FitnessTips';
import Exercises from './Components/Exercises';
import WorkoutCharts from './Components/WorkoutCharts';
import WeeklyReport from './Components/WeeklyReport';

function App() {
  const [username, setUsername] = useState('');

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', { method: 'POST' });
      localStorage.removeItem('userId');  // Clear userId from localStorage
      localStorage.removeItem('username');  // Clear username from localStorage
      setUsername('');
      window.location.href = '/'; // Redirect to home page after logout
    } catch (error) {
      alert('Failed to logout');
    }
  };

  return (
    <Router>
      <div className='header1'>
        Fitness Tracker
        <div className='nav1'>
          <Link to="/">Home</Link>
          <Link to='/exercises'>Exercises</Link>
          <Link to='/fitnesstips'>Fitness Tips</Link>
          <Link to="/about-fitness">About Fitness</Link>
          {username ? (
            <>
              <button className="username-button" onClick={() => alert(`Welcome, ${username}!`)}>{username}</button>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/ft">Track Details</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-fitness" element={<AboutFitness />} />
          <Route path="/about-fitness" element={<AboutFitness />} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ft" element={<FitnessTracker />} />
          <Route path="/ft1" element={<FT />} />
          <Route path="/fitnesstips" element={<FitnessTips />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/workout-history" element={<WorkoutHistory />} />
          <Route path="/workout-chart" element={<WorkoutCharts />} />
          <Route path="/weekly-report" element={<WeeklyReport/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;