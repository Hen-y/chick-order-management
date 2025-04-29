
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ReportHeader from "../components/reports/ReportHeader";
import ReportChartSection from "../components/reports/ReportChartSection";
import ReportMetrics from "../components/reports/ReportMetrics";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <ReportHeader activeTab={activeTab} />
        <ReportChartSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <ReportMetrics />
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
