
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NewOrderForm = () => {
  const navigate = useNavigate();
  // Get prices from localStorage or use defaults
  const [prices, setPrices] = useState({
    broiler: Number(localStorage.getItem("broilerPrice")) || 16,
    village: Number(localStorage.getItem("villagePrice")) || 15
  });
  
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    quantity: 0,
    chickType: "broiler"
  });

  // Listen for price changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setPrices({
        broiler: Number(localStorage.getItem("broilerPrice")) || 16,
        village: Number(localStorage.getItem("villagePrice")) || 15
      });
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('priceUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('priceUpdated', handleStorageChange);
    };
  }, []);

  const calculateTotal = () => {
    const price = formData.chickType === "broiler" ? prices.broiler : prices.village;
    return formData.quantity * price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.customerName.trim() === "") {
      toast.error("Customer name is required");
      return;
    }
    
    if (formData.phoneNumber.trim() === "") {
      toast.error("Phone number is required");
      return;
    }
    
    if (formData.quantity <= 0) {
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
    
    // Create new collection item
    const newCollection = {
      id: Date.now(),
      customerName: formData.customerName,
      quantity: formData.quantity,
      type: formData.chickType === "broiler" ? "Broiler" : "Village",
      dueDate: formattedDate,
      daysLeft: Math.ceil((collectionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    };
    
    // Get existing collections or initialize empty array
    const existingCollections = JSON.parse(localStorage.getItem("upcomingCollections") || "[]");
    
    // Add new collection and save back to localStorage
    existingCollections.push(newCollection);
    localStorage.setItem("upcomingCollections", JSON.stringify(existingCollections));
    
    // Also add to customers if it's a new customer
    const existingCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    const customerExists = existingCustomers.some((c: any) => 
      c.name.toLowerCase() === formData.customerName.toLowerCase() && 
      c.phone === formData.phoneNumber
    );
    
    if (!customerExists) {
      const newCustomer = {
        id: `cust-${Date.now()}`,
        name: formData.customerName,
        phone: formData.phoneNumber,
        nextCollection: formattedDate,
        reminderDate: null,
        orders: []
      };
      
      existingCustomers.push(newCustomer);
      localStorage.setItem("customers", JSON.stringify(existingCustomers));
    }
    
    // Success message
    toast.success(`Order created successfully!`, {
      description: `${formData.quantity} ${formData.chickType} chicks for ${formData.customerName}. Collection date: ${formattedDate}`
    });
    
    // Reset form
    setFormData({
      customerName: "",
      phoneNumber: "",
      quantity: 0,
      chickType: "broiler"
    });
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('collectionsUpdated'));
    window.dispatchEvent(new CustomEvent('customersUpdated'));
    
    // Optionally navigate to customers page
    setTimeout(() => {
      navigate("/customers");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <Input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="0977123456"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <Input
            type="number"
            min="1"
            value={formData.quantity || ""}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type of Chicks
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={formData.chickType}
            onChange={(e) => setFormData({ ...formData, chickType: e.target.value })}
          >
            <option value="broiler">Broiler ({prices.broiler} Kwacha)</option>
            <option value="village">Village ({prices.village} Kwacha)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="text-lg font-semibold">
          Total: {calculateTotal()} Kwacha
        </div>
        <Button 
          type="submit"
          className="bg-[#5B8C32] hover:bg-[#4A7129] text-white"
        >
          Create Order
        </Button>
      </div>
    </form>
  );
};

export default NewOrderForm;
