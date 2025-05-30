"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/chat/context";

export const Sidebar = () => {
  const { sessions, createSession } = useChatContext();
  const { push } = useRouter();

  return (
    <div className="w-1/5 h-screen p-4 flex flex-col gap-4">
      <Button onClick={createSession}>New Session</Button>
      {sessions && sessions?.length > 0 ? (
        sessions?.map((session) => (
          <div
            key={session?.id}
            className="p-2"
            onClick={() => {
              push(`/chat/${session?.id}`);
            }}
          >
            {session?.title}
          </div>
        ))
      ) : (
        <div>No sessions found!</div>
      )}
    </div>
  );
};
