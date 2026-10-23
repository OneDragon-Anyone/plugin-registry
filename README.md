# ZZZOD Plugin Registry (代码仓)

ZZZOD 插件应用中心的核心代码库，包含插件商店网页端（WebUI）、自动化收录机器人以及构建索引脚本。

- 🌐 **在线商店**：[https://onedragon-anyone.github.io/plugin-data/](https://onedragon-anyone.github.io/plugin-data/)
- 📦 **插件数据仓**：[OneDragon-Anyone/plugin-data](https://github.com/OneDragon-Anyone/plugin-data)（存放插件审核配置与索引数据）

---

## 项目结构

```text
.github/workflows/
├── reusable-build.yml            # 索引构建工作流：自动抓取 Release 并生成静态 API 与网页
├── reusable-submission-bot.yml   # 收录机器人：处理提交 Issue、校验包规范并自动提 PR
└── reusable-validate.yml         # 规则校验检查
scripts/                          # 构建、校验与机器人核心脚本 (TypeScript)
src/                              # 插件市场前端页面 (Astro + React + Fluent UI)
```

---

## 本地开发与调试

### 1. 运行网页前端
```bash
pnpm install
pnpm dev
```
打开浏览器访问本地开发服务器即可预览插件市场界面。

### 2. 本地构建与代码检查
```bash
pnpm check          # 类型与代码格式检查
pnpm build          # 前端打包构建
```

### 3. 关联数据仓联调（可选）
如需在本地使用真实插件数据进行构建测试，请将数据仓克隆至同级目录后运行：

```bash
# Windows PowerShell
$env:GITHUB_TOKEN = (gh auth token)
$env:REGISTRY_DATA_DIR = "../plugin-data"
$env:TEMPLATE_DIR = "../plugin-template"
pnpm registry:build
```

---

## 版本与引用规范

- 本仓库供数据仓引用的 GitHub Actions 统一遵循 `@v1` 稳定版本规范。
- 日常功能改进与兼容修复直接维护在 `master` 分支并同步推进 `v1` 标签。
