import axiosInstance from "./axiosInstance";

export interface GhostCraftRequest {
  dishDescription: string;
  allergies: string[];
  dietaryPreferences: string[];
  spicinessLevel: number;
  saltinessLevel: number;
  portionSize: string;
  specialInstructions: string;
}

export const createGhostCraftOrder = async (
  data: GhostCraftRequest
) => {
  await axiosInstance.post("/GhostCraft", data);
};
