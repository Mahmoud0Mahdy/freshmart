import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Checkbox } from '../../components/ui/checkbox';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft, Clock, Users, ChefHat, Heart, ShoppingCart, Star, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // 🔥 مهم جدًا: تحويل id عشان المقارنة متفشلش
  const recipe = state.recipes.find(
    (r) => String(r.id) === String(id)
  );

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recipe not found
          </h2>
          <Button onClick={() => navigate('/recipes')}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  const toggleIngredient = (ingredient: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addMissingIngredientsToCart = () => {
    const missingIngredients = recipe.ingredients.filter(
      (ing) => !checkedIngredients.includes(ing)
    );

    const matchingProducts = state.products.filter((product) =>
      missingIngredients.some(
        (ingredient) =>
          ingredient.toLowerCase().includes(product.name.toLowerCase()) ||
          product.name.toLowerCase().includes(ingredient.toLowerCase())
      )
    );

    if (matchingProducts.length === 0) {
      toast.error('No matching products found in our store');
      return;
    }

    matchingProducts.forEach((product) => {
      dispatch({
        type: 'ADD_TO_CART',
        product,
        quantity: 1,
      });
    });

    toast.success(
      `Added ${matchingProducts.length} missing ingredients to cart!`
    );
  };

  const saveRecipe = () => {
    if (!state.isAuthenticated) {
      toast.error('Please log in to save recipes');
      navigate('/login');
      return;
    }

    if (isFavorite) {
      dispatch({ type: 'UNSAVE_RECIPE', recipeId: recipe.id });
      setIsFavorite(false);
      toast.success('Recipe removed from favorites');
    } else {
      dispatch({ type: 'SAVE_RECIPE', recipeId: recipe.id });
      setIsFavorite(true);
      toast.success('Recipe saved to favorites');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <Button
          variant="ghost"
          onClick={() => navigate('/recipes')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Recipes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">

            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">

                <Badge variant="outline" className="mb-2 capitalize">
                  {recipe.category}
                </Badge>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h1>

                <div className="flex items-center space-x-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    {recipe.time}
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="mr-2" />
                    {recipe.servings}
                  </div>
                  <div className="flex items-center">
                    <ChefHat size={18} className="mr-2" />
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={saveRecipe} variant="outline">
                    <Heart
                      className={`mr-2 ${
                        isFavorite ? 'fill-red-500 text-red-500' : ''
                      }`}
                      size={16}
                    />
                    {isFavorite ? 'Saved' : 'Save Recipe'}
                  </Button>

                  <Button variant="outline">
                    <Share2 className="mr-2" size={16} />
                    Share
                  </Button>
                </div>

                <Separator className="my-6" />

                <h2 className="text-xl font-bold mb-4">Instructions</h2>

                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{instruction}</p>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div>
            <Card className="border-0 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Ingredients</h2>

                <div className="space-y-3 mb-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Checkbox
                        checked={checkedIngredients.includes(ingredient)}
                        onCheckedChange={() =>
                          toggleIngredient(ingredient)
                        }
                      />
                      <span
                        className={
                          checkedIngredients.includes(ingredient)
                            ? 'line-through text-gray-400'
                            : ''
                        }
                      >
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addMissingIngredientsToCart}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="mr-2" size={16} />
                  Add Missing to Cart
                </Button>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* 🔥 Similar Recipes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Similar Recipes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.recipes
              .filter(
                (r) =>
                  r.category === recipe.category &&
                  r.id !== recipe.id
              )
              .slice(0, 3)
              .map((relatedRecipe) => (
                <Card
                  key={relatedRecipe.id}
                  className="cursor-pointer hover:shadow-lg transition"
                  onClick={() =>
                    navigate(`/recipe/${relatedRecipe.id}`)
                  }
                >
                  <CardContent className="p-4">
                    <ImageWithFallback
                      src={relatedRecipe.image}
                      alt={relatedRecipe.title}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold">
                      {relatedRecipe.title}
                    </h3>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}