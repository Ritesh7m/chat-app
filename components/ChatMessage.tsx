import React from "react";

interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

const ChatMessage = ({ sender, message, isOwnMessage }: ChatMessageProps) => {
  const isSystemMessage = sender === "system";

  return (
    <div
      className={`w-full flex ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } px-3 mb-2`}
    >
      <div
        className={`
          max-w-[90%] sm:max-w-[75%]
          px-4 py-2.5
          text-sm
          leading-relaxed
          ${
            isSystemMessage
              ? "bg-gray-900 text-white text-xs px-4 py-1 rounded-full opacity-80"
              : isOwnMessage
              ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl rounded-br-sm shadow-md"
              : "bg-white text-gray-900 rounded-2xl rounded-bl-sm shadow-sm border border-gray-200"
          }
        `}
      >
        {!isSystemMessage && !isOwnMessage && (
          <p className="text-[10px] font-semibold text-gray-500 mb-1">
            {sender}
          </p>
        )}
        <p className="break-words">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
