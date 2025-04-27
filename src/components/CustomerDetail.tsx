
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { X, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomerDetailProps {
  customerId: string;
  onClose: () => void;
}

const CustomerDetail = ({ customerId, onClose }: CustomerDetailProps) => {
  const [customer, setCustomer] = useState<any>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Load customer from localStorage
  useEffect(() => {
    const loadCustomer = () => {
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");
      const foundCustomer = customers.find((c: any) => c.id === customerId);
      setCustomer(foundCustomer);
    };
    
    loadCustomer();
    
    // Listen for customer updates
    window.addEventListener('customersUpdated', loadCustomer);
    
    return () => {
      window.removeEventListener('customersUpdated', loadCustomer);
    };
  }, [customerId]);

  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  const handleDelete = () => {
    // Get all customers
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    
    // Filter out the deleted customer
    const updatedCustomers = customers.filter((c: any) => c.id !== customerId);
    
    // Save back to localStorage
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    
    // Also remove any collections or reminders for this customer
    const collections = JSON.parse(localStorage.getItem("upcomingCollections") || "[]");
    const updatedCollections = collections.filter((c: any) => c.customerName !== customer.name);
    localStorage.setItem("upcomingCollections", JSON.stringify(updatedCollections));
    
    const reminders = JSON.parse(localStorage.getItem("upcomingReminders") || "[]");
    const updatedReminders = reminders.filter((r: any) => r.customerName !== customer.name);
    localStorage.setItem("upcomingReminders", JSON.stringify(updatedReminders));
    
    // Notify of updates
    window.dispatchEvent(new CustomEvent('collectionsUpdated'));
    window.dispatchEvent(new CustomEvent('remindersUpdated'));
    window.dispatchEvent(new CustomEvent('customersUpdated'));
    
    toast.success("Customer deleted successfully");
    onClose();
  };

  const handleAddOrder = () => {
    // In a real app, this would open a form to add a new order
    toast.success("Order added for " + customer.name);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{customer.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{customer.phone}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Order History</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.orders && customer.orders.length > 0 ? (
                  customer.orders.map((order: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.total} Kwacha</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                      No order history
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="bg-[#5B8C32] hover:bg-[#4A7129] flex-1"
            onClick={handleAddOrder}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
          
          <Button 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={() => setShowDeleteAlert(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the customer "{customer.name}" and all their order history.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomerDetail;
