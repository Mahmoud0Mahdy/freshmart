import { Mail, Lock } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import PasswordInput from "../components/PasswordInput";

interface Props {
  loginData: any;
  setLoginData: any;
  handleLogin: any;
}

export default function LoginForm({
  loginData,
  setLoginData,
  handleLogin,
}: Props) {
  return (
    <form onSubmit={handleLogin} className="space-y-4">

      <div className="space-y-2">
        <Label>Email</Label>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <Input
            type="email"
            placeholder="john@example.com"
            className="pl-10"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev: any) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Password</Label>

        <div className="relative pl-0">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <PasswordInput
            value={loginData.password}
            placeholder="••••••••"
            onChange={(e) =>
              setLoginData((prev: any) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">

        <Checkbox
          checked={loginData.rememberMe}
          onCheckedChange={(checked) =>
            setLoginData((prev: any) => ({
              ...prev,
              rememberMe: checked as boolean,
            }))
          }
        />

        <Label className="text-sm">Remember me</Label>

      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
      >
        Sign In
      </Button>

    </form>
  );
}