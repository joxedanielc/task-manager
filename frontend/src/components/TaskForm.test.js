import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";

describe("TaskForm Component", () => {
  test("shows initial values when editing", () => {
    const task = {
      title: "Tarea existente",
      description: "Descripción existente",
      status: "en progreso",
    };

    render(<TaskForm open={true} taskToEdit={task} />);

    expect(screen.getByDisplayValue("Tarea existente")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Descripción existente")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("en progreso")).toBeInTheDocument();
  });

  test("validates required fields", () => {
    render(<TaskForm open={true} />);

    const titleInput = screen.getByRole("textbox", { name: /título/i });

    fireEvent.change(titleInput, { target: { value: "" } });
    expect(screen.getByRole("button", { name: /guardar/i })).toBeDisabled();
  });
});
