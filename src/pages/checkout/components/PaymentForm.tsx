import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { CreditCard } from "lucide-react";

import { validatePaymentField } from "../validation/paymentValidation";
import { FormField } from "../components/form/PaymentForm";

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
    if (fieldError(f)) return "border-red-500 focus-visible:ring-red-500";
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

        <FormField
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

          <FormField
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

          <FormField
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

        <FormField
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