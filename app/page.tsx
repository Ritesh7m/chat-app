"use client";

import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message) => {
      setMessages((prev) => [...prev, { sender: "system", message }]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit("join-room", { room, username: userName });
      setJoined(true);
    }
  };

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center">
      {!joined ? (
        /* JOIN SCREEN */
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 mt-20 mx-3">
          <h1 className="text-2xl font-bold text-center mb-6">
            Join a Room
          </h1>

          <input
            type="text"
            placeholder="Your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-4 py-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleJoinRoom}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold active:scale-95 transition"
          >
            Join Room
          </button>
        </div>
      ) : (
        /* CHAT SCREEN */
        <div className="w-full max-w-md sm:max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          
          {/* HEADER */}
          <div className="shrink-0 px-4 py-3 border-b bg-white">
            <h1 className="text-sm font-semibold">
              Room: <span className="text-blue-600">{room}</span>
            </h1>
          </div>

          {/* MESSAGES (ONLY THIS SCROLLS) */}
          <div className="flex-1 overflow-y-auto px-2 py-4 bg-gray-100">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
              />
            ))}
          </div>

          {/* INPUT */}
          <div className="shrink-0">
            <ChatForm onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
