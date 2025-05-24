"use client";

import { TChatContext } from "@/lib/types/types";
import { createContext, useContext } from "react";

export const ChatContext = createContext<TChatContext | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context)
    throw new Error("useChatContext must be used within ChatProvider.");

  return context;
};
