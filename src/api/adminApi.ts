import axiosInstance from "./axiosInstance";

// ================= USERS =================

// 🔥 GET ALL USERS (Admin)
export const getAllUsers = async () => {
  const res = await axiosInstance.get("/Users");
  return res.data;
};

// 🔥 TOGGLE USER STATUS (Admin)
export const updateUserStatus = async (id, isActive) => {
  const res = await axiosInstance.put(`/Users/${id}/status`, {
    isActive,
  });
  return res.data;
};

// ================= CATEGORIES =================

// 🔥 GET Categories by type (1 = recipe, 2 = product)
export const getCategories = async (type) => {
  const res = await axiosInstance.get(`/Categories/${type}`);
  return res.data;
};

// 🔥 GET ALL CATEGORIES (merge الاتنين)
export const getAllCategories = async () => {
  try {
    const [recipeRes, productRes] = await Promise.all([
      axiosInstance.get("/Categories/1"), // recipe
      axiosInstance.get("/Categories/2"), // product
    ]);

    const recipe = recipeRes.data.map((item) => ({
      ...item,
      type: 1,
    }));

    const product = productRes.data.map((item) => ({
      ...item,
      type: 2,
    }));

    return [...recipe, ...product];

  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 🔥 ADD CATEGORY
export const createCategory = async (data) => {
  const res = await axiosInstance.post("/Categories", data);
  return res.data;
};