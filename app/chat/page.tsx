'use client';

import { useState, useEffect, useRef } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ActionSuggestion from '@/components/ActionSuggestion';
import { Message, Action } from '@/types';
import { saveConversation, loadConversation } from '@/lib/supabase';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 加载历史对话
  useEffect(() => {
    const history = loadConversation();
    if (history.length > 0) {
      setMessages(history);
    }
  }, []);

  // 保存对话历史
  useEffect(() => {
    if (messages.length > 0) {
      saveConversation(messages);
    }
  }, [messages]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // 调用 API 获取回复
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages([...newMessages, assistantMessage]);

      // 解析行动建议（简单实现）
      if (data.message.includes('试试') || data.message.includes('建议')) {
        setCurrentAction({
          id: Date.now().toString(),
          title: '行动建议',
          description: '尝试 AI 推荐的方法',
          duration: '5-15分钟',
          completed: false,
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '抱歉，我现在遇到了一些问题。请稍后再试。',
        timestamp: new Date(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">
            ← 返回
          </a>
          <h1 className="text-sm font-medium text-gray-800">对话</h1>
          <a href="/emotion" className="text-gray-400 hover:text-gray-600 text-sm">
            情绪轨迹
          </a>
        </div>
      </div>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-sm">说说你的感受吧</p>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {currentAction && (
            <ActionSuggestion
              action={currentAction}
              onAccept={() => setCurrentAction(null)}
              onDecline={() => setCurrentAction(null)}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="bg-white border-t border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="说说你的感受..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#A8B5C7] transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-[#A8B5C7] text-white rounded-full hover:bg-[#96a3b5] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '发送'}
          </button>
        </div>
      </div>
    </div>
  );
}
