import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Heart, MessageCircle, Calendar, Trash2 } from 'lucide-react';
import { useApp } from '../../../contexts/AppContext';
import { toast } from 'sonner';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  const { dispatch } = useApp();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_POST', postId: post.id });
    toast.success(`Post "${post.title}" has been deleted`);
  };

  return (
    <Card className="p-6">
      <div className="flex gap-4">
        <img
          src={post.userAvatar}
          alt={post.userName}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">by {post.userName}</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this post?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                    Delete Post
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <p className="text-gray-700 mb-3">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-w-md h-48 object-cover rounded-lg mb-3"
            />
          )}

          <div className="flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {post.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}