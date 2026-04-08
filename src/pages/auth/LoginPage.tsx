import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../../contexts/AppContext";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname;

  const { dispatch } = useApp();

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

    // ADMIN LOGIN
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
        savedProducts: [],
        orderHistory: [],
        createdAt: "2024-01-01T00:00:00Z",
        isActive: true,
      };

      dispatch({ type: "LOGIN", user: adminUser });

      toast.success("Welcome back, Admin!");

      navigate(from || "/admin", { replace: true });

      return;
    }

    // NORMAL USER
    const user = {
      id: crypto.randomUUID(),
      name: "John Doe",
      email: loginData.email,
      role: "user" as const,
      savedRecipes: [],
      savedProducts: [],
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
      id: crypto.randomUUID(),
      name: `${signupData.firstName} ${signupData.lastName}`,
      email: signupData.email,
      role: "user" as const,
      savedRecipes: [],
      savedProducts: [],
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

        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
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

            <Tabs defaultValue="login">

              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">

                <LoginForm
                  loginData={loginData}
                  setLoginData={setLoginData}
                  handleLogin={handleLogin}
                />

              </TabsContent>

              <TabsContent value="signup" className="mt-6">

                <SignupForm
                  signupData={signupData}
                  setSignupData={setSignupData}
                  handleSignup={handleSignup}
                />

              </TabsContent>

            </Tabs>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}
