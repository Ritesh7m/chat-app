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
      className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 px-3 py-3 flex gap-2 sm:relative sm:bg-transparent sm:border-none"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          px-4 py-3
          rounded-full
          border border-gray-300
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      />

      <button
        type="submit"
        className="
          px-5 py-3
          rounded-full
          bg-gradient-to-r from-blue-500 to-indigo-600
          text-white
          font-semibold
          shadow-md
          active:scale-95
          transition
        "
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
