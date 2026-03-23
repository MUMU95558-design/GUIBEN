# Supabase 邮箱验证配置问题排查

## 问题：点击邮件中的链接显示网页错误

这是因为 Supabase 默认的邮件模板使用的是链接验证，而不是验证码验证。

## 解决方案

### 方案1：配置正确的重定向 URL（推荐）

1. 访问 Supabase 项目设置
   https://supabase.com/dashboard/project/sgoimofbgdbxjjsxtkhy/auth/url-configuration

2. 在 "Redirect URLs" 中添加：
   ```
   http://localhost:3000/auth/callback
   https://你的域名.vercel.app/auth/callback
   ```

3. 创建回调页面处理验证

### 方案2：使用纯验证码模式（当前实现）

我们的代码已经使用了 OTP（一次性密码）模式，用户应该：
1. 输入邮箱
2. 点击"发送验证码"
3. 查看邮箱，复制 6 位数字验证码
4. 在网页上输入验证码
5. 点击"继续"

**不要点击邮件中的链接！** 只需要复制验证码即可。

### 方案3：修改邮件模板（可选）

1. 访问：https://supabase.com/dashboard/project/sgoimofbgdbxjjsxtkhy/auth/templates

2. 找到 "Magic Link" 模板

3. 修改为只显示验证码，不显示链接：
   ```html
   <h2>您的验证码</h2>
   <p>请在网页上输入以下验证码：</p>
   <h1 style="font-size: 32px; font-weight: bold;">{{ .Token }}</h1>
   <p>验证码有效期为 10 分钟</p>
   <p>如果您没有请求此验证码，请忽略此邮件。</p>
   ```

## 当前工作流程

正确的使用方式：
1. 在登录页面输入邮箱
2. 点击"发送验证码到邮箱"
3. 打开邮箱，查看验证码（6位数字）
4. 回到网页，输入验证码
5. 点击"继续"按钮

**重要：不要点击邮件中的任何链接！**
