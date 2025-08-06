import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useGame } from '../contexts/game-context';
import { Package, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InventoryDialogProps {
  open: boolean;
  onClose: () => void;
}

// 物品描述映射
const itemDescriptions: Record<string, string> = {
  '神秘纸鹤': '[线索]一只折痕磨损的纸鹤，翅尖泛着濒死的脆意。这是唐远曾经使用的代号，也是这个案件的起点。[/线索]',
  '委托信': '[线索]一封神秘的委托信，要求为已故的唐远洗去"自杀"的污名。信中透露着深深的痛苦和绝望。[/线索]',
  '地铁车票': '[线索]2019年4月30日23:46的地铁4号线末班车票，从上海火车站到中潭路站。纸张边缘褶皱如老人枯槁的手背。[/线索]',
  '便利店小票': '[线索]被粗暴撕去大半的便利店小票，时间显示00:07，购买了关东煮三串和乌龙茶一瓶。[/线索]',
  '围巾照片': '[线索]苏州河昌化路桥的照片，一条灰色羊绒围巾悬挂在栏杆外侧，照片时间戳显示00:21。[/线索]',
  '录音笔': '[物品]专业录音设备，可以记录重要的对话和证词。[/物品]',
  '旧照片': '[线索]与唐远的大学合照，那时的他眼神锐利，嘴角总是挂着若有若无的笑意。[/线索]',
  '黑伞': '[物品]一把黑色雨伞，上海的雨总是来得猝不及防。[/物品]',
  '案件记录': '[线索]唐远死亡案件的官方记录，异常简短，许多常规程序似乎被省略了。[/线索]',
  '证据文件袋': '[线索]迟慢交给你的牛皮纸文件袋，封口处贴着一只褪色的纸鹤。[/线索]',
  '姐妹照片': '[线索]两个年轻女孩的合影，面容相似的姐妹，其中一个左眼下方有明显的泪痣。[/线索]',
  '签到簿': '[线索]书吧的签到簿，最后一个签名是三年前4月30日的唐远。[/线索]',
  '调查笔记': '[线索]书吧后门房间里的调查资料，墙上贴满了关于苏州河昌化路桥的剪报和照片。[/线索]',
  '唐书遥的真实身份': '[线索]唐远的双胞胎姐姐，检察官，那个夜晚最后见到唐远的人。[/线索]',
  '地铁刷卡记录': '[线索]关键证据：23:46唐远刷入，23:58唐书遥刷出。时间线的矛盾暴露了真相。[/线索]',
  '便利店监控': '[线索]00:07的监控画面显示购买者手上有蝴蝶形胎记，与唐书遥的胎记一致。[/线索]',
  'DNA检测报告': '[线索]围巾上检测出唐远和唐书遥两人的DNA，证实两人都接触过湿透的围巾。[/线索]',
  '唐远的笔记本电脑': '[线索]在唐书遥妹妹的公寓中发现，键盘"Z"键缺失，硬盘几乎被清空。[/线索]',
  '未完成的文档': '[线索]唐远留下的未完成文档《在昨日之雨里，我替你写下结局》，最后一行："姐姐，如果我死了，请把真相告诉林栖。"[/线索]',
  '唐远的遗言': '[线索]电脑中发现的音频文件，唐远亲口承认"杀死"了自己的身份，选择以唐书遥的身份活下去。[/线索]'
};

const InventoryDialog: React.FC<InventoryDialogProps> = ({ open, onClose }) => {
  const { state } = useGame();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const handleViewItem = (item: string) => {
    setSelectedItem(item);
    setShowDescription(true);
    
    // 3秒后自动隐藏描述
    setTimeout(() => {
      setShowDescription(false);
      setTimeout(() => {
        setSelectedItem(null);
      }, 300);
    }, 3000);
  };

  const parseDescription = (text: string) => {
    // 使用更精确的正则表达式来匹配标记
    const regex = /(\[线索\])(.*?)(\[\/线索\])|(\[物品\])(.*?)(\[\/物品\])/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // 添加标记前的普通文本
      if (match.index > lastIndex) {
        parts.push({
          type: 'normal',
          content: text.slice(lastIndex, match.index)
        });
      }

      // 添加标记内容
      if (match[1] === '[线索]') {
        parts.push({
          type: 'clue',
          content: match[2]
        });
      } else if (match[4] === '[物品]') {
        parts.push({
          type: 'item',
          content: match[5]
        });
      }

      lastIndex = regex.lastIndex;
    }

    // 添加剩余的普通文本
    if (lastIndex < text.length) {
      parts.push({
        type: 'normal',
        content: text.slice(lastIndex)
      });
    }

    return parts.map((part, index) => {
      switch (part.type) {
        case 'clue':
          return <span key={index} className="text-red-400">{part.content}</span>;
        case 'item':
          return <span key={index} className="text-blue-400">{part.content}</span>;
        default:
          return <span key={index}>{part.content}</span>;
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-200 border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">物品栏</DialogTitle>
          <DialogDescription className="text-gray-400">
            你收集的物品和线索
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 relative">
          {state.inventory.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
              {state.inventory.map((item) => (
                <div
                  key={item}
                  className="p-3 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-750 flex items-center justify-between transition-all duration-200"
                >
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleViewItem(item)}
                    disabled={selectedItem === item && showDescription}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    查看
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              你的物品栏是空的
            </div>
          )}

          {/* 物品描述弹出层 */}
          <AnimatePresence>
            {selectedItem && showDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 border border-gray-600 z-10"
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3 text-blue-400">{selectedItem}</h3>
                  <div className="text-sm leading-relaxed text-gray-200">
                    {parseDescription(itemDescriptions[selectedItem] || '这个物品似乎没有详细描述。')}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    描述将在几秒后自动消失...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

export default InventoryDialog;
