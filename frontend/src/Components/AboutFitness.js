import React from 'react';
import '../App.css';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.webp';

const AboutFitness = () => {
  return (
    <div className="about-container">
      <h1>About Fitness</h1>
      <div className="about-content">
        <p>
          Fitness is not just about hitting the gym; it is also about an active
          lifestyle that encompasses the right mindset, discipline, and
          nutrition. Regular exercise improves your overall health and
          well-being by increasing strength, flexibility, and cardiovascular
          endurance. It can also boost your mood, energy levels, and mental
          clarity, making you feel more productive throughout the day.
        </p>
        <p>
          Embrace a fitness journey to not only stay physically fit but also to
          improve your mental health, reduce stress, and achieve your long-term
          wellness goals. A combination of aerobic exercises, strength training,
          and proper nutrition can make a world of difference.
        </p>
        <ul>
        <li>
           <strong>Physical Fitness:</strong> This includes attributes like strength, endurance, flexibility, 
           and body composition. It is achieved through regular exercise, a balanced diet, and adequate rest. 
           Physical fitness allows the body to perform optimally in daily activities.
         </li>
         <li>
          <strong>Mental Health:</strong> Regular physical activity has been proven to reduce stress, anxiety, 
           and depression while boosting overall mental well-being. Engaging in fitness activities such as 
          running, cycling, or yoga releases endorphins, which contribute to a positive mindset and a sense of 
           accomplishment.
         </li>
         <li>
           <strong>Nutrition:</strong> A balanced diet rich in essential nutrients fuels the body, supports 
           recovery, and sustains energy levels. It is important to focus on the quality of food consumed, 
           ensuring a proper balance of proteins, carbohydrates, fats, vitamins, and minerals.
         </li>
         <li>
          <strong>Sleep:</strong> Adequate sleep is critical for recovery, cognitive function, and overall 
           physical performance. During sleep, the body undergoes repair and regeneration, balances hormones, 
          and consolidates memories.
       </li>
         <li>
           <strong>Lifestyle Choices:</strong> Long-term health is supported by avoiding harmful behaviors like 
         smoking, excessive alcohol consumption, and a sedentary lifestyle. Instead, adopting positive habits 
          such as regular exercise, mindful eating, and stress management techniques is key to a healthy life.
         </li>
      </ul>
       <p>
        By integrating these elements into your daily routine, you can achieve a state of fitness that not only 
        enhances your physical abilities but also improves your overall quality of life.
       </p>
      </div>

      <div className="images-container">
        <img src={image1} alt="Fitness Image 1" />
        <img src={image2} alt="Fitness Image 2" />
        <img src={image3} alt="Fitness Image 3" />
      </div>
    </div>
  );
};

export default AboutFitness;
