import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useGame } from '../contexts/game-context';
import { formatDate } from '../utils';
import { Trash2 } from 'lucide-react';

interface LoadGameDialogProps {
  open: boolean;
  onClose: () => void;
  onGameLoaded?: () => void;
}

const LoadGameDialog: React.FC<LoadGameDialogProps> = ({ open, onClose, onGameLoaded }) => {
  const { state, dispatch } = useGame();

  const handleLoad = (saveId: string) => {
    const saveData = state.saves.find(save => save.id === saveId);
    if (saveData) {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      setTimeout(() => {
        dispatch({ type: 'LOAD_GAME', saveData });
        onClose();
        if (onGameLoaded) {
          onGameLoaded();
        }
      }, 300);
    }
  };

  const handleDelete = (saveId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这个存档吗？')) {
      dispatch({ type: 'DELETE_SAVE', saveId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-200 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">读取游戏</DialogTitle>
          <DialogDescription className="text-gray-400">
            选择一个存档进行读取
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 my-4">
          {state.saves.length > 0 ? (
            state.saves.map((save, index) => (
              <div
                key={save.id}
                className="p-3 border border-gray-700 rounded-md cursor-pointer bg-gray-800 hover:bg-gray-750 flex justify-between items-center"
                onClick={() => handleLoad(save.id)}
              >
                <div>
                  <div className="font-medium">{save.name}</div>
                  <div className="text-sm text-gray-400">
                    {formatDate(save.timestamp)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs bg-gray-700 px-2 py-1 rounded">
                    存档 #{index + 1}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-400"
                    onClick={(e) => handleDelete(save.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              暂无存档
            </div>
          )}
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

export default LoadGameDialog;