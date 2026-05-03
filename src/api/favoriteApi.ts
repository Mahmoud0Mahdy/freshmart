import axiosInstance from "./axiosInstance";

/* =========================
   🔴 PRODUCT FAVORITES
========================= */

// toggle (save / unsave)
export const toggleProductFavorite = async (
  productId: number | string
) => {
  const res = await axiosInstance.post(
    `/Favorites/${productId}/save`
  );
  return res.data;
};

// get all favorite products
export const getFavoriteProducts = async () => {
  const res = await axiosInstance.get(`/Favorites`);
  return res.data;
};

/* =========================
   🟢 RECIPE FAVORITES
========================= */

// toggle (save / unsave)
export const toggleRecipeFavorite = async (
  recipeId: number | string
) => {
  const res = await axiosInstance.post(
    `/SavedRecipes/${recipeId}/save`
  );
  return res.data;
};

// get all saved recipes
export const getSavedRecipes = async () => {
  const res = await axiosInstance.get(`/SavedRecipes`);
  return res.data;
};