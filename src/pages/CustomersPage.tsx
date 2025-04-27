
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import CustomerList from "../components/CustomerList";
import CustomerDetail from "../components/CustomerDetail";

const CustomersPage = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-6">Customers</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomerList 
              onSelectCustomer={(id) => setSelectedCustomerId(id)}
              selectedCustomerId={selectedCustomerId}
            />
          </div>
          
          <div>
            {selectedCustomerId ? (
              <CustomerDetail 
                customerId={selectedCustomerId}
                onClose={() => setSelectedCustomerId(null)}
              />
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Select a customer to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
