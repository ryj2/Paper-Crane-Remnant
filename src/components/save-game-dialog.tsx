import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useGame } from '../contexts/game-context';
import { SaveData } from '../types/game';
import { formatDate } from '../utils';
import { Save } from 'lucide-react';

interface SaveGameDialogProps {
  open: boolean;
  onClose: () => void;
}

const SaveGameDialog: React.FC<SaveGameDialogProps> = ({ open, onClose }) => {
  const { state, dispatch } = useGame();
  const [saveName, setSaveName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleSave = () => {
    if (!saveName.trim()) return;

    const newSave: SaveData = {
      id: selectedSlot !== null ? state.saves[selectedSlot]?.id || `save_${Date.now()}` : `save_${Date.now()}`,
      name: saveName,
      currentNodeId: state.currentNode.id,
      visitedNodes: state.visitedNodes,
      inventory: state.inventory,
      achievements: state.achievements,
      timestamp: Date.now(),
      choices: state.choices
    };

    dispatch({ type: 'SAVE_GAME', saveData: newSave });
    setSaveName('');
    setSelectedSlot(null);
    onClose();
  };

  const handleSelectSlot = (index: number) => {
    setSelectedSlot(index);
    setSaveName(state.saves[index]?.name || '');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-200 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">保存游戏</DialogTitle>
          <DialogDescription className="text-gray-400">
            选择一个存档位置或创建新存档
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="flex items-center space-x-2">
            <Input
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="存档名称"
              className="bg-gray-800 border-gray-700 text-gray-200"
            />
            <Button onClick={handleSave} disabled={!saveName.trim()}>
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {state.saves.length > 0 ? (
              state.saves.map((save, index) => (
                <div
                  key={save.id}
                  className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${
                    selectedSlot === index
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  }`}
                  onClick={() => handleSelectSlot(index)}
                >
                  <div>
                    <div className="font-medium">{save.name}</div>
                    <div className="text-sm text-gray-400">
                      {formatDate(save.timestamp)}
                    </div>
                  </div>
                  <div className="text-xs bg-gray-700 px-2 py-1 rounded">
                    存档 #{index + 1}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                暂无存档
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveGameDialog;