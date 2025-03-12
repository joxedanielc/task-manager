import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskChart from "./TaskChart";

describe("TaskChart component", () => {
  it("renders the chart with the given data", () => {
    const testData = [
      { status: "por hacer", count: 3 },
      { status: "en progreso", count: 2 },
      { status: "completada", count: 4 },
    ];

    render(
      <div style={{ width: 400, height: 400 }}>
        <TaskChart data={testData} />
      </div>
    );

    expect(screen.getByText("Distribución de Tareas")).toBeInTheDocument();
  });
});
