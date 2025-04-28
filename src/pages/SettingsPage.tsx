
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const SettingsPage = () => {
  // Initialize with values from localStorage or defaults
  const [broilerPrice, setBroilerPrice] = useState<number>(
    Number(localStorage.getItem("broilerPrice")) || 16
  );
  const [villagePrice, setVillagePrice] = useState<number>(
    Number(localStorage.getItem("villagePrice")) || 15
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Validate prices
    if (broilerPrice <= 0 || villagePrice <= 0) {
      toast.error("Prices must be greater than zero");
      setIsSaving(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("broilerPrice", broilerPrice.toString());
      localStorage.setItem("villagePrice", villagePrice.toString());
      
      // Dispatch custom event to notify components about price changes
      window.dispatchEvent(new CustomEvent('priceUpdated'));
      
      toast.success("Prices updated successfully", {
        description: `Broiler: ${broilerPrice} Kwacha, Village: ${villagePrice} Kwacha`
      });
      
      setIsSaving(false);
    }, 800);
  };

  const handleResetReports = () => {
    // Clear report data from localStorage
    localStorage.removeItem("dailyReportData");
    localStorage.removeItem("weeklyReportData");
    localStorage.removeItem("monthlyReportData");
    localStorage.removeItem("yearlyReportData");
    
    // Reset metrics
    localStorage.removeItem("totalOrders");
    localStorage.removeItem("broilerChicks");
    localStorage.removeItem("villageChicks");
    localStorage.removeItem("totalRevenue");
    
    // Dispatch event to notify components about data reset
    window.dispatchEvent(new CustomEvent('reportsReset'));
    
    toast.success("All report data has been reset to zero");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 flex justify-center">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
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
              
              <Button 
                type="submit" 
                className="bg-[#5B8C32] hover:bg-[#4A7129] w-full"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Data Management</h2>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Reset Report Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will reset all reports and statistics to zero. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetReports}>
                    Reset Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
