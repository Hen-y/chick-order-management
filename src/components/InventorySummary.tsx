
import { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { mockInventoryData } from '../data/mockData';

const COLORS = ['#5B8C32', '#F59E0B'];

const defaultData = [
  { name: 'Broiler', value: 0 },
  { name: 'Village', value: 0 },
];

const InventorySummary = () => {
  const [data, setData] = useState([
    { name: 'Broiler', value: mockInventoryData.totalBroiler },
    { name: 'Village', value: mockInventoryData.totalVillage },
  ]);

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const storedData = localStorage.getItem('inventorySummary');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setData([
            { name: 'Broiler', value: parsedData.totalBroiler || 0 },
            { name: 'Village', value: parsedData.totalVillage || 0 }
          ]);
        } catch (e) {
          console.error('Error parsing inventory summary data:', e);
          // Use default values on error
          setData(defaultData);
        }
      } else {
        // Initialize if not exists
        localStorage.setItem('inventorySummary', JSON.stringify({
          totalBroiler: mockInventoryData.totalBroiler,
          totalVillage: mockInventoryData.totalVillage
        }));
      }
    };

    // Load initial data
    loadDataFromLocalStorage();

    // Listen for reset events
    const handleReset = () => {
      setData(defaultData);
    };

    window.addEventListener('reportsReset', handleReset);
    window.addEventListener('inventoryReset', handleReset);
    
    return () => {
      window.removeEventListener('reportsReset', handleReset);
      window.removeEventListener('inventoryReset', handleReset);
    };
  }, []);

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} chicks`, '']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventorySummary;
