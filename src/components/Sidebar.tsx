
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
import { Copyright } from "lucide-react";

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
    <div className={`bg-black text-white w-64 min-h-screen flex flex-col ${isOpen ? '' : 'hidden'}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img src="/lovable-uploads/3e3bcc99-c365-4040-93a6-43fef524b461.png" alt="Logo" className="w-10 h-10" />
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

      <div className="p-4 flex flex-col items-center border-t border-gray-700">
        <button 
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white w-full hover:bg-red-700 rounded-lg transition-colors mb-4"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
        
        <img 
          src="/lovable-uploads/b0435e33-525c-4a83-9da6-fd5a9f6f8e53.png" 
          alt="Baobub Technologies" 
          className="mb-2 w-40 h-auto"
        />
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <Copyright className="w-3 h-3 mr-1" />
          <span>2025 Baobub Technologies</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
