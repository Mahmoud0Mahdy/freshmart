import axiosInstance from "./axiosInstance";

// GET CART
export const getCart = async () => {
  const response = await axiosInstance.get("/Cart");
  return response.data;
};

// GET SUMMARY
export const getCartSummary = async () => {
  const response = await axiosInstance.get("/Cart/summary");
  return response.data;
};

// ADD TO CART (supports product + ghost craft)
export const addCartItem = async ({
  productId = null,
  ghostCraftOrderId = null,
  quantity = 1,
}: {
  productId?: number | null;
  ghostCraftOrderId?: number | null;
  quantity?: number;
}) => {
  const response = await axiosInstance.post("/Cart", {
    productId,
    ghostCraftOrderId,
    quantity,
  });

  return response.data;
};

// UPDATE ITEM
export const updateCartItem = async (
  itemId: number,
  quantity: number
) => {
  const response = await axiosInstance.put(`/Cart/${itemId}`, {
    quantity,
  });

  return response.data;
};

// DELETE ITEM
export const deleteCartItem = async (itemId: number) => {
  const response = await axiosInstance.delete(`/Cart/${itemId}`);
  return response.data;
};