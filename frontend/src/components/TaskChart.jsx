import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const TaskChart = ({ data }) => {
  return (
    <div style={{ height: 400 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Distribución de Tareas
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} tareas`, name]} 
            contentStyle={{ 
              borderRadius: 8,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;