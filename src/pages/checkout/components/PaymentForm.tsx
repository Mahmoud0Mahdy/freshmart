import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Button } from "../../../components/ui/button";

import { Label } from "../../../components/ui/label";

import { Checkbox } from "../../../components/ui/checkbox";

import { CreditCard } from "lucide-react";

import { toast } from "sonner";

import { validatePaymentField } from "../validation/paymentValidation";

import { FormField } from "../components/form/PaymentForm";

import { useCheckout } from "../../../contexts/CheckoutContext";

import { confirmPayment } from "../../../api/paymentApi";

export function PaymentForm({
  formData,
  handleInputChange,
  nextStep,
  setStep,
}: any) {

  const [errors, setErrors] =
    useState<any>({});

  const [touched, setTouched] =
    useState<any>({});

  const [loading, setLoading] =
    useState(false);

  const {
    checkoutData,
    setCheckoutField,
  } = useCheckout();

  const requiredFields = [
    "cardNumber",
    "expiryDate",
    "cvv",
    "cardName",
  ];

  const handleChange = (
    field: string,
    value: string
  ) => {

    // 🔥 CARD NUMBER
    if (field === "cardNumber") {

      value = value
        .replace(/\D/g, "")
        .slice(0, 16);

      value = value
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    // 🔥 CVV
    if (field === "cvv") {

      value = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    // 🔥 EXPIRY
    if (field === "expiryDate") {

      value = value
        .replace(/[^\d]/g, "")
        .slice(0, 4);

      if (value.length >= 3) {

        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2);
      }
    }

    // 🔥 CARD HOLDER
    if (field === "cardName") {

      value = value
        .replace(/[^A-Za-z\s]/g, "")
        .slice(0, 50);
    }

    handleInputChange(
      field,
      value
    );

    // 🔥 live validation
    if (touched[field]) {

      const valid =
        validatePaymentField(
          field,
          value
        );

      setErrors((prev: any) => ({
        ...prev,
        [field]: !valid,
      }));
    }
  };

  const handleBlur = (
    field: string
  ) => {

    setTouched((prev: any) => ({
      ...prev,
      [field]: true,
    }));

    const valid =
      validatePaymentField(
        field,
        formData[field] || ""
      );

    setErrors((prev: any) => ({
      ...prev,
      [field]: !valid,
    }));
  };

  const fieldError = (
    field: string
  ) =>
    touched[field] &&
    errors[field];

  const fieldValid = (
    field: string
  ) =>
    touched[field] &&
    !errors[field] &&
    formData[field];

  const inputStyle = (
    field: string
  ) => {

    if (fieldError(field)) {

      return "border-red-500 focus-visible:ring-red-500";
    }

    return "focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500";
  };

  const disableContinue =
    requiredFields.some(
      (field) =>
        !formData[field] ||
        errors[field]
    );

  const handleContinue = async () => {

    try {

      setLoading(true);

      // 🔥 save payment method
      setCheckoutField(
        "paymentMethodId",
        1
      );

      const [month, year] =
        formData.expiryDate.split("/");

      const payload = {

        paymentMethodId: 1,

        savePayment:
          formData.saveInfo,

        cardNumber:
          formData.cardNumber.replace(/\s/g, ""),

        expiryMonth:
          Number(month),

        expiryYear:
          Number(`20${year}`),

        cvv:
          formData.cvv,
      };

      console.log(
        "CONFIRM PAYMENT:",
        payload
      );

      // 🔥 confirm payment
      await confirmPayment(
        checkoutData.orderId,
        payload
      );

      toast.success(
        "Payment confirmed successfully"
      );

      nextStep();

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to confirm payment"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <Card className="border-0 shadow-md">

      <CardHeader>

        <CardTitle className="flex items-center">
          <CreditCard
            className="mr-2"
            size={20}
          />

          Payment Information
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        {/* CARD NUMBER */}
        <FormField
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber || ""}
          placeholder="1234 5678 9012 3456"
          error="Invalid card number"
          handleChange={handleChange}
          handleBlur={handleBlur}
          inputStyle={inputStyle}
          fieldError={fieldError}
          fieldValid={fieldValid}
        />

        {/* EXPIRY + CVV */}
        <div className="grid grid-cols-2 gap-4">

          <FormField
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate || ""}
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
            value={formData.cvv || ""}
            placeholder="123"
            error="Invalid CVV"
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputStyle={inputStyle}
            fieldError={fieldError}
            fieldValid={fieldValid}
          />

        </div>

        {/* CARD NAME */}
        <FormField
          label="Name on Card"
          name="cardName"
          value={formData.cardName || ""}
          placeholder="John Doe"
          error="Enter valid card name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          inputStyle={inputStyle}
          fieldError={fieldError}
          fieldValid={fieldValid}
        />

        {/* SAVE CARD */}
        <div className="flex items-center space-x-2">

          <Checkbox
            id="saveInfo"
            checked={formData.saveInfo}
            onCheckedChange={(checked) =>
              handleInputChange(
                "saveInfo",
                checked as boolean
              )
            }
          />

          <Label htmlFor="saveInfo">
            Save payment information
            for future orders
          </Label>

        </div>

        {/* ACTIONS */}
        <div className="flex space-x-4">

          <Button
            variant="outline"
            onClick={() => setStep(3)}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            disabled={
              disableContinue ||
              loading
            }
            onClick={handleContinue}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {loading
              ? "Processing..."
              : "Review Order"}
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}