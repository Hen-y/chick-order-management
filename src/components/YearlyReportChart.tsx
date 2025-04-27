
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', broiler: 400, village: 240 },
  { name: 'Feb', broiler: 380, village: 218 },
  { name: 'Mar', broiler: 450, village: 280 },
  { name: 'Apr', broiler: 430, village: 270 },
  { name: 'May', broiler: 410, village: 250 },
  { name: 'Jun', broiler: 500, village: 320 },
  { name: 'Jul', broiler: 480, village: 300 },
  { name: 'Aug', broiler: 460, village: 290 },
  { name: 'Sep', broiler: 510, village: 330 },
  { name: 'Oct', broiler: 520, village: 340 },
  { name: 'Nov', broiler: 480, village: 310 },
  { name: 'Dec', broiler: 540, village: 360 },
];

const YearlyReportChart = () => {
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
