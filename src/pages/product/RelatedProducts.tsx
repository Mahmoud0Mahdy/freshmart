import { Card, CardContent } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export default function RelatedProducts({ products, product }: any) {

  const navigate = useNavigate();

  const related = products
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mt-12">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {related.map((item: any) => (

          <Card
            key={item.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md"
            onClick={() => navigate(`/product/${item.id}`)}
          >

            <CardContent className="p-0">

              <div className="aspect-square overflow-hidden rounded-t-lg">

                <ImageWithFallback
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

              </div>

              <div className="p-4">

                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>

                <p className="text-green-600 font-bold">
                  ${item.price.toFixed(2)}
                </p>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}