import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
        <Bot size={32} />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Recipe Assistant</h1>
      <p className="text-gray-600">Tell me your ingredients and preferences, and I'll find the perfect recipe for you!</p>
    </div>
  );
}