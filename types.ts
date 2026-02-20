
export type GameStatus = 
  | 'START_SCREEN'
  | 'LEVEL_INTRO'
  | 'EXPLORING' 
  | 'QUESTIONING' 
  | 'QUESTION_SOLVED'
  | 'PIN_ENTRY'
  | 'CABINET_UNLOCKED'
  | 'KEY_REVEALED' 
  | 'KEY_COLLECTED' 
  | 'LEVEL_TRANSITIONING'
  | 'PROMO_SCREEN'
  | 'GAME_COMPLETE';

export interface Question {
  type: 'MCQ' | 'TEXT';
  topic: string;
  prompt: string;
  hint: string;
  options?: string[];
  answer: string;
}

export interface LevelConfig {
  id: number;
  themeColor: string;
  ambientIntensity: number;
  questions: Question[];
  keyRevealMechanism: 'table' | 'drawer' | 'painting' | 'floor' | 'wall';
  questionHint: string;
  locationHint: string;
  pinCode: string;
}
