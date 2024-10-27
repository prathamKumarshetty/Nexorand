// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { claimPoints, getUsers } from "../api/user";

const Home = ({ updateLeaderboard }) => {
  const [friends, setFriends] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const response = await getUsers();
    if (response.success) {
      // Sort friends by points in descending order
      const sortedFriends = response.data.sort((a, b) => b.Points - a.Points);
      setFriends(sortedFriends);
    }
  };

  const handleClaimPoints = async (username) => {
    const response = await claimPoints(username);
    if (response.success) {
      setNotification(`Points claimed successfully for ${username}`);
      setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
      fetchFriends(); // Refresh the friends list
      updateLeaderboard(); // Notify leaderboard to refresh
    }
  };

  return (
    <div className="p-4">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded shadow">
          {notification}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Friends List</h2>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend.username} className="mb-2 flex justify-between items-center p-4 bg-gray-100 rounded shadow">
            <span>{friend.username} - {friend.Points} points</span>
            <button
              onClick={() => handleClaimPoints(friend.username)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Claim Points
            </button>
          </div>
        ))
      ) : (
        <p>No friends to display.</p>
      )}
    </div>
  );
};

export default Home;
