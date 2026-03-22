import { Bot, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { MessageItem } from './MessageItem';

interface Props {
  messages: Message[];
  isLoading: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, isLoading, scrollRef }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className="text-green-600 animate-pulse" />
                <span className="text-sm text-gray-600">Thinking of the perfect recipe...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
}