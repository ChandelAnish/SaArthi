import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaCommentDots, FaEllipsisV } from 'react-icons/fa';
import Pal from './Pal';
import useAddInitialPals from '../../hooks/useAddInitialPals';

const Sidebar = ({ startChat, onlineUsers }) => {
    const pals = useSelector((store) => store.pals);

    useAddInitialPals();

    return (
        <div className="flex flex-col w-1/3 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-gray-700">
                <FaUserCircle size="40" />
                <div className="flex space-x-4">
                    <FaCommentDots size="20" />
                    <FaEllipsisV size="20" />
                </div>
            </div>

            {/* Search bar */}
            <div className="p-3">
                <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Search or start a new chat"
                />
            </div>

            {/* Pals list */}
            <div className="flex-grow overflow-auto p-2">
                {pals.map((item) => {
                    const online = onlineUsers.hasOwnProperty(`${item.username}`);
                    return (
                        <Pal
                            receiver={item.name}
                            profileImageURL={item.profileImageURL}
                            key={item._id}
                            startChat={startChat}
                            online={online}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
