
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', broiler: 120, village: 85 },
  { name: 'Week 2', broiler: 160, village: 110 },
  { name: 'Week 3', broiler: 140, village: 95 },
  { name: 'Week 4', broiler: 180, village: 115 },
];

const MonthlyReportChart = () => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="broiler" 
            name="Broiler Chicks" 
            stroke="#5B8C32" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="village" 
            name="Village Chicks" 
            stroke="#F59E0B" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyReportChart;
