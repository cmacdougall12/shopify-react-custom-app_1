import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const createUser = (payload) => api.post(`/users`, payload);
export const getUsers = () => api.get(`/users`);
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = (id) => api.delete(`/users/${id}`);
export const getUserById = (id) => api.get(`/users/${id}`);
export const createConversation = (payload) => api.post(`/users`, payload);
export const getConversationsByUserId = (id) => api.get(`/conversations/${id}`);
export const addMessageToConversation = (id, text, receipient) =>
  api.put(`conversations/${id}`, { text, receipient });
export const deleteConversationById = (id) => api.delete(`conversations/${id}`);

const apis = {
  createUser,
  getUsers,
  updateUser,
  deleteUserById,
  getUserById,
};

export default apis;
