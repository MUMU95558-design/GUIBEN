import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库类型定义
export interface Conversation {
  id: string;
  user_id: string;
  messages: any[];
  created_at: string;
  updated_at: string;
}

export interface Emotion {
  id: string;
  user_id: string;
  type: 'anxiety' | 'emptiness' | 'stress' | 'confusion' | 'loneliness';
  intensity: number;
  note?: string;
  created_at: string;
}

// 保存对话
export async function saveConversation(userId: string, messages: any[]) {
  const { data, error } = await supabase
    .from('conversations')
    .upsert({
      user_id: userId,
      messages: messages,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 加载对话历史
export async function loadConversations(userId: string) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 保存情绪记录
export async function saveEmotion(
  userId: string,
  type: Emotion['type'],
  intensity: number,
  note?: string
) {
  const { data, error } = await supabase
    .from('emotions')
    .insert({
      user_id: userId,
      type,
      intensity,
      note,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 获取情绪历史
export async function getEmotions(userId: string, days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('emotions')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}
