import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Pencil, Trash2, Clock, Users } from 'lucide-react';
import type { Recipe } from '../../../contexts/AppContext';
import { useApp } from '../../../contexts/AppContext';
import { toast } from 'sonner';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onEdit }: RecipeCardProps) {
  const { dispatch } = useApp();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_RECIPE', recipeId: recipe.id });
    toast.success(`${recipe.title} has been deleted`);
  };

  return (
    <Card className="overflow-hidden">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-medium mb-2">{recipe.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{recipe.category}</Badge>
          <Badge
            variant={
              recipe.difficulty === 'Easy' ? 'default' :
              recipe.difficulty === 'Medium' ? 'secondary' :
              'destructive'
            }
          >
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(recipe)} className="flex-1">
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {recipe.title}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}