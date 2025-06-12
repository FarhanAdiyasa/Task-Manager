// src/services/api.ts

import axios from 'axios';
import type { CreateTaskData,Task, TaskFilter } from '../types/task';
const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const taskApi = {
  getTasks: async (filter?: TaskFilter): Promise<Task[]> => {
    const params = filter && filter !== 'all' ? { filter } : {};
    const response = await api.get('/tasks', { params });
    return response.data.data;
  },

  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data.data;
  },

  toggleTask: async (id: number): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`);
    return response.data.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};