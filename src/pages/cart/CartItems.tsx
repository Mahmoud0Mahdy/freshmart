import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface Props {
  cart: any[];
  updateQuantity: (id: string, q: number) => void;
  removeFromCart: (id: string) => void;
}

export function CartItems({ cart, updateQuantity, removeFromCart }: Props) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {cart.map((item) => (
        <Card key={item.product.id} className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              
              {/* Wrapped Image and Details in a Link */}
              <Link 
                to={`/product/${item.product.id}`} 
                className="flex items-center space-x-4 flex-1 group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.product.description}
                  </p>
                  <p className="text-green-600 font-bold mt-1">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </Link>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>

              {/* Total Price & Delete */}
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 mt-1"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}