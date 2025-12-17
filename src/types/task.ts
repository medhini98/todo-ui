// src/types/task.ts

// Represents a task returned by the API
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Payload when creating a new task
export interface CreateTaskInput {
  title: string;
  description?: string;
}

// Payload when updating an existing task
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Generic API error shape (for UI error handling)
export interface ApiError {
  message: string;
}