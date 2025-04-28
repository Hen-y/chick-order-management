
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/lovable-uploads/89739bde-e578-4a3c-af95-89646c404e95.png" alt="Logo" className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl">Hybrid Chicks Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email" 
                placeholder="osnestabwalya@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0966613929"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
        <CardFooter className="flex flex-col items-center space-y-2">
          <img 
            src="/lovable-uploads/b0435e33-525c-4a83-9da6-fd5a9f6f8e53.png" 
            alt="Baobub Technologies" 
            className="h-8 w-auto mb-1"
          />
          <div className="flex items-center text-xs text-gray-500">
            <Copyright className="w-3 h-3 mr-1" />
            <span>2025 Baobub Technologies</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
