
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const NewOrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    quantity: 0,
    chickType: "broiler"
  });

  const calculateTotal = () => {
    const price = formData.chickType === "broiler" ? 16 : 15;
    return formData.quantity * price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Order submitted:", formData);
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
            min="0"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
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
            <option value="broiler">Broiler (16 Kwacha)</option>
            <option value="village">Village (15 Kwacha)</option>
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
