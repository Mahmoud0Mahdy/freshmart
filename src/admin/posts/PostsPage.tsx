import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

// استيراد المكونات
import { PostStats } from './components/PostStats';
import { PostCard } from './components/PostCard';

const POSTS_PER_PAGE = 3;

export function PostsPage() {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredPosts = state.communityPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Community Moderation</h1>
        <p className="text-gray-600">Manage and moderate community posts</p>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search posts by title, content, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </Card>

      {/* Stats Section */}
      <PostStats posts={state.communityPosts} />

      {/* Posts List */}
      <div className="space-y-4">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <Card className="p-12 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p>No posts found matching your search.</p>
          </Card>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className={currentPage === i + 1 ? "bg-green-600 hover:bg-green-700 text-white" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}