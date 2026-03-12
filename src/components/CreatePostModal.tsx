import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate post creation
    toast.success('Post created successfully!');
    
    // Reset form
    setTitle('');
    setContent('');
    setSelectedTag('');
    setImageFile(null);
    setImagePreview('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setSelectedTag('');
    setImageFile(null);
    setImagePreview('');
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
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Recipes">Recipes</SelectItem>
                <SelectItem value="Tips">Kitchen Tips</SelectItem>
                <SelectItem value="Products">Product Reviews</SelectItem>
                <SelectItem value="Questions">Questions</SelectItem>
                <SelectItem value="Budget Meals">Budget Meals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-gray-700">
              Image (optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="text-gray-400" size={32} />
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Click to upload an image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </>
                )}
              </label>
            </div>
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
