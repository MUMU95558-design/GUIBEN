import { Action } from '@/types';

interface ActionSuggestionProps {
  action: Action;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ActionSuggestion({ action, onAccept, onDecline }: ActionSuggestionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200/50 rounded-2xl p-6 mb-6 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-[15px] font-medium text-gray-700 flex-1">{action.title}</h3>
      </div>
      <p className="text-[14px] text-gray-600 mb-4 leading-[1.7] ml-11">{action.description}</p>
      {action.duration && (
        <p className="text-xs text-gray-400 mb-4 ml-11">预计时间：{action.duration}</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm py-3 rounded-full hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 font-medium hover:scale-105"
        >
          去做
        </button>
        <button
          onClick={onDecline}
          className="flex-1 bg-white text-gray-500 text-sm py-3 rounded-full hover:bg-gray-50 transition-all duration-300 border border-gray-200"
        >
          不做
        </button>
      </div>
    </div>
  );
}
