import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-4 bg-white rounded-2xl rounded-tl-none shadow-sm w-fit border border-gray-100">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingIndicator;
