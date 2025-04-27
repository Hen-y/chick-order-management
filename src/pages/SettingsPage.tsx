
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SettingsPage = () => {
  const [broilerPrice, setBroilerPrice] = useState<number>(16);
  const [villagePrice, setVillagePrice] = useState<number>(15);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend/local storage
    toast.success("Prices updated successfully", {
      description: `Broiler: ${broilerPrice} Kwacha, Village: ${villagePrice} Kwacha`
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        
        <div className="max-w-md bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing Configuration</h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="broilerPrice">Broiler Chick Price (Kwacha)</Label>
              <Input
                id="broilerPrice"
                type="number"
                min="1"
                step="0.5"
                value={broilerPrice}
                onChange={(e) => setBroilerPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="villagePrice">Village Chick Price (Kwacha)</Label>
              <Input
                id="villagePrice"
                type="number"
                min="1"
                step="0.5"
                value={villagePrice}
                onChange={(e) => setVillagePrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="bg-[#5B8C32] hover:bg-[#4A7129] w-full">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
