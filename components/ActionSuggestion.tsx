import { Action } from '@/types';

interface ActionSuggestionProps {
  action: Action;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ActionSuggestion({ action, onAccept, onDecline }: ActionSuggestionProps) {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-[20px] p-6 mb-6 shadow-sm">
      <h3 className="text-[15px] font-medium text-[#2C2C2C] mb-3 tracking-wide">{action.title}</h3>
      <p className="text-[14px] text-[#666666] mb-4 leading-[1.7]">{action.description}</p>
      {action.duration && (
        <p className="text-xs text-[#BFBFBF] mb-4">预计时间：{action.duration}</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="flex-1 bg-[#2C2C2C] text-white text-sm py-3 rounded-full hover:bg-[#404040] transition-all duration-300 font-medium"
        >
          去做
        </button>
        <button
          onClick={onDecline}
          className="flex-1 bg-[#F5F5F5] text-[#8B8B8B] text-sm py-3 rounded-full hover:bg-[#EBEBEB] transition-all duration-300"
        >
          不做
        </button>
      </div>
    </div>
  );
}
