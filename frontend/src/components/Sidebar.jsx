import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const conversations = [
    { id: 1, title: 'Project Planning', date: 'Today' },
    { id: 2, title: 'React Components', date: 'Yesterday' },
    { id: 3, title: 'Tailwind Setup', date: 'Dec 2' },
    { id: 4, title: 'API Integration', date: 'Nov 28' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-gray-50/80 dark:bg-slate-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">ChatBot</h1>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500/50 transition-all text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="font-medium">New Chat</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Recent</h3>
              <div className="space-y-1">
                {conversations.map((chat) => (
                  <button 
                    key={chat.id}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800/50 rounded-lg transition-all group text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <span className="truncate flex-1">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile / Settings */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-800">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                SM
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Saad Madni</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">Pro Plan</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
