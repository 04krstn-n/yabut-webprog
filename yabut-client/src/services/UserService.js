import axios from 'axios';
import constants from '../constants';

const API_URL = 'http://localhost:8000/api/auth';
// API Access to Front-end JSON data transformation or decoder
const API = axios.create({
    baseURL: `${constants.HOST}/users`,
});

// Fetch users
export const fetchUsers = (user) => API.get('/', user);

export const createUser = (userData) => {
  return API.post(`/signup`, userData);
};

// Update user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// Delete user
export const deleteUser = (id) => API.delete(`/${id}`);

// Login user
export const loginUser = (credentials) => API.post('/login', credentials);