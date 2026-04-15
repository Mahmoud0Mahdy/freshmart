import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../pages/chatbot/types';
import { fetchAIResponse } from '../pages/chatbot/services/chatbotService';

interface ChatbotContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  isFloatingOpen: boolean;
  setFloatingOpen: (isOpen: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isFloatingOpen, setFloatingOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI cooking assistant. Tell me what ingredients you have, your dietary preferences, or what type of meal you're looking for, and I'll suggest the perfect recipes for you!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetchAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        recipes: response.recipes,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to fetch AI response", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatbotContext.Provider value={{ messages, isLoading, sendMessage, isFloatingOpen, setFloatingOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (!context) throw new Error('useChatbotContext must be used within ChatbotProvider');
  return context;
};