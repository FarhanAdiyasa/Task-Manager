<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log; // Add this line

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'completed', 'due_date'];

    protected $casts = [
        'completed' => 'boolean',
        'due_date' => 'date',
    ];

    public function getIsOverdueAttribute(): bool
    {
        // Debugging output
        Log::debug('Due Date:', [$this->due_date]);
        Log::debug('Completed:', [$this->completed]);

        // Check if the due date exists and if the task is not completed
        if ($this->due_date) {
            $startOfDay = $this->due_date->startOfDay();
            Log::debug('Start of Day Due Date:', [$startOfDay]);

            // Compare with today's midnight
            $todayMidnight = Carbon::today()->startOfDay();
            Log::debug('Today Midnight:', [$todayMidnight]);

            // Check if the due date is past and the task is not completed
            $isOverdue = !$this->completed && $startOfDay->isBefore($todayMidnight);
            Log::debug('Is Overdue:', [$isOverdue]);

            return $isOverdue;
        }

        return false;
    }
}
