"use client";

import React, { useState } from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        fixed bottom-0 left-0 w-full
        bg-white/90 backdrop-blur-lg
        border-t border-gray-200
        px-3 py-3
        flex items-center gap-2
        sm:relative sm:bg-transparent sm:border-none
      "
    >
      {/* Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="
            w-full
            px-5 py-3
            text-sm
            rounded-full
            bg-gray-50
            border border-gray-300
            shadow-inner
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:bg-white
            transition-all
          "
        />
      </div>

      {/* Send Button */}
      <button
        type="submit"
        className="
          flex items-center justify-center
          h-11 w-11 sm:h-auto sm:w-auto
          px-0 sm:px-5
          rounded-full
          bg-gradient-to-br from-blue-500 to-indigo-600
          text-white
          font-semibold
          shadow-lg
          active:scale-95
          transition
        "
      >
        <span className="hidden sm:inline">Send</span>
        <span className="sm:hidden text-lg">➤</span>
      </button>
    </form>
  );
};

export default ChatForm;
