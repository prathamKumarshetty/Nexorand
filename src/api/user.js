// src/api/user.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/user/v1';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Error fetching users" };
  }
};

export const claimPoints = async (username) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/claim-points`, { username });
    return response.data;
  } catch (error) {
    console.error("Error claiming points:", error);
    return { success: false, message: "Error claiming points" };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return { success: false, message: "Error fetching all users" };
  }
};

export const getUserHistory = async (username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/your-history`, { username });
    return response.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    return { success: false, message: "Error fetching user history" };
  }
};
