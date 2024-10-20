import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCommentDots, FaEllipsisV } from 'react-icons/fa';
import Pal from './Pal';
import useAddInitialPals from '../../hooks/useAddInitialPals';

const Sidebar = ({ startChat, onlineUsers }) => {

    const userDetails = useSelector((store) => store.userDetails);
    const pals = useSelector((store) => store.pals);
    useAddInitialPals();

    const [searchTerm, setSearchTerm] = useState('');

    // Filter pals based on the search term
    const filteredPals = pals.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col w-1/3 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-300 dark:border-gray-700">
                <img className="w-8 h-8 rounded-full" src={`${userDetails.profileImageURL}`} alt="user photo" />
                <span className='text-xs font-bold'>~{userDetails.name}</span>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Pals list */}
            <div className="flex-grow overflow-auto p-2">
                {filteredPals.length > 0 ? (
                    filteredPals.map((item) => {
                        const online = onlineUsers.hasOwnProperty(item.name);
                        return (
                            <Pal
                                receiver={item.name}
                                profileImageURL={item.profileImageURL}
                                key={item._id}
                                startChat={startChat}
                                online={online}
                            />
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-300">
                        No user found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
