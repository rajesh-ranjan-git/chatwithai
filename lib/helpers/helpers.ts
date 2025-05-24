import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { PromptProps, TChatMessage } from "@/lib/types/types";
import { getInstruction, getRole } from "@/lib/helpers/prompts";

export const preparePrompt = async (
  props: PromptProps,
  history: TChatMessage[]
) => {
  const messageHistory = history;
  const prompt = ChatPromptTemplate.fromMessages(
    messageHistory?.length > 0
      ? [
          [
            "system",
            "You are {role}. Answer user's questions based on following context:",
          ],
          new MessagesPlaceholder("chat_history"),
          ["user", "{input}"],
        ]
      : [
          props?.context
            ? [
                "system",
                "You are {role}. Answer user's questions based on following context: {context}",
              ]
            : ["system", "You are {role}. {type}"],
          ["user", "{input}"],
        ]
  );

  const previousMessageHistory = messageHistory.reduce(
    (acc: (HumanMessage | AIMessage)[], { rawAI, rawHuman }) => [
      ...acc,
      new HumanMessage(rawHuman),
      new AIMessage(rawAI),
    ],
    []
  );

  return await prompt.formatMessages(
    messageHistory?.length > 0
      ? {
          role: getRole(props.role),
          chat_history: previousMessageHistory,
          input: props.query,
        }
      : {
          role: getRole(props.role),
          type: getInstruction(props.type),
          context: props.context,
          input: props.query,
        }
  );
};
