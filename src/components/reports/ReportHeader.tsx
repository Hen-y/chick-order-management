
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface ReportHeaderProps {
  activeTab: string;
}

const ReportHeader = ({ activeTab }: ReportHeaderProps) => {
  // Sample data for each time period - moved from ReportsPage
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
  );
};

export default ReportHeader;
