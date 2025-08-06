import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction, SaveData } from '../types/game';
import { gameNodes } from '../data/gameData';

// 初始游戏状态
const initialState: GameState = {
  currentNode: gameNodes.start,
  visitedNodes: ['start'],
  inventory: [],
  achievements: [],
  saves: [],
  currentSaveId: null,
  choices: {},
  isLoading: false
};

// 创建游戏上下文
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  navigateToNode: (nodeId: string) => void;
  makeChoice: (choiceId: string, nextNodeId: string) => void;
  addItem: (item: string) => void;
  useItem: (item: string) => void;
  unlockAchievement: (achievementId: string) => void;
  saveGame: (name: string) => void;
  loadGame: (saveId: string) => void;
  deleteSave: (saveId: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  navigateToNode: () => {},
  makeChoice: () => {},
  addItem: () => {},
  useItem: () => {},
  unlockAchievement: () => {},
  saveGame: () => {},
  loadGame: () => {},
  deleteSave: () => {}
});

// 游戏状态reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NAVIGATE_TO_NODE':
      const node = gameNodes[action.nodeId];
      if (!node) return state;
      
      // 解锁成就
      let newAchievements = [...state.achievements];
      if (node.achievements) {
        node.achievements.forEach(achievementId => {
          if (!state.achievements.includes(achievementId)) {
            newAchievements.push(achievementId);
          }
        });
      }
      
      // 添加物品
      let newInventory = [...state.inventory];
      if (node.items) {
        node.items.forEach(item => {
          if (!state.inventory.includes(item)) {
            newInventory.push(item);
          }
        });
      }
      
      return {
        ...state,
        currentNode: node,
        visitedNodes: state.visitedNodes.includes(action.nodeId) 
          ? state.visitedNodes 
          : [...state.visitedNodes, action.nodeId],
        achievements: newAchievements,
        inventory: newInventory,
        isLoading: false
      };
      
    case 'MAKE_CHOICE':
      return {
        ...state,
        choices: {
          ...state.choices,
          [state.currentNode.id]: action.choiceId
        },
        isLoading: true
      };
      
    case 'ADD_ITEM':
      if (state.inventory.includes(action.item)) return state;
      return {
        ...state,
        inventory: [...state.inventory, action.item]
      };
      
    case 'USE_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item !== action.item)
      };
      
    case 'UNLOCK_ACHIEVEMENT':
      if (state.achievements.includes(action.achievementId)) return state;
      return {
        ...state,
        achievements: [...state.achievements, action.achievementId]
      };
      
    case 'SAVE_GAME':
      const existingSaveIndex = state.saves.findIndex(save => save.id === action.saveData.id);
      let updatedSaves;
      
      if (existingSaveIndex >= 0) {
        // 更新现有存档
        updatedSaves = [...state.saves];
        updatedSaves[existingSaveIndex] = action.saveData;
      } else {
        // 添加新存档
        updatedSaves = [...state.saves, action.saveData];
      }
      
      return {
        ...state,
        saves: updatedSaves,
        currentSaveId: action.saveData.id
      };
      
    case 'LOAD_GAME':
      return {
        ...state,
        currentNode: gameNodes[action.saveData.currentNodeId],
        visitedNodes: action.saveData.visitedNodes,
        inventory: action.saveData.inventory,
        achievements: action.saveData.achievements,
        currentSaveId: action.saveData.id,
        choices: action.saveData.choices,
        isLoading: false
      };
      
    case 'DELETE_SAVE':
      return {
        ...state,
        saves: state.saves.filter(save => save.id !== action.saveId),
        currentSaveId: state.currentSaveId === action.saveId ? null : state.currentSaveId
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
      
    default:
      return state;
  }
}

// 游戏上下文提供者
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 初始化时从localStorage加载存档
  const getInitialState = (): GameState => {
    try {
      const savedGames = localStorage.getItem('textAdventureSaves');
      const saves = savedGames ? JSON.parse(savedGames) as SaveData[] : [];
      
      return {
        ...initialState,
        saves
      };
    } catch (error) {
      console.error('Error loading saved games:', error);
      return initialState;
    }
  };
  
  const [state, dispatch] = useReducer(gameReducer, getInitialState());
  
  // 保存游戏存档到本地存储
  useEffect(() => {
    if (state.saves.length > 0) {
      try {
        localStorage.setItem('textAdventureSaves', JSON.stringify(state.saves));
      } catch (error) {
        console.error('Error saving games:', error);
      }
    }
  }, [state.saves]);
  
  // 导航到指定节点
  const navigateToNode = (nodeId: string) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    setTimeout(() => {
      dispatch({ type: 'NAVIGATE_TO_NODE', nodeId });
    }, 100);
  };
  
  // 做出选择
  const makeChoice = (choiceId: string, nextNodeId: string) => {
    dispatch({ type: 'MAKE_CHOICE', choiceId, nextNodeId });
    setTimeout(() => {
      navigateToNode(nextNodeId);
    }, 100);
  };
  
  // 添加物品
  const addItem = (item: string) => {
    dispatch({ type: 'ADD_ITEM', item });
  };
  
  // 使用物品
  const useItem = (item: string) => {
    dispatch({ type: 'USE_ITEM', item });
  };
  
  // 解锁成就
  const unlockAchievement = (achievementId: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId });
  };
  
  // 保存游戏
  const saveGame = (name: string) => {
    const saveData: SaveData = {
      id: `save_${Date.now()}`,
      name,
      currentNodeId: state.currentNode.id,
      visitedNodes: state.visitedNodes,
      inventory: state.inventory,
      achievements: state.achievements,
      timestamp: Date.now(),
      choices: state.choices
    };
    
    dispatch({ type: 'SAVE_GAME', saveData });
  };
  
  // 加载游戏
  const loadGame = (saveId: string) => {
    const saveData = state.saves.find(save => save.id === saveId);
    if (saveData) {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      setTimeout(() => {
        dispatch({ type: 'LOAD_GAME', saveData });
      }, 500);
    }
  };
  
  // 删除存档
  const deleteSave = (saveId: string) => {
    dispatch({ type: 'DELETE_SAVE', saveId });
    // 同时从localStorage中删除
    try {
      const updatedSaves = state.saves.filter(save => save.id !== saveId);
      localStorage.setItem('textAdventureSaves', JSON.stringify(updatedSaves));
    } catch (error) {
      console.error('Error deleting save:', error);
    }
  };
  
  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      navigateToNode,
      makeChoice,
      addItem,
      useItem,
      unlockAchievement,
      saveGame,
      loadGame,
      deleteSave
    }}>
      {children}
    </GameContext.Provider>
  );
};

// 使用游戏上下文的钩子
export const useGame = () => useContext(GameContext);