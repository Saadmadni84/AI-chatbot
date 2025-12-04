import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { sendMessage } from '../utils/api';

const ChatWindow = ({ messages, setMessages, sessionId }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessageContent = input.trim();
    const userMessage = { id: Date.now(), role: 'user', content: userMessageContent };
    
    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Prepare history for backend (exclude the message we just added to UI to avoid duplication if logic changes, 
      // but actually we need to send the *previous* history. The backend will append the new message from the 'message' field)
      const history = messages.map(msg => ({ role: msg.role, content: msg.content }));
      
      const response = await sendMessage(sessionId, userMessageContent, history);
      
      const aiMessage = {
        id: response.id || Date.now() + 1,
        role: 'assistant',
        content: response.message
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err.message || 'Server unavailable. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}
          
          {isTyping && (
            <div className="flex w-full justify-start animate-fade-in-up">
               <TypingIndicator />
            </div>
          )}
          
          {error && (
            <div className="flex justify-center animate-fade-in-up">
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100 shadow-sm">
                {error}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 max-h-32 text-gray-700 placeholder-gray-400"
              rows="1"
              style={{ minHeight: '44px' }}
            />

            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-2 rounded-xl transition-all ${
                input.trim() && !isTyping
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChatWindow;
