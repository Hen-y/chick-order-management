
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', broiler: 24, village: 16 },
  { name: 'Tue', broiler: 42, village: 28 },
  { name: 'Wed', broiler: 18, village: 12 },
  { name: 'Thu', broiler: 32, village: 24 },
  { name: 'Fri', broiler: 45, village: 36 },
  { name: 'Sat', broiler: 16, village: 8 },
  { name: 'Sun', broiler: 8, village: 4 },
];

const WeeklyReportChart = () => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar dataKey="broiler" name="Broiler Chicks" fill="#5B8C32" />
          <Bar dataKey="village" name="Village Chicks" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyReportChart;
