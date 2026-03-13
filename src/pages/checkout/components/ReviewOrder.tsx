import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export function ReviewOrder({ formData, cart, setStep, placeOrder }: any) {

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Review Your Order</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600">
            {formData.firstName} {formData.lastName}<br />
            {formData.address}<br />
            {formData.city}, {formData.state} {formData.zipCode}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p className="text-gray-600">
            **** **** **** {formData.cardNumber.slice(-4)}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Order Items</h3>

          <div className="space-y-2">
            {cart.map((item: any) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => setStep(2)}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            onClick={placeOrder}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Place Order
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}