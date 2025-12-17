// src/utils/validateTask.ts

import type { CreateTaskInput } from "../types/task";
import type { TaskFormErrors } from "../types/validation";

export function validateTask(input: CreateTaskInput): TaskFormErrors {
  const errors: TaskFormErrors = {};

  const title = input.title.trim();

  if (!title) {
    errors.title = "Title is required";
  } else if (title.length > 100) {
    errors.title = "Title must be under 100 characters";
  }

  if (input.description && input.description.length > 300) {
    errors.description = "Description must be under 300 characters";
  }

  return errors;
}