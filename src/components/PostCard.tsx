import { ArrowUp, ArrowDown, MessageCircle, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export interface Post {
  id: string;
  userId: number;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  upvotes: number;
  comments: number;
  timestamp: string;
  isSaved: boolean;
  currentUserVote?: number;
}

interface PostCardProps {
  post: Post;
  disableVotes?: boolean; // 🔥 إضافة الـ Prop ده لقفل الـ Votes
  onPostClick?: (postId: string) => void;
  onVote?: (postId: string, voteType: 1 | -1) => void | Promise<void>;
  onSave?: (postId: string) => void | Promise<void>;
  onCommentsClick?: (postId: string) => void;
}

export function PostCard({
  post,
  disableVotes = false, // الافتراضي إنه مفتوح
  onPostClick,
  onVote,
  onSave,
  onCommentsClick,
}: PostCardProps) {
  const tagColors: { [key: string]: string } = {
    Recipes: "bg-green-100 text-green-700 hover:bg-green-200",
    Tips: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Questions: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    Products: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    "Budget Meals": "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    // ألوان الحالات الخاصة بـ My Posts
    Pending: "bg-orange-100 text-orange-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        
        {/* Vote section */}
        <div className="flex flex-col items-center gap-1 p-4 bg-gray-50 border-r border-gray-100 min-w-[60px]">
          <button
            disabled={disableVotes} // 🔥 قفل الزرار
            onClick={() => !disableVotes && onVote?.(post.id, 1)}
            className={`p-1 rounded transition-colors ${
              disableVotes 
                ? "cursor-default opacity-60" // شكل باهت ومينفعش يتداس عليه
                : "hover:bg-gray-200 cursor-pointer"
            } ${
              post.currentUserVote === 1 ? "text-orange-500" : "text-gray-400"
            }`}
          >
            <ArrowUp size={20} />
          </button>
          
          <span
            className={`text-sm font-semibold ${
              post.upvotes > 0
                ? "text-orange-600"
                : post.upvotes < 0
                  ? "text-gray-400"
                  : "text-gray-600"
            }`}
          >
            {post.upvotes}
          </span>
          
          <button
            disabled={disableVotes} // 🔥 قفل الزرار
            onClick={() => !disableVotes && onVote?.(post.id, -1)}
            className={`p-1 rounded transition-colors ${
              disableVotes 
                ? "cursor-default opacity-60" 
                : "hover:bg-gray-200 cursor-pointer"
            } ${
              post.currentUserVote === -1 ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <ArrowDown size={20} />
          </button>
        </div>

        {/* Content section */}
        <div className="flex-1 p-4 sm:p-5">
          {/* Author info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-9 w-9 border border-gray-100">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>

          {/* Post title */}
          <h3
            className="mb-2 text-lg font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
            onClick={() => onPostClick?.(post.id)}
          >
            {post.title}
          </h3>

          {/* Post content */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {post.content}
          </p>

          {/* Post image - 🔥 تصغير حجم الصورة واقتصاصها باحترافية */}
          {post.imageUrl && (
            <div className="mb-4 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-32 md:h-40 object-cover cursor-pointer hover:opacity-90 transition-opacity" // 🔥 h-32 وتظهر كـ object-cover
                onClick={() => onPostClick?.(post.id)}
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={`${
                  tagColors[tag] || "bg-gray-100 text-gray-700"
                } rounded-full px-3 py-0.5 text-xs font-medium border border-gray-100`}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-100 mt-auto">
            <button
              onClick={() => onCommentsClick?.(post.id)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors"
            >
              <MessageCircle size={18} />
              <span className="text-sm">{post.comments} comments</span>
            </button>
            <button
              onClick={() => onSave?.(post.id)}
              className={`flex items-center gap-1.5 font-medium transition-colors ${
                post.isSaved
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              }`}
            >
              <Bookmark
                size={18}
                fill={post.isSaved ? "currentColor" : "none"}
              />
              <span className="text-sm">{post.isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}