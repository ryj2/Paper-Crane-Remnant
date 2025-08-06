import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/game-context';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { ChevronRight, Award, Package, Save, Download, History, BookOpen } from 'lucide-react';
import SaveGameDialog from './save-game-dialog';
import LoadGameDialog from './load-game-dialog';
import InventoryDialog from './inventory-dialog';
import AchievementsDialog from './achievements-dialog';
import ProgressDialog from './progress-dialog';
import AudioManager from './audio-manager';

// 打字机效果组件
const TypewriterText: React.FC<{ 
  text: string; 
  speed?: number; 
  onComplete?: () => void;
}> = ({ text, speed = 50, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // 解析文本中的特殊标记并应用颜色，同时隐藏标记符号
  const parseText = (text: string) => {
    // 先处理简单的标记格式 [标记]内容
    let processedText = text
      .replace(/\[旁白\](.*?)(?=\[|$)/g, '<span class="narration">$1</span>')
      .replace(/\[人名\](.*?)(?=\[|$)/g, '<span class="name">$1</span>')
      .replace(/\[线索\](.*?)(?=\[|$)/g, '<span class="clue">$1</span>');

    // 处理完整的开闭标记格式 [标记]内容[/标记]
    processedText = processedText
      .replace(/\[旁白\](.*?)\[\/旁白\]/g, '<span class="narration">$1</span>')
      .replace(/\[人名\](.*?)\[\/人名\]/g, '<span class="name">$1</span>')
      .replace(/\[线索\](.*?)\[\/线索\]/g, '<span class="clue">$1</span>');

    // 清理任何剩余的标记符号
    processedText = processedText
      .replace(/\[\/?(旁白|人名|线索)\]/g, '');

    // 将HTML字符串转换为React元素
    const parts = [];
    const regex = /<span class="(narration|name|clue)">(.*?)<\/span>/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(processedText)) !== null) {
      // 添加标记前的普通文本
      if (match.index > lastIndex) {
        const normalText = processedText.slice(lastIndex, match.index);
        if (normalText) {
          parts.push({
            type: 'normal',
            content: normalText
          });
        }
      }

      // 添加标记内容
      parts.push({
        type: match[1],
        content: match[2]
      });

      lastIndex = regex.lastIndex;
    }

    // 添加剩余的普通文本
    if (lastIndex < processedText.length) {
      const remainingText = processedText.slice(lastIndex);
      if (remainingText) {
        parts.push({
          type: 'normal',
          content: remainingText
        });
      }
    }

    // 如果没有找到任何标记，返回原始文本
    if (parts.length === 0) {
      parts.push({
        type: 'normal',
        content: processedText
      });
    }

    return parts.map((part, index) => {
      switch (part.type) {
        case 'name':
          return <span key={index} className="text-blue-400 font-semibold">{part.content}</span>;
        case 'clue':
          return <span key={index} className="text-red-400 font-semibold">{part.content}</span>;
        case 'narration':
          return <span key={index} className="text-gray-400 italic text-sm">{part.content}</span>;
        default:
          return <span key={index}>{part.content}</span>;
      }
    });
  };

  return <span>{parseText(displayText)}</span>;
};

// 雨滴组件
const RainDrop: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute w-0.5 bg-blue-400 opacity-30"
    style={{
      left: `${Math.random() * 100}%`,
      height: `${Math.random() * 20 + 10}px`,
    }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: '100vh', opacity: [0, 0.6, 0] }}
    transition={{
      duration: Math.random() * 2 + 1,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    }}
  />
);

// 雨滴背景组件
const RainBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 50 }, (_, i) => (
      <RainDrop key={i} delay={Math.random() * 5} />
    ))}
  </div>
);

