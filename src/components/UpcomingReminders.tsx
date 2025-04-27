
const UpcomingReminders = () => {
  const reminders = [
    {
      id: 1,
      customerName: "John Doe",
      quantity: 50,
      type: "Broiler",
      dueDate: "25 Jun 2025",
      daysLeft: 59,
    },
  ];

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
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
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Mark as Reminded
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpcomingReminders;
