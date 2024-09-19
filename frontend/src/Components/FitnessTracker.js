import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import alarm from '../assets/alarm.wav.wav';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

function FitnessTracker() {
  const [typeOfWorkout, setTypeOfWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState(''); // State for custom workout type
  const [countValue, setCountValue] = useState('');
  const [completedCountValue, setCompletedCountValue] = useState('');
  const [message, setMessage] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [wasActive, setWasActive] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const [userName, setUserName] = useState(''); // State to store the username
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Fetch the username from localStorage or an API
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserName(response.data.name); // Set the username from the response
      } catch (error) {
        console.error('Error fetching user name', error);
      }
    };

    fetchUserName();
  }, []);

  const calculate = async () => {
    const workoutType = typeOfWorkout === 'Other' ? customWorkout : typeOfWorkout; // Use custom workout type if "Other" is selected

    if (workoutType.trim() === '' || countValue.trim() === '' || completedCountValue.trim() === '') {
      toast.error('Please fill out all fields', { autoClose: 5000 });
      return;
    }

    const diff = parseInt(countValue) - parseInt(completedCountValue);
    setMessage(diff > 0 ? 'You have more to complete!' : 'You have completed your goal!');

    const dateTime = new Date().toLocaleString();
    const newEntry = {
      userId: localStorage.getItem('userId'),
      typeOfWorkout: workoutType,
      countValue,
      completedCountValue,
      timeTaken: `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`,
      dateTime,
    };

    try {
      await axios.post('http://localhost:5000/api/workouts', newEntry);
      setWorkoutData([...workoutData, newEntry]);

      toast.success(diff > 0 ? 'Keep going!' : 'Great job!', { autoClose: 10000 });
    } catch (error) {
      toast.error('Failed to save the data.', { autoClose: 5000 });
    }
  };

  const handleShowTasks = async () => {
    navigate('/workout-history');
  };

  const refresh = () => {
    setTypeOfWorkout('');
    setCustomWorkout('');
    setCountValue('');
    setCompletedCountValue('');
    setMessage('');
    setMinutes(1);
    setSeconds(0);
    setIsActive(false);
    setWasActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (audioRef.current) {
              audioRef.current.play();
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMinutes(parseInt(value));
    setSeconds(0);
  };

  const startTimer = () => {
    setIsActive(true);
    setWasActive(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
    setWasActive(true);
  };

  const resumeTimer = () => {
    if (wasActive) {
      setIsActive(true);
      setWasActive(false);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    setWasActive(false);
    setMinutes(1);
    setSeconds(0);
  };

  return (
    <>
      <ToastContainer />
      <div className='page-layout'>
        <div className='margin'></div>
        <div className='background1'>
          <div className='run1'>
            <form>
              <div className='run2'>
                <div className='run3'>
                  Type of Workout:
                  <select
                    value={typeOfWorkout}
                    onChange={(e) => {
                      setTypeOfWorkout(e.target.value);
                      if (e.target.value !== 'Other') {
                        setCustomWorkout(''); // Clear custom workout input when another type is selected
                      }
                    }}
                    className='box1'
                  >
                    <option value="">Select Workout Type</option>
                    <option value="Push-ups">Push-ups</option>
                    <option value="Squats">Squats</option>
                    <option value="Sit-ups">Sit-ups</option>
                    <option value="Plank">Plank</option>
                    <option value="Jumping Jacks">Jumping Jacks</option>
                    <option value="Running">Running</option>
                    <option value="Burpees">Burpees</option>
                    <option value="Bicep Curls">Bicep Curls</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Show custom input field when "Other" is selected */}
                {typeOfWorkout === 'Other' && (
                  <div className='run3'>
                    Enter Your Workout Type:
                    <input
                      type='text'
                      placeholder='Enter workout type'
                      value={customWorkout}
                      onChange={(e) => setCustomWorkout(e.target.value)}
                      className='box1'
                    />
                  </div>
                )}

                <div className='run3'>
                  Set the Count you Want to Finish:
                  <input
                    type='number'
                    placeholder='Enter the Count'
                    name='count'
                    required
                    value={countValue}
                    onChange={(e) => setCountValue(e.target.value)}
                    className='box1'
                  />
                </div>

                <div className='run3'>
                  Enter time in minutes:
                  <input
                    type="number"
                    id="minutesInput"
                    placeholder='Enter the value in Minutes'
                    value={minutes}
                    onChange={handleInputChange}
                    className='box1'
                  />
                </div>

                <div className='timer'>
                  {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>

                <div className='btn'>
                  <button className='button start' onClick={startTimer} disabled={isActive}>
                    Start Timer
                  </button>
                  <button className='button pause' onClick={pauseTimer} disabled={!isActive}>
                    Pause Timer
                  </button>
                  <button className='button resume' onClick={resumeTimer} disabled={isActive || !wasActive}>
                    Resume Timer
                  </button>
                  <button className='button stop' onClick={stopTimer} disabled={!isActive && !wasActive}>
                    Restart Timer
                  </button>

                  <audio ref={audioRef} src={alarm} />
                </div> 

                <div className='run3'>
                  Enter the Count you Have Completed:
                  <input
                    type='number'
                    placeholder='Enter the Count'
                    name='completed'
                    required
                    value={completedCountValue}
                    onChange={(e) => setCompletedCountValue(e.target.value)}
                    className='box1'
                  />
                </div>
                <div className='btn1'>
                  <button type='button' className='button' onClick={calculate}>Calculate</button>
                  <button type='button' className='button' onClick={refresh}>Refresh</button>
                </div>
                <div className='diff'>{message}</div>
                <button type='button' className='button' onClick={handleShowTasks}>View Workout History</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FitnessTracker;
