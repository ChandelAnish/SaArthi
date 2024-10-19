import React from 'react';

export default function Message({ chat, sender }) {
  return (
    <div className={`mb-3 flex ${chat.sender === sender ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 max-w-xs md:max-w-md rounded-lg shadow-lg ${
          chat.sender === sender
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p className="mb-1 break-words">{chat.msg}</p>
        <div className="text-xs text-right text-gray-300">{chat.time}</div>
      </div>
    </div>
  );
}
