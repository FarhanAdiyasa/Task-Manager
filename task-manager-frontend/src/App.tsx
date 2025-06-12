// src/App.tsx

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskFilterComponent from './components/TaskFilter';
import { useTasks } from './hooks/useTasks';
import type{ TaskFilter } from './types/task';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const TaskManager: React.FC = () => {
  const [filter, setFilter] = useState<TaskFilter>('all');
  const { data: tasks = [], isLoading, error } = useTasks(filter);
  const { data: allTasks = [] } = useTasks('all');

  const taskCounts = {
    all: allTasks.length,
    completed: allTasks.filter(task => task.completed).length,
    incomplete: allTasks.filter(task => !task.completed).length,
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Tasks</h2>
          <p className="text-gray-600">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </header>

        <TaskForm />

        <TaskFilterComponent
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'No tasks yet. Create your first task above!' 
                  : `No ${filter} tasks found.`
                }
              </p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskManager />
    </QueryClientProvider>
  );
};

export default App;