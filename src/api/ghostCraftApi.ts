import axiosInstance from "./axiosInstance";

export interface GhostCraftRequest {
  dishDescription: string;
  allergies: string[];
  dietaryPreferences: string[];
  spicinessLevel: number;
  saltinessLevel: number;
  portionSize: "Small" | "Medium" | "Large" | "Family";
  specialInstructions: string;
}

export interface GhostCraftOrder {
  id?: number | string;
  dishDescription: string;
  allergies: string[];
  dietaryPreferences: string[];
  spicinessLevel: number;
  saltinessLevel: number;
  portionSize: string;
  specialInstructions?: string;
  price: number;
}

export const createGhostCraftOrder = async (data: GhostCraftRequest) => {
  const response = await axiosInstance.post("/GhostCraft", data);
  return response.data;
};

export const updateGhostCraftOrder = async (
  id: number | string,
  data: GhostCraftRequest,
) => {
  const response = await axiosInstance.put(`/GhostCraft/${id}`, data);
  return response.data;
};
