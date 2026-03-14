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
            ? 'bg-[#2C2C2C] text-white rounded-[20px]'
            : 'bg-white text-[#2C2C2C] rounded-[20px] shadow-sm border border-[#F0F0F0]'
        }`}
      >
        <p className="text-[15px] leading-[1.7] tracking-wide">{message.content}</p>
      </div>
    </div>
  );
}
