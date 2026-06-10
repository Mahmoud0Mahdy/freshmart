import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner@2.0.3';
import { PostCard, Post } from '../../components/PostCard';
import { getSavedPosts, savePost } from '../../api/communityApi';

export function SavedPostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const mapApiPostToPostCard = (post: any): Post => {
    const authorName =
      post.userName ??
      post.authorName ??
      post.author?.name ??
      post.user?.name ??
      'Anonymous';

    const createdAtValue = post.createdAt ?? post.timestamp;
    const timestamp = createdAtValue
      ? formatDistanceToNow(new Date(createdAtValue), { addSuffix: true })
      : 'Just now';

    return {
      id: String(post.id),
      author: {
        name: authorName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`,
      },
      title: post.title ?? '',
      content: post.content ?? '',
      imageUrl: post.imageUrl ?? '',
      tags: post.tags?.map((tag: any) => tag.name ?? tag) ?? [],
      upvotes: post.votes ?? post.upvotes ?? post.voteCount ?? 0,
      comments: post.commentsCount ?? post.comments ?? 0,
      timestamp,
      isSaved: post.isSaved ?? true,
      currentUserVote: post.currentUserVote ?? 0,
    };
  };

  const fetchSavedPosts = async () => {
    setLoading(true);
    try {
      const data = await getSavedPosts();
      const savedPosts = Array.isArray(data) ? data : data?.data ?? [];
      setPosts(savedPosts.map(mapApiPostToPostCard));
    } catch (error) {
      toast.error('Failed to load saved posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const handleToggleSave = async (postId: string) => {
    try {
      await savePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      toast.error('Failed to update saved post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Saved Posts</h1>
          <p className="text-gray-600">Your bookmarked community posts in one place.</p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500">Loading saved posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSave={handleToggleSave}
                onPostClick={(postId) => navigate(`/posts/${postId}`)}
                onCommentsClick={(postId) => navigate(`/posts/${postId}`)}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500">No saved posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
