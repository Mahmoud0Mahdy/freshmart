export const buildOrderAddress = (
  address?: string,
  city?: string,
  state?: string,
  zipCode?: string
) => {

  return [
    address?.trim(),
    city?.trim(),
    state?.trim(),
    zipCode?.trim(),
  ]
    .filter((item) => item && item.length > 0)
    .join(", ");
};

export const generateRequestId = () => {
  return crypto.randomUUID();
};