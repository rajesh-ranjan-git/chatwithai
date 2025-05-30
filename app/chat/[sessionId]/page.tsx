"use client";

import { useParams } from "next/navigation";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

const ChatSessionPage = () => {
  const { sessionId } = useParams();

  return (
    <div className="w-full h-screen flex flex-row">
      <ChatInput />
      <ChatMessages />
    </div>
  );
};

export default ChatSessionPage;
