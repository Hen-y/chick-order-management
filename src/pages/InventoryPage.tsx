
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

const InventoryPage = () => {
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
                    <span className="text-3xl font-bold text-[#5B8C32]">{mockInventoryData.weeklyBroiler}</span>
                    <span className="text-gray-500 mt-2">Broiler Chicks</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-amber-50 rounded-lg p-4">
                    <span className="text-3xl font-bold text-[#F59E0B]">{mockInventoryData.weeklyVillage}</span>
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
                {mockInventoryData.monthlyRecords.map((record, index) => (
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
                    {mockInventoryData.monthlyRecords.reduce((sum, record) => sum + record.broiler, 0)}
                  </TableCell>
                  <TableCell className="font-bold">
                    {mockInventoryData.monthlyRecords.reduce((sum, record) => sum + record.village, 0)}
                  </TableCell>
                  <TableCell className="font-bold">
                    {mockInventoryData.monthlyRecords.reduce((sum, record) => sum + record.broiler + record.village, 0)}
                  </TableCell>
                  <TableCell className="font-bold">
                    {mockInventoryData.monthlyRecords.reduce((sum, record) => sum + record.revenue, 0)} Kwacha
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
