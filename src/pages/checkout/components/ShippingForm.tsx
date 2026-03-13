import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { MapPin } from "lucide-react";

import { validateField } from "../vakidation/shippingValidation";
import { FormField } from "../components/form/PaymentForm";

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

    if (field === "firstName" || field === "lastName") {
      value = value.replace(/[^A-Za-z\s]/g, "").slice(0, 30);
    }

    if (field === "city" || field === "state") {
      value = value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
    }

    if (field === "phone") {
      value = value.replace(/[^\d+()\-\s]/g, "").slice(0, 20);
    }

    if (field === "zipCode") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (field === "address") {
      value = value.slice(0, 100);
    }

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

          <FormField
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

          <FormField
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

          <FormField
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

          <FormField
            label="Phone"
            name="phone"
            value={formData.phone}
            placeholder="+20 100 123 4567"
            error="Invalid phone number"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

        </div>

        {/* ADDRESS */}

        <FormField
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

          <FormField
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

          <FormField
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

          <FormField
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

        <div className="space-y-3">

          <Label className="font-medium">
            Delivery Method
          </Label>

          <RadioGroup
            value={formData.deliveryMethod}
            onValueChange={(v) => handleInputChange("deliveryMethod", v)}
            className="space-y-2"
          >

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="text-sm">
                Standard Delivery (3-5 days) — {subtotal > 50 ? "Free" : "$5.99"}
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