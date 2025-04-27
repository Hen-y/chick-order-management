
import { useState } from "react";
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
import { mockCustomers } from "../data/mockData";
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
  // In a real app, this would fetch customer data
  const customer = mockCustomers.find(c => c.id === customerId);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const handleDelete = () => {
    // In a real app, this would delete the customer
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
                {customer.orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.total} Kwacha</TableCell>
                  </TableRow>
                ))}
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
          
          {!showConfirmDelete ? (
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowDeleteAlert(true)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          ) : (
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Confirm Delete
            </Button>
          )}
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
