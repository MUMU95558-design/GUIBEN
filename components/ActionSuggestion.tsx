import { Action } from '@/types';

interface ActionSuggestionProps {
  action: Action;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ActionSuggestion({ action, onAccept, onDecline }: ActionSuggestionProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
      <h3 className="text-sm font-medium text-gray-800 mb-2">{action.title}</h3>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{action.description}</p>
      {action.duration && (
        <p className="text-xs text-gray-500 mb-3">预计时间：{action.duration}</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="flex-1 bg-[#A8B5C7] text-white text-sm py-2 rounded-full hover:bg-[#96a3b5] transition-colors"
        >
          去做
        </button>
        <button
          onClick={onDecline}
          className="flex-1 bg-gray-100 text-gray-600 text-sm py-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          不做
        </button>
      </div>
    </div>
  );
}
