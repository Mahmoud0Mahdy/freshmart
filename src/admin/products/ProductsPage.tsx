import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import type { Product } from '../../contexts/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search, Plus, ArrowLeft, Package, ChevronLeft, ChevronRight } from 'lucide-react';

// استيراد المكونات اللي قسمناها
import { ProductStats } from './components/ProductStats';
import { ProductCard } from './components/ProductCard';
import { ProductFormDialog } from './components/ProductFormDialog';

const categories = ['all', 'fruits', 'vegetables', 'dairy', 'snacks', 'bakery', 'meat', 'beverages'];
const ITEMS_PER_PAGE = 6;

export function ProductsPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // 1. تعديل منطق البحث عشان يشمل الـ Category
  const filteredProducts = state.products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    
    // دلوقتي السيرش بيدور في الاسم، الوصف، والتصنيف!
    const matchesSearch = 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);
      
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenDialog = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsDialogOpen(true);  
  };

return (
    <div className="max-w-7xl mx-auto space-y-6"> 
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
            <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
        </div>
        
        <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

        {/* Search Bar & Category Filter - تم إصلاح الشكل هنا */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* مربع البحث */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            {/* قائمة التصنيفات (الـ Filter) */}
            <div className="w-full md:w-64 shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>
        </Card>

        {/* Stats Section */}
        <ProductStats products={state.products} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={handleOpenDialog} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="p-12 text-center mt-6">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No products found matching your search or filter.</p>
          </Card>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className={currentPage === i + 1 ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <ProductFormDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          editingProduct={editingProduct} 
        />
        
      </div>
  );
}