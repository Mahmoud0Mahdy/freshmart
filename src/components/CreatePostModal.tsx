import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { createPost } from '../api/communityApi';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => Promise<void> | void;
}

const tagOptions = [
  { id: 1, name: "Recipes" },
  { id: 2, name: "Kitchen Tips" },
  { id: 3, name: "Product Reviews" },
  { id: 4, name: "Questions" },
  { id: 5, name: "Budget Meals" },
];

export function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedTag(null);
    setImageUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }
    
    if (!selectedTag) {
      toast.error('Please select a tag');
      return;
    }

    const payload = {
      title,
      content,
      tagIds: [selectedTag],
      imageUrl: imageUrl || "",
    };

    try {
      await createPost(payload);
      toast.success('Post created successfully!');
      resetForm();
      onClose();
      await onPostCreated();
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-gray-900">Create a Post</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 text-gray-700">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block mb-2 text-gray-700">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, recipe, or question..."
              className="rounded-lg min-h-[120px] resize-none"
              rows={5}
            />
          </div>

          {/* Tag Selection */}
          <div>
            <label htmlFor="tag" className="block mb-2 text-gray-700">
              Tag
            </label>
            <Select
              value={selectedTag ? String(selectedTag) : ''}
              onValueChange={(value) => setSelectedTag(Number(value))}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {tagOptions.map((tag) => (
                  <SelectItem key={tag.id} value={String(tag.id)}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block mb-2 text-gray-700">
              Image URL (optional)
            </label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="rounded-lg"
            />
            {imageUrl && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
