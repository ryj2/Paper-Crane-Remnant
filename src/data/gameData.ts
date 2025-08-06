import { GameNode } from '../types/game';
import { chapter1Nodes } from './chapters/chapter1';
import { chapter2Nodes } from './chapters/chapter2';
import { chapter3Nodes } from './chapters/chapter3';
import { epilogueNodes } from './chapters/epilogue';

// 合并所有章节的节点
export const gameNodes: Record<string, GameNode> = {
  ...chapter1Nodes,
  ...chapter2Nodes,
  ...chapter3Nodes,
  ...epilogueNodes
};