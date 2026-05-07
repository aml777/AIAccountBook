import { useState, useRef, useEffect, useMemo } from 'react';
import { parseChineseNumber } from '../utils/formatters';
import { useRecords } from '../hooks/useRecords';
import { QuickAdd } from '../components/QuickAdd';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是AI记账助手。你可以：\n• 输入"花了100块买咖啡"\n• 说"中午外卖35元"\n• 问我"本月花了多少钱"\n\n试试语音输入（点🎤按钮）吧！'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addRecord, records } = useRecords();

  const monthTotal = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return records.filter(r => r.createdAt >= monthStart).reduce((sum, r) => sum + r.amount, 0);
  }, [records]);

  const todayTotal = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return records.filter(r => new Date(r.date).getTime() >= today.getTime()).reduce((sum, r) => sum + r.amount, 0);
  }, [records]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processCommand = (text: string) => {
    const lowerText = text.toLowerCase().trim();

    if (lowerText.includes('本月') && (lowerText.includes('多少') || lowerText.includes('花了'))) {
      return `本月已消费 ¥${monthTotal.toFixed(2)}，加油哦！💪`;
    }

    if (lowerText.includes('今天') && (lowerText.includes('多少') || lowerText.includes('花了'))) {
      return `今天已消费 ¥${todayTotal.toFixed(2)}，继续保持！📊`;
    }

    if (lowerText.includes('一共') || lowerText.includes('总共')) {
      return `本月总计消费 ¥${monthTotal.toFixed(2)}，要精打细算哦！💰`;
    }

    if (lowerText.includes('记录') && (lowerText.includes('多少') || lowerText.includes('几条'))) {
      return `共有 ${records.length} 条记账记录，继续保持好习惯！📝`;
    }

    const amount = parseChineseNumber(text);
    if (amount && amount > 0) {
      setShowQuickAdd(true);
      return null;
    }

    return null;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const response = processCommand(input);
      if (response) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: response
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    }, 500);

    setInput('');
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('抱歉，您的浏览器不支持语音输入');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">AI 助手</h1>
      </div>

      <div className="page-content">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`chat-message ${msg.type}`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <button
              onClick={handleVoiceInput}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '24px',
                border: 'none',
                background: isListening ? '#FF6B35' : '#f0f0f0',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🎤
            </button>
            <input
              type="text"
              className="chat-input"
              placeholder="输入消息或语音..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button className="chat-send" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      </div>

      <QuickAdd
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        onAdd={(amount, description, category) => {
          addRecord({ amount, description, category, date: new Date().toISOString() });
          const aiMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: `好的！已记录 ¥${amount}，继续保持！✨`
          };
          setMessages(prev => [...prev, aiMessage]);
        }}
      />
    </>
  );
}
