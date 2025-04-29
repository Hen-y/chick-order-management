
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
    // Load data from localStorage or use default
    const storedData = localStorage.getItem('orderStatisticsData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setData(parsedData);
        } else {
          // If empty array or invalid, initialize with defaults
          localStorage.setItem('orderStatisticsData', JSON.stringify(defaultData));
        }
      } catch (e) {
        console.error('Error parsing order statistics data:', e);
        localStorage.setItem('orderStatisticsData', JSON.stringify(defaultData));
      }
    } else {
      // Initialize if not exists
      localStorage.setItem('orderStatisticsData', JSON.stringify(defaultData));
    }

    // Listen for reset events
    const handleReset = () => {
      setData(defaultData);
      localStorage.setItem('orderStatisticsData', JSON.stringify(defaultData));
    };

    window.addEventListener('reportsReset', handleReset);
    window.addEventListener('inventoryReset', handleReset);
    
    return () => {
      window.removeEventListener('reportsReset', handleReset);
      window.removeEventListener('inventoryReset', handleReset);
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
