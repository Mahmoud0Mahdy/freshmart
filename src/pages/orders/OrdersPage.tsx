import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
} from "../../components/ui/card";

import {
  Button,
} from "../../components/ui/button";

import {
  ShoppingBag,
  Package,
  CalendarDays,
  CreditCard,
  ChevronRight,
} from "lucide-react";

import {
  getOrders,
} from "../../api/orderApi";

import {
  Order,
} from "./types/orderTypes";

export function OrdersPage() {

  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH =================

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const data =
            await getOrders();

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

  const getStatusStyle = (
    status: string
  ) => {

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

          <p className="text-gray-500 text-lg">
            Loading your orders...
          </p>

        </div>

      </div>
    );
  }

  // ================= EMPTY =================

  if (orders.length === 0) {

    return (

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

        <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-sm">

          <ShoppingBag
            size={48}
            className="text-green-600"
          />

        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          No Orders Yet
        </h2>

        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven’t placed any orders yet.
          Start shopping and your orders will appear here.
        </p>

        <Button
          onClick={() => navigate("/shop")}
          className="bg-green-600 hover:bg-green-700 h-11 px-8 rounded-xl"
        >
          Start Shopping
        </Button>

      </div>
    );
  }

  // ================= PAGE =================

  return (

    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track, manage and review your recent orders
          </p>

        </div>

        {/* ORDERS */}
        <div className="space-y-6">

          {orders.map((order) => (

            <Card
              key={order.id}
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
            >

              <CardContent className="p-0">

                {/* TOP BAR */}
                <div className="bg-white px-6 py-5 border-b border-gray-100">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                        <Package
                          size={24}
                          className="text-green-600"
                        />

                      </div>

                      <div>

                        <h2 className="text-xl font-bold text-gray-900">
                          Order #{order.id}
                        </h2>

                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">

                          <CalendarDays size={15} />

                          <span>
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* STATUS */}
                    <div>

                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-6 bg-gray-50/40">

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* TOTAL */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">

                      <p className="text-sm text-gray-500 mb-2">
                        Total Amount
                      </p>

                      <h3 className="text-2xl font-bold text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </h3>

                    </div>

                    {/* PAYMENT */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">

                      <div className="flex items-center gap-2 mb-2 text-gray-500">

                        <CreditCard size={16} />

                        <p className="text-sm">
                          Payment Method
                        </p>

                      </div>

                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.paymentMethod}
                      </h3>

                    </div>

                    {/* ACTION */}
                    <div className="flex items-center">

                      <Button
                        onClick={() =>
                          navigate(`/orders/${order.id}`)
                        }
                        className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-base font-semibold"
                      >

                        View Details

                        <ChevronRight
                          size={18}
                          className="ml-2"
                        />

                      </Button>

                    </div>

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