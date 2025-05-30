"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PromptType, RoleType } from "@/lib/types/types";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/context/chat/context";

export const ChatInput = () => {
  const { sessionId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const { runModel } = useChatContext();

  return (
    <div className="w-full h-8 flex flex-row bg-gray-100">
      <Input
        placeholder="Ask me anything..."
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            runModel(
              {
                role: RoleType.ASSISTANT,
                type: PromptType.ASK,
                query: inputValue,
              },
              sessionId!.toString()
            );
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};
