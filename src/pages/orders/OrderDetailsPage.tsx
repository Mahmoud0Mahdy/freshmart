import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Card, CardContent } from "../../components/ui/card";

import { Button } from "../../components/ui/button";

import {
  ArrowLeft,
  Package,
  CalendarDays,
  CreditCard,
  CircleDollarSign,
  ShoppingBag,
} from "lucide-react";

import { toast } from "sonner";

import { getOrderDetails, cancelOrder } from "../../api/orderApi";

import { OrderDetails } from "./types/orderTypes";

export function OrderDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState<OrderDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [cancelLoading, setCancelLoading] = useState(false);

  // ================= FETCH =================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(Number(id));

        setOrder(data);
      } catch (err) {
        console.error(err);

        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // ================= CANCEL =================

  const handleCancel = async () => {
    if (!order) return;

    try {
      setCancelLoading(true);

      await cancelOrder(order.id);

      toast.success("Order cancelled successfully");

      setOrder({
        ...order,
        orderStatus: "Cancelled",
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border border-green-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-200";

      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />

          <p className="text-gray-500 text-lg">Order not found</p>
        </div>
      </div>
    );
  }

  // ================= PAGE =================

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate("/orders")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Orders
        </Button>

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Order #{order.id}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <CalendarDays size={16} />

                <span>
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <span
              className={`inline-flex items-center px-6 py-3.5 rounded-full text-base font-semibold w-fit ${getStatusStyle(order.orderStatus)}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* ITEMS */}
            <Card className="border-0 shadow-sm rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Items
                </h2>
              </div>

              <CardContent className="space-y-4 bg-gray-50/40">
                {(order.items || []).map((item: any, index: number) => {
                  // 🔥 detect ghost craft
                  const isGhostCraft = !!item.ghostCraftOrderId;

                  // 🔥 better fallback
                  const itemName =
                    item.name?.trim() ||
                    (isGhostCraft ? "Ghost Craft Meal" : "Unknown Product");

                  const itemPrice = Number(item.price || 0);

                  const quantity = Number(item.quantity || 0);

                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-4">
                        {/* ICON */}
                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                          <Package size={24} className="text-green-600" />
                        </div>

                        {/* INFO */}
                        <div>
                          {/* 🔥 ghost craft badge */}
                          {isGhostCraft && (
                            <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold mb-2">
                              Ghost Craft
                            </div>
                          )}

                          <h3 className="font-bold text-gray-900 text-lg">
                            {itemName}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {quantity}
                          </p>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="text-right mr-2">
                        <p className="text-sm text-gray-500 mb-1 ">Total</p>

                        <p className="font-bold text-lg text-gray-900">
                          ${(itemPrice * quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* SUMMARY */}
            <Card className="border-0 shadow-sm rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
              </div>

              <CardContent className="space-y-2">
                {/* PAYMENT */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CreditCard size={17} />

                    <span>Payment Method</span>
                  </div>

                  <span className="font-semibold text-gray-900">
                    {order.paymentMethod}
                  </span>
                </div>

                {/* PAYMENT STATUS */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CircleDollarSign size={17} />

                    <span>Payment Status</span>
                  </div>

                  <span className="font-semibold text-gray-900">
                    {order.paymentStatus || "Pending"}
                  </span>
                </div>

                {/* TOTAL */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-gray-900">
                    ${Number(order.totalPrice || 0).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* CANCEL BUTTON */}
            {order.orderStatus === "Pending" && (
              <Button
                onClick={handleCancel}
                disabled={cancelLoading}
                variant="destructive"
                className="w-full h-14 rounded-2xl text-base font-semibold"
              >
                {cancelLoading ? "Cancelling..." : "Cancel Order"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
