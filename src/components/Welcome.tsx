import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      await navigator.permissions.query({ name: 'geolocation' });
      navigate('/survey');
    } catch (error) {
      console.error('Location permission denied');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome to <span className="text-pink-400">MaidJobs4U</span>
        </h1>
        <p className="text-white mb-4">
          Get the job you want in your locality
        </p>
        <p className="text-white mb-8">
          अपने क्षेत्र में अपनी पसंद की नौकरी पाएं
        </p>
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-full flex items-center justify-center space-x-2 mx-auto hover:opacity-90 transition-opacity"
        >
          <MapPin className="w-5 h-5" />
          <span>Start / शुरू करें</span>
        </button>
      </div>
    </div>
  );
}