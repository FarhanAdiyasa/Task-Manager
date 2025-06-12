// src/types/task.ts

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string;
  is_overdue: boolean;
  created_at: string;
  updated_at: string;
}

export type TaskFilter = 'all' | 'completed' | 'incomplete';

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date?: string;
}