// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse, experimental_streamText } from 'ai';
import OpenAI from 'openai';
import type  {Metric}  from '@/components/Chat';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  const body = await request.json();
  if (body.type === 'analyze') {
    const { metrics: filteredMetrics }: { metrics: Metric[] } = body;

    const metricsString = JSON.stringify(filteredMetrics, null, 2);
    //console.log('Metrics:', metricsString);
    const systemMessage = `你是一位顶尖医学院的心血管和糖尿病专家。
现在你手上有一个患者的健康指标数据:

\`\`\`json
${metricsString}
\`\`\`

请根据这些指标数据,给出一份全面、专业的健康分析报告和建议。报告需要包括:

1. 对每一项指标的解读和分析 
2. 总体的健康状况评估
3. 可能存在的健康风险和问题
4. 针对性的生活方式和医疗建议
5. 报告采用markdown格式,减少不必要的空格,合理段落间隔,方便患者阅读和理解
6. 报告在1200字以内

患者看完你的报告后,可能会向你提出一些后续问题,请做好与患者沟通的准备。
`;
//console.log('System message:', systemMessage);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        stream: true,
        temperature: 0.2,
        max_tokens: 2500,
        messages: [{
          role: 'system',
          content: systemMessage,
        }],
      });

      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    } catch (error) {
      console.error('Error generating health report:', error);
      return new Response('An error occurred while generating the health report.', { status: 500 });
    }
  } else {
    const { messages } = body;

    if (Array.isArray(messages)) {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        stream: true,
        temperature: 0.2,
        max_tokens: 1024,
        messages: messages.map(({ role, content }) => ({ role, content })),
      });

      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    } else {
      return new Response('Invalid messages format. Expected an array.', { status: 400 });
    }
  }
}