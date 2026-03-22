import { AIResponse } from '../types';

export const fetchAIResponse = async (userMessage: string): Promise<AIResponse> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowerMessage = userMessage.toLowerCase();
  let suggestedRecipes: string[] = [];
  
  // Keyword-based matching
  if (lowerMessage.includes('chicken') || lowerMessage.includes('pasta')) {
    suggestedRecipes = ['1'];
  } else if (lowerMessage.includes('salad') || lowerMessage.includes('healthy') || lowerMessage.includes('vegetables')) {
    suggestedRecipes = ['2'];
  } else if (lowerMessage.includes('sandwich') || lowerMessage.includes('lunch') || lowerMessage.includes('quick')) {
    suggestedRecipes = ['3'];
  } else if (lowerMessage.includes('breakfast') || lowerMessage.includes('smoothie')) {
    suggestedRecipes = ['4'];
  } else if (lowerMessage.includes('stir') || lowerMessage.includes('fry') || lowerMessage.includes('asian')) {
    suggestedRecipes = ['5'];
  } else if (lowerMessage.includes('dessert') || lowerMessage.includes('cookie') || lowerMessage.includes('sweet')) {
    suggestedRecipes = ['6'];
  } else if (lowerMessage.includes('easy') || lowerMessage.includes('beginner')) {
    suggestedRecipes = ['2', '3', '4'];
  } else if (lowerMessage.includes('under 20') || lowerMessage.includes('quick')) {
    suggestedRecipes = ['2', '3', '4', '5'];
  } else {
    suggestedRecipes = ['1', '2', '3'];
  }

  if (suggestedRecipes.length > 0) {
    return {
      content: "Based on what you've told me, I have some great recipe suggestions for you! Click on any recipe below to view the full details.",
      recipes: suggestedRecipes
    };
  }

  return {
    content: "I'd love to help! Could you tell me more about what ingredients you have available, or what type of meal you're in the mood for?"
  };
};