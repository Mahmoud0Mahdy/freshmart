import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useRecipes } from './hooks/useRecipes';
import { RecipesHeader } from './components/RecipesHeader';
import { RecipesFilters } from './components/RecipesFilters';
import { RecipesGrid } from './components/RecipesGrid';
import { EmptyState } from './components/EmptyState';
import { QuickActions } from './components/QuickActions';

export function RecipesPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { filters, updateFilter, clearFilters, filteredRecipes } = useRecipes(state.recipes);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecipesHeader />
        
        <RecipesFilters 
          filters={filters} 
          updateFilter={updateFilter} 
          resultsCount={filteredRecipes.length} 
        />

        {filteredRecipes.length > 0 ? (
          <RecipesGrid recipes={filteredRecipes} onRecipeClick={(id) => navigate(`/recipe/${id}`)} />
        ) : (
          <EmptyState onClear={clearFilters} />
        )}

        <QuickActions onNavigate={() => navigate('/chatbot')} />
      </div>
    </div>
  );
}