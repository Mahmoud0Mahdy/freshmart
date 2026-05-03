import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DailyOffers({ products }: any) {

  const navigate = useNavigate();

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="text-orange-500 mr-2" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">
              Daily Offers
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Limited time deals on your favorite products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Card
              key={product.id}
              className="group cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md bg-white"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <ImageWithFallback
                    src={product.imageUrl} // 🔥 مهم
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                    25% OFF
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600 font-bold">
                      ${(product.price * 0.75).toFixed(2)}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}