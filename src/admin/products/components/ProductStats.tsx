import { Card } from '../../../components/ui/card';
import type { Product } from '../../../contexts/AppContext';

interface ProductStatsProps {
  products: Product[];
}

export function ProductStats({ products }: ProductStatsProps) {
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Total Products</p>
        <p className="text-2xl">{products.length}</p>
      </Card>
      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">In Stock</p>
        <p className="text-2xl text-green-600">{inStockCount}</p>
      </Card>
      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Out of Stock</p>
        <p className="text-2xl text-red-600">{outOfStockCount}</p>
      </Card>
    </div>
  );
}