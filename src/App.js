// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Registration from './pages/Registration';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            {/* Redirect /home to /leaderboard */}
            <Route path="/home" element={<Navigate to="/leaderboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
