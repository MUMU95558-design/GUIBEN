import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-[75%] px-5 py-4 ${
          isUser
            ? 'bg-[#FFF4ED] text-gray-800 rounded-2xl shadow-sm border border-orange-100/50'
            : 'bg-[#EEF2FF] text-gray-800 rounded-2xl shadow-sm border border-indigo-100/50'
        }`}
      >
        <p className="text-[15px] leading-[1.7]">{message.content}</p>
      </div>
    </div>
  );
}
