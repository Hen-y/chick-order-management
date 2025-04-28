
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const defaultData = [
  { name: 'Jan', broiler: 0, village: 0 },
  { name: 'Feb', broiler: 0, village: 0 },
  { name: 'Mar', broiler: 0, village: 0 },
  { name: 'Apr', broiler: 0, village: 0 },
  { name: 'May', broiler: 0, village: 0 },
  { name: 'Jun', broiler: 0, village: 0 },
  { name: 'Jul', broiler: 0, village: 0 },
  { name: 'Aug', broiler: 0, village: 0 },
  { name: 'Sep', broiler: 0, village: 0 },
  { name: 'Oct', broiler: 0, village: 0 },
  { name: 'Nov', broiler: 0, village: 0 },
  { name: 'Dec', broiler: 0, village: 0 },
];

const YearlyReportChart = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Load data from localStorage or use default
    const storedData = localStorage.getItem('yearlyChartData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setData(parsedData);
        } else {
          // If empty array or invalid, initialize with defaults
          localStorage.setItem('yearlyChartData', JSON.stringify(defaultData));
        }
      } catch (e) {
        console.error('Error parsing yearly chart data:', e);
        localStorage.setItem('yearlyChartData', JSON.stringify(defaultData));
      }
    } else {
      // Initialize if not exists
      localStorage.setItem('yearlyChartData', JSON.stringify(defaultData));
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
        <AreaChart
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
          <Area 
            type="monotone" 
            dataKey="broiler" 
            name="Broiler Chicks" 
            stackId="1"
            fill="#5B8C32" 
            stroke="#5B8C32"
            fillOpacity={0.6}
          />
          <Area 
            type="monotone" 
            dataKey="village" 
            name="Village Chicks" 
            stackId="1"
            fill="#F59E0B" 
            stroke="#F59E0B"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyReportChart;
