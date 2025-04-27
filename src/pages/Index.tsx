
import DashboardLayout from "../components/DashboardLayout";
import NewOrderForm from "../components/NewOrderForm";
import OrderStatistics from "../components/OrderStatistics";
import UpcomingCollections from "../components/UpcomingCollections";
import UpcomingReminders from "../components/UpcomingReminders";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">New Order</h2>
              <NewOrderForm />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Statistics</h2>
              <OrderStatistics />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Collections</h2>
              <UpcomingCollections />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Reminders</h2>
              <UpcomingReminders />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
