export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  location?: string;
  images: string[];
  videos: string[];
  authorId: string;
  authorName: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  savedBy: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  familyMembers?: string[];
  savedRecipes: string[];
  createdRecipes: string[];
  location?: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
}

export interface Timer {
  id: string;
  recipeId: string;
  name: string;
  duration: number;
  remainingTime: number;
  isActive: boolean;
  startTime?: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface TraditionalFood {
  id: string;
  name: string;
  location: string;
  description: string;
  ingredients: string[];
  culturalBackground: string;
}
