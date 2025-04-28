
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
import { Input } from "@/components/ui/input";
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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [prices, setPrices] = useState({
    broiler: Number(localStorage.getItem("broilerPrice")) || 16,
    village: Number(localStorage.getItem("villagePrice")) || 15
  });
  const [newOrder, setNewOrder] = useState({
    quantity: 1,
    chickType: "broiler"
  });

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

  // Listen for price changes
  useEffect(() => {
    const handlePriceUpdate = () => {
      setPrices({
        broiler: Number(localStorage.getItem("broilerPrice")) || 16,
        village: Number(localStorage.getItem("villagePrice")) || 15
      });
    };
    
    window.addEventListener('priceUpdated', handlePriceUpdate);
    window.addEventListener('storage', handlePriceUpdate);
    
    return () => {
      window.removeEventListener('priceUpdated', handlePriceUpdate);
      window.removeEventListener('storage', handlePriceUpdate);
    };
  }, []);

  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  const calculateTotal = () => {
    const price = newOrder.chickType === "broiler" ? prices.broiler : prices.village;
    return newOrder.quantity * price;
  };

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
    setShowOrderForm(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (newOrder.quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    // Calculate collection date
    const today = new Date();
    const dayOfWeek = today.getDay();
    let collectionDate = new Date(today);
    
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
    if (dayOfWeek === 2) {
      // If Tuesday, next collection is Friday (+3 days)
      collectionDate.setDate(today.getDate() + 3);
    } else if (dayOfWeek === 5) {
      // If Friday, next collection is Tuesday (+4 days)
      collectionDate.setDate(today.getDate() + 4);
    } else if (dayOfWeek < 2) {
      // If Sunday or Monday, next collection is Tuesday
      collectionDate.setDate(today.getDate() + (2 - dayOfWeek));
    } else if (dayOfWeek > 2 && dayOfWeek < 5) {
      // If Wednesday or Thursday, next collection is Friday
      collectionDate.setDate(today.getDate() + (5 - dayOfWeek));
    } else {
      // If Saturday, next collection is Tuesday (3 days)
      collectionDate.setDate(today.getDate() + 3);
    }
    
    const formattedDate = collectionDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    // Create order object
    const price = newOrder.chickType === "broiler" ? prices.broiler : prices.village;
    const orderTotal = newOrder.quantity * price;
    const order = {
      date: new Date().toISOString(),
      type: newOrder.chickType === "broiler" ? "Broiler" : "Village",
      quantity: newOrder.quantity,
      total: orderTotal
    };
    
    // Update customer orders
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const updatedCustomers = customers.map((c: any) => {
      if (c.id === customerId) {
        return {
          ...c,
          orders: [...(c.orders || []), order],
          nextCollection: formattedDate
        };
      }
      return c;
    });
    
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    
    // Create new collection item
    const newCollection = {
      id: Date.now(),
      customerName: customer.name,
      quantity: newOrder.quantity,
      type: newOrder.chickType === "broiler" ? "Broiler" : "Village",
      dueDate: formattedDate,
      daysLeft: Math.ceil((collectionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    };
    
    // Get existing collections or initialize empty array
    const existingCollections = JSON.parse(localStorage.getItem("upcomingCollections") || "[]");
    
    // Add new collection and save back to localStorage
    existingCollections.push(newCollection);
    localStorage.setItem("upcomingCollections", JSON.stringify(existingCollections));

    // Dispatch events to update
    window.dispatchEvent(new CustomEvent('collectionsUpdated'));
    window.dispatchEvent(new CustomEvent('customersUpdated'));
    
    // Success message
    toast.success(`Order created successfully!`, {
      description: `${newOrder.quantity} ${newOrder.chickType === "broiler" ? "Broiler" : "Village"} chicks. Collection date: ${formattedDate}`
    });
    
    // Reset and close form
    setNewOrder({
      quantity: 1,
      chickType: "broiler"
    });
    setShowOrderForm(false);
    
    // Refresh customer data
    setCustomer(updatedCustomers.find((c: any) => c.id === customerId));
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
        
        {showOrderForm ? (
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3">New Order</h3>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <Input
                  type="number"
                  min="1"
                  value={newOrder.quantity}
                  onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Chicks
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={newOrder.chickType}
                  onChange={(e) => setNewOrder({...newOrder, chickType: e.target.value})}
                >
                  <option value="broiler">Broiler ({prices.broiler} Kwacha)</option>
                  <option value="village">Village ({prices.village} Kwacha)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-lg font-semibold">
                  Total: {calculateTotal()} Kwacha
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowOrderForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#5B8C32] hover:bg-[#4A7129] text-white"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </form>
          </div>
        ) : (
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
            
            <div className="flex space-x-2 mt-4">
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
        )}
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
