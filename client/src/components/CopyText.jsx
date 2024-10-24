import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa"; // Import copy icon from react-icons

const CopyTextComponent = ({ text }) => {
  // const [text, setText] = useState('Your transcribed text here');

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        //   alert('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-4 rounded-md dark:text-white text-black font-mono w-full mt-10">
      {/* Full-width nav bar-like container */}
      <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-2 rounded-md w-full">
        <span className="text-black dark:text-white">transcribed text</span>
        <button
          onClick={copyToClipboard}
          className="text-blue-400 hover:text-blue-500 focus:outline-none flex items-center"
        >
          Copy text
          <FaRegCopy className="ml-2" /> {/* Icon from react-icons */}
        </button>
      </div>

      {/* Text display area with dynamic bg based on theme */}
      <pre className="mt-2 whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-900 p-4 rounded-md w-full">
        {text}
      </pre>
    </div>
  );
};

export default CopyTextComponent;
