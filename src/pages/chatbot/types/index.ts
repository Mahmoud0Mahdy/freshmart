export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recipes?: string[];
  timestamp: Date;
}

export interface AIResponse {
  content: string;
  recipes?: string[];
}