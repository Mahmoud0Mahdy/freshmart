import { Bot, User } from 'lucide-react';
import { Message } from '../types';
import { RecipeSuggestion } from './RecipeSuggestion';

export function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  const containerClass = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
  const wrapperClass = `max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`;
  const bubbleLayout = `flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`;
  const avatarClass = `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`;
  const bubbleClass = `rounded-lg p-4 ${isUser ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'}`;

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <div className={bubbleLayout}>
          
          <div className={avatarClass}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>

          <div className={bubbleClass}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            {message.recipes?.map((recipeId) => (
              <RecipeSuggestion key={recipeId} recipeId={recipeId} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}