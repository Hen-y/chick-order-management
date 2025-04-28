
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DailyReportChart from "../components/DailyReportChart";
import WeeklyReportChart from "../components/WeeklyReportChart";
import MonthlyReportChart from "../components/MonthlyReportChart";
import YearlyReportChart from "../components/YearlyReportChart";
import { Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

// Sample data for each time period
const dailyData = [
  { time: '8am', broiler: 5, village: 3 },
  { time: '10am', broiler: 12, village: 8 },
  { time: '12pm', broiler: 8, village: 5 },
  { time: '2pm', broiler: 15, village: 10 },
  { time: '4pm', broiler: 7, village: 4 },
];

const weeklyData = [
  { name: 'Mon', broiler: 24, village: 16 },
  { name: 'Tue', broiler: 42, village: 28 },
  { name: 'Wed', broiler: 18, village: 12 },
  { name: 'Thu', broiler: 32, village: 24 },
  { name: 'Fri', broiler: 45, village: 36 },
  { name: 'Sat', broiler: 16, village: 8 },
  { name: 'Sun', broiler: 8, village: 4 },
];

const monthlyData = [
  { name: 'Week 1', broiler: 78, village: 56 },
  { name: 'Week 2', broiler: 92, village: 64 },
  { name: 'Week 3', broiler: 65, village: 48 },
  { name: 'Week 4', broiler: 83, village: 62 },
];

const yearlyData = [
  { name: 'Jan', broiler: 280, village: 180 },
  { name: 'Feb', broiler: 250, village: 160 },
  { name: 'Mar', broiler: 310, village: 210 },
  { name: 'Apr', broiler: 340, village: 240 },
  { name: 'May', broiler: 290, village: 180 },
  { name: 'Jun', broiler: 350, village: 220 },
  { name: 'Jul', broiler: 380, village: 250 },
  { name: 'Aug', broiler: 320, village: 200 },
  { name: 'Sep', broiler: 290, village: 180 },
  { name: 'Oct', broiler: 310, village: 200 },
  { name: 'Nov', broiler: 350, village: 230 },
  { name: 'Dec', broiler: 380, village: 260 },
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [reportData, setReportData] = useState({
    totalOrders: "256",
    broilerChicks: "1,842",
    villageChicks: "912",
    totalRevenue: "43,968 K",
    trends: {
      orders: "+12%",
      broiler: "+5%",
      village: "-3%",
      revenue: "+8.5%"
    },
    trendDirections: {
      orders: "up",
      broiler: "up",
      village: "down",
      revenue: "up"
    }
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const totalOrders = localStorage.getItem("totalOrders");
    const broilerChicks = localStorage.getItem("broilerChicks");
    const villageChicks = localStorage.getItem("villageChicks");
    const totalRevenue = localStorage.getItem("totalRevenue");

    if (totalOrders) {
      setReportData(prev => ({...prev, totalOrders}));
    }
    if (broilerChicks) {
      setReportData(prev => ({...prev, broilerChicks}));
    }
    if (villageChicks) {
      setReportData(prev => ({...prev, villageChicks}));
    }
    if (totalRevenue) {
      setReportData(prev => ({...prev, totalRevenue}));
    }

    // Listen for reset events
    const handleReset = () => {
      setReportData({
        totalOrders: "0",
        broilerChicks: "0",
        villageChicks: "0",
        totalRevenue: "0 K",
        trends: {
          orders: "0%",
          broiler: "0%",
          village: "0%",
          revenue: "0%"
        },
        trendDirections: {
          orders: "up",
          broiler: "up",
          village: "up",
          revenue: "up"
        }
      });
    };

    window.addEventListener('reportsReset', handleReset);
    
    return () => {
      window.removeEventListener('reportsReset', handleReset);
    };
  }, []);

  const handleExportReport = () => {
    // Get the appropriate data based on the active tab
    let dataToExport;
    let filename;
    
    switch (activeTab) {
      case 'daily':
        dataToExport = dailyData;
        filename = 'daily_report.csv';
        break;
      case 'weekly':
        dataToExport = weeklyData;
        filename = 'weekly_report.csv';
        break;
      case 'monthly':
        dataToExport = monthlyData;
        filename = 'monthly_report.csv';
        break;
      case 'yearly':
        dataToExport = yearlyData;
        filename = 'yearly_report.csv';
        break;
    }
    
    // Convert to CSV
    const headers = Object.keys(dataToExport[0]).join(',');
    const rows = dataToExport.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    
    // Create and download the file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} report exported`);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Reports</h1>
          <Button 
            onClick={handleExportReport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="daily" 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <DailyReportChart />
              </TabsContent>
              <TabsContent value="weekly">
                <WeeklyReportChart />
              </TabsContent>
              <TabsContent value="monthly">
                <MonthlyReportChart />
              </TabsContent>
              <TabsContent value="yearly">
                <YearlyReportChart />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportMetricCard 
            title="Total Orders" 
            value={reportData.totalOrders}
            trend={reportData.trends.orders} 
            trendDirection={reportData.trendDirections.orders as 'up' | 'down'} 
          />
          
          <ReportMetricCard 
            title="Broiler Chicks" 
            value={reportData.broilerChicks}
            trend={reportData.trends.broiler} 
            trendDirection={reportData.trendDirections.broiler as 'up' | 'down'} 
          />
          
          <ReportMetricCard 
            title="Village Chicks" 
            value={reportData.villageChicks}
            trend={reportData.trends.village} 
            trendDirection={reportData.trendDirections.village as 'up' | 'down'} 
          />
          
          <ReportMetricCard 
            title="Total Revenue" 
            value={reportData.totalRevenue}
            trend={reportData.trends.revenue} 
            trendDirection={reportData.trendDirections.revenue as 'up' | 'down'} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

interface ReportMetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
}

const ReportMetricCard = ({ title, value, trend, trendDirection }: ReportMetricCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-bold">{value}</p>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            trendDirection === 'up' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsPage;
