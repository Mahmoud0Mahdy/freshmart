import { Navigate, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

export function SavedProductsPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.isAuthenticated || !state.user) {
    return <Navigate to="/login" replace />;
  }

  const savedProducts = state.products.filter((p) =>
    state.user!.savedProducts.includes(p.id),
  );

  // ✅ toggle + toast سريع
  const toggleProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    toast.dismiss(); // يقفل أي toast قديم

    const isSaved = state.user?.savedProducts.includes(productId);

    dispatch({
      type: isSaved ? "UNSAVE_PRODUCT" : "SAVE_PRODUCT",
      productId,
    });

    const t = toast.success(
      isSaved ? "Product removed from favorites" : "Product saved to favorites",
    );

    setTimeout(() => toast.dismiss(t), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Saved Products ({savedProducts.length})</CardTitle>
          </CardHeader>

          <CardContent>
            {savedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProducts.map((product) => {
                  const isSaved = state.user?.savedProducts.includes(
                    product.id,
                  );

                  return (
                    <Card
                      key={product.id}
                      className="group cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <CardContent className="p-0">
                        {/* الصورة */}
                        <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* ❤️ زرار الفيفورت */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 h-8 w-8"
                            onClick={(e) => toggleProduct(product.id, e)}
                          >
                            <Heart
                              size={16}
                              className={`${
                                isSaved
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </Button>
                        </div>

                        {/* المحتوى */}
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="capitalize">
                              {product.category}
                            </Badge>

                            <span className="font-semibold text-green-600">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>

                          <h3 className="font-semibold text-gray-900">
                            {product.name}
                          </h3>

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <ShoppingCart size={16} className="mr-2" />
                            View Product
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No saved products yet</p>
                <Button onClick={() => navigate("/shop")} className="mt-4">
                  Browse Products
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
