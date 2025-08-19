# 纸鹤残像 (super-octo-fiesta)

一个基于React和TypeScript开发的文字冒险游戏，讲述了一个律师调查朋友神秘死亡的黑色侦探故事。

## 🎮 游戏特色

- **沉浸式故事体验**: 深度的黑色侦探剧情，充满悬疑和推理元素
- **打字机效果**: 逐字显示文本，营造紧张氛围
- **彩色文本系统**: 人名、线索、旁白使用不同颜色高亮显示
- **完整的游戏系统**:
  - 存档/读档功能
  - 物品收集系统
  - 成就系统
  - 游戏进度追踪
- **视觉效果**: 雨滴动画背景，营造noir风格氛围
- **背景音乐**: 支持背景音乐播放，增强游戏体验
- **响应式设计**: 支持桌面和移动设备

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd text-adventure-game
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中打开 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建完成后，生成的文件将在 `dist` 目录中。

## 🎯 游戏玩法

1. **开始游戏**: 点击"开始新游戏"进入故事
2. **阅读文本**: 文字会以打字机效果逐渐显示
3. **做出选择**: 文本显示完成后，选择你的行动
4. **收集线索**: 注意红色高亮的线索文本
5. **管理物品**: 通过顶部菜单查看收集的物品
6. **保存进度**: 随时保存游戏进度，支持多个存档槽

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **UI组件**: shadcn/ui + Radix UI
- **状态管理**: React Context + useReducer
- **数据持久化**: localStorage

## 📁 项目结构

```
src/
├── components/          # React组件
│   ├── ui/             # UI基础组件
│   ├── game-screen.tsx # 主游戏界面
│   ├── title-screen.tsx# 标题界面
│   └── ...
├── contexts/           # React Context
├── data/              # 游戏数据
│   ├── chapters/      # 章节内容
│   ├── gameData.ts    # 游戏数据结构
│   └── achievements.ts# 成就数据
├── types/             # TypeScript类型定义
├── utils/             # 工具函数
└── globals.css        # 全局样式
```

## 🎨 自定义内容

### 添加新章节

1. 在 `src/data/chapters/` 目录下创建新的章节文件
2. 按照现有章节的格式定义节点和选择
3. 在 `src/data/gameData.ts` 中注册新章节

### 修改样式

- 主要样式在 `src/globals.css` 中定义
- 组件样式使用 Tailwind CSS 类名
- 可以通过修改 `tailwind.config.js` 自定义主题

### 添加音频

1. 将音频文件放在 `public/audio/` 目录下
2. 在 `src/components/audio-manager.tsx` 中配置音频文件

## 🐛 故障排除

### 常见问题

1. **字体加载失败**: 确保字体文件在 `public/fonts/` 目录中
2. **音频无法播放**: 检查浏览器的自动播放策略
3. **存档丢失**: 检查浏览器的localStorage是否被清理

### 开发调试

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码格式化
npm run format
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📜 行为准则

我们希望创建一个友好和包容的社区。请阅读我们的[行为准则](CODE_OF_CONDUCT.md)，了解我们的社区标准。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue

## 🙏 致谢


<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg" alt="Deploys by Netlify" />
</a>


- 感谢所有开源库的贡献者
- 特别感谢 React、TypeScript 和 Vite 团队
- UI组件基于 shadcn/ui 构建
- wheatfield by bestfreesoundaccount -- https://freesound.org/s/818465/ -- License: Creative Commons 0
---

**享受游戏！** 🎮✨