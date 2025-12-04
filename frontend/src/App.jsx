import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import { useLocalChat } from './hooks/useLocalChat';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sessionId = 'default-session';
  const { messages, setMessages, clearSession } = useLocalChat(sessionId);
  const { theme, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col h-full relative w-full">
        <Header 
          toggleSidebar={toggleSidebar} 
          onClearChat={clearSession} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <ChatWindow 
          messages={messages} 
          setMessages={setMessages} 
          sessionId={sessionId} 
        />
      </div>
    </div>
  );
}

export default App;
