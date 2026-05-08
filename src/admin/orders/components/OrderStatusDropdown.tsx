import { useState } from "react";
import { toast } from "sonner";
import { OrderStatus, updateOrderStatus } from "../../../api/adminApi"; // ✅ Fixed import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface OrderStatusDropdownProps {
  orderId: string | number;
  currentStatus: OrderStatus;
  onStatusUpdated: () => void;
}

export function OrderStatusDropdown({ orderId, currentStatus, onStatusUpdated }: OrderStatusDropdownProps) {
  const [loading, setLoading] = useState(false);

  // ✅ 100% crash-proof string conversion
  const dropdownValue = (currentStatus ?? OrderStatus.Pending).toString();

  const handleStatusChange = async (newStatusString: string) => {
    const newStatusInt = parseInt(newStatusString, 10);

    if (currentStatus === OrderStatus.Delivered) {
      toast.error("Can't be changed, it is already delivered");
      return;
    }
    if (currentStatus === OrderStatus.Cancelled) {
      toast.error("The order is already cancelled");
      return;
    }
    if (currentStatus === OrderStatus.Confirmed && newStatusInt === OrderStatus.Cancelled) {
      toast.error("Can't be cancelled, it is already confirmed");
      return;
    }
    
    setLoading(true);
    try {
      // ✅ Sending explicit integer prevents 400 Bad Request
      await updateOrderStatus(orderId, newStatusInt as OrderStatus);
      toast.success("Order status updated");
      onStatusUpdated();
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const isTerminal = currentStatus === OrderStatus.Delivered || currentStatus === OrderStatus.Cancelled;

  return (
    <Select
      value={dropdownValue}
      onValueChange={handleStatusChange}
      disabled={loading || isTerminal || !orderId}
    >
      <SelectTrigger className="w-[140px] h-8 text-xs">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={OrderStatus.Pending.toString()}>Pending</SelectItem>
        <SelectItem value={OrderStatus.Confirmed.toString()}>Confirmed</SelectItem>
        <SelectItem value={OrderStatus.Shipped.toString()}>Shipped</SelectItem>
        <SelectItem value={OrderStatus.Delivered.toString()}>Delivered</SelectItem>
        <SelectItem value={OrderStatus.Cancelled.toString()}>Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}