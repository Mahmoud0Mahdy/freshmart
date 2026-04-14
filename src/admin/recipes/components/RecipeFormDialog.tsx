import { useState, useEffect } from "react";
import { useApp } from "../../../contexts/AppContext";
import type { Recipe } from "../../../contexts/AppContext";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
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

interface RecipeFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingRecipe: Recipe | null;
}

const defaultFormData = {
  title: "",
  image: "",
  time: "",
  servings: "",
  category: "main",
  difficulty: "Easy" as "Easy" | "Medium" | "Hard",
  ingredients: "",
  instructions: "",
};

const categories = [
  "breakfast",
  "lunch",
  "dinner",
  "main",
  "salad",
  "dessert",
  "snack",
];
const difficulties: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"];
const getCategoryId = (category: string): number => {
  const map: Record<string, number> = {
    breakfast: 1,
    lunch: 2,
    dinner: 3,
    main: 4,
    salad: 5,
    dessert: 6,
    snack: 7,
  };

  return map[category] || 4;
};

export function RecipeFormDialog({
  isOpen,
  onClose,
  editingRecipe,
}: RecipeFormDialogProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        title: editingRecipe.title,
        image: editingRecipe.image,
        // بنشيل أي حروف ونخلي الرقم بس عشان الـ Input من نوع Number
        time: editingRecipe.time.replace(/[^0-9]/g, ""),
        servings: editingRecipe.servings.replace(/[^0-9]/g, ""),
        category: editingRecipe.category,
        difficulty: editingRecipe.difficulty,
        ingredients: editingRecipe.ingredients.join("\n"),
        instructions: editingRecipe.instructions.join("\n"),
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editingRecipe, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
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

    const servingsNumber = parseInt(formData.servings) || 1;

    // 🔥 نفس شكل الـ API بالظبط
    const apiRecipeData = {
      title: formData.title,
      imageUrl:
        formData.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      difficultyLevel: formData.difficulty,
      prepTime: Number(formData.time),
      servings: servingsNumber,
      categoryId: getCategoryId(formData.category),

      ingredients: formData.ingredients
        .split("\n")
        .filter((i) => i.trim())
        .map((item) => ({
          quantityDescription: item,
        })),

      instructions: formData.instructions
        .split("\n")
        .filter((i) => i.trim())
        .map((step) => ({
          step: step,
        })),
    };

    // 🔥 ده الشكل اللي UI محتاجه (زي ما كان)
    const uiRecipeData: Recipe = {
      id: editingRecipe?.id || `recipe-${Date.now()}`,
      title: apiRecipeData.title,
      image: apiRecipeData.imageUrl,
      time: `${apiRecipeData.prepTime} min`,
      servings: `${servingsNumber} ${
        servingsNumber === 1 ? "person" : "people"
      }`,
      category: formData.category,
      difficulty: formData.difficulty,
      ingredients: formData.ingredients.split("\n").filter((i) => i.trim()),
      instructions: formData.instructions.split("\n").filter((i) => i.trim()),
    };

    if (editingRecipe) {
      dispatch({ type: "UPDATE_RECIPE", recipe: uiRecipeData });
      toast.success("Recipe updated successfully");
    } else {
      dispatch({ type: "ADD_RECIPE", recipe: uiRecipeData });
      toast.success("Recipe added successfully");
    }

    console.log("🚀 API READY DATA:", apiRecipeData); // مهم جدًا للتست

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Recipe Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Recipe Image</Label>
            <div className="mt-2 flex items-center gap-4">
              {formData.image && (
                <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Cooking Time (min) *</Label>
              <Input
                id="time"
                type="number"
                min="1"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                placeholder="e.g., 30"
                required
              />
            </div>
            <div>
              <Label htmlFor="servings">Servings (people) *</Label>
              <Input
                id="servings"
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) =>
                  setFormData({ ...formData, servings: e.target.value })
                }
                placeholder="e.g., 4"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                  setFormData({ ...formData, difficulty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients (one per line) *</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              rows={4}
              placeholder="2 cups flour&#10;1 cup sugar"
              required
            />
          </div>

          <div>
            <Label htmlFor="instructions">
              Instructions (one step per line) *
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              rows={4}
              placeholder="Preheat oven to 350°F&#10;Mix ingredients"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {editingRecipe ? "Update Recipe" : "Add Recipe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
