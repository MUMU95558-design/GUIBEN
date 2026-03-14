import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/lib/kimi';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const response = await chat(messages);
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to chat' }, { status: 500 });
  }
}
