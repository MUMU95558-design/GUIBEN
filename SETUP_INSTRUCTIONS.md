# 疗愈助手 - 完整配置指南

## 📋 前置要求

1. Node.js 18+ 
2. npm 或 yarn
3. Supabase 账号
4. Kimi API 密钥

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

#### 2.1 创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击 "New Project"
3. 填写项目信息并创建

#### 2.2 获取 API 密钥

1. 在项目仪表板，进入 Settings → API
2. 复制以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: 已提供

#### 2.3 设置数据库

1. 在 Supabase 仪表板，点击 SQL Editor
2. 创建新查询
3. 复制 `supabase/schema.sql` 的内容并执行

#### 2.4 配置邮箱认证

1. 进入 Authentication → Providers
2. 确保 Email 已启用
3. 测试时可以关闭 "Confirm email"

### 3. 配置环境变量

在 `.env.local` 文件中填入：

```env
# Kimi API
KIMI_API_KEY=你的Kimi API密钥

# Supabase
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7v4wcrGXPWE3Y7urb3HFsQ_u0zEJ5XN
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 📱 功能说明

### 用户认证
- 邮箱注册/登录
- 自动保存登录状态
- 安全的行级访问控制

### 对话功能
- AI 智能对话
- 自动保存对话历史到 Supabase
- 支持多轮对话上下文

### 情绪追踪
- 记录情绪类型和强度
- 可视化情绪变化趋势
- 统计情绪分布

## 🗄️ 数据库结构

### conversations 表
存储用户对话历史

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户ID |
| messages | JSONB | 消息数组 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### emotions 表
存储情绪记录

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户ID |
| type | TEXT | 情绪类型 |
| intensity | INTEGER | 强度(1-5) |
| note | TEXT | 备注 |
| created_at | TIMESTAMP | 创建时间 |

## 🔒 安全性

- 使用 Supabase Row Level Security (RLS)
- 用户只能访问自己的数据
- API 密钥通过环境变量管理
- 不在客户端暴露敏感信息

## 📦 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（与 .env.local 相同）
4. 部署

## ❓ 常见问题

### Q: 登录后跳转到 404？
A: 确保 Supabase URL 配置正确

### Q: 无法保存对话？
A: 检查数据库表是否创建成功，RLS 策略是否启用

### Q: AI 不回复？
A: 检查 Kimi API 密钥是否有效

## 📞 支持

如有问题，请查看：
- Supabase 文档: https://supabase.com/docs
- Next.js 文档: https://nextjs.org/docs
