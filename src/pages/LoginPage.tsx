import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useApp } from "../contexts/AppContext";
import { User, Lock, Mail, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
  const { dispatch } = useApp();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (
      loginData.email === "admin@smartsupermarket.com" &&
      loginData.password === "admin123"
    ) {
      const adminUser = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@smartsupermarket.com",
        role: "admin" as const,
        savedRecipes: [],
        orderHistory: [],
        createdAt: "2024-01-01T00:00:00Z",
        isActive: true,
      };

      dispatch({ type: "LOGIN", user: adminUser });
      toast.success("Welcome back, Admin!");
      navigate(from || "/admin", { replace: true });
      return;
    }

    const user = {
      id: "1",
      name: "John Doe",
      email: loginData.email,
      role: "user" as const,
      savedRecipes: [],
      orderHistory: [],
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    dispatch({ type: "LOGIN", user });
    toast.success("Welcome back!");
    navigate(from || "/profile", { replace: true });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!signupData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    const user = {
      id: "1",
      name: `${signupData.firstName} ${signupData.lastName}`,
      email: signupData.email,
      role: "user" as const,
      savedRecipes: [],
      orderHistory: [],
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    dispatch({ type: "LOGIN", user });
    toast.success("Account created successfully!");
    navigate(from || "/profile", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">

        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
            <User size={32} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to FreshMart
          </h1>

          <p className="text-gray-600 mt-2">
            Sign in to your account or create a new one
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">

            <Tabs defaultValue="login" className="w-full">

              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* LOGIN */}

              <TabsContent value="login" className="space-y-4 mt-6">

                <form onSubmit={handleLogin} className="space-y-4">

                  {/* EMAIL */}

                  <div className="space-y-2">

                    <Label htmlFor="login-email">Email</Label>

                    <div className="relative">

                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />

                      <Input
                        id="login-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}

                  <div className="space-y-2">

                    <Label htmlFor="login-password">Password</Label>

                    <div className="relative">

                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                      />

                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-2 right-2 text-gray-400"
                        
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                  </div>

                  {/* REMEMBER */}

                  <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-2">

                      <Checkbox
                        id="remember-me"
                        checked={loginData.rememberMe}
                        onCheckedChange={(checked) =>
                          setLoginData((prev) => ({
                            ...prev,
                            rememberMe: checked as boolean,
                          }))
                        }
                      />

                      <Label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </Label>

                    </div>

                    <Button variant="link" className="text-sm p-0">
                      Forgot password?
                    </Button>

                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Sign In
                  </Button>

                </form>

              </TabsContent>

              {/* SIGNUP */}

              <TabsContent value="signup" className="space-y-4 mt-6">

                <form onSubmit={handleSignup} className="space-y-4">

                  <div className="grid grid-cols-2 gap-4">

                    <Input
                      placeholder="First Name"
                      value={signupData.firstName}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                    />

                    <Input
                      placeholder="Last Name"
                      value={signupData.lastName}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                    />

                  </div>

                  <Input
                    placeholder="Email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    
                  />
                  

                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />

                  <div className="flex items-center space-x-2">

                    <Checkbox
                      checked={signupData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setSignupData((prev) => ({
                          ...prev,
                          agreeToTerms: checked as boolean,
                        }))
                      }
                    />

                    <Label className="text-sm">
                      I agree to the Terms & Conditions
                    </Label>

                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Create Account
                  </Button>

                </form>

              </TabsContent>

            </Tabs>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}