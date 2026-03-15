import { Emotion } from '@/types';

interface EmotionChartProps {
  emotions: Emotion[];
}

export default function EmotionChart({ emotions }: EmotionChartProps) {
  if (emotions.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200/50 rounded-3xl p-8 text-center text-black/40 font-light">
        暂无情绪记录
      </div>
    );
  }

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
    <div className="bg-neutral-50 border border-neutral-200/50 rounded-3xl p-8">
      <h3 className="text-sm font-light text-black mb-6">最近7天情绪变化</h3>
      <svg width={width} height={height} className="mx-auto">
        {/* 网格线 */}
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (chartHeight / 5) * (5 - i)}
            x2={width - padding}
            y2={padding + (chartHeight / 5) * (5 - i)}
            stroke="#e5e5e5"
            strokeWidth="1"
          />
        ))}

        {/* 曲线 */}
        <path
          d={pathData}
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 数据点 */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="white"
              stroke="#000000"
              strokeWidth="2"
              className="cursor-pointer transition-all hover:r-7"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
