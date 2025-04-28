
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const defaultData = [
  { name: 'W4', broiler: 0, village: 0 },
  { name: 'W3', broiler: 0, village: 0 },
  { name: 'W2', broiler: 0, village: 0 },
];

const OrderStatistics = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Listen for reset events
    const handleReset = () => {
      setData(defaultData);
    };

    window.addEventListener('reportsReset', handleReset);
    
    return () => {
      window.removeEventListener('reportsReset', handleReset);
    };
  }, []);

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
