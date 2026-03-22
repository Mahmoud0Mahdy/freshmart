import { Recipe, FilterState } from '../types';

export const filterAndSortRecipes = (recipes: Recipe[], filters: FilterState): Recipe[] => {
  const { searchTerm, selectedCategory, selectedDifficulty, sortBy } = filters;
  const lowerSearch = searchTerm.toLowerCase();

  let filtered = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(lowerSearch) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerSearch));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return parseInt(a.time) - parseInt(b.time);
      case 'difficulty': {
        const diffOrder: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0);
      }
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });
};

export const getSimilarRecipes = (recipes: Recipe[], currentRecipe: Recipe, limit = 3): Recipe[] => {
  return recipes
    .filter(r => r.category === currentRecipe.category && String(r.id) !== String(currentRecipe.id))
    .slice(0, limit);
};