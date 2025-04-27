
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'W4', broiler: 50, village: 25 },
  { name: 'W3', broiler: 100, village: 0 },
  { name: 'W2', broiler: 0, village: 75 },
];

const OrderStatistics = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="broiler" fill="#5B8C32" stackId="a" />
          <Bar dataKey="village" fill="#F59E0B" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatistics;
