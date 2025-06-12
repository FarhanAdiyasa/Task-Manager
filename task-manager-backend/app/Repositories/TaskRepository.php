<?php
// app/Repositories/TaskRepository.php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    public function getAll(?string $filter = null): Collection
    {
        $query = Task::query()->orderBy('created_at', 'desc');

        return match ($filter) {
            'completed' => $query->where('completed', true)->get(),
            'incomplete' => $query->where('completed', false)->get(),
            default => $query->get(),
        };
    }

    public function create(array $data): Task
    {
        return Task::create($data);
    }

    public function findById(int $id): ?Task
    {
        return Task::find($id);
    }

    public function update(Task $task, array $data): Task
    {
        $task->update($data);
        return $task->fresh();
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }
}
