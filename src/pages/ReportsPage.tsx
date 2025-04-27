
import { useState } from "react";
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
import { Download } from "lucide-react";
import { toast } from "sonner";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const handleExportReport = () => {
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
            <Download className="h-4 w-4" />
            Export Report
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
            value="256"
            trend="+12%" 
            trendDirection="up" 
          />
          
          <ReportMetricCard 
            title="Broiler Chicks" 
            value="1,842"
            trend="+5%" 
            trendDirection="up" 
          />
          
          <ReportMetricCard 
            title="Village Chicks" 
            value="912"
            trend="-3%" 
            trendDirection="down" 
          />
          
          <ReportMetricCard 
            title="Total Revenue" 
            value="43,968 K"
            trend="+8.5%" 
            trendDirection="up" 
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
