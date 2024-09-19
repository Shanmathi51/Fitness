import React from 'react';
import { Link } from 'react-router-dom';

import chestImage from '../assets/Chest.png';
import bicepsImage from '../assets/Biceps.png';
import tricepsImage from '../assets/Triceps.png';
import backImage from '../assets/Back.png';
import shoulderImage from '../assets/Shoulder.png';
import legsImage from '../assets/Legs.png';
import abdominalImage from '../assets/Abdominal.png';
import cardioImage from '../assets/Cardio.png';

const exercises = [
    { name: 'Chest', imageUrl: chestImage, path: 'https://www.youtube.com/watch?v=Q7oYVC4uidE&list=PLNAUreWTt_ShlrasGIkpVzSoyNOAQt5l-' },
    { name: 'Biceps', imageUrl: bicepsImage, path: 'https://www.youtube.com/watch?v=JyV7mUFSpXs&list=PLm0ZPPrwDQTkzQKER2YJPci1-ggIsvCan&index=2' },
    { name: 'Triceps', imageUrl: tricepsImage, path: 'https://www.youtube.com/watch?v=JfSee0Q-vRQ' },
    { name: 'Back', imageUrl: backImage, path: 'https://www.youtube.com/watch?v=Sa0sBKUiOvU' },
    { name: 'Shoulder', imageUrl: shoulderImage, path: 'https://www.youtube.com/watch?v=QVaijMZ2mp8' },
    { name: 'Legs', imageUrl: legsImage, path: 'https://www.youtube.com/watch?v=WA23NHfNq-s' },
    { name: 'Abdominal', imageUrl: abdominalImage, path: 'https://www.youtube.com/watch?v=0DtKZdmtLmE&list=PL5qo1Sl2GW3fAXt8UE3oSUoKqfNVWtnQw' },
    { name: 'Cardio', imageUrl: cardioImage, path: 'https://www.youtube.com/watch?v=jgk0xtM7KN8' },
];

const ExerciseList = () => {
    return (
        <div>
            <h2>Exercise List</h2>
            <div className="exercise-grid">
                {exercises.map((exercise, index) => (
                    <Link to={exercise.path} key={index} className="exercise-card">
                        <img src={exercise.imageUrl} alt={exercise.name} className="exercise-image" />
                        <div className="exercise-name">{exercise.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ExerciseList;
