import { Emotion } from '@/types';

interface EmotionIndicatorProps {
  emotion: Emotion;
}

const emotionLabels = {
  anxiety: '焦虑',
  emptiness: '空虚',
  stress: '压力',
  confusion: '迷茫',
  loneliness: '孤独',
};

const emotionColors = {
  anxiety: 'bg-[#E8B4A0]',
  emptiness: 'bg-[#C4B5A8]',
  stress: 'bg-[#D4A5A5]',
  confusion: 'bg-[#B5C4D4]',
  loneliness: 'bg-[#A8B5C7]',
};

export default function EmotionIndicator({ emotion }: EmotionIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full">
      <div className={`w-2 h-2 rounded-full ${emotionColors[emotion.type]}`} />
      <span className="text-xs text-gray-600">{emotionLabels[emotion.type]}</span>
      <span className="text-xs text-gray-400">·</span>
      <span className="text-xs text-gray-400">{emotion.intensity}/5</span>
    </div>
  );
}
