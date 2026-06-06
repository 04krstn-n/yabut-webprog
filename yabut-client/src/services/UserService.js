import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/api/users`,
  withCredentials: true,
});

// Fetch users (admin only)
export const fetchUsers = (user) => API.get('/', user);

// Public signup
export const createUser = (userData) => API.post('/signup', userData);

// Update user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// Delete user
export const deleteUser = (id) => API.delete(`/${id}`);

// Login user
export const loginUser = (credentials) => API.post('/login', credentials);