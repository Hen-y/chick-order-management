
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyReportChart from "../DailyReportChart";
import WeeklyReportChart from "../WeeklyReportChart";
import MonthlyReportChart from "../MonthlyReportChart";
import YearlyReportChart from "../YearlyReportChart";

interface ReportChartSectionProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ReportChartSection = ({ activeTab, setActiveTab }: ReportChartSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
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
  );
};

export default ReportChartSection;
