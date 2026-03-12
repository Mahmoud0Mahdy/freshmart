import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

import { CartItems } from './CartItems';
import { OrderSummary } from './OrderSummary';
import { RemoveConfirmModal } from './RemoveConfirmModal';

export function CartPage() {

  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pendingRemove, setPendingRemove] = useState<string | null>(null);

  const subtotal = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const removeFromCart = (productId: string) => {

    dispatch({
      type: 'REMOVE_FROM_CART',
      productId
    });

    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId: string, newQuantity: number) => {

    if (newQuantity === 0) {
      setPendingRemove(productId);
      setShowModal(true);
      return;
    }

    dispatch({
      type: 'UPDATE_QUANTITY',
      productId,
      quantity: newQuantity
    });
  };

  const confirmRemove = () => {

    if (pendingRemove) {
      removeFromCart(pendingRemove);
    }

    setShowModal(false);
    setPendingRemove(null);
  };

  const cancelRemove = () => {

    setShowModal(false);
    setPendingRemove(null);
  };

  const proceedToCheckout = () => {

    if (state.cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/checkout');
  };

  if (state.cart.length === 0) {

    return (

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <Button
            variant="ghost"
            onClick={() => navigate('/shop')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2" size={16} />
            Continue Shopping
          </Button>

          <div className="text-center py-12">

            <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>

            <p className="text-gray-600 mb-8">
              Add some fresh products to get started!
            </p>

            <Button
              onClick={() => navigate('/shop')}
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Continue Shopping
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <CartItems
            cart={state.cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            proceedToCheckout={proceedToCheckout}
          />

        </div>

      </div>

    </div>
  );
}