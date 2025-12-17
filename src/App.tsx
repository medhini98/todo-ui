import { useEffect, useState } from "react";
import type { Task } from "./types/task";
import { getTasks, createTask } from "./api/tasks";
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

  if (isPageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {error && <ErrorBanner message={error} />}
      <TaskForm onSubmit={handleCreateTask} isSubmitting={isSubmitting} />
      <TaskList tasks={tasks} />
    </div>
  );
}