// src/pages/LoadingBookings.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
const LoadingBookings = () => {
  const navigate = useNavigate();

  useEffect(() => {

    
    const timer = setTimeout(() => {
      navigate('/my-bookings');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-4">

      {/* <h1 className="text-2xl font-semibold mb-4 text-primary">QuikScreen</h1> */}
      <img src={assets.logo} alt="" className='w-36 h-auto mb-4' />
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-50 mb-6"></div>
      <p className="text-lg font-medium text-gray-700 mb-2">We’re confirming your booking…</p>
      <p className="text-gray-500">Hang tight! You’ll be redirected to your bookings page shortly.</p>
    </div>
  );
};

export default LoadingBookings;
