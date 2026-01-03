
export type AgentType = 'service' | 'emergency';

export interface TranscriptionItem {
  role: 'user' | 'model';
  text: string;
  id: string;
}

export interface VoiceAgentConfig {
  id: AgentType;
  title: string;
  pillText: string;
  description: string;
  systemPrompt: string;
  exampleOpening: string;
  features: string[];
}