const GameScreen: React.FC = () => {
  const { state, makeChoice } = useGame();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showInventoryDialog, setShowInventoryDialog] = useState(false);
  const [showAchievementsDialog, setShowAchievementsDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [textComplete, setTextComplete] = useState(false);
  const [choicesEnabled, setChoicesEnabled] = useState(false);

  // 计算阅读进度 - 基于访问的节点数量
  const calculateReadingProgress = () => {
    // 简化计算，基于访问的节点数量
    const visitedCount = state.visitedNodes.length;
    // 假设总共有大约50个节点（可以根据实际情况调整）
    const estimatedTotalNodes = 50;
    return Math.min(Math.round((visitedCount / estimatedTotalNodes) * 100), 100);
  };

  // 更新浏览器标题
  useEffect(() => {
    document.title = `${state.currentNode.title} - 纸鹤残像`;
    return () => {
      document.title = '纸鹤残像';
    };
  }, [state.currentNode.title]);

  useEffect(() => {
    // 重置状态
    setChoicesVisible(false);
    setTextComplete(false);
    setChoicesEnabled(false);
  }, [state.currentNode]);

  const handleTextComplete = () => {
    setTextComplete(true);
    // 文字完成后立即显示选项，减少延迟
    setTimeout(() => {
      setChoicesVisible(true);
      // 选项显示后快速启用点击
      setTimeout(() => {
        setChoicesEnabled(true);
      }, 200);
    }, 100);
  };

  const handleChoice = (choiceId: string, nextNodeId: string) => {
    if (!choicesEnabled) return;
    makeChoice(choiceId, nextNodeId);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col relative overflow-hidden">
      {/* 雨滴背景 */}
      <RainBackground />
      
      {/* 顶部导航栏 */}
      <header className="border-b border-gray-800 p-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold">纸鹤残像</h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSaveDialog(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-1" />
                  存档
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowLoadDialog(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  读档
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowInventoryDialog(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Package className="h-4 w-4 mr-1" />
                  物品
                  {state.inventory.length > 0 && (
                    <span className="ml-1 bg-gray-700 text-xs px-1.5 py-0.5 rounded-full">
                      {state.inventory.length}
                    </span>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAchievementsDialog(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Award className="h-4 w-4 mr-1" />
                  成就
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowProgressDialog(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <History className="h-4 w-4 mr-1" />
                  进度
                </Button>
              </div>
              
              {/* 音频控制器 */}
              <div className="border-l border-gray-700 pl-4">
                <AudioManager />
              </div>
            </div>
          </div>
          
          {/* 阅读进度条 */}
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <BookOpen className="h-4 w-4" />
            <span>游戏进度:</span>
            <div className="flex-1 max-w-xs">
              <Progress 
                value={calculateReadingProgress()} 
                className="h-2 bg-gray-800"
              />
            </div>
            <span className="text-xs">{calculateReadingProgress()}%</span>
            <span className="text-xs text-gray-500">
              ({state.visitedNodes.length} 节点已访问)
            </span>
          </div>
        </div>
      </header>

      {/* 主游戏区域 */}
      <main className="flex-1 container mx-auto p-4 md:p-8 max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-gray-900/90 border-gray-800 p-6 mb-6 shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                {state.currentNode.title}
              </h2>
              <Separator className="mb-4 bg-gray-800" />
              <ScrollArea className="h-[50vh] pr-4">
                <div className="text-lg leading-relaxed whitespace-pre-line text-gray-200">
                  <TypewriterText 
                    text={state.currentNode.content} 
                    speed={30} 
                    onComplete={handleTextComplete}
                  />
                </div>
              </ScrollArea>
            </Card>

            {/* 选择项 */}
            {state.currentNode.choices && state.currentNode.choices.length > 0 && textComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: choicesVisible ? 1 : 0, y: choicesVisible ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                {state.currentNode.choices.map((choice) => {
                  // 检查是否有物品需求
                  const hasRequiredItems = !choice.requiredItems || 
                    choice.requiredItems.every(item => state.inventory.includes(item));
                  
                  const isDisabled = !hasRequiredItems || !choicesEnabled;
                  
                  return (
                    <Button
                      key={choice.id}
                      variant="outline"
                      className={`w-full justify-start text-left py-4 px-6 border-gray-700 bg-gray-900 transition-all duration-300 ${
                        isDisabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-800 hover:border-gray-600 hover:transform hover:translate-x-1'
                      }`}
                      onClick={() => hasRequiredItems && choicesEnabled && handleChoice(choice.id, choice.nextNodeId)}
                      disabled={isDisabled}
                    >
                      <ChevronRight className={`mr-2 h-4 w-4 transition-transform duration-300 ${
                        choicesEnabled && hasRequiredItems ? 'text-blue-400' : 'text-gray-500'
                      }`} />
                      <span className={choicesEnabled && hasRequiredItems ? 'text-gray-100' : 'text-gray-400'}>
                        {choice.text}
                      </span>
                      {choice.requiredItems && choice.requiredItems.length > 0 && (
                        <span className="ml-2 text-xs text-gray-500">
                          (需要: {choice.requiredItems.join(', ')})
                        </span>
                      )}
                    </Button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 对话框组件 */}
      {showSaveDialog && (
        <SaveGameDialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)} />
      )}
      {showLoadDialog && (
        <LoadGameDialog open={showLoadDialog} onClose={() => setShowLoadDialog(false)} />
      )}
      {showInventoryDialog && (
        <InventoryDialog open={showInventoryDialog} onClose={() => setShowInventoryDialog(false)} />
      )}
      {showAchievementsDialog && (
        <AchievementsDialog open={showAchievementsDialog} onClose={() => setShowAchievementsDialog(false)} />
      )}
      {showProgressDialog && (
        <ProgressDialog open={showProgressDialog} onClose={() => setShowProgressDialog(false)} />
      )}
    </div>
  );
};

export default GameScreen;