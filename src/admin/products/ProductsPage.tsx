import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApp } from "../../contexts/AppContext";
import type { Product } from "../../contexts/AppContext";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Plus, Package, ChevronLeft, ChevronRight } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import { getCategories } from "../../api/adminApi";

import { ProductStats } from "./components/ProductStats";
import { ProductCard } from "./components/ProductCard";
import { ProductFormDialog } from "./components/ProductFormDialog";
import { DeleteProductDialog } from "./components/DeleteProductDialog";

const ITEMS_PER_PAGE = 6;

export function ProductsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [categories, setCategories] = useState<any[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/Products");

        const mappedProducts: Product[] = res.data.map((item: any) => ({
          id: item.id?.toString() || "",
          name: item.name || "",
          price: item.price || 0,

          category: item.categoryName || "Unknown",
          categoryId: item.categoryId || 0,

          image: item.imageUrl || "",
          imageUrl: item.imageUrl || "",

          description: item.description || "",

          nutrition: {
            calories: item.nutritionFact?.calories || 0,
            protein: `${item.nutritionFact?.protein || 0}g`,
            carbs: `${item.nutritionFact?.carbs || 0}g`,
            fat: `${item.nutritionFact?.fat || 0}g`,
            fiber: `${item.nutritionFact?.fiber || 0}g`,
          },

          inStock: item.inStock ?? true,
        }));

        dispatch({
          type: "SET_PRODUCTS",
          products: mappedProducts,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories(2);
        setCategories(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = state.products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      (product.description || "").toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // 🔥🔥🔥 التعديل المهم هنا
  const handleOpenDialog = async (product: Product | null = null) => {
    if (!product) {
      setEditingProduct(null);
      setIsDialogOpen(true);
      return;
    }

    try {
      const res = await axiosInstance.get(`/Products/${product.id}`);

      const data = res.data;
      const selectedCategory = categories.find(
        (c) => c.name === data.categoryName,
      );
      const mappedProduct: Product = {
        id: data.id.toString(),
        name: data.name,
        price: data.price,
        category: data.categoryName,
        categoryId: selectedCategory?.id || 0,
        image: data.imageUrl,
        imageUrl: data.imageUrl,
        description: data.description || "",
        nutrition: {
          calories: data.nutritionFact?.calories || 0,
          protein: `${data.nutritionFact?.protein || 0}g`,
          carbs: `${data.nutritionFact?.carbs || 0}g`,
          fat: `${data.nutritionFact?.fat || 0}g`,
          fiber: `${data.nutritionFact?.fiber || 0}g`,
        },
        inStock: data.inStock,
      };

      setEditingProduct(mappedProduct);
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        <Button
          onClick={() => handleOpenDialog()}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="w-full md:w-64">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>

                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <ProductStats products={state.products} />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleOpenDialog}
            onDelete={(p) => {
              setSelectedProduct(p);
              setOpenDelete(true);
            }}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}

      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingProduct={editingProduct}
      />

      <DeleteProductDialog
        product={selectedProduct}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </div>
  );
}
