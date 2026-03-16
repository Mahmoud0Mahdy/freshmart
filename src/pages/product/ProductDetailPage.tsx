import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import NutritionFacts from "./NutritionFacts";
import RelatedProducts from "./RelatedProducts";
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const product = state.products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {" "}
        <div className="text-center">
          {" "}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {" "}
            Product not found{" "}
          </h2>{" "}
          <Button onClick={() => navigate("/shop")}> Back to Shop </Button>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {" "}
        {/* Back Button */}{" "}
        <Button
          variant="ghost"
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          {" "}
          <ArrowLeft className="mr-2" size={16} /> Back to Shop{" "}
        </Button>{" "}
        {/* Product Section */}{" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {" "}
          <ProductGallery product={product} />{" "}
          <ProductInfo product={product} />{" "}
        </div>{" "}
        {/* Nutrition */} <NutritionFacts nutrition={product.nutrition} />{" "}
        {/* Related Products */}{" "}
        <RelatedProducts products={state.products} product={product} />{" "}
      </div>{" "}
    </div>
  );
}
