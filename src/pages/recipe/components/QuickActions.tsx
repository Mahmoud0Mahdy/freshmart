import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ChefHat } from 'lucide-react';

interface Props {
  onNavigate: () => void;
}

export function QuickActions({ onNavigate }: Props) {
  return (
    <div className="mt-12 text-center">
      <Card className="bg-gradient-to-r from-green-50 to-orange-50 border-0 shadow-md">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Recipe Ideas?</h2>
          <p className="text-gray-600 mb-6">
            Tell our AI assistant what ingredients you have, and get personalized recipe suggestions!
          </p>
          <Button onClick={onNavigate} className="bg-green-600 hover:bg-green-700">
            <ChefHat className="mr-2" size={20} />
            Ask Our AI Chef
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}