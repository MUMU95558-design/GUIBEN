export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface Action {
  id: string;
  title: string;
  description: string;
  duration?: string;
  completed: boolean;
}

export interface Emotion {
  type: 'anxiety' | 'emptiness' | 'stress' | 'confusion' | 'loneliness';
  intensity: number; // 1-5
  timestamp: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  emotion?: Emotion;
  actions: Action[];
  createdAt: Date;
  updatedAt: Date;
}
