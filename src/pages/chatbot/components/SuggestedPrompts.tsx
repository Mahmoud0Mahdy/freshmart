import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Sparkles } from 'lucide-react';

const PROMPTS = [
  "I have chicken, rice, and vegetables",
  "Quick lunch ideas under 20 minutes",
  "Healthy breakfast recipes",
  "Vegetarian dinner options",
  "Easy desserts for beginners"
];

interface Props {
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

export function SuggestedPrompts({ onSelect, disabled }: Props) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Need inspiration? Try these:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROMPTS.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSelect(prompt)}
              className="justify-start text-left h-auto p-3"
              disabled={disabled}
            >
              <Sparkles size={16} className="mr-2 text-green-600 shrink-0" />
              <span className="truncate">{prompt}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}