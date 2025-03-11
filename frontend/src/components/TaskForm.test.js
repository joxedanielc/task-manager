import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";

test("muestra valores iniciales al editar", () => {
  const task = {
    title: "Tarea existente",
    description: "Descripción existente",
    status: "en progreso",
  };

  render(<TaskForm open={true} taskToEdit={task} />);

  expect(screen.getByDisplayValue("Tarea existente")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Descripción existente")).toBeInTheDocument();
  expect(screen.getByDisplayValue("en progreso")).toBeInTheDocument();
});

test("valida campo obligatorio", async () => {
  render(<TaskForm open={true} />);
  fireEvent.change(screen.getByLabelText("Título"), { target: { value: "" } });
  expect(screen.getByRole("button", { name: /guardar/i })).toBeDisabled();
});
