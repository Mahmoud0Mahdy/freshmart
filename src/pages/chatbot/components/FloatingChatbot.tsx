import { MessageCircle, Minus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useChatbotContext } from '../../../contexts/ChatbotContext';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { SuggestedPrompts } from './SuggestedPrompts';
import { useScrollToBottom } from '../hooks/useScrollToBottom';

export function FloatingChatbot() {
  const { isFloatingOpen, setFloatingOpen, messages, isLoading, sendMessage } = useChatbotContext();
  const scrollRef = useScrollToBottom(messages);
  const location = useLocation();

  // إخفاء الـ Icon في صفحة الشات الرئيسية
  if (location.pathname === '/chatbot') return null;
  if (location.pathname === '/login') return null;
  if (location.pathname === '/signup') return null;
  if (location.pathname === '/checkout') return null;

  return (
    // التثبيت تحت على اليمين مع z-index عالي جداً
    <div className="fixed bottom-0 right-0 z-[9999] flex flex-col items-end">
      
      {/* صندوق الشات المفتوح */}
      {isFloatingOpen && (
        <div style={{width: "400px",height: "450px" }} 
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[350px] sm:w-[380px] h-[500px] max-h-[85vh] flex flex-col mb-4 overflow-hidden transition-all duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-sm shrink-0">
            <div className="flex items-center space-x-3">
              <div  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-sm line-clamp-1">AI Recipe Assistant</h3>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
            <button 
              type="button"
              title="Close chatbot"
              onClick={() => setFloatingOpen(false)} 
              className="hover:bg-green-700 p-1.5 rounded-lg transition-colors shrink-0"
            >
              <Minus size={20} />
            </button>
          </div>

          {/* منطقة الرسايل (هنا ضفنا السكرول) */}
          <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col relative custom-scrollbar">
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
              scrollRef={scrollRef} 
            />
          </div>

          {/* الإدخال والاقتراحات */}
          <div className="bg-white border-t border-gray-100 shrink-0"  >
            {messages.length === 1 && (
              <div style={{width: "400px",height: "125px"}} className="px-4 pb-2 pt-3 max-h-[150px] overflow-y-auto" >
                <SuggestedPrompts onSelect={sendMessage} disabled={isLoading} />
              </div>
            )}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>
      )}

      {/* الـ Icon العائمة (أكبر شوية) */}
      {!isFloatingOpen && (
        <button
          onClick={() => setFloatingOpen(true)}
          className="w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 group"
        >
          <MessageCircle size={32} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
}