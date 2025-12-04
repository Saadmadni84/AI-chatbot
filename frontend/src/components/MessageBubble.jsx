import React from 'react';

const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
      <div
        className={`
          max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
          ${isUser 
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none' 
            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 rounded-bl-none'
          }
        `}
      >
        <div className="whitespace-pre-wrap break-words font-normal">
          {content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;