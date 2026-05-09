import axiosInstance from "./axiosInstance";

import {
  PlaceOrderPayload,
} from "../pages/orders/types/orderTypes";

// 🔥 PLACE ORDER
export const placeOrder = async (
  payload: PlaceOrderPayload
) => {

  const response =
    await axiosInstance.post(
      "/Order/place",
      payload
    );

  return response.data;
};

// 🔥 GET ALL ORDERS
export const getOrders =
  async () => {

    const response =
      await axiosInstance.get(
        "/Order"
      );

    return response.data;
  };

// 🔥 GET ORDER DETAILS
export const getOrderDetails =
  async (
    id: number
  ) => {

    const response =
      await axiosInstance.get(
        `/Order/${id}`
      );

    return response.data;
  };

// 🔥 CANCEL ORDER
export const cancelOrder =
  async (
    id: number
  ) => {

    const response =
      await axiosInstance.post(
        `/Order/${id}/cancel`
      );

    return response.data;
  };