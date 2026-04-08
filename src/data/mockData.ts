import { Product, Recipe } from '../contexts/AppContext';
import type { User, CommunityPost } from '../contexts/AppContext';

export const products: Product[] = [
  // Fruits
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 2.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Fresh, ripe bananas perfect for snacking or smoothies.',
    nutrition: {
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      fat: '0.4g',
      fiber: '3.1g'
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Organic Apples',
    price: 4.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Crisp and sweet organic apples, locally sourced.',
    nutrition: {
      calories: 95,
      protein: '0.5g',
      carbs: '25g',
      fat: '0.3g',
      fiber: '4.4g'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Fresh Strawberries',
    price: 5.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Sweet and juicy strawberries, perfect for desserts.',
    nutrition: {
      calories: 49,
      protein: '1g',
      carbs: '12g',
      fat: '0.5g',
      fiber: '3g'
    },
    inStock: true
  },
  
  // Vegetables
  {
    id: '4',
    name: 'Fresh Spinach',
    price: 3.49,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Fresh baby spinach leaves, perfect for salads and cooking.',
    nutrition: {
      calories: 23,
      protein: '2.9g',
      carbs: '3.6g',
      fat: '0.4g',
      fiber: '2.2g'
    },
    inStock: true
  },
  {
    id: '5',
    name: 'Organic Carrots',
    price: 2.79,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Sweet and crunchy organic carrots, great for snacking.',
    nutrition: {
      calories: 41,
      protein: '0.9g',
      carbs: '10g',
      fat: '0.2g',
      fiber: '2.8g'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'Bell Peppers',
    price: 4.29,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1525607551862-4d3eddcd3be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Colorful bell peppers, perfect for stir-fries and salads.',
    nutrition: {
      calories: 31,
      protein: '1g',
      carbs: '7g',
      fat: '0.3g',
      fiber: '2.5g'
    },
    inStock: true
  },
  
  // Dairy
  {
    id: '7',
    name: 'Organic Milk',
    price: 4.99,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Fresh organic whole milk from local farms.',
    nutrition: {
      calories: 150,
      protein: '8g',
      carbs: '12g',
      fat: '8g',
      fiber: '0g'
    },
    inStock: true
  },
  {
    id: '8',
    name: 'Greek Yogurt',
    price: 6.49,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Creamy Greek yogurt, high in protein and probiotics.',
    nutrition: {
      calories: 100,
      protein: '17g',
      carbs: '6g',
      fat: '0g',
      fiber: '0g'
    },
    inStock: true
  },
  
  // Snacks
  {
    id: '9',
    name: 'Mixed Nuts',
    price: 8.99,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1599599810694-57a2ca91f77c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Premium mixed nuts, perfect for healthy snacking.',
    nutrition: {
      calories: 607,
      protein: '20g',
      carbs: '22g',
      fat: '54g',
      fiber: '12g'
    },
    inStock: true
  },
  {
    id: '10',
    name: 'Granola Bars',
    price: 5.49,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    description: 'Healthy granola bars with oats, nuts, and dried fruit.',
    nutrition: {
      calories: 140,
      protein: '3g',
      carbs: '23g',
      fat: '5g',
      fiber: '3g'
    },
    inStock: true
  }
];

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Pasta Primavera',
    image: 'https://images.unsplash.com/photo-1693820206848-6ad84857832a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    time: '25 min',
    servings: '4 people',
    category: 'main',
    difficulty: 'Medium',
    ingredients: [
      '12 oz pasta',
      '2 cups mixed vegetables',
      '1 cup heavy cream',
      '1/2 cup parmesan cheese',
      '3 cloves garlic',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook pasta according to package directions.',
      'Sauté vegetables in a large pan until tender.',
      'Add garlic and cook for 1 minute.',
      'Pour in cream and simmer for 5 minutes.',
      'Add cooked pasta and toss with cheese.',
      'Season with salt and pepper and serve.'
    ]
  },
  {
    id: '2',
    title: 'Fresh Garden Salad',
    image: 'https://images.unsplash.com/photo-1606757819934-d61a9f7279d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    time: '15 min',
    servings: '2 people',
    category: 'salad',
    difficulty: 'Easy',
    ingredients: [
      '4 cups mixed greens',
      '1 cup cherry tomatoes',
      '1/2 cucumber',
      '1/4 red onion',
      '2 tbsp olive oil',
      '1 tbsp balsamic vinegar'
    ],
    instructions: [
      'Wash and dry the mixed greens.',
      'Slice cucumber and red onion.',
      'Halve the cherry tomatoes.',
      'Combine all vegetables in a large bowl.',
      'Whisk together olive oil and balsamic vinegar.',
      'Toss salad with dressing and serve immediately.'
    ]
  },
  {
    id: '3',
    title: 'Gourmet Sandwich',
    image: 'https://images.unsplash.com/photo-1757961048411-73703e333d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    time: '10 min',
    servings: '1 person',
    category: 'lunch',
    difficulty: 'Easy',
    ingredients: [
      '2 slices artisan bread',
      '4 oz deli turkey',
      '2 slices cheese',
      '2 lettuce leaves',
      '2 tomato slices',
      '1 tbsp mayonnaise'
    ],
    instructions: [
      'Toast the bread slices lightly.',
      'Spread mayonnaise on one slice.',
      'Layer turkey, cheese, lettuce, and tomato.',
      'Top with second slice of bread.',
      'Cut diagonally and serve.'
    ]
  },
  {
    id: '4',
    title: 'Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    time: '10 min',
    servings: '1 person',
    category: 'breakfast',
    difficulty: 'Easy',
    ingredients: [
      '1 frozen banana',
      '1/2 cup berries',
      '1/2 cup yogurt',
      '1 tbsp honey',
      '1/4 cup granola',
      'Fresh fruit for topping'
    ],
    instructions: [
      'Blend frozen banana, berries, and yogurt until smooth.',
      'Add honey and blend again.',
      'Pour into a bowl.',
      'Top with granola and fresh fruit.',
      'Serve immediately.'
    ]
  },
  {
    id: '5',
    title: 'Stir-Fry Vegetables',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    time: '20 min',
    servings: '3 people',
    category: 'main',
    difficulty: 'Medium',
    ingredients: [
      '2 cups mixed vegetables',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      '2 cloves garlic',
      '1 tsp ginger',
      'Rice for serving'
    ],
    instructions: [
      'Heat oil in a large wok or pan.',
      'Add garlic and ginger, stir for 30 seconds.',
      'Add vegetables and stir-fry for 5-7 minutes.',
      'Add soy sauce and toss to coat.',
      'Serve over steamed rice.'
    ]
  },
  {
    id: '6',
    title: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    time: '45 min',
    servings: '24 cookies',
    category: 'dessert',
    difficulty: 'Medium',
    ingredients: [
      '2 1/4 cups flour',
      '1 cup butter',
      '3/4 cup brown sugar',
      '1/2 cup white sugar',
      '2 eggs',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F.',
      'Cream butter and sugars together.',
      'Beat in eggs one at a time.',
      'Mix in flour gradually.',
      'Fold in chocolate chips.',
      'Drop spoonfuls on baking sheet and bake 9-11 minutes.'
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@smartsupermarket.com',
    role: 'admin',
    savedRecipes: [],
    savedProducts: [],
    orderHistory: [],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    savedRecipes: ['1', '2'],
    savedProducts: ['1', '2'],
    orderHistory: [],
    createdAt: '2024-02-15T10:30:00Z',
    isActive: true,
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    savedRecipes: ['3', '4'],
    savedProducts: ['4'],
    orderHistory: [],
    createdAt: '2024-03-20T14:20:00Z',
    isActive: true,
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    savedRecipes: [],
    savedProducts: [],
    orderHistory: [],
    createdAt: '2024-04-10T09:15:00Z',
    isActive: false,
  },
  {
    id: 'user-4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'user',
    savedRecipes: ['1', '5'],
    savedProducts: ['9'],
    orderHistory: [],
    createdAt: '2024-05-05T16:45:00Z',
    isActive: true,
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    title: 'Amazing Pasta Recipe!',
    content: 'Just tried the Creamy Pasta Primavera and it was incredible! The combination of fresh vegetables and creamy sauce is perfect.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    likes: 42,
    comments: 12,
    createdAt: '2024-06-20T15:30:00Z',
  },
  {
    id: 'post-2',
    userId: 'user-2',
    userName: 'Jane Smith',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    title: 'Healthy Breakfast Ideas',
    content: 'Looking for healthy breakfast ideas that are quick to make. Any suggestions?',
    likes: 28,
    comments: 15,
    createdAt: '2024-06-21T08:15:00Z',
  },
  {
    id: 'post-3',
    userId: 'user-4',
    userName: 'Sarah Williams',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    title: 'Best Organic Products',
    content: 'The organic selection at this store is amazing! Highly recommend the organic apples and carrots.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800',
    likes: 35,
    comments: 8,
    createdAt: '2024-06-22T12:00:00Z',
  },
  {
    id: 'post-4',
    userId: 'user-1',
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    title: 'Meal Prep Sunday!',
    content: 'Spent the day meal prepping for the week. Made stir-fry vegetables and portioned everything out. Feeling organized!',
    likes: 51,
    comments: 20,
    createdAt: '2024-06-23T18:45:00Z',
  },
];