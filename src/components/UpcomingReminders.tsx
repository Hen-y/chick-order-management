
import { useState, useEffect } from "react";
import { toast } from "sonner";

const UpcomingReminders = () => {
  const [reminders, setReminders] = useState<any[]>([]);

  // Load reminders from localStorage on mount and when updated
  useEffect(() => {
    const loadReminders = () => {
      const savedReminders = localStorage.getItem("upcomingReminders");
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    };
    
    loadReminders();
    
    // Listen for changes from other components
    window.addEventListener('remindersUpdated', loadReminders);
    
    return () => {
      window.removeEventListener('remindersUpdated', loadReminders);
    };
  }, []);

  const handleMarkAsReminded = (id: number) => {
    // Find the reminder that was marked
    const markedReminder = reminders.find(reminder => reminder.id === id);
    
    // Remove the reminder from the list
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    
    // Update localStorage
    localStorage.setItem("upcomingReminders", JSON.stringify(updatedReminders));
    
    // Update state
    setReminders(updatedReminders);
    
    // Update customer record
    if (markedReminder) {
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");
      const updatedCustomers = customers.map((customer: any) => {
        if (customer.name === markedReminder.customerName) {
          return {
            ...customer,
            reminderDate: null
          };
        }
        return customer;
      });
      
      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      
      // Notify that customers have been updated
      window.dispatchEvent(new CustomEvent('customersUpdated'));
      
      // Show success toast
      toast.success(`Customer has been reminded`, {
        description: `${markedReminder.customerName} for ${markedReminder.quantity} ${markedReminder.type} chicks`
      });
    }
  };

  return (
    <div className="space-y-4">
      {reminders.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No upcoming reminders
        </div>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{reminder.customerName}</h3>
                <span className="px-2 py-1 text-xs font-medium bg-orange-500 text-white rounded-full">
                  {reminder.daysLeft} days
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {reminder.quantity} {reminder.type} chicks • Due: {reminder.dueDate}
              </p>
            </div>
            <button 
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              onClick={() => handleMarkAsReminded(reminder.id)}
            >
              Mark as Reminded
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingReminders;
