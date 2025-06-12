// src/components/TaskFilter.tsx

import React from 'react';
import type { TaskFilter } from '../types/task';

interface TaskFilterProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    completed: number;
    incomplete: number;
  };
}

const TaskFilterComponent: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'incomplete', label: 'Incomplete', count: taskCounts.incomplete },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex space-x-1">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentFilter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilterComponent;