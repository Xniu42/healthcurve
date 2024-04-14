// components/Chat.tsx
'use client';
import { useRef, useState } from 'react';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
export type Metric = {
  metric_type: string;
  metric_value: number;
  metric_date: string;
};

type ChatProps = {
  metrics: Metric[];
};

export default function Chat({ metrics }: ChatProps) {
  const [report, setReport] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: '/api/chat',
  });

  const generateId = useChat({ api: '/api/chat' });
  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'analyze', metrics }),
      });

      const reportText = await response.text();
      setReport(reportText);
      setMessages([{ id: generateId.toString(), role: 'assistant', content: reportText }]);
    } catch (error) {
      console.error('Error generating health report:', error);
    }
    setAnalyzing(false);
  };
  
  
  // add a new <form> element that is not visible in the JSX, bind its ref to a formRef variable, and bind its onSubmit event to the handleSubmit function
  const formRef = useRef<HTMLFormElement>(null);
  
  
  /**
   * Preprocesses the math content by replacing occurrences of '\\[' and '\\]' with '$$'.
   * 
   * @param content - The math content to preprocess.
   * @returns The preprocessed math content.
   */
  function preprocessMath(content: string): string {
    return content.replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
  }

  return (
    <div className="flex flex-col flex-grow w-full max-w-6xl mx-auto">
      <div className="flex-grow p-4 overflow-y-auto border border-gray-300 rounded-md shadow-sm">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            <strong>{m.role === 'user' ? '我:' : '健康助理:'}</strong>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {preprocessMath(m.content)}
            </ReactMarkdown>
          </div>
           ))}
      </div>
      <div className="flex items-center w-full mt-4">
        <form onSubmit={handleSubmit}>
        <textarea
          className="flex-grow px-4 py-2 mr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden min-w-0"
          value={input}
          placeholder={analyzing ? '正在分析,请稍候...' : '开始前先点击右侧按钮🫱...'}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
          }}
          disabled={analyzing}
          rows={1}
          style={{ height: 'auto', minHeight: '48px' }}
        />
          </form>
          <button
            className="flex-shrink-0 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handleAnalyze}
            disabled={report !== '' || analyzing}
          >
            {analyzing ? '分析中...' : '健康指标分析'}
          </button>
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'none' }}></form>
      </div>
    </div>
  );
}