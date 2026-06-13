import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <header className="cb-header">
      <div className="cb-header-icon">
        <Bot size={22} />
      </div>
      <div className="cb-header-text">
        <h1>AI Recipe Assistant</h1>
        <p>Powered by Loqma AI</p>
      </div>
    </header>
  );
}