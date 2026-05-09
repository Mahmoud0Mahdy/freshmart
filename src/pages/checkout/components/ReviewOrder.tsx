import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import { Button } from '../../../components/ui/button';

import {
  useCheckout,
} from '../../../contexts/CheckoutContext';

export function ReviewOrder({
  formData,
  cart,
  setStep,
  placeOrder,
  placingOrder,
}: any) {

  const {
    checkoutData,
  } = useCheckout();

  return (

    <Card className="border-0 shadow-md">

      <CardHeader>

        <CardTitle>
          Review Your Order
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">

        {/* SHIPPING */}
        <div>

          <h3 className="font-semibold mb-2">
            Shipping Address
          </h3>

          <p className="text-gray-600 leading-7">

            {formData.fullName}

            <br />

            {formData.address}

            <br />

            {formData.city},
            {' '}
            {formData.state}
            {' '}
            {formData.zipCode}

          </p>

        </div>

        {/* PAYMENT */}
        <div>

          <h3 className="font-semibold mb-2">
            Payment Method
          </h3>

          {checkoutData.paymentMethodId === 2 ? (

            <div className="text-gray-600">
              Cash On Delivery
            </div>

          ) : (

            <div className="text-gray-600">

              **** **** ****
              {' '}
              {formData.cardNumber?.slice(-4)}

            </div>

          )}

        </div>

        {/* ITEMS */}
        <div>

          <h3 className="font-semibold mb-3">
            Order Items
          </h3>

          <div className="space-y-3">

            {cart.map((item: any) => (

              <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-2"
              >

                <div>

                  <p className="font-medium text-gray-900">
                    {item.product.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity:
                    {' '}
                    {item.quantity}
                  </p>

                </div>

                <div className="font-semibold text-gray-900">

                  $
                  {(item.product.price * item.quantity).toFixed(2)}

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex space-x-4 pt-2">

          <Button
            variant="outline"
            onClick={() => {

              // 🔥 CASH
              if (
                checkoutData.paymentMethodId === 2
              ) {

                setStep(2);

                return;
              }

              // 🔥 CARD
              setStep(4);
            }}
            className="flex-1"
            disabled={placingOrder}
          >
            Back
          </Button>

          <Button
            onClick={placeOrder}
            disabled={placingOrder}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >

            {placingOrder
              ? "Placing Order..."
              : "Place Order"}

          </Button>

        </div>

      </CardContent>

    </Card>
  );
}