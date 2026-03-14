import { Emotion } from '@/types';

interface EmotionChartProps {
  emotions: Emotion[];
}

export default function EmotionChart({ emotions }: EmotionChartProps) {
  if (emotions.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center text-gray-400 border border-blue-100/50">
        暂无情绪记录
      </div>
    );
  }

  // 简单的SVG折线图实现
  const width = 320;
  const height = 200;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = emotions.map((emotion, index) => {
    const x = padding + (chartWidth / (emotions.length - 1)) * index;
    const y = padding + chartHeight - (emotion.intensity / 5) * chartHeight;
    return { x, y, emotion };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 mb-4">最近7天情绪变化</h3>
      <svg width={width} height={height} className="mx-auto">
        {/* 网格线 */}
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (chartHeight / 5) * (5 - i)}
            x2={width - padding}
            y2={padding + (chartHeight / 5) * (5 - i)}
            stroke="#e0f2fe"
            strokeWidth="1"
          />
        ))}

        {/* 渐变定义 */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* 曲线 */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 数据点 */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="6"
              fill="white"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              className="cursor-pointer transition-all hover:r-8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
