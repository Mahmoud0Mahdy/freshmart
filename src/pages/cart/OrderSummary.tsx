import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { CreditCard } from 'lucide-react';

interface Props {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  promoCode: string;
  setPromoCode: (v: string) => void;
  proceedToCheckout: () => void;
}

export function OrderSummary({
  subtotal,
  tax,
  shipping,
  total,
  promoCode,
  setPromoCode,
  proceedToCheckout
}: Props) {

  return (
    <div>

      <Card className="border-0 shadow-md sticky top-8">

        <CardContent className="p-6">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 mb-4">

            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-gray-500">
                Free shipping on orders over $50
              </p>
            )}

          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="space-y-3 mb-6">

            <label className="block text-sm font-medium text-gray-700">
              Promo Code
            </label>

            <div className="flex space-x-2">

              <Input
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />

              <Button variant="outline" size="sm">
                Apply
              </Button>

            </div>

          </div>

          <Button
            onClick={proceedToCheckout}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <CreditCard className="mr-2" size={20} />
            Proceed to Checkout
          </Button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Secure checkout powered by SSL encryption
          </p>

        </CardContent>

      </Card>

    </div>
  );
}