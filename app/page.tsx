'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // 发送验证码
  const handleSendCode = async () => {
    if (!email) {
      setError('请输入邮箱地址');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: !isLogin, // 登录时不创建新用户，注册时创建
        },
      });

      if (error) throw error;

      setCodeSent(true);
      setSuccess('验证码已发送到您的邮箱，请查收');
      setCountdown(60);

      // 倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err.message || '发送验证码失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证码登录/注册
  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code) {
      setError('请输入验证码');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });

      if (error) throw error;

      setSuccess('验证成功！正在跳转...');
      setTimeout(() => {
        router.push('/welcome');
      }, 1000);
    } catch (err: any) {
      setError(err.message || '验证码错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif-display font-light text-slate-800 mb-3">疗愈助手</h1>
          <p className="text-slate-500 text-sm">在这里，你可以安心地说出心里话</p>
        </div>

        {/* 登录/注册表单 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/60 p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* 切换按钮 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setCodeSent(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setCodeSent(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            {/* 邮箱输入 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">邮箱地址</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={codeSent}
                  required
                  className="flex-1 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={loading || countdown > 0 || codeSent}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {countdown > 0 ? `${countdown}秒` : codeSent ? '已发送' : '获取验证码'}
                </button>
              </div>
            </div>

            {/* 验证码输入 */}
            {codeSent && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-slate-700 mb-2">验证码</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="请输入6位验证码"
                />
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* 成功提示 */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm animate-fade-in">
                {success}
              </div>
            )}

            {/* 提交按钮 */}
            {codeSent && (
              <button
                type="submit"
                disabled={loading || !code}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {loading ? '验证中...' : isLogin ? '登录' : '注册'}
              </button>
            )}
          </form>

          {/* 提示信息 */}
          <div className="mt-6 text-center text-xs text-slate-500">
            {isLogin ? '首次使用？' : '已有账号？'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setCodeSent(false);
                setError('');
                setSuccess('');
              }}
              className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </div>
        </div>

        {/* 安全提示 */}
        <div className="mt-6 text-center text-xs text-slate-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p>我们重视您的隐私安全</p>
          <p className="mt-1">验证码有效期为 10 分钟</p>
        </div>
      </div>
    </div>
  );
}
