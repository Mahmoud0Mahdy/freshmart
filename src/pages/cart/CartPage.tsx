import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useApp } from "../../contexts/AppContext";
import { useCart } from "../../contexts/CartContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import { RemoveConfirmModal } from "./RemoveConfirmModal";

export function CartPage() {
  const navigate = useNavigate();

  const { state } = useApp();
  const { cart, updateItem, removeItem } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);

  // ================= UPDATE =================
  const updateQuantity = useCallback(
    (itemId: number, newQuantity: number) => {

      if (newQuantity <= 0) {
        setPendingRemove(itemId);
        setShowModal(true);
        return;
      }

      updateItem(itemId, newQuantity)
        .catch(() => {
          toast.error("Failed to update");
        });

    },
    [updateItem]
  );

  // ================= DELETE =================
  const removeFromCart = useCallback(
    (itemId: number) => {

      removeItem(itemId)
        .then(() => {
          toast.success("Item removed");
        })
        .catch(() => {
          toast.error("Failed to remove");
        });

    },
    [removeItem]
  );

  const confirmRemove = useCallback(() => {
    if (pendingRemove !== null) {
      removeFromCart(pendingRemove);
    }
    setShowModal(false);
    setPendingRemove(null);
  }, [pendingRemove, removeFromCart]);

  const cancelRemove = useCallback(() => {
    setShowModal(false);
    setPendingRemove(null);
  }, []);

  const proceedToCheckout = useCallback(() => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  }, [cart, navigate]);

  // ================= EMPTY =================
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">

          <Button
            variant="ghost"
            onClick={() => navigate("/shop")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2" size={16} />
            Continue Shopping
          </Button>

          <div className="text-center py-12">
            <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />

            <h2 className="text-2xl font-bold mb-4">
              Your cart is empty
            </h2>

            <Button
              onClick={() => navigate("/shop")}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Shopping
            </Button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <RemoveConfirmModal
        open={showModal}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">

        <Button
          variant="ghost"
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Continue Shopping
        </Button>

        <h1 className="text-3xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <CartItems
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <OrderSummary
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            proceedToCheckout={proceedToCheckout}
          />

        </div>

      </div>
    </div>
  );
}