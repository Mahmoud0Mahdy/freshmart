import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

export function CheckoutSummary({ subtotal, tax, shipping, total }: any) {

  return (
    <div>
      <Card className="border-0 shadow-md sticky top-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent>

          <div className="space-y-3 mb-4">

            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>

          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}