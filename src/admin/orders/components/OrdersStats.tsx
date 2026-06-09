import { Card } from "../../../components/ui/card";
import { ShoppingBag, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";
import { OrderStatus } from "../../../api/adminApi";
import "../components/orders-admin.css"; // مسار الـ css

interface OrdersStatsProps {
  orders: any[];
}

export function OrdersStats({ orders }: OrdersStatsProps) {
  const pendingCount = orders.filter((o) => o.safeStatus === OrderStatus.Pending).length;
  const shippedCount = orders.filter((o) => o.safeStatus === OrderStatus.Shipped).length;
  const deliveredCount = orders.filter((o) => o.safeStatus === OrderStatus.Delivered).length;
  const cancelledCount = orders.filter((o) => o.safeStatus === OrderStatus.Cancelled).length;

  return (
    <div className="os-wrapper">
      
      {/* 1. TOP ROW: Total Orders */}
      <Card className="os-total-card">
        <div className="os-total-icon">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div className="os-total-text">
          <p className="os-total-label">Total Orders</p>
          <p className="os-total-value">{orders.length}</p>
        </div>
      </Card>

      {/* 2. BOTTOM ROW: 4 Statuses */}
      <div className="os-grid">
        
        {/* Pending */}
        <Card className="os-mini-card">
          <div className="os-mini-icon os-icon-pending">
            <Clock className="w-5 h-5" />
          </div>
          <p className="os-mini-value os-val-pending">{pendingCount}</p>
          <p className="os-mini-label">Pending</p>
        </Card>

        {/* Shipped */}
        <Card className="os-mini-card">
          <div className="os-mini-icon os-icon-shipped">
            <Truck className="w-5 h-5" />
          </div>
          <p className="os-mini-value os-val-shipped">{shippedCount}</p>
          <p className="os-mini-label">Shipped</p>
        </Card>

        {/* Delivered */}
        <Card className="os-mini-card">
          <div className="os-mini-icon os-icon-delivered">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="os-mini-value os-val-delivered">{deliveredCount}</p>
          <p className="os-mini-label">Delivered</p>
        </Card>

        {/* Cancelled */}
        <Card className="os-mini-card">
          <div className="os-mini-icon os-icon-cancelled">
            <XCircle className="w-5 h-5" />
          </div>
          <p className="os-mini-value os-val-cancelled">{cancelledCount}</p>
          <p className="os-mini-label">Cancelled</p>
        </Card>

      </div>
    </div>
  );
}