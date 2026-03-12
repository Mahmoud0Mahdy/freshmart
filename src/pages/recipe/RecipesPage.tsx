import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useApp } from '../../contexts/AppContext';
import { Search, Clock, Users, ChefHat, Heart, Filter } from 'lucide-react';

export function RecipesPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const categories = ['all', 'main', 'salad', 'lunch', 'breakfast', 'dessert'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredRecipes = useMemo(() => {
    let filtered = state.recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort recipes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return parseInt(a.time) - parseInt(b.time);
        case 'difficulty':
          const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [state.recipes, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Collection</h1>
          <p className="text-gray-600">Discover delicious recipes curated by our AI chef</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="main">Main Course</SelectItem>
                <SelectItem value="salad">Salads</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="dessert">Desserts</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Recipe Name</SelectItem>
                <SelectItem value="time">Cooking Time</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span>{filteredRecipes.length} recipes found</span>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="group cursor-pointer hover:shadow-xl transition-shadow bg-white border-0 shadow-md"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={`${
                      recipe.difficulty === 'Easy' ? 'bg-green-500' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/90 hover:bg-white p-1 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle save recipe
                      }}
                    >
                      <Heart 
                        size={16} 
                        className={state.user?.savedRecipes.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
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
                    {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-500 text-lg">No recipes found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-green-50 to-orange-50 border-0 shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Recipe Ideas?</h2>
              <p className="text-gray-600 mb-6">
                Tell our AI assistant what ingredients you have, and get personalized recipe suggestions!
              </p>
              <Button 
                onClick={() => navigate('/chatbot')}
                className="bg-green-600 hover:bg-green-700"
              >
                <ChefHat className="mr-2" size={20} />
                Ask Our AI Chef
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}