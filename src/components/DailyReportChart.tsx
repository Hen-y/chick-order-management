
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '8 AM', broiler: 0, village: 0 },
  { name: '9 AM', broiler: 2, village: 1 },
  { name: '10 AM', broiler: 5, village: 3 },
  { name: '11 AM', broiler: 8, village: 4 },
  { name: '12 PM', broiler: 3, village: 1 },
  { name: '1 PM', broiler: 0, village: 2 },
  { name: '2 PM', broiler: 4, village: 6 },
  { name: '3 PM', broiler: 9, village: 5 },
  { name: '4 PM', broiler: 3, village: 2 },
  { name: '5 PM', broiler: 1, village: 0 },
];

const DailyReportChart = () => {
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

export default DailyReportChart;
