import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as taskApi from "../api/tasks";

vi.mock("../api/tasks", () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  toggleTask: vi.fn(),
  deleteTask: vi.fn(),
}));

const mockTasks = [
  {
    id: "1",
    title: "Learn FastAPI",
    description: undefined,
    completed: false,
    created_at: new Date().toISOString(),
  },
];

describe("Task Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading spinner while fetching tasks", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([]);
    render(<App />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    await waitFor(() => expect(taskApi.getTasks).toHaveBeenCalled());
  });

  it("renders tasks after successful fetch", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce(mockTasks);
    render(<App />);
    expect(await screen.findByText("Learn FastAPI")).toBeInTheDocument();
  });

  it("disables submit button when validation fails", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([]);
    render(<App />);
    const submitButton = await screen.findByRole("button", {
      name: /add task/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it("creates a task successfully", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([]);
    vi.mocked(taskApi.createTask).mockResolvedValueOnce({
      id: "2",
      title: "New Task",
      description: undefined,
      completed: false,
      created_at: new Date().toISOString(),
    });

    render(<App />);

    const input = await screen.findByPlaceholderText(/task title/i);
    const button = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(input, "New Task");
    await userEvent.click(button);

    expect(taskApi.createTask).toHaveBeenCalledWith({ title: "New Task" });
  });

  it("deletes a task when delete button is clicked", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce(mockTasks);
    vi.mocked(taskApi.deleteTask).mockResolvedValueOnce();

    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    render(<App />);

    const deleteButton = await screen.findByLabelText("delete-1");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(taskApi.deleteTask).toHaveBeenCalledWith("1");
    });

    await waitFor(() => {
      expect(screen.queryByText("Learn FastAPI")).not.toBeInTheDocument();
    });
  });

  it("toggles task completion when checkbox is clicked", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce(mockTasks);
    vi.mocked(taskApi.toggleTask).mockResolvedValueOnce({
      ...mockTasks[0],
      completed: true,
    });

    render(<App />);

    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(taskApi.toggleTask).toHaveBeenCalledWith("1", true);
    });
  });

  it("shows error if toggle fails", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce(mockTasks);
    vi.mocked(taskApi.toggleTask).mockRejectedValueOnce(
      new Error("Toggle failed")
    );

    render(<App />);

    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to update task"
      );
    });
  });

  it("does not delete task if user cancels confirmation", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce(mockTasks);

    vi.spyOn(window, "confirm").mockReturnValueOnce(false);

    render(<App />);

    const deleteButton = await screen.findByLabelText("delete-1");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(taskApi.deleteTask).not.toHaveBeenCalled();
    });

    expect(screen.getByText("Learn FastAPI")).toBeInTheDocument();
  });
});