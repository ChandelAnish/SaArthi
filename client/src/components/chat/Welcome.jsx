import React from 'react';

export default function Welcome() {
    return (
        <div className='flex flex-col w-full h-full justify-center items-center bg-white dark:bg-gray-800 opacity-75'>
            <img className="w-20 mb-3" src="/SaArthi-logo.jpg" alt="FusionFLOW Logo" />
            <h6 className='text-gray-500 dark:text-gray-300'>Send and receive messages online</h6>
            <h6 className='text-gray-500 dark:text-gray-300'>using fusionFLOW chats.</h6>
        </div>
    );
}
