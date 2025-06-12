// src/components/TaskItem.tsx

import React from 'react';
import type { Task } from '../types/task';
import { useToggleTask, useDeleteTask } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const toggleTaskMutation = useToggleTask();
  const deleteTaskMutation = useDeleteTask();

  const handleToggle = () => {
    toggleTaskMutation.mutate(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(task.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
      task.completed ? 'border-green-500' : task.is_overdue ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={toggleTaskMutation.isPending}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          
          <div className="flex-1">
            <h3 className={`font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mt-1 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>Created: {formatDate(task.created_at)}</span>
              
              {task.due_date && (
                <span className={`${
                  task.is_overdue ? 'text-red-600 font-medium' : 'text-gray-500'
                }`}>
                  Due: {formatDate(task.due_date)}
                  {task.is_overdue && ' (Overdue)'}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleteTaskMutation.isPending}
          className="text-red-600 hover:text-red-800 disabled:opacity-50"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;