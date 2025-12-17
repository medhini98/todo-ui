// src/tests/TaskPage.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../App";
import * as taskApi from "../api/tasks";

vi.mock("../api/tasks");

describe("Task Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("shows loading spinner while fetching tasks", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([]);

    render(<App />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(taskApi.getTasks).toHaveBeenCalled()
    );
  });

  test("renders tasks after successful fetch", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([
      { id: 1, title: "Test Task", completed: false },
    ]);

    render(<App />);

    expect(await screen.findByText("Test Task")).toBeInTheDocument();
  });

  test("disables submit button when validation fails", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([]);

    render(<App />);

    const submitButton = await screen.findByRole("button", {
      name: /add task/i,
    });

    expect(submitButton).toBeDisabled();
  });

  test("creates a task successfully", async () => {
    vi.mocked(taskApi.getTasks).mockResolvedValueOnce([]);
    vi.mocked(taskApi.createTask).mockResolvedValueOnce({
      id: 2,
      title: "New Task",
      completed: false,
    });

    render(<App />);

    const input = await screen.findByPlaceholderText(/task title/i);
    const button = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(input, "New Task");
    await userEvent.click(button);

    expect(taskApi.createTask).toHaveBeenCalledWith({
      title: "New Task",
    });
  });

  test("shows API error banner on failure", async () => {
    vi.mocked(taskApi.getTasks).mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<App />);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});