import { get, set } from "idb-keyval";
import { TChatMessage, TChatSession } from "@/lib/types/types";

export const useChatSession = () => {
  const getSessions = async (): Promise<TChatSession[]> => {
    return (await get("chat-sessions")) || [];
  };

  const setSession = async (chatSession: TChatSession) => {
    const sessions = await getSessions();
    const newSessions = [...sessions, chatSession];
    await set("chat-sessions", newSessions);
  };

  const getSessionById = async (id: string) => {
    const sessions = await getSessions();
    return sessions.find((session: TChatSession) => session.id === id);
  };

  const removeSessionById = async (id: string) => {
    const sessions = await getSessions();
    const newSessions = sessions.filter(
      (session: TChatSession) => session.id !== id
    );
    await set("chat-sessions", newSessions);
  };

  const addMessageToSession = async (
    sessionId: string,
    chatMessage: TChatMessage
  ) => {
    const sessions = await getSessions();
    const newSessions = sessions.map((session: TChatSession) => {
      if (session.id === sessionId) {
        return { ...session, messages: [...session.messages, chatMessage] };
      }
    });
    await set("chat-sessions", newSessions);
  };

  const updateSessions = async (
    sessionId: string,
    newSession: Omit<TChatSession, "id">
  ) => {
    const sessions = await getSessions();
    const newSessions = sessions.map((session: TChatSession) => {
      if (session.id === sessionId) {
        return {
          ...session,
          ...newSession,
        };
      }
      return session;
    });
    await set("chat-sessions", newSessions);
  };

  return {
    getSessions,
    setSession,
    getSessionById,
    removeSessionById,
    addMessageToSession,
    updateSessions,
  };
};
