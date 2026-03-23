# 快速修复邮件链接错误

## 问题
点击邮件中的验证链接显示错误。

## 立即修复步骤

### 1. 配置 Supabase 重定向 URL

访问：https://supabase.com/dashboard/project/sgoimofbgdbxjjsxtkhy/auth/url-configuration

在 "Redirect URLs" 部分添加：
```
http://localhost:3000/auth/callback
```

如果已部署到 Vercel，也添加：
```
https://你的域名.vercel.app/auth/callback
```

点击 "Save" 保存。

### 2. 使用方式

现在有两种登录方式：

**方式A：验证码登录（推荐）**
1. 输入邮箱
2. 点击"发送验证码"
3. 查看邮箱，复制 6 位数字
4. 在网页输入验证码
5. 点击"继续"

**方式B：邮件链接登录**
1. 输入邮箱
2. 点击"发送验证码"
3. 打开邮箱，点击邮件中的链接
4. 自动跳转并登录

## 测试

配置完成后：
1. 重启开发服务器：`npm run dev`
2. 访问 http://localhost:3000
3. 输入邮箱发送验证码
4. 尝试点击邮件中的链接
5. 应该能正常跳转到 /welcome 页面

## 如果还有问题

检查浏览器控制台的错误信息，或者只使用验证码方式登录（不点击邮件链接）。
