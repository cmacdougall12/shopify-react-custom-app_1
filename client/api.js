import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const createUser = (payload) => api.post(`/users/new`, payload);
export const getUsers = () => api.get(`/users`);
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = (id) => api.delete(`/users/${id}`);
export const getUserById = (id) => api.get(`/users/${id}`);

const apis = {
  createUser,
  getUsers,
  updateUser,
  deleteUserById,
  getUserById,
};

export default apis;
