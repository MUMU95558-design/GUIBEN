'use client';

import { useState, useEffect } from 'react';
import EmotionChart from '@/components/EmotionChart';
import { Emotion } from '@/types';

export default function EmotionPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    // 模拟数据 - 实际应该从数据库获取
    const mockEmotions: Emotion[] = [
      { type: 'anxiety', intensity: 3, timestamp: new Date('2024-03-10') },
      { type: 'stress', intensity: 4, timestamp: new Date('2024-03-11') },
      { type: 'confusion', intensity: 2, timestamp: new Date('2024-03-12') },
      { type: 'emptiness', intensity: 3, timestamp: new Date('2024-03-13') },
      { type: 'loneliness', intensity: 2, timestamp: new Date('2024-03-14') },
      { type: 'anxiety', intensity: 2, timestamp: new Date('2024-03-15') },
    ];
    setEmotions(mockEmotions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* 顶部导航 */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回首页</span>
          </a>
          <h1 className="text-sm font-medium text-slate-700">情绪轨迹</h1>
          <a href="/chat" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>开始对话</span>
          </a>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif-display font-light text-slate-800 mb-3">你的情绪轨迹</h2>
            <p className="text-slate-500 text-sm">记录每一次心情的起伏</p>
          </div>

          {/* 情绪图表 */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <EmotionChart emotions={emotions} />
          </div>

          {/* 情绪统计 */}
          <div className="mt-8 bg-neutral-50 border border-neutral-200/50 rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-sm font-light text-black mb-6">本周情绪分布</h3>
            <div className="space-y-4">
              {['anxiety', 'stress', 'confusion', 'emptiness', 'loneliness'].map((type) => {
                const count = emotions.filter((e) => e.type === type).length;
                const labels: Record<string, string> = {
                  anxiety: '焦虑',
                  stress: '压力',
                  confusion: '迷茫',
                  emptiness: '空虚',
                  loneliness: '孤独',
                };
                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-black/60 font-light">{labels[type]}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full transition-all duration-500"
                          style={{ width: `${emotions.length > 0 ? (count / emotions.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-black/40 w-8 text-right font-light">{count}次</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 鼓励语 */}
          <div className="mt-8 text-center bg-neutral-50 border border-neutral-200/50 rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <svg className="w-10 h-10 text-black/60 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="text-sm text-black/60 leading-relaxed font-light">
              每一次记录都是成长的印记
              <br />
              你正在变得更好
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
