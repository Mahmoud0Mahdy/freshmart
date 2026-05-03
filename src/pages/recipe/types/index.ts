export interface Recipe {
  id: string | number;

  title: string;
  imageUrl: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Hard';
  prepTime: number;
  categoryName: string;

  servings?: number | string;
  ingredients?: string[];
  instructions?: string[];

  
  image?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  time?: string;
  category?: string;
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedDifficulty: string;
  sortBy: string;
}