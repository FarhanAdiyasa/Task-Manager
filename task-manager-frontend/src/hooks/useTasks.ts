// src/hooks/useTasks.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../services/api';
import type { CreateTaskData, TaskFilter } from '../types/task';

export const useTasks = (filter: TaskFilter = 'all') => {
  return useQuery({
    queryKey: ['tasks', filter],
    queryFn: () => taskApi.getTasks(filter),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => taskApi.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useToggleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskApi.toggleTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};