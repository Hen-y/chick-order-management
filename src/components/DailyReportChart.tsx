
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const defaultData = [
  { name: '8 AM', broiler: 0, village: 0 },
  { name: '9 AM', broiler: 0, village: 0 },
  { name: '10 AM', broiler: 0, village: 0 },
  { name: '11 AM', broiler: 0, village: 0 },
  { name: '12 PM', broiler: 0, village: 0 },
  { name: '1 PM', broiler: 0, village: 0 },
  { name: '2 PM', broiler: 0, village: 0 },
  { name: '3 PM', broiler: 0, village: 0 },
  { name: '4 PM', broiler: 0, village: 0 },
  { name: '5 PM', broiler: 0, village: 0 },
];

const DailyReportChart = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Load data from localStorage or use default
    const storedData = localStorage.getItem('dailyChartData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setData(parsedData);
        } else {
          // If empty array or invalid, initialize with defaults
          localStorage.setItem('dailyChartData', JSON.stringify(defaultData));
        }
      } catch (e) {
        console.error('Error parsing daily chart data:', e);
        localStorage.setItem('dailyChartData', JSON.stringify(defaultData));
      }
    } else {
      // Initialize if not exists
      localStorage.setItem('dailyChartData', JSON.stringify(defaultData));
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
