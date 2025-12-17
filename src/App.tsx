import { useEffect, useState } from "react";
import type { Task } from "./types/task";
import { getTasks, createTask, toggleTask, deleteTask } from "./api/tasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBanner from "./components/ErrorBanner";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setIsPageLoading(false));
  }, []);

  async function handleCreateTask(input: { title: string }) {
    setIsSubmitting(true);
    try {
      const newTask = await createTask(input);
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleTask(id: string, completed: boolean) {
    try {
      const updated = await toggleTask(id, completed);
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch {
      setError("Failed to update task");
    }
  }

  async function handleDeleteTask(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete task");
    }
  }

  if (isPageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-container">
      <h1>Tasks</h1>

      {error && <ErrorBanner message={error} />}

      <TaskForm onSubmit={handleCreateTask} isSubmitting={isSubmitting} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}