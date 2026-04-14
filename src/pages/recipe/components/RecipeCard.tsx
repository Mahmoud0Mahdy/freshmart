import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { Clock, Users, ChefHat, Heart } from "lucide-react";
import { Recipe } from "../types";
import { useApp } from "../../../contexts/AppContext";
import { toast } from "sonner";

interface Props {
  recipe: Recipe;
  onClick: (id: string | number) => void;
}

export function RecipeCard({ recipe, onClick }: Props) {
  const { state, dispatch } = useApp();
  const isFavorite = state.user?.savedRecipes?.includes(String(recipe.id));
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!state.isAuthenticated) {
      toast.dismiss();
      const t = toast.error("Please log in to save recipes");
      setTimeout(() => toast.dismiss(t), 1200);
      return;
    }

    toast.dismiss();

    dispatch({
      type: isFavorite ? "UNSAVE_RECIPE" : "SAVE_RECIPE",
      recipeId: String(recipe.id),
    });

    const t = toast.success(
      isFavorite
        ? "Recipe removed from favorites"
        : "Recipe saved to favorites",
    );

    setTimeout(() => toast.dismiss(t), 1200);
  };

  const difficultyColor =
    recipe.difficulty === "Easy"
      ? "bg-green-500"
      : recipe.difficulty === "Medium"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-shadow bg-white border-0 shadow-md"
      onClick={() => onClick(recipe.id)}
    >
      <CardContent className="p-0">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge className={`${difficultyColor} text-white`}>
              {recipe.difficulty}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/90 hover:bg-white p-1 h-8 w-8"
              onClick={toggleFavorite}
            >
              <Heart
                size={16}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }
              />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2">
            <Badge variant="outline" className="capitalize">
              {recipe.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{recipe.servings}</span>
            </div>
            <div className="flex items-center">
              <ChefHat size={16} className="mr-1" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.ingredients.slice(0, 3).join(", ")}
            {recipe.ingredients.length > 3 && "..."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-green-600 text-green-600 hover:bg-green-50"
          >
            View Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
