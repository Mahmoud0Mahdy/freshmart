import { useState, useEffect } from "react";
import { useApp } from "../../../contexts/AppContext";
import type { Product } from "../../../contexts/AppContext";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { DialogClose } from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { toast } from "sonner";

import axiosInstance from "../../../api/axiosInstance";
import { getCategories } from "../../../api/adminApi";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
}

const defaultFormData = {
  name: "",
  price: "",
  category: "",
  categoryId: 0,
  image: "",
  description: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  fiber: "",
  inStock: true,
};

export function ProductFormDialog({
  isOpen,
  onClose,
  editingProduct,
}: ProductFormDialogProps) {
  const { dispatch } = useApp();

  const [formData, setFormData] = useState(defaultFormData);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  // ================= EDIT =================
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        categoryId: editingProduct.categoryId || 0,
        image: editingProduct.image,
        description: editingProduct.description || "",
        calories:
          editingProduct.nutrition?.calories?.toString() || "",
        protein:
          editingProduct.nutrition?.protein?.replace(/[^0-9.]/g, "") || "",
        carbs:
          editingProduct.nutrition?.carbs?.replace(/[^0-9.]/g, "") || "",
        fat:
          editingProduct.nutrition?.fat?.replace(/[^0-9.]/g, "") || "",
        fiber:
          editingProduct.nutrition?.fiber?.replace(/[^0-9.]/g, "") || "",
        inStock: editingProduct.inStock,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editingProduct, isOpen]);


useEffect(() => {
  if (editingProduct && categories.length > 0) {
    setFormData((prev) => ({
      ...prev,
      categoryId: editingProduct.categoryId,
    }));
  }
}, [categories, editingProduct]);
  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.categoryId) {
      toast.error("Select category");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      inStock: formData.inStock,
      imageUrl: formData.image,
      categoryId: formData.categoryId,
      nutrition: {
        calories: parseInt(formData.calories) || 0,
        protein: parseFloat(formData.protein) || 0,
        carbs: parseFloat(formData.carbs) || 0,
        fat: parseFloat(formData.fat) || 0,
        fiber: parseFloat(formData.fiber) || 0,
      },
    };

    try {
      if (editingProduct) {
        await axiosInstance.put(`/Products/${editingProduct.id}`, payload);

        dispatch({
          type: "UPDATE_PRODUCT",
          product: {
            ...payload,
            id: editingProduct.id,
            category: formData.category,
            image: formData.image,
            imageUrl: formData.image,
            nutrition: {
              calories: payload.nutrition.calories,
              protein: `${formData.protein}g`,
              carbs: `${formData.carbs}g`,
              fat: `${formData.fat}g`,
              fiber: `${formData.fiber}g`,
            },
          },
        });

        toast.success("Updated successfully");
      } else {
        const res = await axiosInstance.post(`/Products`, payload);

        dispatch({
          type: "ADD_PRODUCT",
          product: {
            ...payload,
            id: res.data.id.toString(),
            category: formData.category,
            image: formData.image,
            imageUrl: formData.image,
            nutrition: {
              calories: payload.nutrition.calories,
              protein: `${formData.protein}g`,
              carbs: `${formData.carbs}g`,
              fat: `${formData.fat}g`,
              fiber: `${formData.fiber}g`,
            },
          },
        });

        toast.success("Added successfully");
      }

      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME + PRICE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Product Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Price *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
          </div>

          {/* CATEGORY + STOCK */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>

              {/* 🔥🔥🔥 الحل هنا */}
              <Select
                value={formData.categoryId ? formData.categoryId.toString() : ""}
                onValueChange={(value) => {
                  const selected = categories.find(
                    (c) => c.id.toString() === value
                  );

                  setFormData({
                    ...formData,
                    category: selected?.name || "",
                    categoryId: selected?.id || 0,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
              />
              <Label>In Stock</Label>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <Label>Image URL *</Label>
            <Input
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />

            {formData.image && (
              <img
                src={formData.image}
                className="w-24 h-24 mt-3 rounded object-cover border"
              />
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* NUTRITION */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Nutrition</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Calories" value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })} />

              <Input type="number" placeholder="Protein" value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })} />

              <Input type="number" placeholder="Carbs" value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })} />

              <Input type="number" placeholder="Fat" value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: e.target.value })} />

              <Input type="number" placeholder="Fiber" value={formData.fiber}
                onChange={(e) => setFormData({ ...formData, fiber: e.target.value })} />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button disabled={loading}>
              {loading
                ? "Loading..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}