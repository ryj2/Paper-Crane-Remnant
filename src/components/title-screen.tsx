import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface TitleScreenProps {
  onStart: () => void;
  onLoadGame: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, onLoadGame }) => {
  const [currentText, setCurrentText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  const mainTitle = '昨日之雨，明日之空';
  const subtitle = '——长篇新本格·社会派推理《纸鹤残像》——';
  
  useEffect(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < mainTitle.length) {
        setCurrentText(mainTitle.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 150);
      } else {
        // 主标题完成后显示副标题
        setTimeout(() => {
          setShowSubtitle(true);
          // 副标题显示后显示开始按钮
          setTimeout(() => {
            setShowButton(true);
          }, 1500);
        }, 800);
      }
    };
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* 背景雨滴效果 */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 bg-gray-400"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="z-10 text-center px-8">
        {/* 主标题 */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 font-serif"
          style={{ fontFamily: 'JingHuaOldSong, SimSun, serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentText}
          <motion.span
            className="inline-block w-1 h-12 md:h-16 bg-white ml-2"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h1>

        {/* 副标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showSubtitle ? 1 : 0, 
            y: showSubtitle ? 0 : 20 
          }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <p 
            className="text-lg md:text-xl text-gray-300 mb-4"
            style={{ fontFamily: 'JingHuaOldSong, SimSun, serif' }}
          >
            {subtitle}
          </p>
          <div className="w-32 h-px bg-gray-600 mx-auto"></div>
        </motion.div>

        {/* 开始按钮 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showButton ? 1 : 0, 
            scale: showButton ? 1 : 0.8 
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <Button
            onClick={onStart}
            className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'JingHuaOldSong, SimSun, serif' }}
          >
            开始游戏
          </Button>
          <Button
            onClick={onLoadGame}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'JingHuaOldSong, SimSun, serif' }}
          >
            读取存档
          </Button>
        </motion.div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 0.6 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-sm text-gray-500">
            点击开始按钮进入游戏
          </p>
        </motion.div>
      </div>

      {/* 装饰性元素 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-600 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-gray-500 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />
    </div>
  );
};

export default TitleScreen;