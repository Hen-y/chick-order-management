
import { useState, useEffect } from "react";
import ReportMetricCard from "./ReportMetricCard";

const ReportMetrics = () => {
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
    const loadDataFromLocalStorage = () => {
      const totalOrders = localStorage.getItem("totalOrders");
      const broilerChicks = localStorage.getItem("broilerChicks");
      const villageChicks = localStorage.getItem("villageChicks");
      const totalRevenue = localStorage.getItem("totalRevenue");

      // Only update state if values exist in localStorage
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
    };

    // Load initial data
    loadDataFromLocalStorage();

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

  return (
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
  );
};

export default ReportMetrics;
