import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

const sanitizeContent = (content: string): string => {
  let result = content;
  
  result = result.replace(/\*{2,}/g, '');
  result = result.replace(/\*/g, '');
  result = result.replace(/^#{1,6}\s*/gm, '');
  result = result.replace(/^>\s*/gm, '');
  result = result.replace(/^---+\s*$/gm, '');
  result = result.replace(/^\d+[.)、．]\s*/gm, '');
  
  return result.trim();
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const cleanedContent = sanitizeContent(message.content);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
      <div
        className={`max-w-[75%] px-6 py-4 ${
          isUser
            ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-3xl rounded-tr-md shadow-lg shadow-sky-400/30'
            : 'bg-white text-slate-700 rounded-3xl rounded-tl-md shadow-md border border-slate-200'
        }`}
      >
        <p className="text-[15px] leading-[1.7]">{cleanedContent}</p>
      </div>
    </div>
  );
}