// src/pages/Leaderboard.js
import React, { useState, useEffect } from "react";
import { getAllUsers, getUserHistory } from "../api/user";
import Home from "./Home";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetches and sorts the leaderboard data
  const fetchUsers = async () => {
    const response = await getAllUsers();
    if (response.success) {
      setUsers(response.data.sort((a, b) => b.Points - a.Points));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateLeaderboard = async () => {
    // Re-fetch and sort leaderboard when points are claimed
    await fetchUsers();
  };

  const handleUserClick = async (username) => {
    const response = await getUserHistory(username);
    if (response.success) {
      setHistory(response.data);
      setSelectedUser(username);
      setShowModal(true);
    }
  };

  // Function to close the modal when the background is clicked
  const closeModal = () => {
    setShowModal(false);
    setHistory([]); // Clear history when closing the modal
  };

  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold">Leaderboard</h2>
      </div>

      {/* Render Home component with updateLeaderboard prop */}
      <Home updateLeaderboard={updateLeaderboard} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user, index) => (
          <div
            key={user.username}
            onClick={() => handleUserClick(user.username)}
            className="cursor-pointer p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-xl text-gray-800">{user.username}</p>
              <p className="text-lg font-semibold text-green-600">₹{user.Points}</p>
            </div>
            <p className="text-gray-500">Rank: {index + 1}</p>
          </div>
        ))}
      </div>

      {/* Modal for showing user history */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal} // Close modal on background click
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedUser}'s History</h3>
            {history.length > 0 ? (
              <ul className="space-y-3">
                {history.map((entry, index) => (
                  <li key={index} className="flex justify-between text-gray-700">
                    <span>Date: {entry.date}</span>
                    <span>Points: {entry.pointsAwarded}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No history available.</p>
            )}
            <button
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
              onClick={closeModal} // Close modal on button click
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
