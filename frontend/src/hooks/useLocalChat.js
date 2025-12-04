import { useState, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'chat_session_';

export const useLocalChat = (sessionId) => {
  const [messages, setMessages] = useState([]);

  // Load messages on mount or when sessionId changes
  useEffect(() => {
    if (!sessionId) return;
    
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${sessionId}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    } else {
      // Default welcome message if no history
      setMessages([
        { 
          id: 'welcome', 
          role: 'assistant', 
          content: 'Hello! I am your AI assistant. How can I help you today?' 
        }
      ]);
    }
  }, [sessionId]);

  // Save messages whenever they change
  useEffect(() => {
    if (!sessionId || messages.length === 0) return;
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${sessionId}`, JSON.stringify(messages));
  }, [messages, sessionId]);

  const clearSession = () => {
    if (!sessionId) return;
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${sessionId}`);
    setMessages([]);
  };

  return { messages, setMessages, clearSession };
};
