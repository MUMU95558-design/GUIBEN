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
            ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-2xl shadow-sm'
            : 'bg-white text-gray-700 rounded-2xl shadow-sm border border-blue-100/50'
        }`}
      >
        <p className="text-[15px] leading-[1.7]">{message.content}</p>
      </div>
    </div>
  );
}
