import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioManagerProps {
  className?: string;
}

const AudioManager: React.FC<AudioManagerProps> = ({ className = '' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 设置音频属性
    audio.loop = true;
    audio.volume = volume;
    
    // 尝试自动播放（某些浏览器可能阻止）
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('自动播放被阻止，需要用户交互');
        setIsPlaying(false);
      }
    };

    // 延迟播放，给页面加载时间
    const timer = setTimeout(playAudio, 1000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('音频播放失败:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        <source src="/audio/background-music.ogg" type="audio/ogg" />
        您的浏览器不支持音频播放。
      </audio>

      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="text-gray-400 hover:text-white"
        title={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMute}
        className="text-gray-400 hover:text-white"
        title={isMuted ? '取消静音' : '静音'}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        title="音量调节"
      />
    </div>
  );
};

export default AudioManager;