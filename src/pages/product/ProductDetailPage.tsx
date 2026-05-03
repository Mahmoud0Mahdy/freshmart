import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { getProductById } from "../../api/productApi";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import NutritionFacts from "./NutritionFacts";
import RelatedProducts from "./RelatedProducts";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <Button
          variant="ghost"
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <NutritionFacts nutrition={product.nutritionFact} />

        <RelatedProducts products={state.products} product={product} />
      </div>
    </div>
  );
}