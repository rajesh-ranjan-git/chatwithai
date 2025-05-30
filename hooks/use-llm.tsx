"use client";

import { v4 as uuid } from "uuid";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ModelType, PromptProps, TUseLLM } from "@/lib/types/types";
import { preparePrompt } from "@/lib/helpers/helpers";
import { useChatSession } from "@/hooks/use-chat-session";

export const useLLM = ({ onStreamStart, onStream, onStreamEnd }: TUseLLM) => {
  const { getSessionById, addMessageToSession } = useChatSession();

  const runModel = async (props: PromptProps, sessionId: string) => {
    const currentSession = await getSessionById(sessionId);

    if (!props?.query) return;

    const apiKey = "";
    const model = new ChatOpenAI({
      modelName: ModelType.GPT3_5,
      openAIApiKey: apiKey || process.env.PUBLIC_OPENAI_API_KEY,
    });

    const newMessageId = uuid();

    const formattedChatPrompt = await preparePrompt(
      props,
      currentSession?.messages || []
    );

    const stream = await model.stream(formattedChatPrompt);

    let streamedMessage = "";

    onStreamStart();

    for await (const chunk of stream) {
      streamedMessage += chunk.content;
      onStream({ props, sessionId, message: streamedMessage });
    }

    const chatMessage = {
      id: newMessageId,
      model: ModelType.GPT3,
      human: new HumanMessage(props.query),
      ai: new AIMessage(streamedMessage),
      rawHuman: props.query,
      rawAI: streamedMessage,
      props,
    };

    addMessageToSession(sessionId, chatMessage).then(() => {
      onStreamEnd();
    });
  };

  return { runModel };
};
