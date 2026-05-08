import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Eye } from "lucide-react";
import { OrderStatusDropdown } from "./OrderStatusDropdown";
import { OrderStatus } from "../../../api/adminApi"; // ✅ Fixed import

interface OrdersTableProps {
  orders: any[];
  onRefresh: () => void;
  onViewDetails: (order: any) => void;
}

export function OrdersTable({ orders, onRefresh, onViewDetails }: OrdersTableProps) {
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending: return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Pending</Badge>;
      case OrderStatus.Confirmed: return <Badge className="bg-blue-500 hover:bg-blue-600">Confirmed</Badge>;
      case OrderStatus.Shipped: return <Badge className="bg-purple-500 hover:bg-purple-600">Shipped</Badge>;
      case OrderStatus.Delivered: return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case OrderStatus.Cancelled: return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Total</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest">Update Status</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  #{order.id?.toString().padStart(5, '0') || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <span className="text-green-700 font-bold text-xs">
                        {order.userName?.charAt(0).toUpperCase() || "G"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{order.userName || "Guest"}</p>
                      <p className="text-xs text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</p>
                    </div>
                  </div>
                </td>
                {/* ✅ Using safeTotal */}
                <td className="px-6 py-4 font-bold text-gray-700 text-center">
                  ${Number(order.safeTotal || 0).toFixed(2)}
                </td>
                {/* ✅ Using safeStatus */}
                <td className="px-6 py-4">
                  {getStatusBadge(order.safeStatus)}
                </td>
                <td className="px-6 py-4">
                  <OrderStatusDropdown 
                    orderId={order.id} 
                    currentStatus={order.safeStatus} 
                    onStatusUpdated={onRefresh} 
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewDetails(order)}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}