import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useApp } from "../contexts/AppContext";

export function CategoriesSection() {
  const navigate = useNavigate();
  const { state } = useApp();

  const categories: any[] = [];

  state.products.forEach((p: any) => {
    if (!p.categoryName) return;

    const exists = categories.find((c) => c.name === p.categoryName);
    if (!exists) {
      categories.push({
        name: p.categoryName,
        image: p.imageUrl,
      });
    }
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Browse our fresh selection of high-quality ingredients organized by
            category
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, i) => (
            <Card
              key={i}
              onClick={() =>
                navigate(`/shop?category=${cat.name?.toLowerCase()}`)
              }
              className="cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl group"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <div className="py-4 px-4 text-center bg-white">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-8"
            onClick={() => navigate("/shop")}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
