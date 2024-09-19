// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Register necessary chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// function WorkoutCharts() {
//   const [workoutData, setWorkoutData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/workouts', {
//           params: { userId: localStorage.getItem('userId') },
//         });
//         setWorkoutData(response.data);
//       } catch (error) {
//         console.error('Error fetching workout data', error);
//       }
//     };

//     fetchWorkouts();
//   }, []);

//   // Data for completed count pie chart
//   const completedCountData = {
//     labels: workoutData.map(workout => workout.typeOfWorkout),
//     datasets: [
//       {
//         label: 'Completed Count',
//         data: workoutData.map(workout => workout.completedCountValue),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//       },
//     ],
//   };

//   // Data for time taken pie chart (in seconds)
//   const timeTakenData = {
//     labels: workoutData.map(workout => workout.typeOfWorkout),
//     datasets: [
//       {
//         label: 'Time Taken (seconds)',
//         data: workoutData.map(workout => {
//           const [minutes, seconds] = workout.timeTaken.split(':');
//           return parseInt(minutes) * 60 + parseInt(seconds); // Convert time to total seconds
//         }),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Workout Charts</h2>
//       <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//         <div>
//           <h3>Completed Count</h3>
//           <Pie data={completedCountData} />
//         </div>
//         <div>
//           <h3>Time Taken (in seconds)</h3>
//           <Pie data={timeTakenData} />
//         </div>
//       </div>
//       <center><button onClick={() => navigate('/workout-history')}>Back to Workout History</button></center>
//     </div>
//   );
// }

// export default WorkoutCharts;




import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../App.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const WorkoutCharts = () => {
  const [chartData, setChartData] = useState({
    completedCountData: {
      labels: [],
      datasets: [{ label: 'Completed Count', data: [], backgroundColor: [] }]
    },
    timeTakenData: {
      labels: [],
      datasets: [{ label: 'Time Taken (Minutes)', data: [], backgroundColor: [] }]
    }
  });

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts', {
          params: { userId: localStorage.getItem('userId') }
        });

        const workouts = response.data;
        const completedCounts = {};
        const timeTaken = {};
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

        workouts.forEach(workout => {
          const { typeOfWorkout, completedCountValue, timeTaken: time } = workout;

          // Calculate completed counts
          if (completedCounts[typeOfWorkout]) {
            completedCounts[typeOfWorkout] += parseInt(completedCountValue, 10);
          } else {
            completedCounts[typeOfWorkout] = parseInt(completedCountValue, 10);
          }

          // Calculate time taken
          const [minutes, seconds] = time.split(':').map(Number);
          const totalMinutes = minutes + seconds / 60;

          if (timeTaken[typeOfWorkout]) {
            timeTaken[typeOfWorkout] += totalMinutes;
          } else {
            timeTaken[typeOfWorkout] = totalMinutes;
          }
        });

        setChartData({
          completedCountData: {
            labels: Object.keys(completedCounts),
            datasets: [ {
              label: 'Completed Count',
              data: Object.values(completedCounts),
              backgroundColor: colors.slice(0, Object.keys(completedCounts).length)
            }]
          },
          timeTakenData: {
            labels: Object.keys(timeTaken),
            datasets: [ {
              label: 'Time Taken (Minutes)',
              data: Object.values(timeTaken),
              backgroundColor: colors.slice(0, Object.keys(timeTaken).length)
            }]
          }
        });

      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchWorkoutData();
  }, []);

  // Helper function to calculate percentages
  const calculatePercentages = (data) => {
    const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
    return data.datasets[0].data.map(value => ((value / total) * 100).toFixed(2) + '%');
  };

  return (
    <div className="charts-container">
      <div className="chart chart-small">
        <h3>Completed Count</h3>
        {chartData.completedCountData.labels.length > 0 ? (
          <Pie
            data={chartData.completedCountData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const percentage = calculatePercentages(chartData.completedCountData)[context.dataIndex];
                      return `${label}: ${value} (${percentage})`;
                    }
                  }
                }
              }
            }}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      <div className="chart chart-small">
        <h3>Time Taken (Minutes)</h3>
        {chartData.timeTakenData.labels.length > 0 ? (
          <Pie
            data={chartData.timeTakenData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const percentage = calculatePercentages(chartData.timeTakenData)[context.dataIndex];
                      return `${label}: ${value.toFixed(2)} mins (${percentage})`;
                    }
                  }
                }
              }
            }}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutCharts;
