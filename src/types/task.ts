// src/types/task.ts
// Represents a task returned by the basic API
export type Task = {
  id: string;              // UUID
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
};

// Payload when creating a new task
export type CreateTaskInput = {
  title: string;
};

// Payload when updating an existing task
export type UpdateTaskInput = {
  title?: string;
  completed?: boolean;
};

// Generic API error shape (optional, fine to keep)
export interface ApiError {
  message: string;
}