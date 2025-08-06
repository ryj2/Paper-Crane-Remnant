export interface GameNode {
  id: string;
  title: string;
  content: string;
  choices?: Choice[];
  items?: string[];
  achievements?: string[];
  isEnding?: boolean;
}

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  requiredItems?: string[];
  condition?: string;
}

export interface SaveData {
  id: string;
  name: string;
  currentNodeId: string;
  visitedNodes: string[];
  inventory: string[];
  achievements: string[];
  timestamp: number;
  choices: Record<string, string>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  hidden?: boolean;
}

export interface GameState {
  currentNode: GameNode;
  visitedNodes: string[];
  inventory: string[];
  achievements: string[];
  saves: SaveData[];
  currentSaveId: string | null;
  choices: Record<string, string>;
  isLoading: boolean;
}

export type GameAction = 
  | { type: 'NAVIGATE_TO_NODE'; nodeId: string }
  | { type: 'MAKE_CHOICE'; choiceId: string; nextNodeId: string }
  | { type: 'ADD_ITEM'; item: string }
  | { type: 'USE_ITEM'; item: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'SAVE_GAME'; saveData: SaveData }
  | { type: 'LOAD_GAME'; saveData: SaveData }
  | { type: 'DELETE_SAVE'; saveId: string }
  | { type: 'SET_LOADING'; isLoading: boolean };