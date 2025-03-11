import { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import TaskChart from '../components/TaskChart';
import { taskService } from '../services/api';

const StatsPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await taskService.getAll();
        const tasks = response.data;
        
        const statusCounts = tasks.reduce((acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(statusCounts).map(([status, count]) => ({
          status,
          count
        }));

        setStats(chartData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Estadísticas de Tareas
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : stats.length > 0 ? (
        <TaskChart data={stats} />
      ) : (
        <Typography variant="body1">No hay datos para mostrar</Typography>
      )}
    </>
  );
};

export default StatsPage;