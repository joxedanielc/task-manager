import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";
import { taskService } from "../services/api";

jest.mock("../services/api", () => ({
  taskService: {
    delete: jest.fn(),
  },
}));

describe("TaskList Component", () => {
  const sampleTasks = [
    { id: "1", title: "Task 1", description: "Desc 1", status: "por hacer" },
    { id: "2", title: "Task 2", description: "Desc 2", status: "en progreso" },
    { id: "3", title: "Task 3", description: "Desc 3", status: "completada" },
  ];

  let mockOnUpdate;

  beforeEach(() => {
    mockOnUpdate = jest.fn();
  });

  it("renders the table headers", () => {
    render(<TaskList tasks={sampleTasks} onUpdate={mockOnUpdate} />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("displays tasks in the table", () => {
    render(<TaskList tasks={sampleTasks} onUpdate={mockOnUpdate} />);

    sampleTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
    });
  });

  it("handles pagination: defaults to page=0 with 5 rows per page", () => {
    const extraTasks = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      title: `Task ${i + 1}`,
      description: `Desc ${i + 1}`,
      status: "por hacer",
    }));

    render(<TaskList tasks={extraTasks} onUpdate={mockOnUpdate} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`Task ${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText("Task 6")).not.toBeInTheDocument();
  });

  it("allows switching pages", () => {
    const tenTasks = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      title: `Task ${i + 1}`,
      description: `Desc ${i + 1}`,
      status: "por hacer",
    }));

    render(<TaskList tasks={tenTasks} onUpdate={mockOnUpdate} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 6")).not.toBeInTheDocument();

    const nextPageBtn = screen.getByLabelText("Go to next page");
    fireEvent.click(nextPageBtn);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 6")).toBeInTheDocument();
    expect(screen.getByText("Task 10")).toBeInTheDocument();
  });

  it("calls delete and onUpdate when delete icon is clicked", async () => {
    render(<TaskList tasks={sampleTasks} onUpdate={mockOnUpdate} />);

    const deleteButtons = screen.getAllByLabelText("delete");
    fireEvent.click(deleteButtons[0]);

    expect(taskService.delete).toHaveBeenCalledWith("1");

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  it("opens edit form when edit icon is clicked", () => {
    render(<TaskList tasks={sampleTasks} onUpdate={mockOnUpdate} />);

    const editButtons = screen.getAllByLabelText("edit");
    fireEvent.click(editButtons[1]);

    const editFormTitle = screen.getByText(/Editar Tarea/i);

    expect(editFormTitle).toBeInTheDocument();
  });
});
