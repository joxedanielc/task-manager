import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Chip,
  LinearProgress,
  TablePagination,
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedTasks = tasks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>

                <TableCell>{task.description}</TableCell>

                <TableCell>
                  <Chip label={task.status} color={statusColors[task.status]} />
                  {deletingId === task.id && <LinearProgress />}
                </TableCell>

                <TableCell align="center">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={tasks.length}        
          page={page}                 
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage} 
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </TableContainer>

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