import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useGame } from '../contexts/game-context';
import { ChevronRight } from 'lucide-react';
import { gameNodes } from '../data/gameData';

interface ProgressDialogProps {
  open: boolean;
  onClose: () => void;
}

const ProgressDialog: React.FC<ProgressDialogProps> = ({ open, onClose }) => {
  const { state, dispatch } = useGame();

  const handleNavigate = (nodeId: string) => {
    dispatch({ type: 'NAVIGATE_TO_NODE', nodeId });
    onClose();
  };

  // 获取已访问的节点
  const visitedNodes = state.visitedNodes
    .map(id => {
      const node = gameNodes[id];
      return node ? { id, title: node.title } : null;
    })
    .filter((node): node is { id: string; title: string } => node !== null);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-200 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">进度回溯</DialogTitle>
          <DialogDescription className="text-gray-400">
            已解锁的剧情节点
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 max-h-[400px] overflow-y-auto pr-2">
          {visitedNodes.length > 0 ? (
            <div className="space-y-2">
              {visitedNodes.map((node) => (
                <Button
                  key={node.id}
                  variant="outline"
                  className="w-full justify-between text-left py-3 px-4 border-gray-700 bg-gray-800 hover:bg-gray-750"
                  onClick={() => handleNavigate(node.id)}
                >
                  <span>{node.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              暂无已解锁的剧情节点
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

export default ProgressDialog;
