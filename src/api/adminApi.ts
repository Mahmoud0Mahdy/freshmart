import axiosInstance from "./axiosInstance";

// ================= USERS =================

// GET ALL USERS (Admin)
export const getAllUsers = async () => {
  const res = await axiosInstance.get("/Users");
  return res.data;
};

// TOGGLE USER STATUS (Admin)
export const updateUserStatus = async (id, isActive) => {
  const res = await axiosInstance.put(`/Users/${id}/status`, {
    isActive,
  });
  return res.data;
};

// ================= CATEGORIES =================

// GET Categories by type ("Recipe" | "Product")
export const getCategories = async (
  type: "Recipe" | "Product"
) => {
  const res = await axiosInstance.get(`/Categories/${type}`);
  return res.data;
};

export const getAllCategories = async () => {
  try {
    const [recipeRes, productRes] = await Promise.all([
      axiosInstance.get("/Categories/Recipe"),
      axiosInstance.get("/Categories/Product"),
    ]);

    const recipe = recipeRes.data.map((item) => ({
      ...item,
      type: "Recipe",
    }));

    const product = productRes.data.map((item) => ({
      ...item,
      type: "Product",
    }));

    return [...recipe, ...product];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// ADD CATEGORY
export const createCategory = async (data) => {
  const res = await axiosInstance.post("/Categories", data);
  return res.data;
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/Categories/${id}`);
  return res.data;
};

// ================= Orders =================

export enum OrderStatus {
  Pending = 0,
  Confirmed = 1,
  Shipped = 2,
  Delivered = 3,
  Cancelled = 4,
}

// GET ALL ORDERS (Admin)
export const getAllOrders = async () => {
  const res = await axiosInstance.get("/admin/orders");
  return res.data;
};

// GET ORDER BY ID (Admin)
export const getOrderById = async (id: string | number) => {
  const res = await axiosInstance.get(`/admin/orders/${id}`);
  return res.data;
};

// UPDATE ORDER STATUS (Admin)
export const updateOrderStatus = async (
  id: string | number,
  status: OrderStatus
) => {
  const statusString = OrderStatus[status];

  const res = await axiosInstance.put(
    `/admin/orders/${id}/status`,
    {
      status: statusString,
    }
  );

  return res.data;
};