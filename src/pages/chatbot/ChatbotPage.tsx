import "./chatbot.css";
import { ChatHeader } from "./components/ChatHeader";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { SuggestedPrompts } from "./components/SuggestedPrompts";
import { ChatSidebar } from "./components/ChatSidebar";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
import { useChatbotContext } from "../../contexts/ChatbotContext";

export function ChatbotPage() {
  const { messages, isLoading, sendMessage } = useChatbotContext();
  const scrollRef = useScrollToBottom(messages);

  // 🔥 السحر هنا: بنقفل الشات لو بنحمل، أو لو آخر رسالة من اليوزر والبوت لسه مردش
  const lastMessage = messages[messages.length - 1];
  const isWaitingForBot = isLoading || (lastMessage?.role === "user");

  return (
    <div className="cb-wrapper">
      <ChatSidebar />
      
      <main className="cb-main">
        <ChatHeader />
        
        <div className="cb-messages-area">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            scrollRef={scrollRef}
          />
          
          {messages.length <= 1 && (
            <div className="cb-prompts-container">
              <SuggestedPrompts
                onSelect={sendMessage}
                disabled={isWaitingForBot} // 🔥 بنقفل الاقتراحات لو البوت بيفكر
              />
            </div>
          )}
        </div>

        <div className="cb-input-area">
          <ChatInput
            onSend={sendMessage}
            disabled={isWaitingForBot} // 🔥 بنقفل الـ Input لو البوت بيفكر
            isFirstMessage={messages.length === 0} 
          />
        </div>
      </main>
    </div>
  );
}

export default ChatbotPage;