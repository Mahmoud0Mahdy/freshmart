import { Card } from "../../../components/ui/card";
import { ShoppingBag, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";
import { OrderStatus } from "../../../api/adminApi";

interface OrdersStatsProps {
  orders: any[];
}

export function OrdersStats({ orders }: OrdersStatsProps) {
  const pendingCount = orders.filter((o) => o.safeStatus === OrderStatus.Pending).length;
  const shippedCount = orders.filter((o) => o.safeStatus === OrderStatus.Shipped).length;
  const deliveredCount = orders.filter((o) => o.safeStatus === OrderStatus.Delivered).length;
  const cancelledCount = orders.filter((o) => o.safeStatus === OrderStatus.Cancelled).length;

  return (
    <div className="space-y-4 mb-6">
      
      {/* 1. TOP ROW: Total Orders (Sleeker, reduced height) */}
      <Card className="py-4 flex items-center justify-center gap-4 shadow-sm border-blue-100 bg-blue-50/30">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Orders</p>
          <p className="text-3xl font-black text-blue-900 leading-none text-center">{orders.length}</p>
        </div>
      </Card>

      {/* 2. BOTTOM ROW: 4 Statuses (Perfectly centered) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Pending */}
        <Card className="py-4 px-2 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-full mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-orange-600 leading-none mb-1">{pendingCount}</p>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Pending</p>
        </Card>

        {/* Shipped */}
        <Card className="py-4 px-2 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-full mb-2">
            <Truck className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-purple-600 leading-none mb-1">{shippedCount}</p>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Shipped</p>
        </Card>

        {/* Delivered */}
        <Card className="py-4 px-2 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 bg-green-50 text-green-600 rounded-full mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-green-600 leading-none mb-1">{deliveredCount}</p>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Delivered</p>
        </Card>

        {/* Cancelled */}
        <Card className="py-4 px-2 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="p-2 bg-red-50 text-red-600 rounded-full mb-2">
            <XCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-red-600 leading-none mb-1">{cancelledCount}</p>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Cancelled</p>
        </Card>

      </div>
    </div>
  );
}