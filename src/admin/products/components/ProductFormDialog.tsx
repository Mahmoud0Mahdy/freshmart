import { useState, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import type { Product } from '../../../contexts/AppContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { toast } from 'sonner';

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
}

const defaultFormData = {
  name: '', price: '', category: 'fruits', image: '', description: '',
  calories: '', protein: '', carbs: '', fat: '', fiber: '', inStock: true,
};

const categories = ['fruits', 'vegetables', 'dairy', 'snacks', 'bakery', 'meat', 'beverages'];

export function ProductFormDialog({ isOpen, onClose, editingProduct }: ProductFormDialogProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        image: editingProduct.image,
        description: editingProduct.description,
        calories: editingProduct.nutrition.calories.toString(),
        // بنشيل أي حروف (زي الـ g) عشان نعرض الرقم بس في الـ Input
        protein: editingProduct.nutrition.protein.replace(/[^0-9.]/g, ''),
        carbs: editingProduct.nutrition.carbs.replace(/[^0-9.]/g, ''),
        fat: editingProduct.nutrition.fat.replace(/[^0-9.]/g, ''),
        fiber: editingProduct.nutrition.fiber.replace(/[^0-9.]/g, ''),
        inStock: editingProduct.inStock,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editingProduct, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // تأكيد إضافي إن مفيش قيم سالبة بتعدي
    if (parseFloat(formData.price) < 0) {
      toast.error('Price cannot be negative');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || `product-${Date.now()}`,
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      description: formData.description,
      nutrition: {
        calories: parseInt(formData.calories) || 0,
        // بنزود حرف الـ g هنا عشان الداتا تتسيف صح زي ما باقي التطبيق متوقع
        protein: `${formData.protein}g`,
        carbs: `${formData.carbs}g`,
        fat: `${formData.fat}g`,
        fiber: `${formData.fiber}g`,
      },
      inStock: formData.inStock,
    };

    if (editingProduct) {
      dispatch({ type: 'UPDATE_PRODUCT', product: productData });
      toast.success('Product updated successfully');
    } else {
      dispatch({ type: 'ADD_PRODUCT', product: productData });
      toast.success('Product added successfully');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
           
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label htmlFor="name">Product Name *</Label>
               <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
             </div>
             <div>
               <Label htmlFor="price">Price ($) *</Label>
               <Input 
                 id="price" 
                 type="number" 
                 step="0.01" 
                 min="0" // تمنع الأرقام السالبة
                 value={formData.price} 
                 onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                 required 
               />
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label htmlFor="category">Category *</Label>
               <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                   {categories.map((cat) => (
                     <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
             <div className="flex items-center gap-2 pt-6">
               <input type="checkbox" id="inStock" title="In Stock" checked={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })} className="w-4 h-4" />
               <Label htmlFor="inStock">In Stock</Label>
             </div>
           </div>

           <div>
             <Label htmlFor="image">Product Image</Label>
             <div className="mt-2 flex items-center gap-4">
               {formData.image && (
                 <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                   <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                 </div>
               )}
               <div className="flex-1">
                 <Input 
                   id="image" 
                   type="file" 
                   accept="image/*" 
                   onChange={handleImageUpload} 
                   className="cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium" 
                 />
                 <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP</p>
               </div>
             </div>
           </div>

           <div>
             <Label htmlFor="description">Description *</Label>
             <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required />
           </div>

           <div className="border-t pt-4">
             <h3 className="font-medium mb-3">Nutrition Information</h3>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <Label htmlFor="calories">Calories *</Label>
                 <Input id="calories" type="number" min="0" value={formData.calories} onChange={(e) => setFormData({ ...formData, calories: e.target.value })} required />
               </div>
               <div>
                 {/* غيرنا الـ Label عشان نوضح إنها بالجرام */}
                 <Label htmlFor="protein">Protein (g) *</Label>
                 <Input id="protein" type="number" min="0" step="0.1" value={formData.protein} onChange={(e) => setFormData({ ...formData, protein: e.target.value })} placeholder="e.g., 5" required />
               </div>
               <div>
                 <Label htmlFor="carbs">Carbs (g) *</Label>
                 <Input id="carbs" type="number" min="0" step="0.1" value={formData.carbs} onChange={(e) => setFormData({ ...formData, carbs: e.target.value })} placeholder="e.g., 20" required />
               </div>
               <div>
                 <Label htmlFor="fat">Fat (g) *</Label>
                 <Input id="fat" type="number" min="0" step="0.1" value={formData.fat} onChange={(e) => setFormData({ ...formData, fat: e.target.value })} placeholder="e.g., 2" required />
               </div>
               <div>
                 <Label htmlFor="fiber">Fiber (g) *</Label>
                 <Input id="fiber" type="number" min="0" step="0.1" value={formData.fiber} onChange={(e) => setFormData({ ...formData, fiber: e.target.value })} placeholder="e.g., 3" required />
               </div>
             </div>
           </div>

           <div className="flex gap-2 justify-end pt-4">
             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
             <Button type="submit" className="bg-green-600 hover:bg-green-700">
               {editingProduct ? 'Update Product' : 'Add Product'}
             </Button>
           </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}