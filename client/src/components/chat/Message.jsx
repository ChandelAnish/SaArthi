import React from 'react';

export default function Message({ chat, sender }) {
  return (
    <div className="mb-3 clearfix">
      <div
        className={`p-3 max-w-xs md:max-w-md rounded-lg shadow-lg ${
          chat.sender === sender
            ? 'bg-purple-600 text-white float-right'
            : 'bg-gray-200 text-gray-900 float-left'
        }`}
      >
        <p className="mb-1 break-words">{chat.msg}</p>
        <div className="text-xs text-right text-gray-500">{chat.time}</div>
      </div>
    </div>
  );
}
