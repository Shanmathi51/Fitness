import React, { useState } from 'react';
import '../App.css';

function FitnessTips() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [recommendations, setRecommendations] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(2)); // Set BMI with two decimal places
    } else {
      alert('Please enter both height and weight.');
    }
  };

  const getExerciseRecommendations = () => {
    if (bmi !== null) {
      let recommendation = '';

      if (bmi < 18.5) {
        recommendation = 'You are underweight. Focus on strength training and balanced nutrition. Exercises such as weight lifting, resistance training, and protein-rich diets are recommended.';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        recommendation = 'You have a normal weight. Maintain your fitness with a mix of cardio and strength training. Activities like running, swimming, and yoga are great options.';
      } else if (bmi >= 25 && bmi < 29.9) {
        recommendation = 'You are overweight. Incorporate more cardio exercises and a balanced diet. Consider activities like brisk walking, cycling, and aerobic workouts.';
      } else {
        recommendation = 'You are obese. Focus on low-impact cardio exercises and consult a healthcare provider for personalized advice. Swimming, walking, and gentle yoga are good starting points.';
      }

      setRecommendations(recommendation);
    } else {
      alert('Please calculate your BMI first.');
    }
  };

  return (
    <div className="fitness-tips">
      <h3>Fitness Tips</h3>
      <ul>
        <li>Tip 1: Stay hydrated by drinking plenty of water throughout the day.</li>
        <li>Tip 2: Eat a balanced diet rich in fruits, vegetables, and lean proteins.</li>
        <li>Tip 3: Get regular exercise, aiming for at least 30 minutes a day.</li>
        <li>Tip 4: Incorporate strength training into your routine to build muscle.</li>
        <li>Tip 5: Warm up before workouts to prepare your body and prevent injury.</li>
        <li>Tip 6: Cool down after exercise to help your body recover.</li>
        <li>Tip 7: Get enough sleep, aiming for 7-9 hours each night.</li>
        <li>Tip 8: Practice good posture to avoid strain and injuries.</li>
        <li>Tip 9: Listen to your body and rest when needed.</li>
        <li>Tip 10: Mix up your workouts to prevent boredom and challenge your body.</li>
        <li>Tip 11: Set realistic fitness goals and track your progress.</li>
        <li>Tip 12: Include flexibility exercises like yoga or stretching in your routine.</li>
        <li>Tip 13: Use proper form to maximize the benefits of exercises and avoid injury.</li>
        <li>Tip 14: Stay consistent with your workout routine for long-term results.</li>
        <li>Tip 15: Don’t skip breakfast; it fuels your day and jumpstarts your metabolism.</li>
        <li>Tip 16: Limit your intake of processed foods and sugary drinks.</li>
        <li>Tip 17: Incorporate healthy fats into your diet, like avocados and nuts.</li>
        <li>Tip 18: Take breaks during long periods of sitting to stretch and move around.</li>
        <li>Tip 19: Stay active throughout the day by taking the stairs or walking more.</li>
        <li>Tip 20: Use interval training to burn more calories in less time.</li>
      </ul>

      <div className="bmi-calculator">
        <h4>Calculate Your Body Mass Index (BMI)</h4>
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>
        {bmi !== null && (
          <div>
            <p>Your BMI is: {bmi}</p>
            <button onClick={getExerciseRecommendations}>Exercises for your BMI</button>
            {recommendations && <p>{recommendations}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default FitnessTips;
