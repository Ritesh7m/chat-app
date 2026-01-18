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
      className={`flex w-full ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } mb-2 px-2`}
    >
      <div
        className={`
          max-w-[75%]
          px-4 py-2
          text-sm
          leading-relaxed
          shadow-md
          ${
            isSystemMessage
              ? "bg-black text-white text-xs px-4 py-1 rounded-full opacity-80"
              : isOwnMessage
              ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl rounded-br-md"
              : "bg-white text-gray-900 rounded-2xl rounded-bl-md border border-gray-200"
          }
        `}
      >
        {!isSystemMessage && !isOwnMessage && (
          <p className="text-[11px] font-semibold mb-1 text-gray-500">
            {sender}
          </p>
        )}
        <p className="break-words">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
