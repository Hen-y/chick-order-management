
const UpcomingCollections = () => {
  const collections = [
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
  ];

  return (
    <div className="space-y-4">
      {collections.map((collection) => (
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
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Mark as Collected
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpcomingCollections;
