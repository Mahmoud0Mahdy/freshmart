import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Pencil, Trash2, Clock, Users } from "lucide-react";
import type { Recipe } from "../../../contexts/AppContext";
import { useApp } from "../../../contexts/AppContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onEdit }: RecipeCardProps) {
  const { removeRecipe, dispatch } = useApp();

  const handleDelete = async () => {
    try {
      await removeRecipe(recipe.id); // DELETE من الباك

      // 🔥 احذف من الفرونت فورًا
      dispatch({ type: "DELETE_RECIPE", recipeId: recipe.id });

      toast.success(`${recipe.title} has been deleted`);
    } catch (error) {
      toast.error("Failed to delete recipe");
    }
  };

  // 🔥 fallback values
  const image = (recipe as any).imageUrl || recipe.image;
  const prepTime = (recipe as any).prepTime
    ? `${(recipe as any).prepTime} min`
    : recipe.time;

  const difficulty = (recipe as any).difficultyLevel || recipe.difficulty;

  const category = (recipe as any).categoryName || recipe.category;

  return (
    <Card className="overflow-hidden">
      <img
        src={image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-medium mb-2">{recipe.title}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{prepTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{category}</Badge>

          <Badge
            variant={
              difficulty === "Easy"
                ? "default"
                : difficulty === "Medium"
                  ? "secondary"
                  : "destructive"
            }
          >
            {difficulty}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(recipe)}
            className="flex-1"
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {recipe.title}? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
