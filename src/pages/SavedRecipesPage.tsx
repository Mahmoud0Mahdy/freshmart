import { Navigate, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

export function SavedRecipesPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.isAuthenticated || !state.user) {
    return <Navigate to="/login" replace />;
  }

  const savedRecipes = state.recipes.filter((recipe) =>
    state.user!.savedRecipes.includes(recipe.id),
  );

  // ✅ toggle بدل unsave فقط + toast سريع
  const toggleFavorite = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    toast.dismiss(); // يقفل أي toast قديم

    const isSaved = state.user?.savedRecipes.includes(recipeId);

    dispatch({
      type: isSaved ? "UNSAVE_RECIPE" : "SAVE_RECIPE",
      recipeId,
    });

    const t = toast.success(
      isSaved ? "Recipe removed from favorites" : "Recipe saved to favorites",
    );

    setTimeout(() => toast.dismiss(t), 1000); // سريع
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Saved Recipes ({savedRecipes.length})</CardTitle>
          </CardHeader>

          <CardContent>
            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => {
                  const isSaved = state.user?.savedRecipes.includes(recipe.id);

                  return (
                    <Card
                      key={recipe.id}
                      className="group cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      <CardContent className="p-0">
                        {/* الصورة */}
                        <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                          <ImageWithFallback
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* ❤️ زرار الفيفورت */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 h-8 w-8"
                            onClick={(e) => toggleFavorite(recipe.id, e)}
                          >
                            <Heart
                              size={16}
                              className={`${
                                isSaved
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </Button>
                        </div>

                        {/* المحتوى */}
                        <div className="p-4 space-y-3">
                          {/* category + title */}
                          <div className="space-y-2">
                            <Badge variant="outline" className="capitalize">
                              {recipe.category}
                            </Badge>

                            <h3 className="font-semibold text-gray-900">
                              {recipe.title}
                            </h3>
                          </div>

                          {/* info */}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{recipe.time}</span>
                            <span>{recipe.difficulty}</span>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            View Recipe
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No saved recipes yet</p>
                <Button onClick={() => navigate("/recipes")} className="mt-4">
                  Browse Recipes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
