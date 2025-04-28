
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard as Dashboard,
  Users, 
  Package as Inventory,
  BarChart as Reports,
  Settings,
  LogOut
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", icon: Dashboard, path: "/" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Inventory", icon: Inventory, path: "/inventory" },
  { name: "Reports", icon: Reports, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" }
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className={`bg-[#1A1F2C] text-white w-64 min-h-screen flex flex-col ${isOpen ? '' : 'hidden'}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img src="/lovable-uploads/bac695dc-9291-4d49-b359-e7c7cbbdb054.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Hybrid Chicks</h1>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#5B8C32] hover:text-white rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button 
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white w-full hover:bg-red-700 rounded-lg transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
