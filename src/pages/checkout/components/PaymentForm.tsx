import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { validatePaymentField } from "../vakidation/paymentValidation";

export function PaymentForm({ formData, handleInputChange, nextStep, setStep }: any) {

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardName"];

  const handleChange = (field: string, value: string) => {

    if (field === "cardNumber") {

      value = value.replace(/\D/g, "").slice(0, 16);

      value = value.replace(/(.{4})/g, "$1 ").trim();
    }

    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    if (field === "expiryDate") {

      value = value.replace(/[^\d]/g, "").slice(0, 4);

      if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    if (field === "cardName") {

      value = value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
    }

    handleInputChange(field, value);

    if (touched[field]) {

      const valid = validatePaymentField(field, value);

      setErrors((prev: any) => ({
        ...prev,
        [field]: !valid
      }));
    }
  };

  const handleBlur = (field: string) => {

    setTouched((p: any) => ({ ...p, [field]: true }));

    const valid = validatePaymentField(field, formData[field] || "");

    setErrors((prev: any) => ({
      ...prev,
      [field]: !valid
    }));
  };

  const fieldError = (f: string) => touched[f] && errors[f];
  const fieldValid = (f: string) => touched[f] && !errors[f] && formData[f];

  const inputStyle = (f: string) => {

    if (fieldError(f))
      return "border-red-500 focus-visible:ring-red-500";

    return "focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500";
  };

  const disableContinue = requiredFields.some(
    (field) => !formData[field] || errors[field]
  );

  return (

    <Card className="border-0 shadow-md">

      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2" size={20} />
          Payment Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <Field
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber}
          placeholder="1234 5678 9012 3456"
          error="Invalid card number"
          handleChange={handleChange}
          handleBlur={handleBlur}
          inputStyle={inputStyle}
          fieldError={fieldError}
          fieldValid={fieldValid}
        />

        <div className="grid grid-cols-2 gap-4">

          <Field
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate}
            placeholder="MM/YY"
            error="Card expired or invalid date"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

          <Field
            label="CVV"
            name="cvv"
            value={formData.cvv}
            placeholder="123"
            error="Invalid CVV"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

        </div>

        <Field
          label="Name on Card"
          name="cardName"
          value={formData.cardName}
          placeholder="John Doe"
          error="Enter valid card name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          inputStyle={inputStyle}
          fieldError={fieldError}
          fieldValid={fieldValid}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveInfo"
            checked={formData.saveInfo}
            onCheckedChange={(checked) =>
              handleInputChange("saveInfo", checked as boolean)
            }
          />
          <Label htmlFor="saveInfo">
            Save payment information for future orders
          </Label>
        </div>

        <div className="flex space-x-4">

          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            disabled={disableContinue}
            onClick={nextStep}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Review Order
          </Button>

        </div>

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
  fieldValid
}: any) {

  return (

    <div className="space-y-1 relative">

      <Label className="text-sm font-medium text-gray-700">
        {label} *
      </Label>

      <div className="relative">

        <Input
          value={value}
          placeholder={placeholder}
          maxLength={
            name === "cardNumber"
              ? 19
              : name === "expiryDate"
              ? 5
              : name === "cvv"
              ? 4
              : 50
          }
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          className={`${inputStyle(name)} pr-10`}
        />

        {fieldValid(name) && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-100 text-emerald-600 w-5 h-5 flex items-center justify-center rounded-full">
            <CheckCircle2 size={14} strokeWidth={3} />
          </div>
        )}

        {fieldError(name) && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-100 text-red-600 w-5 h-5 flex items-center justify-center rounded-full">
            <AlertCircle size={14} strokeWidth={3} />
          </div>
        )}

      </div>

      {fieldError(name) && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

    </div>
  );
}