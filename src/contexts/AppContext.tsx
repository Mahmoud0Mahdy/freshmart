import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  servings: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  savedRecipes: string[];
  orderHistory: any[];
  createdAt: string;
  isActive: boolean;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

interface AppState {
  cart: CartItem[];
  user: User | null;
  isAuthenticated: boolean;
  products: Product[];
  recipes: Recipe[];
  users: User[];
  communityPosts: CommunityPost[];
}

type AppAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'SAVE_RECIPE'; recipeId: string }
  | { type: 'UNSAVE_RECIPE'; recipeId: string }
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'UPDATE_PRODUCT'; product: Product }
  | { type: 'DELETE_PRODUCT'; productId: string }
  | { type: 'ADD_RECIPE'; recipe: Recipe }
  | { type: 'UPDATE_RECIPE'; recipe: Recipe }
  | { type: 'DELETE_RECIPE'; recipeId: string }
  | { type: 'DELETE_USER'; userId: string }
  | { type: 'TOGGLE_USER_STATUS'; userId: string }
  | { type: 'DELETE_POST'; postId: string }
  | { type: 'INIT_DATA'; products: Product[]; recipes: Recipe[]; users: User[]; posts: CommunityPost[] };

const initialState: AppState = {
  cart: [],
  user: null,
  isAuthenticated: false,
  products: [],
  recipes: [],
  users: [],
  communityPosts: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INIT_DATA':
      return {
        ...state,
        products: action.products,
        recipes: action.recipes,
        users: action.users,
        communityPosts: action.posts,
      };

    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: action.quantity }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.productId),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case 'SAVE_RECIPE':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          savedRecipes: [...state.user.savedRecipes, action.recipeId],
        },
      };

    case 'UNSAVE_RECIPE':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          savedRecipes: state.user.savedRecipes.filter(id => id !== action.recipeId),
        },
      };

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.product],
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.product.id ? action.product : p
        ),
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.productId),
      };

    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.recipe],
      };

    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map(r =>
          r.id === action.recipe.id ? action.recipe : r
        ),
      };

    case 'DELETE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter(r => r.id !== action.recipeId),
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.userId),
      };

    case 'TOGGLE_USER_STATUS':
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.userId ? { ...u, isActive: !u.isActive } : u
        ),
      };

    case 'DELETE_POST':
      return {
        ...state,
        communityPosts: state.communityPosts.filter(p => p.id !== action.postId),
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}