// src/components/TaskList.tsx
import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}