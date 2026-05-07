# AI 记账本 - 项目规格文档

## 1. 项目概述

**项目名称：** AI 记账本  
**项目类型：** 移动端 Android 应用  
**核心功能：** 智能语音/文字记账，自动分类统计，AI分析消费习惯

---

## 2. 技术方案

### 框架选择
- **前端框架：** React + TypeScript（Vite 构建）
- **移动端包装：** Capacitor（将 Web 应用打包为原生 Android APK）
- **UI 组件库：** React Native Elements / Tailwind CSS
- **数据存储：** LocalStorage + SQLite（本地持久化）
- **AI 功能：** Simulated AI（基于规则的关键字识别和分类）

### 为什么选择这个方案？
1. **跨平台**：一次开发，可同时输出 Android 和 iOS
2. **开发效率高**：Web 技术栈，开发速度快
3. **维护简单**：统一的代码库
4. **云端编译**：使用 GitHub Actions 自动化构建 APK，无需本地配置复杂环境

---

## 3. 功能列表

### 核心功能
1. **记账录入**
   - 支持文字输入记账（金额 + 描述）
   - 支持快速选择分类（餐饮/交通/购物/娱乐/居住/医疗/其他）
   - 自动识别金额（支持中文数字）

2. **记录管理**
   - 按日期查看记账记录
   - 按分类筛选记录
   - 删除/编辑已有记录

3. **统计报表**
   - 日/周/月消费金额统计
   - 分类占比饼图展示
   - 趋势折线图

4. **AI 智能助手**
   - 语音输入记账（Web Speech API）
   - 智能分类建议
   - 消费异常提醒

5. **数据导出**
   - 导出本月账单为文本

---

## 4. UI/UX 设计方向

### 视觉风格
- **设计语言：** 简约现代卡片式设计
- **主色调：** 温暖橙色系（代表财富和活力）
- **辅助色：** 浅灰背景 + 深色文字

### 布局方式
- **底部 Tab 导航：** 首页 | 记录 | 统计 | AI助手 | 设置
- **首页：** 今日消费概览 + 快速记账入口
- **单手操作友好：** 主要操作在屏幕下半部分

### 字体
- 系统默认字体，保证可读性

---

## 5. 项目结构

```
AIAccountBook/
├── SPEC.md
├── package.json
├── vite.config.ts
├── capacitor.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Records.tsx
│   │   ├── Stats.tsx
│   │   ├── AIAssistant.tsx
│   │   └── Settings.tsx
│   ├── components/
│   │   ├── RecordItem.tsx
│   │   ├── CategoryPicker.tsx
│   │   ├── QuickAdd.tsx
│   │   └── StatChart.tsx
│   ├── hooks/
│   │   └── useRecords.ts
│   └── utils/
│       ├── categories.ts
│       └── formatters.ts
├── android/                 # Android 原生项目（自动生成）
└── .github/
    └── workflows/
        └── build.yml        # GitHub Actions 构建配置
```

---

## 6. 构建说明

### 本地开发
```bash
npm install
npm run dev        # 开发预览
npm run build      # 生产构建
npx cap sync      # 同步到 Android
```

### 云端构建（推荐）
1. 将项目推送到 GitHub
2. GitHub Actions 自动构建 APK
3. 下载构建产物

---

## 7. 注意事项

- 本应用所有数据存储在本地，不会上传到任何服务器
- AI 功能基于本地规则实现，无需网络连接
- 语音输入需要浏览器支持 Web Speech API
