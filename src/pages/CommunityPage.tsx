import { useState } from 'react';
import { PostCard, Post } from '../components/PostCard';
import { CommunitySidebar } from '../components/CommunitySidebar';
import { CreatePostModal } from '../components/CreatePostModal';

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    title: 'My favorite weeknight pasta recipe - ready in 20 minutes!',
    content: 'I\'ve been making this pasta for years and it never gets old. The secret is using fresh garlic and good quality olive oil. My family asks for it at least twice a week!',
    imageUrl: 'https://images.unsplash.com/photo-1751151497799-8b4057a2638e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHJlY2lwZSUyMGNvb2tpbmd8ZW58MXx8fHwxNzYzMzA0MTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Recipes', 'Budget Meals'],
    upvotes: 342,
    comments: 87,
    timestamp: '2 hours ago',
    isSaved: false,
  },
  {
    id: '2',
    author: {
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    title: 'How do you keep avocados from turning brown?',
    content: 'I meal prep on Sundays and always struggle with keeping my avocados fresh. I\'ve tried lemon juice but they still oxidize. Any tips from the community?',
    tags: ['Questions', 'Tips'],
    upvotes: 156,
    comments: 43,
    timestamp: '4 hours ago',
    isSaved: true,
  },
  {
    id: '3',
    author: {
      name: 'Emma Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    title: 'Best smoothie bowl combinations for breakfast',
    content: 'After trying dozens of combinations, I\'ve finally found my favorite: frozen mango, spinach, banana, and coconut milk. Top with granola, fresh berries, and chia seeds. Game changer!',
    imageUrl: 'https://images.unsplash.com/photo-1665833876953-9aa02c235d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBzbW9vdGhpZXxlbnwxfHx8fDE3NjMyOTg4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Recipes', 'Tips'],
    upvotes: 289,
    comments: 64,
    timestamp: '6 hours ago',
    isSaved: false,
  },
  {
    id: '4',
    author: {
      name: 'David Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
    title: 'Review: New organic olive oil from FreshMart',
    content: 'Just tried the new cold-pressed olive oil and wow! The flavor is incredible. A bit pricey but worth it for special dishes. Great for dipping bread or finishing pasta.',
    tags: ['Products'],
    upvotes: 123,
    comments: 29,
    timestamp: '8 hours ago',
    isSaved: false,
  },
  {
    id: '5',
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
    title: 'Homemade sourdough bread journey - Week 4 update',
    content: 'Finally got my first successful loaf! The crust is perfectly crispy and the crumb is airy. If you\'re thinking about starting sourdough, don\'t give up. It takes practice but it\'s so rewarding.',
    imageUrl: 'https://images.unsplash.com/photo-1638788449271-9bb9121c1bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMGJyZWFkJTIwYmFraW5nfGVufDF8fHx8MTc2MzM0NDE2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Recipes', 'Tips'],
    upvotes: 445,
    comments: 112,
    timestamp: '12 hours ago',
    isSaved: true,
  },
  {
    id: '6',
    author: {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
    title: 'Meal prep for under $50/week - my strategy',
    content: 'I\'ve been able to keep my grocery bill under $50 while still eating healthy. Key tips: buy in bulk, use seasonal vegetables, batch cook grains and proteins. Happy to share my weekly plan!',
    tags: ['Budget Meals', 'Tips'],
    upvotes: 567,
    comments: 156,
    timestamp: '1 day ago',
    isSaved: false,
  },
  {
    id: '7',
    author: {
      name: 'Anna Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    },
    title: 'The ultimate guide to storing fresh herbs',
    content: 'Stop wasting money on herbs that wilt in days! I\'ve tested every method and found the best ways to keep basil, cilantro, and parsley fresh for 2+ weeks.',
    imageUrl: 'https://images.unsplash.com/photo-1631021967261-c57ee4dfa9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBraXRjaGVufGVufDF8fHx8MTc2MzM3MDk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Tips'],
    upvotes: 412,
    comments: 78,
    timestamp: '1 day ago',
    isSaved: false,
  },
  {
    id: '8',
    author: {
      name: 'Tom Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
    },
    title: 'Can I freeze cooked rice?',
    content: 'I always make too much rice and hate wasting it. Is it safe to freeze cooked rice? How long does it last in the freezer?',
    tags: ['Questions'],
    upvotes: 89,
    comments: 34,
    timestamp: '2 days ago',
    isSaved: false,
  },
  {
    id: '9',
    author: {
      name: 'Rachel Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    },
    title: 'Buddha bowls that actually keep you full',
    content: 'I used to get hungry an hour after eating buddha bowls. The trick is adding enough protein and healthy fats. Here\'s my go-to formula that keeps me satisfied for hours.',
    imageUrl: 'https://images.unsplash.com/photo-1642339800099-921df1a0a958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2x8ZW58MXx8fHwxNzYzMzc5MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Recipes', 'Tips'],
    upvotes: 298,
    comments: 52,
    timestamp: '2 days ago',
    isSaved: true,
  },
];

export function CommunityPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => {
        const categoryMap: { [key: string]: string[] } = {
          'recipes': ['Recipes'],
          'tips': ['Tips'],
          'reviews': ['Products'],
          'questions': ['Questions'],
          'budget': ['Budget Meals'],
        };
        return post.tags.some(tag => categoryMap[selectedCategory]?.includes(tag));
      });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-white mb-2">Community</h1>
          <p className="text-green-50 max-w-2xl">
            Connect with fellow food lovers, share recipes, get cooking tips, and discover new products. 
            Join the conversation!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Posts Feed */}
          <div className="lg:col-span-2 space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  onPostClick={(postId) => {
                    // Could navigate to a post detail page in the future
                    console.log('Post clicked:', postId);
                  }}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-500">No posts found in this category.</p>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <CommunitySidebar
                onCreatePost={() => setIsCreateModalOpen(true)}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
