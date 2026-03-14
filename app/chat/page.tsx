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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-emerald-50/50 flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white/70 backdrop-blur-md border-b border-blue-100/50 px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="text-gray-500 hover:text-blue-600 text-sm transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </a>
          <h1 className="text-sm font-medium text-gray-700 tracking-wide">对话</h1>
          <a href="/emotion" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
            情绪轨迹
          </a>
        </div>
      </div>

      {/* 对话区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center mt-32">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">说说你的感受吧</p>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="max-w-[75%] px-5 py-4 rounded-2xl bg-[#EEF2FF] shadow-sm border border-indigo-100/50">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
      <div className="bg-white/70 backdrop-blur-md border-t border-blue-100/50 px-6 py-6">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="说说你的感受..."
            disabled={isLoading}
            className="flex-1 px-5 py-4 bg-white border border-blue-200/50 rounded-full text-[15px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 bg-[#FF8A65] text-white rounded-full hover:shadow-lg hover:shadow-orange-400/30 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            {isLoading ? '...' : '发送'}
          </button>
        </div>
      </div>
    </div>
  );
}
