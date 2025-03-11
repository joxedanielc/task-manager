import {
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { taskService } from "../services/api";
import { useState } from "react";
import TaskForm from "./TaskForm";

const statusColors = {
  "por hacer": "default",
  "en progreso": "primary",
  completada: "success",
};

const TaskList = ({ tasks, onUpdate }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await taskService.delete(id);
      onUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setEditingTask(task)}
                >
                  <Edit />
                </IconButton>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={task.title} secondary={task.description} />
            <Chip
              label={task.status}
              color={statusColors[task.status]}
              sx={{ ml: 2 }}
            />
            {deletingId === task.id && (
              <LinearProgress sx={{ width: "100%" }} />
            )}
          </ListItem>
        ))}
      </List>

      <TaskForm
        open={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onSuccess={() => {
          onUpdate();
          setEditingTask(null);
        }}
        taskToEdit={editingTask}
      />
    </>
  );
};

export default TaskList;
