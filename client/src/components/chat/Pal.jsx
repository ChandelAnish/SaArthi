import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Pal({ receiver, startChat, online }) {
    return (
        <div
            className="flex items-center p-2 cursor-pointer transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => startChat(receiver)}
        >
            <div>
                <FaUserCircle size="40" />
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
