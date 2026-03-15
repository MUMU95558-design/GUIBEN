import { Action } from '@/types';

interface ActionSuggestionProps {
  action: Action;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ActionSuggestion({ action, onAccept, onDecline }: ActionSuggestionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 mb-8 animate-fade-in shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
          <p className="text-[15px] text-slate-600 leading-[1.7]">{action.description}</p>
          {action.duration && (
            <p className="text-xs text-blue-600 mt-3 font-medium">⏱ {action.duration}</p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm py-3.5 rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-medium hover:scale-105"
        >
          去做
        </button>
        <button
          onClick={onDecline}
          className="flex-1 bg-white text-slate-600 text-sm py-3.5 rounded-full hover:bg-slate-50 transition-all duration-300 border-2 border-slate-200 font-medium"
        >
          不做
        </button>
      </div>
    </div>
  );
}