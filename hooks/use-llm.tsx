import { v4 as uuid } from "uuid";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ModelType, PromptProps } from "@/lib/types/types";
import { preparePrompt } from "@/lib/helpers/helpers";
import { useChatSession } from "@/hooks/use-chat-session";

export const useLLM = () => {
  const { getSessionById, addMessageToSession } = useChatSession();

  const runModel = async (props: PromptProps, sessionId: string) => {
    const currentSession = await getSessionById(sessionId);

    if (!props?.query) return;

    const apiKey = "";
    const model = new ChatOpenAI({
      modelName: ModelType.GPT3_5,
      openAIApiKey: apiKey,
    });

    const newMessageId = uuid();

    const formattedChatPrompt = await preparePrompt(
      props,
      currentSession?.messages || []
    );

    const stream = await model.stream(formattedChatPrompt);

    let streamedMessage = "";

    for await (const chunk of stream) {
      streamedMessage += chunk.content;
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

    addMessageToSession(sessionId, chatMessage);
  };

  return { runModel };
};
