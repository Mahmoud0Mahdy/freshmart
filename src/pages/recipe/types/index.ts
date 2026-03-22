export interface Recipe {
  id: string | number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
  servings: number | string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedDifficulty: string;
  sortBy: string;
}