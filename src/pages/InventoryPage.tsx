import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { mockInventoryData } from "../data/mockData";
import InventorySummary from "../components/InventorySummary";

const defaultMonthlyRecords = [];

const InventoryPage = () => {
  const [weeklyDistribution, setWeeklyDistribution] = useState({
    weeklyBroiler: mockInventoryData.weeklyBroiler,
    weeklyVillage: mockInventoryData.weeklyVillage
  });
  
  const [monthlyRecords, setMonthlyRecords] = useState(mockInventoryData.monthlyRecords);

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      // Load weekly distribution data
      const storedWeeklyData = localStorage.getItem('weeklyDistribution');
      if (storedWeeklyData) {
        try {
          const parsedData = JSON.parse(storedWeeklyData);
          setWeeklyDistribution({
            weeklyBroiler: parsedData.weeklyBroiler ?? mockInventoryData.weeklyBroiler,
            weeklyVillage: parsedData.weeklyVillage ?? mockInventoryData.weeklyVillage
          });
        } catch (e) {
          console.error('Error parsing weekly distribution data:', e);
          setWeeklyDistribution({
            weeklyBroiler: 0,
            weeklyVillage: 0
          });
        }
      } else {
        // Initialize if not exists
        localStorage.setItem('weeklyDistribution', JSON.stringify({
          weeklyBroiler: mockInventoryData.weeklyBroiler,
          weeklyVillage: mockInventoryData.weeklyVillage
        }));
      }
      
      // Load monthly records data
      const storedMonthlyData = localStorage.getItem('monthlyInventoryRecords');
      if (storedMonthlyData) {
        try {
          const parsedData = JSON.parse(storedMonthlyData);
          if (Array.isArray(parsedData)) {
            setMonthlyRecords(parsedData);
          } else {
            // If invalid data format, use empty array
            setMonthlyRecords(defaultMonthlyRecords);
          }
        } catch (e) {
          console.error('Error parsing monthly records data:', e);
          setMonthlyRecords(defaultMonthlyRecords);
        }
      } else {
        // Initialize if not exists
        localStorage.setItem('monthlyInventoryRecords', JSON.stringify(mockInventoryData.monthlyRecords));
      }
    };

    // Load initial data
    loadDataFromLocalStorage();

    // Listen for reset events
    const handleReset = () => {
      setWeeklyDistribution({
        weeklyBroiler: 0,
        weeklyVillage: 0
      });
      
      setMonthlyRecords(defaultMonthlyRecords);
    };

    window.addEventListener('reportsReset', handleReset);
    window.addEventListener('inventoryReset', handleReset);
    
    return () => {
      window.removeEventListener('reportsReset', handleReset);
      window.removeEventListener('inventoryReset', handleReset);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-6">Inventory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Current Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <InventorySummary />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Weekly Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-4">
                    <span className="text-3xl font-bold text-[#5B8C32]">{weeklyDistribution.weeklyBroiler}</span>
                    <span className="text-gray-500 mt-2">Broiler Chicks</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-amber-50 rounded-lg p-4">
                    <span className="text-3xl font-bold text-[#F59E0B]">{weeklyDistribution.weeklyVillage}</span>
                    <span className="text-gray-500 mt-2">Village Chicks</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Inventory Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead>Broiler Chicks</TableHead>
                  <TableHead>Village Chicks</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyRecords.length > 0 ? (
                  <>
                    {monthlyRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">Week {record.week}</TableCell>
                        <TableCell>{record.broiler}</TableCell>
                        <TableCell>{record.village}</TableCell>
                        <TableCell>{record.broiler + record.village}</TableCell>
                        <TableCell>{record.revenue} Kwacha</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="font-bold">
                        {monthlyRecords.reduce((sum, record) => sum + record.broiler, 0)}
                      </TableCell>
                      <TableCell className="font-bold">
                        {monthlyRecords.reduce((sum, record) => sum + record.village, 0)}
                      </TableCell>
                      <TableCell className="font-bold">
                        {monthlyRecords.reduce((sum, record) => sum + record.broiler + record.village, 0)}
                      </TableCell>
                      <TableCell className="font-bold">
                        {monthlyRecords.reduce((sum, record) => sum + record.revenue, 0)} Kwacha
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">No records available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
