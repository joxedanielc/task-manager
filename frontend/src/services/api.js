import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  signup: async (userData) => {
    return await api.post("/auth/signup", userData);
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getAuthHeaders: () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export const taskService = {
  getAll: async () => {
    const response = await api.get("/tasks", {
      headers: authService.getAuthHeaders(),
    });
    return response.data;
  },
  create: async (taskData) => {
    return await api.post("/tasks", taskData, {
      headers: authService.getAuthHeaders(),
    });
  },
  update: async (id, taskData) => {
    return await api.put(`/tasks/${id}`, taskData, {
      headers: authService.getAuthHeaders(),
    });
  },
  delete: async (id) => {
    return await api.delete(`/tasks/${id}`, {
      headers: authService.getAuthHeaders(),
    });
  },
};
