
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../App.css';

// function WorkoutHistory() {
//   const [workoutData, setWorkoutData] = useState([]);

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/workouts', {
//           params: { userId: localStorage.getItem('userId') } // Fetch data for the logged-in user
//         });
//         setWorkoutData(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch workout data.', { autoClose: 5000 });
//       }
//     };

//     fetchWorkouts();
//   }, []);

//   // const handleDelete = async (id) => {
//   //   try {
//   //     await axios.delete(`http://localhost:5000/api/workouts/${id}`);
//   //     setWorkoutData(workoutData.filter(workout => workout._id !== id));
//   //     toast.success('Workout deleted successfully.', { autoClose: 5000 });
//   //   } catch (error) {
//   //     toast.error('Failed to delete workout.', { autoClose: 5000 });
//   //   }
//   // };

//   return (
//     <>
//       <ToastContainer />
//       <div className="workout-history-container">
//         <h2>Workout History</h2>
//         {workoutData.length > 0 ? (
//           <table className="workout-table">
//             <thead>
//               <tr>
//                 <th>Type of Workout</th>
//                 <th>Target Count</th>
//                 <th>Completed Count</th>
//                 <th>Time Taken</th>
//                 <th>Date & Time</th>
//                 {/* <th>Actions</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {workoutData.map(workout => (
//                 <tr key={workout._id}>
//                   <td>{workout.typeOfWorkout}</td>
//                   <td>{workout.countValue}</td>
//                   <td>{workout.completedCountValue}</td>
//                   <td>{workout.timeTaken}</td>
//                   <td>{new Date(workout.dateTime).toLocaleString()}</td> {/* Format the date */}
//                   {/* <td>
//                     <button className="delete-button" onClick={() => handleDelete(workout._id)}>
//                       Delete
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No workouts recorded.</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default WorkoutHistory;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

function WorkoutHistory() {
  const [workoutData, setWorkoutData] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts', {
          params: { userId: localStorage.getItem('userId') }, // Fetch data for the logged-in user
        });
        setWorkoutData(response.data);
      } catch (error) {
        toast.error('Failed to fetch workout data.', { autoClose: 5000 });
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="workout-history-container">
        <h2>Workout History</h2>
        <button onClick={() => navigate('/workout-chart')} className="view-graph-button">
          View Graph
        </button>
        <button onClick={() => navigate('/weekly-report')} className="view-graph-button">
        View Weekly Report
        </button>
        {workoutData.length > 0 ? (
          <table className="workout-table">
            <thead>
              <tr>
                <th>Type of Workout</th>
                <th>Target Count</th>
                <th>Completed Count</th>
                <th>Time Taken</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {workoutData.map(workout => (
                <tr key={workout._id}>
                  <td>{workout.typeOfWorkout}</td>
                  <td>{workout.countValue}</td>
                  <td>{workout.completedCountValue}</td>
                  <td>{workout.timeTaken}</td>
                  <td>{new Date(workout.dateTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No workouts recorded.</p>
        )}
      </div>
    </>
  );
}

export default WorkoutHistory;
