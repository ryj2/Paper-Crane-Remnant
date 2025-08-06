import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useGame } from '../contexts/game-context';
import { Award, Lock } from 'lucide-react';
import { achievementsList } from '../data/achievements';

interface AchievementsDialogProps {
  open: boolean;
  onClose: () => void;
}

const AchievementsDialog: React.FC<AchievementsDialogProps> = ({ open, onClose }) => {
  const { state } = useGame();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-200 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">成就系统</DialogTitle>
          <DialogDescription className="text-gray-400">
            你已解锁 {state.achievements.length} 个成就
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 max-h-[400px] overflow-y-auto pr-2">
          <div className="space-y-3">
            {achievementsList.map((achievement) => {
              const isUnlocked = state.achievements.includes(achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`p-3 border rounded-md ${
                    isUnlocked
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-900 border-gray-800 opacity-70'
                  }`}
                >
                  <div className="flex items-center">
                    {isUnlocked ? (
                      <Award className="h-5 w-5 mr-2 text-yellow-500" />
                    ) : (
                      <Lock className="h-5 w-5 mr-2 text-gray-500" />
                    )}
                    <div>
                      <div className="font-medium">
                        {achievement.hidden && !isUnlocked ? '???' : achievement.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {achievement.hidden && !isUnlocked
                          ? '隐藏成就'
                          : achievement.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementsDialog;