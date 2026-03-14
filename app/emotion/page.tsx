'use client';

import { useState, useEffect } from 'react';
import EmotionChart from '@/components/EmotionChart';
import { Emotion } from '@/types';

// Mock 数据：最近7天的情绪记录
const mockEmotions: Emotion[] = [
  { type: 'anxiety', intensity: 4, timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
  { type: 'stress', intensity: 3, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { type: 'confusion', intensity: 3, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
  { type: 'anxiety', intensity: 2, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { type: 'emptiness', intensity: 2, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { type: 'loneliness', intensity: 3, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  { type: 'anxiety', intensity: 2, timestamp: new Date() },
];

export default function EmotionPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    // TODO: 从 API 加载真实数据
    setEmotions(mockEmotions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-emerald-50/50">
      {/* 顶部导航 */}
      <div className="bg-white/70 backdrop-blur-md border-b border-blue-100/50 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/chat" className="text-gray-500 hover:text-blue-600 text-sm transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回对话
          </a>
          <h1 className="text-sm font-medium text-gray-700 tracking-wide">情绪轨迹</h1>
          <a href="/" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
            首页
          </a>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 标题 */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">你的情绪变化</h2>
            <p className="text-sm text-gray-500">记录最近7天的情绪轨迹，看见自己的成长</p>
          </div>

          {/* 情绪曲线图 */}
          <EmotionChart emotions={emotions} />

          {/* 情绪统计 */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-4">本周情绪分布</h3>
            <div className="space-y-3">
              {['anxiety', 'stress', 'confusion', 'emptiness', 'loneliness'].map((type) => {
                const count = emotions.filter((e) => e.type === type).length;
                const labels: Record<string, string> = {
                  anxiety: '焦虑',
                  stress: '压力',
                  confusion: '迷茫',
                  emptiness: '空虚',
                  loneliness: '孤独',
                };
                const colors: Record<string, string> = {
                  anxiety: 'from-blue-400 to-blue-500',
                  stress: 'from-emerald-400 to-emerald-500',
                  confusion: 'from-cyan-400 to-cyan-500',
                  emptiness: 'from-blue-300 to-emerald-300',
                  loneliness: 'from-teal-400 to-teal-500',
                };
                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{labels[type]}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors[type]} rounded-full`}
                          style={{ width: `${(count / emotions.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{count}次</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 鼓励语 */}
          <div className="mt-8 text-center bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100/50">
            <svg className="w-10 h-10 text-emerald-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="text-sm text-gray-600 leading-relaxed">
              每一次记录都是成长的印记
              <br />
              <span className="text-blue-600 font-medium">你正在变得更好</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
