import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatsSliceAction } from '../../store/Chats';
import Message from './Message';
import Welcome from './Welcome';
import { v4 as uuid } from 'uuid';
import usePatchChatArray from '../../hooks/usePatchChatArray';

const ChatWindow = ({ sender, socket, setVideoCall }) => {

    const mutation = usePatchChatArray();
    const inputMsg = useRef();
    const displayMsg = useRef();

    const chats = useSelector(store => store.chats);
    const receiver = useSelector(store => store.receiver);
    const dispatch = useDispatch();

    const speakText = (text) => {
        if (!text) {
          console.error('Please provide text to speak');
          return;
        }
      
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = 'en-IN'; // Set language to Indian English
        speech.volume = 1; // Volume from 0 to 1
        speech.rate = 1; // Speed of speech from 0.1 to 10
        speech.pitch = 1; // Pitch of the voice from 0 to 2
      
        // Get the available voices
        const voices = window.speechSynthesis.getVoices();
      
        // Filter for Indian English voices, prioritize female voice
        const indianEnglishFemaleVoice = voices.find(voice => voice.lang === 'en-IN' && voice.name.includes('female'));
        
        // Fall back to any available Indian English voice if a female voice isn't found
        if (indianEnglishFemaleVoice) {
          speech.voice = indianEnglishFemaleVoice;
        } else {
          const indianEnglishVoice = voices.find(voice => voice.lang === 'en-IN');
          if (indianEnglishVoice) {
            speech.voice = indianEnglishVoice;
          }
        }
      
        // Speak the text
        window.speechSynthesis.speak(speech);
      };
      
      

    // Receiving chat
    useEffect(() => {
        if (socket) {
            socket.on("received_message", (msg) => {
                msg.id = uuid();
                dispatch(chatsSliceAction.receiveChat(msg));
                speakText(msg.msg)
            });
        }
        return () => {
            if (socket) {
                socket.removeListener("received_message", () => {
                    console.log("turned off received_message event");
                });
            }
        };
    }, [socket]);

    // Send message
    const handleKeyPress = async (e) => {
        if (e.key === "Enter") {
            if (inputMsg.current.value.trim() === "") {
                inputMsg.current.value = "";
                return;
            }

            const message = {
                id: uuid(),
                sender: sender,
                receiver: receiver,
                msg: inputMsg.current.value.trim(),
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            };

            console.log(message)

            // Patching this chat into the message array in DB
            mutation.mutate(message);
            await socket.emit("send_message", message);
            inputMsg.current.value = "";
        }
    };

    useEffect(() => {
        displayMsg.current.scrollTop = displayMsg.current.scrollHeight;
    }, [chats]);

    return (
        <div className="w-full max-w-screen-lg mx-auto h-[88vh] flex flex-col bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                <h5 className="flex justify-between items-center">
                    {receiver || 'Start Conversation'}
                </h5>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto" ref={displayMsg}>
                {receiver
                    ? chats.map((item) => <Message chat={item} key={item.id} sender={sender} receiver={receiver} />)
                    : <Welcome />}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                <input
                    type="text"
                    className="w-full p-3 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-full focus:outline-none placeholder-gray-400"
                    placeholder="Type a message"
                    ref={inputMsg}
                    onKeyUp={handleKeyPress}
                    disabled={!receiver}
                />
            </div>
        </div>
    );
};

export default ChatWindow;
