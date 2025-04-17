import axios from 'axios';

// Update with your EC2 public IP or domain
const API_BASE = 'http://13.54.214.19';
// const API_BASE = 'http://localhost:3000';

export const getUsers = async () => {
  const res = await axios.get(`${API_BASE}/api/users`);
  return res.data;
};

export const createUser = async (userData) => {
  const res = await axios.post(`${API_BASE}/api/users`, userData);
  return res.data;
};
