export const paymentPatterns = {
  expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cvv: /^[0-9]{3,4}$/,
  cardName: /^[A-Za-z\s]{2,50}$/
};

/* ---------- LUHN ALGORITHM ---------- */

export const validateCardNumber = (cardNumber: string) => {

  const number = cardNumber.replace(/\s/g, "");

  if (number.length !== 16) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = number.length - 1; i >= 0; i--) {

    let digit = parseInt(number[i]);

    if (shouldDouble) {

      digit *= 2;

      if (digit > 9) digit -= 9;
    }

    sum += digit;

    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

/* ---------- MAIN VALIDATION ---------- */

export const validatePaymentField = (field: string, value: string) => {

  if (!value) return false;

  switch (field) {

    case "cardNumber":
      return validateCardNumber(value);

    case "expiryDate": {

      if (!paymentPatterns.expiryDate.test(value)) return false;

      const [month, year] = value.split("/");

      const expMonth = parseInt(month, 10);
      const expYear = 2000 + parseInt(year, 10);

      const now = new Date();

      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      if (expYear < currentYear) return false;

      if (expYear === currentYear && expMonth < currentMonth) return false;

      return true;
    }

    case "cvv":
      return paymentPatterns.cvv.test(value);

    case "cardName":
      return paymentPatterns.cardName.test(value);

    default:
      return true;
  }
};