
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { mockCustomers } from "../data/mockData";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CustomerListProps {
  onSelectCustomer: (id: string) => void;
  selectedCustomerId: string | null;
}

const CustomerList = ({ onSelectCustomer, selectedCustomerId }: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
  });
  
  // State to store customers from localStorage or fall back to mockCustomers
  const [customers, setCustomers] = useState<any[]>([]);
  
  // Load customers from localStorage on mount and when updated
  useEffect(() => {
    const loadCustomers = () => {
      const savedCustomers = localStorage.getItem("customers");
      if (savedCustomers) {
        setCustomers(JSON.parse(savedCustomers));
      } else {
        // If no customers in localStorage yet, use mockCustomers and save them
        setCustomers(mockCustomers);
        localStorage.setItem("customers", JSON.stringify(mockCustomers));
      }
    };
    
    loadCustomers();
    
    // Listen for changes from other components
    window.addEventListener('customersUpdated', loadCustomers);
    
    return () => {
      window.removeEventListener('customersUpdated', loadCustomers);
    };
  }, []);
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    // Validate form
    if (!newCustomer.name.trim()) {
      toast.error("Customer name is required");
      return;
    }
    
    if (!newCustomer.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    
    // Create new customer
    const newCustomerData = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      phone: newCustomer.phone,
      nextCollection: null,
      reminderDate: null,
      orders: []
    };
    
    // Add to customers list
    const updatedCustomers = [...customers, newCustomerData];
    
    // Update state and localStorage
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    
    toast.success("Customer added successfully");
    
    // Close dialog and reset form
    setShowAddDialog(false);
    setNewCustomer({
      name: "",
      phone: "",
    });
    
    // Notify that customers have been updated
    window.dispatchEvent(new CustomEvent('customersUpdated'));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-[#5B8C32] hover:bg-[#4A7129]"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Reminder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow 
                key={customer.id}
                className={`cursor-pointer ${selectedCustomerId === customer.id ? 'bg-gray-100' : ''}`}
                onClick={() => onSelectCustomer(customer.id)}
              >
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {customer.nextCollection ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getDaysRemaining(customer.nextCollection) <= 1 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {formatDate(customer.nextCollection)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {customer.reminderDate ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getDaysRemaining(customer.reminderDate) <= 7 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {formatDate(customer.reminderDate)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Customer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="0977123456"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              className="bg-[#5B8C32] hover:bg-[#4A7129]" 
              onClick={handleAddCustomer}
            >
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper functions
const getDaysRemaining = (dateString: string): number => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export default CustomerList;
