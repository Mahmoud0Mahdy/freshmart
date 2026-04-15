import { Card, CardContent } from '../../components/ui/card';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { SuggestedPrompts } from './components/SuggestedPrompts';
import { useScrollToBottom } from './hooks/useScrollToBottom';
// هنستورد الـ Context بدل useChat
import { useChatbotContext } from '../../contexts/ChatbotContext';

export function ChatbotPage() {
  // سحبنا البيانات من الـ Context
  const { messages, isLoading, sendMessage } = useChatbotContext(); 
  const scrollRef = useScrollToBottom(messages);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <ChatHeader />

        <Card className="border-0 shadow-lg mb-6 flex flex-col h-[500px]">
          <CardContent className="p-0 h-full flex flex-col overflow-hidden">
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
              scrollRef={scrollRef} 
            />
            <ChatInput 
              onSend={sendMessage} 
              disabled={isLoading} 
            />
          </CardContent>
        </Card>

        {/* إخفاء الاقتراحات لو فيه رسايل زي ما عملنا في الشات العائم (اختياري بس بيحسن الشكل) */}
        {messages.length === 1 && (
          <SuggestedPrompts 
            onSelect={sendMessage} 
            disabled={isLoading} 
          />
        )}
        
      </div>
    </div>
  );
}