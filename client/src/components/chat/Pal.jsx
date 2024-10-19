import React from 'react';

export default function Pal({ receiver, startChat, online, profileImageURL }) {
    return (
        <div
            className="flex items-center p-2 cursor-pointer transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => startChat(receiver)}
        >
            <div>
                <img
                    src={profileImageURL}
                    alt={`${receiver}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
            <div className="ml-2">
                <div className="font-bold text-gray-900 dark:text-gray-100">{receiver}</div>
            </div>
            {online && (
                <div
                    className="rounded-full w-2.5 h-2.5 ml-2 bg-purple-500"
                    title="Online"
                ></div>
            )}
        </div>
    );
}
