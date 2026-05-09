export const buildOrderAddress = (
  address?: string,
  city?: string,
  state?: string
) => {

  return [
    address,
    city,
    state
  ]
    .filter(Boolean)
    .join(" ");
};

export const generateRequestId = () => {
  return crypto.randomUUID();
};