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
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/chat" className="text-gray-400 hover:text-gray-600 text-sm">
            ← 返回对话
          </a>
          <h1 className="text-sm font-medium text-gray-800">情绪轨迹</h1>
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">
            首页
          </a>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 标题 */}
          <div className="mb-8">
            <h2 className="text-2xl font-light text-gray-800 mb-2">你的情绪变化</h2>
            <p className="text-sm text-gray-500">记录最近7天的情绪轨迹，看见自己的成长</p>
          </div>

          {/* 情绪曲线图 */}
          <EmotionChart emotions={emotions} />

          {/* 情绪统计 */}
          <div className="mt-8 bg-white rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-800 mb-4">本周情绪分布</h3>
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
                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{labels[type]}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#A8B5C7] rounded-full"
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
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 leading-relaxed">
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
