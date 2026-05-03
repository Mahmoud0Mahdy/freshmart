import { useNavigate } from "react-router-dom";
import { X, Plus, Minus } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export default function MiniCart({ isOpen = true, onClose }: any) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const subtotal = state.cart.reduce(
    (total: number, item: any) =>
      total + item.product.price * item.quantity,
    0,
  );

  const increaseQty = (item: any) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      productId: item.product.id,
      quantity: item.quantity + 1,
    });
  };

  const decreaseQty = (item: any) => {
    if (item.quantity === 1) {
      const wasLastItem = state.cart.length === 1;

      dispatch({
        type: "REMOVE_FROM_CART",
        productId: item.product.id,
      });

      if (wasLastItem) {
        onClose();
      }

      return;
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      productId: item.product.id,
      quantity: item.quantity - 1,
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed right-0 w-[420px] bg-white z-[100000] flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: "calc(-64px + 100vh)", top: "64px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-semibold text-lg">
            Your Cart ({state.cart.length})
          </h2>

          <button onClick={onClose} className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.cart.map((item: any) => (
            <div
              key={item.product.id}
              className="border rounded-lg p-3 flex gap-4"
            >
              {/* صورة المنتج */}
              <img
                src={item.product.imageUrl}
                className="w-20 h-20 rounded object-cover"
              />

              {/* المعلومات */}
              <div className="flex flex-col justify-center flex-1">
                <h3 className="text-sm font-medium">
                  {item.product.name}
                </h3>

                <span className="text-green-600 font-semibold text-base mt-1">
                  ${item.product.price}
                </span>

                <div className="flex items-center border rounded mt-2 w-fit">
                  <button
                    className="px-3 py-1"
                    onClick={() => decreaseQty(item)}
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-3 text-sm">
                    {item.quantity}
                  </span>

                  <button
                    className="px-3 py-1"
                    onClick={() => increaseQty(item)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 cursor-pointer"
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
            >
              Checkout
            </button>

            <button
              className="flex-1 bg-gray-200 py-3 rounded cursor-pointer"
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}