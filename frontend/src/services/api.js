import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "X-API-Key": process.env.REACT_APP_API_KEY,
  },
});

export const taskService = {
  getAll: () => api.get("/tasks"),
  create: (task) => api.post("/tasks", task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`),
};
