// src/components/TaskForm.tsx
import { useState } from "react";
import type { CreateTaskInput } from "../types/task";
import { validateTask } from "../utils/validateTask";

interface Props {
  onSubmit: (input: CreateTaskInput) => Promise<void>;
  isSubmitting: boolean;
}

export default function TaskForm({ onSubmit, isSubmitting }: Props) {
  const [title, setTitle] = useState("");
  const errors = validateTask({ title });

  const hasErrors = Boolean(errors.title);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!hasErrors) {
          onSubmit({ title });
          setTitle("");
        }
      }}
    >
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {errors.title && <div>{errors.title}</div>}

      <button type="submit" disabled={hasErrors || isSubmitting}>
        Add Task
      </button>
    </form>
  );
}