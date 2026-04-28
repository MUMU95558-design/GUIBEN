import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.KIMI_API_KEY,
  baseURL: 'https://api.siliconflow.cn/v1',
});

const systemPrompt = `你是一个温暖、真诚的AI疗愈助手。你的目标是帮助20岁左右的大学生疏导焦虑、缓解空虚感。

核心原则：
1. 不要简单安慰，而是引导用户思考
2. 识别用户的情绪（焦虑、空虚、压力、迷茫、孤独）
3. 在对话结束时，推荐1-2个轻量化行动（5-15分钟能完成）
4. 语言风格：温暖、真诚、不说教，像朋友而非心理咨询师
5. 【最重要】格式要求：你的回复必须是纯文本，严禁使用任何格式符号。具体禁止：
   - 禁止使用 ** （双星号/加粗）
   - 禁止使用 * （单星号/斜体）
   - 禁止使用 ## ### （标题符号）
   - 禁止使用 > （引用符号）
   - 禁止使用 --- （分割线）
   - 禁止使用数字加点如 1. 2. 3. 做列表（用"第一、第二、第三"或"首先、其次"代替）
   - 直接用自然语言表达，就像微信聊天一样

情绪识别：
- 焦虑：用户提到考试、deadline、担心、紧张
- 空虚：用户提到无聊、没意思、不知道干什么
- 压力：用户提到忙、累、撑不住
- 迷茫：用户提到不知道、困惑、找不到方向
- 孤独：用户提到一个人、没人理解、孤单

行动建议示例：
- 焦虑 → 深呼吸练习、列出3个最重要的事
- 空虚 → 写下3件感恩的事、给朋友发条消息
- 压力 → 出门走10分钟、听一首喜欢的歌
- 迷茫 → 写下今天做得好的3件事、问自己"我真正想要什么"
- 孤独 → 给家人打个电话、去咖啡厅坐坐`;

const sanitizeContent = (content: string): string => {
  let result = content;
  
  result = result.replace(/\*{2,}/g, '');
  result = result.replace(/\*/g, '');
  result = result.replace(/^#{1,6}\s*/gm, '');
  result = result.replace(/^>\s*/gm, '');
  result = result.replace(/^---+\s*$/gm, '');
  result = result.replace(/^\d+[.)、．]\s*/gm, '');
  result = result.replace(/\n{3,}/g, '\n\n');
  
  return result;
};

export async function chat(messages: Array<{ role: string; content: string }>) {
  const response = await client.chat.completions.create({
    model: 'Pro/zai-org/GLM-5',
    messages: [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
    ],
    temperature: 0.7,
  });

  const rawContent = response.choices[0].message.content || '';
  return sanitizeContent(rawContent).trim();
}

export async function* chatStream(messages: Array<{ role: string; content: string }>) {
  let buffer = '';
  
  const stream = await client.chat.completions.create({
    model: 'Pro/zai-org/GLM-5',
    messages: [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
    ],
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || '';
    if (delta) {
      buffer += delta;
      yield sanitizeContent(buffer);
      buffer = '';
    }
  }
  
  if (buffer) {
    yield sanitizeContent(buffer);
  }
}