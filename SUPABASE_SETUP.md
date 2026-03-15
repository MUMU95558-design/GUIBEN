# Supabase 配置指南

## 1. 创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击 "Start your project"
3. 创建一个新项目

## 2. 获取 API 密钥

1. 在项目仪表板，点击左侧的 "Settings" (齿轮图标)
2. 点击 "API"
3. 复制以下信息：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public key**: 已经有了 `sb_publishable_7v4wcrGXPWE3Y7urb3HFsQ_u0zEJ5XN`

## 3. 设置数据库表

1. 在 Supabase 仪表板，点击左侧的 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase/schema.sql` 文件的内容
4. 粘贴到编辑器中
5. 点击 "Run" 执行 SQL

这将创建：
- `conversations` 表：存储用户对话历史
- `emotions` 表：存储用户情绪记录
- 行级安全策略 (RLS)：确保用户只能访问自己的数据

## 4. 配置环境变量

在 `.env.local` 文件中填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7v4wcrGXPWE3Y7urb3HFsQ_u0zEJ5XN
```

## 5. 启用邮箱认证

1. 在 Supabase 仪表板，点击 "Authentication"
2. 点击 "Providers"
3. 确保 "Email" 已启用
4. 可以选择关闭 "Confirm email" 以便测试（生产环境建议开启）

## 6. 测试

重启开发服务器：
```bash
npm run dev
```

访问 http://localhost:3000/login 测试登录注册功能。

## 数据库表结构

### conversations 表
- `id`: UUID (主键)
- `user_id`: UUID (外键，关联 auth.users)
- `messages`: JSONB (对话消息数组)
- `created_at`: 创建时间
- `updated_at`: 更新时间

### emotions 表
- `id`: UUID (主键)
- `user_id`: UUID (外键，关联 auth.users)
- `type`: TEXT (情绪类型：anxiety, emptiness, stress, confusion, loneliness)
- `intensity`: INTEGER (强度 1-5)
- `note`: TEXT (可选备注)
- `created_at`: 创建时间
