<?php
// app/Http/Controllers/TaskController.php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    public function __construct(private TaskService $taskService) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $filter = $request->query('filter');
        $tasks = $this->taskService->getAllTasks($filter);

        return TaskResource::collection($tasks);
    }

    public function store(CreateTaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask($request->validated());

        return response()->json(
            [
                'message' => 'Task created successfully',
                'data' => new TaskResource($task),
            ],
            201,
        );
    }

    public function update(int $id): JsonResponse
    {
        $task = $this->taskService->toggleTask($id);

        if (!$task) {
            return response()->json(
                [
                    'message' => 'Task not found',
                ],
                404,
            );
        }

        return response()->json([
            'message' => 'Task updated successfully',
            'data' => new TaskResource($task),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->taskService->deleteTask($id);

        if (!$deleted) {
            return response()->json(
                [
                    'message' => 'Task not found',
                ],
                404,
            );
        }

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
