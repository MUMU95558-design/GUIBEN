import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/lib/kimi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const response = await chat(messages);
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      error: 'Failed to chat',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
