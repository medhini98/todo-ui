// src/api/tasks.ts
import type { Task, CreateTaskInput } from "../types/task";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export async function createTask(
  input: CreateTaskInput
): Promise<Task> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}