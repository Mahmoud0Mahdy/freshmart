import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ShoppingBag, CalendarDays, ChevronRight } from "lucide-react";
import { getOrders } from "../../../api/orderApi";
import { Order } from "../types/orderTypes";
import "./Orders.css"; // <-- Import the shared CSS file

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
        return "status-badge status-confirmed";
      case "Cancelled":
        return "status-badge status-cancelled";
      case "Delivered":
        return "status-badge status-delivered";
      default:
        return "status-badge status-pending";
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
      <div className="loader-container">
        <div className="spinner" />
      </div>
    );
  }

  // ================= EMPTY =================
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrapper">
          <ShoppingBag size={40} className="icon-green" />
        </div>
        <h2 className="empty-title">No Orders Yet</h2>
        <p className="empty-subtitle">
          Start shopping and your orders will appear here.
        </p>
        <Button onClick={() => navigate("/shop")} className="btn btn-primary btn-lg">
          Start Shopping
        </Button>
      </div>
    );
  }

  // ================= PAGE =================
  return (
    <div className="page-wrapper">
      <div className="container">
        {/* HEADER */}
        <div className="orders-header">
          <h1 className="page-title">My Orders</h1>
          <p className="page-subtitle">Track your recent orders</p>
        </div>

        {/* ORDERS */}
        <div className="orders-list">
          {orders.map((order) => (
            <Card key={order.id} className="order-card">
              <CardContent className="order-card-content">
                {/* LEFT */}
                <div className="order-left">
                  <div className="order-title-wrapper">
                    <h2 className="order-id">Order #{order.id}</h2>
                    <span className={getStatusStyle(order.status)}>
                      {order.status}
                    </span>
                  </div>

                  <div className="order-date">
                    <CalendarDays size={15} />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>

                  <div className="order-payment">
                    <p className="order-payment-label">Payment</p>
                    <h4 className="order-payment-method">{order.paymentMethod}</h4>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="order-right">
                  <div className="order-total">
                    <p className="order-total-label">Total</p>
                    <h3 className="order-total-price">
                      ${order.totalPrice.toFixed(2)}
                    </h3>
                  </div>

                  <Button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="btn btn-primary"
                  >
                    Details
                    <ChevronRight size={15} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}