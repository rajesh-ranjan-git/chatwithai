"use client";

import { TChatProvider } from "@/lib/types/types";
import { ChatContext } from "@/context/chat/context";

export const ChatProvider = ({ children }: TChatProvider) => {
  return (
    <ChatContext.Provider value={{ chatSession: [] }}>
      {children}
    </ChatContext.Provider>
  );
};
