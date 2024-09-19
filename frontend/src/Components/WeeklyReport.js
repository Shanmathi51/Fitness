// WeeklyAndMonthlyReport.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function WeeklyAndMonthlyReport() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalWeeklyWorkouts, setTotalWeeklyWorkouts] = useState(0);
  const [totalMonthlyWorkouts, setTotalMonthlyWorkouts] = useState(0);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        // Fetch Weekly Data
        const weeklyResponse = await axios.get('http://localhost:5000/api/workouts/weekly', {
          params: { userId },
        });
        const weeklyWorkouts = weeklyResponse.data;

        // Calculate total workouts and group by workout type for weekly data
        const groupedWeeklyWorkouts = weeklyWorkouts.reduce((acc, workout) => {
          const { typeOfWorkout, completedCountValue } = workout;
          if (!acc[typeOfWorkout]) {
            acc[typeOfWorkout] = { count: 0, sessions: 0 };
          }
          acc[typeOfWorkout].count += completedCountValue;
          acc[typeOfWorkout].sessions += 1;
          return acc;
        }, {});
        setTotalWeeklyWorkouts(weeklyWorkouts.length);
        setWeeklyData(groupedWeeklyWorkouts);

        // Fetch Monthly Data
        const monthlyResponse = await axios.get('http://localhost:5000/api/workouts/monthly', {
          params: { userId },
        });
        const monthlyWorkouts = monthlyResponse.data;

        // Calculate total workouts and group by workout type for monthly data
        const groupedMonthlyWorkouts = monthlyWorkouts.reduce((acc, workout) => {
          const { typeOfWorkout, completedCountValue } = workout;
          if (!acc[typeOfWorkout]) {
            acc[typeOfWorkout] = { count: 0, sessions: 0 };
          }
          acc[typeOfWorkout].count += completedCountValue;
          acc[typeOfWorkout].sessions += 1;
          return acc;
        }, {});
        setTotalMonthlyWorkouts(monthlyWorkouts.length);
        setMonthlyData(groupedMonthlyWorkouts);

      } catch (error) {
        toast.error('Failed to fetch report data.', { autoClose: 5000 });
      }
    };

    fetchReportData();
  }, []);
  async function fetchUserName(userId) {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user name:', error);
      throw error; // or handle it in a way that fits your application
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="report-container">
        <h2>Weekly and Monthly Report</h2>

        <h3>Weekly Report</h3>
        {totalWeeklyWorkouts > 0 ? (
          <table className="report-table">
            <thead>
              <tr>
                <th>Type of Workout</th>
                <th>Total Completed Count</th>
                <th>Number of Sessions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(weeklyData).map((workoutType) => (
                <tr key={workoutType}>
                  <td>{workoutType}</td>
                  <td>{weeklyData[workoutType].count}</td>
                  <td>{weeklyData[workoutType].sessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No workouts completed this week.</p>
        )}

        <h3>Monthly Report</h3>
        {totalMonthlyWorkouts > 0 ? (
          <table className="report-table">
            <thead>
              <tr>
                <th>Type of Workout</th>
                <th>Total Completed Count</th>
                <th>Number of Sessions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(monthlyData).map((workoutType) => (
                <tr key={workoutType}>
                  <td>{workoutType}</td>
                  <td>{monthlyData[workoutType].count}</td>
                  <td>{monthlyData[workoutType].sessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No workouts completed this month.</p>
        )}
      </div>
    </>
  );
}

export default WeeklyAndMonthlyReport;
