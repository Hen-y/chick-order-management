
import { useState } from "react";
import { toast } from "sonner";

const UpcomingCollections = () => {
  const [collections, setCollections] = useState([
    {
      id: 1,
      customerName: "Jane Smith",
      quantity: 25,
      type: "Village",
      dueDate: "29 Apr 2025",
      daysLeft: 2,
    },
    {
      id: 2,
      customerName: "James Wilson",
      quantity: 75,
      type: "Village",
      dueDate: "29 Apr 2025",
      daysLeft: 2,
    },
  ]);

  const handleMarkAsCollected = (id: number) => {
    // Remove the collection from the list
    const updatedCollections = collections.filter(
      collection => collection.id !== id
    );
    
    // Find the collection that was marked as collected
    const markedCollection = collections.find(
      collection => collection.id === id
    );
    
    // Update the collections list
    setCollections(updatedCollections);
    
    // Show success toast
    if (markedCollection) {
      toast.success(`Marked as collected`, {
        description: `${markedCollection.quantity} ${markedCollection.type} chicks for ${markedCollection.customerName}`
      });
      
      // In a real app, would set a reminder for 2 months later
      // For now, let's just mention it in the toast
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
