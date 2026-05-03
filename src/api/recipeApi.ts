import axiosInstance from "./axiosInstance";

// ================= RECIPES =================

// 🔥 GET ALL RECIPES
export const getAllRecipes = async () => {
  const res = await axiosInstance.get("/Recipes");
  return res.data;
};

// 🔥 GET RECIPE BY ID
export const getRecipeById = async (id) => {
  const res = await axiosInstance.get(`/Recipes/${id}`);
  return res.data;
};

// 🔥 CREATE RECIPE (Admin)
export const createRecipe = async (data) => {
  const res = await axiosInstance.post("/Recipes", data);
  return res.data;
};

// 🔥 UPDATE RECIPE (Admin)
export const updateRecipe = async (id, data) => {
  await axiosInstance.put(`/Recipes/${id}`, data);
};

// 🔥 DELETE RECIPE (Admin)
export const deleteRecipe = async (id) => {
  await axiosInstance.delete(`/Recipes/${id}`);
};