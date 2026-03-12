import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import PasswordInput from "../../components/PasswordInput";

interface Props {
  signupData: any;
  setSignupData: any;
  handleSignup: any;
}

export default function SignupForm({
  signupData,
  setSignupData,
  handleSignup,
}: Props) {
  return (
    <form onSubmit={handleSignup} className="space-y-4">

      <div className="grid grid-cols-2 gap-4">

        <Input
          placeholder="First Name"
          value={signupData.firstName}
          onChange={(e) =>
            setSignupData((prev: any) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />

        <Input
          placeholder="Last Name"
          value={signupData.lastName}
          onChange={(e) =>
            setSignupData((prev: any) => ({
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
          setSignupData((prev: any) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <PasswordInput
        placeholder="Password"
        value={signupData.password}
        onChange={(e) =>
          setSignupData((prev: any) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <PasswordInput
        placeholder="Confirm Password"
        value={signupData.confirmPassword}
        onChange={(e) =>
          setSignupData((prev: any) => ({
            ...prev,
            confirmPassword: e.target.value,
          }))
        }
      />

      <div className="flex items-center space-x-2">

        <Checkbox
          checked={signupData.agreeToTerms}
          onCheckedChange={(checked) =>
            setSignupData((prev: any) => ({
              ...prev,
              agreeToTerms: checked as boolean,
            }))
          }
        />

        <span className="text-sm">
          I agree to the Terms & Conditions
        </span>

      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700">
        Create Account
      </Button>

    </form>
  );
}