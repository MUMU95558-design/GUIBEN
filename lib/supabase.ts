// Supabase 相关变量先留空注释掉
// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// 暂时用 localStorage 存储对话历史
export function saveConversation(messages: any[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('conversation', JSON.stringify(messages));
  }
}

export function loadConversation() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('conversation');
    return data ? JSON.parse(data) : [];
  }
  return [];
}
