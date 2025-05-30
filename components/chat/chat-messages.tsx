"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TChatSession } from "@/lib/types/types";
import { useChatContext } from "@/context/chat/context";
import { useChatSession } from "@/hooks/use-chat-session";

export const ChatMessages = () => {
  const { sessionId } = useParams();
  const { lastStream } = useChatContext();
  const { getSessionById } = useChatSession();

  const [currentSession, setCurrentSession] = useState<
    TChatSession | undefined
  >(undefined);

  const fetchSession = async () => {
    getSessionById(sessionId!.toString()).then((session) => {
      setCurrentSession(session);
    });
  };

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (!lastStream) {
      fetchSession();
    }
  }, [lastStream]);

  const isLastStreamBelongsToCurrentSession =
    lastStream?.sessionId === sessionId;

  return (
    <div>
      {currentSession &&
      currentSession?.messages &&
      currentSession?.messages?.length > 0 ? (
        currentSession?.messages.map((message) => (
          <div key={message.id} className="p-2">
            {message.rawHuman}
            {message.rawAI}
          </div>
        ))
      ) : (
        <div>No messages found!</div>
      )}

      {isLastStreamBelongsToCurrentSession && (
        <div className="p-2">
          {lastStream?.props?.query}
          {lastStream?.message}
        </div>
      )}
    </div>
  );
};
