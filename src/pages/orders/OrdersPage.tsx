import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "../../components/ui/card";

import { Button } from "../../components/ui/button";

import { ShoppingBag, CalendarDays, ChevronRight } from "lucide-react";

import { getOrders } from "../../api/orderApi";

import { Order } from "./types/orderTypes";

export function OrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH =================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();

        setOrders(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ================= STATUS STYLE =================

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Delivered":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ================= DATE =================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ================= EMPTY =================

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <ShoppingBag size={40} className="text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">No Orders Yet</h2>

        <p className="text-gray-500 text-center mb-7 max-w-sm">
          Start shopping and your orders will appear here.
        </p>

        <Button
          onClick={() => navigate("/shop")}
          className="bg-green-600 hover:bg-green-700 rounded-xl px-7"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  // ================= PAGE =================

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* HEADER */}
        <div className="pt-4">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            My Orders
          </h1>

          <p className="text-gray-500 mt-3 ml-1 mb-6">
            Track your recent orders
          </p>
        </div>

        {/* ORDERS */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <CardContent className="px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  {/* LEFT */}
                  <div className="flex-1 min-w-0">
                    {/* ORDER TITLE */}
                    <div className="flex items-center gap-3 flex-wrap mt-4">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Order #{order.id}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* DATE */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <CalendarDays size={15} />

                      <span>{formatDate(order.createdAt)}</span>
                    </div>

                    {/* PAYMENT */}
                    <div className="mt-4">
                      <p className="text-xs tracking-wide text-gray-400">
                        Payment
                      </p>

                      <h4 className="font-medium text-gray-900 mt-1 text-lg">
                        {order.paymentMethod}
                      </h4>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 shrink-0">
                    {/* PRICE */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>

                      <h3 className="text-4xl font-bold text-gray-900 mt-1">
                        ${order.totalPrice.toFixed(2)}
                      </h3>
                    </div>

                    {/* BUTTON */}
                    <Button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="bg-green-600 hover:bg-green-700 rounded-xl px-4 h-10 text-sm"
                    >
                      Details
                      <ChevronRight size={15} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
