import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ display: "flex", gap: "8px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id, !task.completed)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#6b7280" : "inherit",
              }}
            >
              {task.title}
            </span>
          </label>

          <button
            aria-label={`delete-${task.id}`}
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}