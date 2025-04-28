
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const defaultData = [
  { name: 'Week 1', broiler: 0, village: 0 },
  { name: 'Week 2', broiler: 0, village: 0 },
  { name: 'Week 3', broiler: 0, village: 0 },
  { name: 'Week 4', broiler: 0, village: 0 },
];

const MonthlyReportChart = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Load data from localStorage or use default
    const storedData = localStorage.getItem('monthlyChartData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setData(parsedData);
        } else {
          // If empty array or invalid, initialize with defaults
          localStorage.setItem('monthlyChartData', JSON.stringify(defaultData));
        }
      } catch (e) {
        console.error('Error parsing monthly chart data:', e);
        localStorage.setItem('monthlyChartData', JSON.stringify(defaultData));
      }
    } else {
      // Initialize if not exists
      localStorage.setItem('monthlyChartData', JSON.stringify(defaultData));
    }

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
