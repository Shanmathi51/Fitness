import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import bg from '../assets/ftvideo.mp4';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleEventClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error('Please log in to view the event.');
    }
  };

  const handleMenuClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error('Please log in to view the menu.');
    }
  };

  return (
    <>
      <div className="header">
        {/* <img src="data:image/jpeg;base64,/..." alt="Header Logo" /> */}
        {/* Add other header elements here */}
      </div>

      <div className="section-home">
        <video autoPlay loop muted className="background-video">
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <h2>Welcome to Fitness Tracker</h2>
          <p>Your personal companion to track and achieve your fitness goals.</p>
          <button className="cta-button">
            <Link to="/ft1" className='url'>Start Without Login</Link>
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Home;
