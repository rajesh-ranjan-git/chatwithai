"use client";

import { useEffect, useState } from "react";
import { TChatProvider, TChatSession, TStreamProps } from "@/lib/types/types";
import { useChatSession } from "@/hooks/use-chat-session";
import { useLLM } from "@/hooks/use-llm";
import { ChatContext } from "@/context/chat/context";

export const ChatProvider = ({ children }: TChatProvider) => {
  const { getSessions, createNewSession } = useChatSession();

  const [sessions, setSessions] = useState<TChatSession[]>([]);
  const [isSessionLoading, setIsSessionLoading] = useState<boolean>(true);
  const [lastStream, setLastStream] = useState<TStreamProps>();

  const { runModel } = useLLM({
    onStreamStart: () => {
      setLastStream(undefined);
      refetchSessions();
    },
    onStream: async (props) => {
      setLastStream(props);
    },
    onStreamEnd: () => {
      fetchSessions().then(() => {
        setLastStream(undefined);
      });
    },
  });

  const fetchSessions = async () => {
    const sessions = await getSessions();
    setSessions(sessions);
    setIsSessionLoading(false);
  };

  const createSession = async () => {
    await createNewSession();
    fetchSessions();
  };

  useEffect(() => {
    setIsSessionLoading(true);
    fetchSessions();
  }, []);

  const refetchSessions = async () => {
    fetchSessions();
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        refetchSessions,
        isSessionLoading,
        createSession,
        lastStream,
        runModel,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
