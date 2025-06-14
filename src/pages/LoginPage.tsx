
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Copyright } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check credentials against the default login
    if (
      email === "osnestabwalya@gmail.com" &&
      phone === "0966613929" &&
      password === "zW6oX1fIju2r"
    ) {
      // Set local storage to maintain session
      localStorage.setItem("isLoggedIn", "true");
      
      // Show success message
      toast.success("Login successful");
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md bg-black text-white">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/lovable-uploads/3e3bcc99-c365-4040-93a6-43fef524b461.png" alt="Logo" className="w-32 h-32" />
          </div>
          <CardTitle className="text-2xl text-white">Hybrid Chicks Login</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email" 
                placeholder="XXXXXXXXXXXXX"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="XXXXXXXXXX"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#5B8C32] hover:bg-[#4A7129]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 border-t border-gray-800">
          <div className="flex items-center mt-4">
            <img 
              src="/lovable-uploads/b0435e33-525c-4a83-9da6-fd5a9f6f8e53.png" 
              alt="Baobub Technologies" 
              className="h-8 w-auto mb-1"
            />
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Copyright className="w-3 h-3 mr-1" />
            <span>2025 Baobub Technologies</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
