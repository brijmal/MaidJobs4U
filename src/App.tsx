import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Survey from './components/Survey';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-blue-500">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap');
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 14px;
          }
        `}
      </style>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;