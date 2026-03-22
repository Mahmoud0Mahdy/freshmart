import { useState, useMemo, useCallback } from 'react';
import { filterAndSortRecipes } from '../services/recipeService';
import { Recipe, FilterState } from '../types';

export const useRecipes = (initialRecipes: Recipe[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCategory: 'all',
    selectedDifficulty: 'all',
    sortBy: 'title'
  });

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ searchTerm: '', selectedCategory: 'all', selectedDifficulty: 'all', sortBy: 'title' });
  }, []);

  const filteredRecipes = useMemo(() => {
    return filterAndSortRecipes(initialRecipes, filters);
  }, [initialRecipes, filters]);

  return { filters, updateFilter, clearFilters, filteredRecipes };
};