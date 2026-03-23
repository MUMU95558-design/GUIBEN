import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
      <div
        className={`max-w-[75%] px-6 py-4 ${
          isUser
            ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-3xl rounded-tr-md shadow-lg shadow-sky-400/30'
            : 'bg-white text-slate-700 rounded-3xl rounded-tl-md shadow-md border border-slate-200'
        }`}
      >
        <p className="text-[15px] leading-[1.7]">{message.content}</p>
      </div>
    </div>
  );
}