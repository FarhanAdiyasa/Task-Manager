<?php
// app/Services/TaskService.php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    public function __construct(private TaskRepository $taskRepository) {}

    public function getAllTasks(?string $filter = null): Collection
    {
        return $this->taskRepository->getAll($filter);
    }

    public function createTask(array $data): Task
    {
        return $this->taskRepository->create($data);
    }

    public function toggleTask(int $id): ?Task
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return null;
        }

        return $this->taskRepository->update($task, [
            'completed' => !$task->completed,
        ]);
    }

    public function deleteTask(int $id): bool
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return false;
        }

        return $this->taskRepository->delete($task);
    }
}
