# AI 记账本 📱

一款简单好用的 AI 智能记账应用，支持语音输入、自动分类、消费统计！

## ✨ 功能特点

- 📝 **快速记账** - 文字/语音输入，自动识别金额和分类
- 🤖 **AI 智能助手** - 语音输入、智能问答、消费分析
- 📊 **统计报表** - 日/周/月消费统计，饼图展示分类占比
- 🎨 **简约美观** - 温暖橙色系设计，卡片式布局
- 📦 **本地存储** - 数据保存在本地，保护隐私

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd AIAccountBook

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 同步到 Android（需要先添加 Android 平台）
npx cap add android
npx cap sync android
```

### 云端构建（推荐）

1. **Fork 本项目**
2. **推送代码到 GitHub**
3. **GitHub Actions 自动构建 APK**
4. **下载构建产物**

构建完成后，在 Actions 页面下载 `AIAccountBook-APK` artifact。

## 📁 项目结构

```
AIAccountBook/
├── src/
│   ├── pages/           # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── Records.tsx     # 记录列表
│   │   ├── Stats.tsx       # 统计报表
│   │   ├── AIAssistant.tsx # AI助手
│   │   └── Settings.tsx    # 设置
│   ├── components/      # 公共组件
│   ├── hooks/           # React Hooks
│   └── utils/          # 工具函数
├── .github/workflows/   # GitHub Actions
└── android/            # Android 原生项目
```

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **移动端包装**: Capacitor 5
- **UI 设计**: 原生 CSS（响应式）

## 📥 下载 APK

### 方法一：GitHub Actions（推荐）

1. Fork 本项目到你的 GitHub
2. Push 代码触发 workflow
3. 在 Actions 页面下载构建产物

### 方法二：本地构建

```bash
# 安装 Android SDK
# 确保 JAVA_HOME 和 ANDROID_HOME 已配置

# 构建 APK
npm run build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

APK 位于: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 截图预览

| 首页 | 记录 | 统计 |
|:---:|:---:|:---:|
| 今日消费概览 | 分类筛选 | 饼图分析 |

## 🙏 致谢

- 使用 [Capacitor](https://capacitorjs.com/) 将 Web 应用打包为原生 App
- 图标来自 Emoji 表情符号

## 📄 许可证

MIT License
