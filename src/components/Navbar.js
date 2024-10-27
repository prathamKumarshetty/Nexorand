// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // Don't render the navbar until loading is complete

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-300">
          Register
        </Link>
        <Link to="/home" className="hover:text-gray-300">
          Home
        </Link>
      </div>
      <p className="font-semibold">LeaderBoard</p>
    </nav>
  );
};

export default Navbar;
