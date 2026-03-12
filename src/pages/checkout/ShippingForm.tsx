import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { validateField } from "./checkoutValidation";

export function ShippingForm({
  formData,
  handleInputChange,
  nextStep,
  subtotal,
}: any) {
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "address",
    "city",
    "state",
    "zipCode",
  ];

  const handleChange = (field: string, value: string) => {
    handleInputChange(field, value);

    if (touched[field]) {
      const valid = validateField(field, value);

      setErrors((prev: any) => ({
        ...prev,
        [field]: !valid,
      }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((p: any) => ({ ...p, [field]: true }));

    const valid = validateField(field, formData[field] || "");

    setErrors((prev: any) => ({
      ...prev,
      [field]: !valid,
    }));
  };

  const fieldError = (f: string) => touched[f] && errors[f];
  const fieldValid = (f: string) => touched[f] && !errors[f] && formData[f];

  const inputStyle = (f: string) => {
    if (fieldError(f)) return "border-red-500 focus-visible:ring-red-500";
    return "focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500";
  };

  const disableContinue = requiredFields.some(
    (field) => !formData[field] || errors[field],
  );

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-semibold">
          <MapPin size={18} className="mr-2 text-gray-500" />
          Shipping Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* FIRST / LAST */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First Name"
            name="firstName"
            value={formData.firstName}
            placeholder="John"
            error="Enter valid first name"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

          <Field
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            placeholder="Doe"
            error="Enter valid last name"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />
        </div>

        {/* EMAIL / PHONE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Email"
            name="email"
            value={formData.email}
            placeholder="john@example.com"
            error="Enter a valid email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

          <Field
            label="Phone"
            name="phone"
            value={formData.phone}
            placeholder="(555) 123-4567"
            error="Invalid phone number"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />
        </div>

        {/* ADDRESS */}

        <Field
          label="Address"
          name="address"
          value={formData.address}
          placeholder="123 Main Street"
          error="Enter valid address"
          handleChange={handleChange}
          handleBlur={handleBlur}
          inputStyle={inputStyle}
          fieldError={fieldError}
          fieldValid={fieldValid}
        />

        {/* CITY STATE ZIP */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field
            label="City"
            name="city"
            value={formData.city}
            error="Invalid city"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

          <Field
            label="State"
            name="state"
            value={formData.state}
            error="Invalid state"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

          <Field
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            error="Invalid ZIP code"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />
        </div>

        {/* DELIVERY */}

        {/* DELIVERY */}

        <div className="space-y-3">
          <Label className="font-medium">Delivery Method</Label>

          <RadioGroup
            value={formData.deliveryMethod}
            onValueChange={(v) => handleInputChange("deliveryMethod", v)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="text-sm">
                Standard Delivery (3-5 days) —{" "}
                {subtotal > 50 ? "Free" : "$5.99"}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="text-sm">
                Express Delivery (1-2 days) — $12.99
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* BUTTON */}

        <Button
          type="button"
          variant="default"
          disabled={disableContinue}
          onClick={nextStep}
          className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Continue to Payment
        </Button>
      </CardContent>
    </Card>
  );
}

/* ---------- FIELD COMPONENT ---------- */

function Field({
  label,
  name,
  value,
  placeholder,
  error,
  handleChange,
  handleBlur,
  inputStyle,
  fieldError,
  fieldValid,
}: any) {
  return (
    <div className="space-y-1 relative">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>

      <div className="relative">
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          className={`${inputStyle(name)} pr-10`}
        />

        {fieldValid(name) && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={14} strokeWidth={3} />
          </div>
        )}

        {fieldError(name) && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600">
            <AlertCircle size={14} strokeWidth={3} />
          </div>
        )}
      </div>

      {fieldError(name) && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}
