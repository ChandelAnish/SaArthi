import React from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { chatsSliceAction } from '../store/Chats';
import useSocketConnect from '../hooks/useSocketConnect';
import { receiverSliceAction } from '../store/Receiver';

export default function Chat() {

  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.userDetails);
  const receiver = useSelector((store) => store.receiver);

  // connect to socket server
  const [socket, onlineUsers] = useSocketConnect();

  const loadOrStartConversation = async (user1, user2) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/chats/${user1}/${user2}`,
        {
          credentials: 'include',
        }
      );
      let initialChats = await response.json();
      if (initialChats.signin === false) {
        window.open('/signin', '_parent');
        return;
      }
      dispatch(chatsSliceAction.addInitialChats(initialChats.messages));
    } catch (error) {
      console.log('error occurred : ', error);
      return [];
    }
  };

  const startChat = async (rec) => {
    dispatch(receiverSliceAction.setReceiver(rec));
    await loadOrStartConversation(userDetails.username, rec);
  };

  return (
    <div className="flex h-[87vh] w-full bg-gray-100 dark:bg-gray-800">
      <Sidebar startChat={startChat} onlineUsers={onlineUsers} />
      <ChatWindow sender={userDetails.username} socket={socket} />
    </div>
  );
}
