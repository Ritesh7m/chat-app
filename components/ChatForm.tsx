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
      className="w-full bg-white/90 backdrop-blur-md border-t px-3 py-3 flex items-center gap-2"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          px-5 py-3
          rounded-full
          border border-gray-300
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      />

      <button
        type="submit"
        className="
          h-11 w-11
          rounded-full
          bg-gradient-to-br from-blue-500 to-indigo-600
          text-white
          flex items-center justify-center
          text-lg
          shadow-lg
          active:scale-95
          transition
        "
      >
        ➤
      </button>
    </form>
  );
};

export default ChatForm;
