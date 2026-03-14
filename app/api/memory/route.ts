import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // TODO: 实现记忆系统API
  return NextResponse.json({ memories: [] });
}

export async function POST(req: NextRequest) {
  // TODO: 实现记忆保存API
  return NextResponse.json({ success: true });
}
