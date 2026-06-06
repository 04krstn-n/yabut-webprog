import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/api/users`,
  withCredentials: true,
});

// Fetch users (admin only)
export const fetchUsers = (config) =>
  API.get("/", config);

// Admin create user
export const addUser = (userData, config) =>
  API.post("/", userData, config);

// Public signup
export const createUser = (userData) =>
  API.post("/signup", userData);

// Update user
export const updateUser = (
  id,
  user,
  config
) => API.put(`/${id}`, user, config);

// Delete user
export const deleteUser = (
  id,
  config
) => API.delete(`/${id}`, config);

// Login user
export const loginUser = (
  credentials
) => API.post("/login", credentials);