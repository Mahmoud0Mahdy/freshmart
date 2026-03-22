import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ShoppingCart, ChefHat, PackageOpen, Plus } from 'lucide-react';
import type { Product } from '../../../contexts/AppContext';

interface Props {
  ingredients: string[];
  matchingProducts: Product[];
  onAddSingle: (product: Product) => void;
  onAddAll: () => void;
}

export function IngredientsList({ ingredients, matchingProducts, onAddSingle, onAddAll }: Props) {
  return (
    <div className="space-y-6 sticky top-8">
      
      {/* القسم الأول: المكونات كنص (للقراءة فقط) */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center">
            <ChefHat size={24} className="mr-2 text-green-600" /> 
            Recipe Ingredients
          </h2>
          <ul className="space-y-3">
            {ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start text-gray-700 font-medium leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 shrink-0 shadow-sm"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* القسم الثاني: المنتجات الحقيقية المتاحة في المتجر */}
      <Card className="border border-green-100 shadow-md rounded-2xl bg-gradient-to-b from-white to-green-50/30 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
              <ShoppingCart size={22} className="mr-2 text-green-600" /> 
              Shop Ingredients
            </h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
              {matchingProducts.length} items
            </span>
          </div>

          {matchingProducts.length > 0 ? (
            <>
              <div className="space-y-3 mb-6">
                {matchingProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-50 p-1">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{product.name}</p>
                      <p className="text-green-600 font-black text-sm">${product.price}</p>
                    </div>
                    <Button 
                      size="icon" 
                      className="shrink-0 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded-full h-10 w-10 transition-colors shadow-sm"
                      onClick={() => onAddSingle(product)}
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                onClick={onAddAll} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-green-200"
              >
                Add All To Cart
              </Button>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <PackageOpen size={40} className="mx-auto mb-3 opacity-20 text-gray-400" />
              <p className="text-sm font-medium text-gray-600">No matching store products found for this recipe.</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}