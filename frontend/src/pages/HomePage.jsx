import { useState, useEffect } from 'react';
import { Button, Typography, CircularProgress,Stack } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { taskService } from '../services/api';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getAll();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Gestión de Tareas
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
        >
          Nueva Tarea
        </Button>

        <Button
          variant="outlined"
          component={RouterLink}
          to="/stats"
        >
          Ir a estadísticas
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      )}

      <TaskForm 
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={fetchTasks}
      />
    </>
  );
};

export default HomePage;