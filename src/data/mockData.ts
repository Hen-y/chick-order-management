
// Mock customer data
export const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    phone: "0977123456",
    nextCollection: "2025-05-02",
    reminderDate: "2025-06-30",
    orders: [
      {
        date: "2025-04-26",
        type: "Broiler",
        quantity: 50,
        total: 800,
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "0966789012",
    nextCollection: "2025-04-30",
    reminderDate: "2025-07-15",
    orders: [
      {
        date: "2025-04-25",
        type: "Village",
        quantity: 30,
        total: 450,
      }
    ]
  },
  {
    id: "3",
    name: "Robert Johnson",
    phone: "0955234567",
    nextCollection: null,
    reminderDate: "2025-05-10",
    orders: [
      {
        date: "2025-03-10",
        type: "Broiler",
        quantity: 100,
        total: 1600,
      },
      {
        date: "2025-02-15",
        type: "Village",
        quantity: 25,
        total: 375,
      }
    ]
  },
  {
    id: "4",
    name: "Mary Williams",
    phone: "0966345678",
    nextCollection: "2025-05-06",
    reminderDate: null,
    orders: [
      {
        date: "2025-04-24",
        type: "Broiler",
        quantity: 75,
        total: 1200,
      }
    ]
  },
  {
    id: "5",
    name: "David Brown",
    phone: "0977456789",
    nextCollection: "2025-04-29",
    reminderDate: "2025-06-20",
    orders: [
      {
        date: "2025-04-24",
        type: "Village",
        quantity: 50,
        total: 750,
      },
      {
        date: "2025-03-20",
        type: "Broiler",
        quantity: 60,
        total: 960,
      }
    ]
  }
];

// Mock inventory data
export const mockInventoryData = {
  totalBroiler: 285,
  totalVillage: 105,
  weeklyBroiler: 185,
  weeklyVillage: 75,
  monthlyRecords: [
    {
      week: 1,
      broiler: 150,
      village: 75,
      revenue: 3525
    },
    {
      week: 2,
      broiler: 180,
      village: 90,
      revenue: 4230
    },
    {
      week: 3,
      broiler: 120,
      village: 60,
      revenue: 2820
    },
    {
      week: 4,
      broiler: 200,
      village: 100,
      revenue: 4700
    }
  ]
};
