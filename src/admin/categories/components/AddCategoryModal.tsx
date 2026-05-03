import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { toast } from "sonner";

import { createCategory } from "../../../api/adminApi";

export default function AddCategoryModal({ isOpen, onClose, onAdded }) {

  const [form, setForm] = useState({
    name: "",
    type: "product",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Name is required");
      return;
    }

    try {
      setLoading(true);

      await createCategory({
        name: form.name,
        type: form.type === "recipe" ? 1 : 2,
      });

      toast.success("Category added");

      onAdded();
      onClose();
      setForm({ name: "", type: "product" });

    } catch {
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-scaleIn">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Category
          </h2>
          <p className="text-sm text-gray-500">
            Create a new category
          </p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Enter category name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Type (🔥 شكل احترافي) */}
        <div className="space-y-2">
          <Label>Category Type</Label>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setForm({ ...form, type: "product" })}
              className={`py-3 rounded-xl font-bold transition ${
                form.type === "product"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Product
            </button>

            <button
              onClick={() => setForm({ ...form, type: "recipe" })}
              className={`py-3 rounded-xl font-bold transition ${
                form.type === "recipe"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Recipe
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            {loading ? "Saving..." : "Save"}
          </Button>

        </div>

      </div>
    </div>
  );
}