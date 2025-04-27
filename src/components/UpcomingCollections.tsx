
import { useState, useEffect } from "react";
import { toast } from "sonner";

const UpcomingCollections = () => {
  const [collections, setCollections] = useState<any[]>([]);

  // Load collections from localStorage on mount and when updated
  useEffect(() => {
    const loadCollections = () => {
      const savedCollections = localStorage.getItem("upcomingCollections");
      if (savedCollections) {
        setCollections(JSON.parse(savedCollections));
      }
    };
    
    loadCollections();
    
    // Listen for changes from other components
    window.addEventListener('collectionsUpdated', loadCollections);
    
    return () => {
      window.removeEventListener('collectionsUpdated', loadCollections);
    };
  }, []);

  const handleMarkAsCollected = (id: number) => {
    // Find the collection that was marked as collected
    const markedCollection = collections.find(
      collection => collection.id === id
    );
    
    // Remove the collection from the list
    const updatedCollections = collections.filter(
      collection => collection.id !== id
    );
    
    // Update localStorage
    localStorage.setItem("upcomingCollections", JSON.stringify(updatedCollections));
    
    // Update state
    setCollections(updatedCollections);
    
    // Add to reminders after 2 months
    if (markedCollection) {
      const reminderDate = new Date();
      reminderDate.setMonth(reminderDate.getMonth() + 2); // 2 months in the future
      
      const newReminder = {
        id: Date.now(),
        customerName: markedCollection.customerName,
        quantity: markedCollection.quantity,
        type: markedCollection.type,
        dueDate: reminderDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        daysLeft: 59, // Approximately 2 months
      };
      
      // Get existing reminders or initialize empty array
      const existingReminders = JSON.parse(localStorage.getItem("upcomingReminders") || "[]");
      
      // Add to reminders and update localStorage
      existingReminders.push(newReminder);
      localStorage.setItem("upcomingReminders", JSON.stringify(existingReminders));
      
      // Update customer record
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");
      const updatedCustomers = customers.map((customer: any) => {
        if (customer.name === markedCollection.customerName) {
          return {
            ...customer,
            nextCollection: null,
            reminderDate: newReminder.dueDate
          };
        }
        return customer;
      });
      
      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      
      // Notify that reminders have been updated
      window.dispatchEvent(new CustomEvent('remindersUpdated'));
      window.dispatchEvent(new CustomEvent('customersUpdated'));
      
      // Show success toast
      toast.success(`Marked as collected`, {
        description: `${markedCollection.quantity} ${markedCollection.type} chicks for ${markedCollection.customerName}`
      });
      
      // Show info toast about reminder
      toast.info(`Reminder set for 2 months from now`, {
        description: `Follow up with ${markedCollection.customerName} about reordering`
      });
    }
  };

  return (
    <div className="space-y-4">
      {collections.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No upcoming collections
        </div>
      ) : (
        collections.map((collection) => (
          <div
            key={collection.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{collection.customerName}</h3>
                <span className="px-2 py-1 text-xs font-medium bg-orange-500 text-white rounded-full">
                  {collection.daysLeft} days
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {collection.quantity} {collection.type} chicks • Due: {collection.dueDate}
              </p>
            </div>
            <button 
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              onClick={() => handleMarkAsCollected(collection.id)}
            >
              Mark as Collected
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingCollections;
