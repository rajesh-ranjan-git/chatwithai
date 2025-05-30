import { AIMessage, HumanMessage } from "@langchain/core/messages";

export enum ModelType {
  GPT3 = "gpt-3",
  GPT3_5 = "gpt-3.5-turbo",
  GPT4 = "gpt-4",
  CLAUDE2 = "claude-2",
  CLAUDE3 = "claude-3",
}

export enum PromptType {
  ASK = "ask",
  ANSWER = "answer",
  EXPLAIN = "explain",
  SUMMARIZE = "summarize",
  IMPROVE = "improve",
  FIX_GRAMMAR = "fix_grammar",
  REPLY = "reply",
  SHORT_REPLY = "short_reply",
}

export enum RoleType {
  ASSISTANT = "assistant",
  WRITING_EXPERT = "writing_expert",
  SOCIAL_MEDIA_EXPERT = "social_media_expert",
}

export type PromptProps = {
  type: PromptType;
  context?: string;
  role: RoleType;
  query?: string;
  regenerate?: boolean;
};

export type TStreamProps = {
  props: PromptProps;
  sessionId: string;
  message: string;
};

export type TUseLLM = {
  onStreamStart: () => void;
  onStream: (props: TStreamProps) => Promise<void>;
  onStreamEnd: () => void;
};

export type TChatSession = {
  messages: TChatMessage[];
  title?: string;
  id: string;
  createdAt: string;
};

export type TChatMessage = {
  id: string;
  model: ModelType;
  human: HumanMessage;
  ai: AIMessage;
  rawHuman: string;
  rawAI: string;
  props?: PromptProps;
  createdAt?: string;
};

export type TChatContext = {
  sessions: TChatSession[];
  refetchSessions: () => void;
  isSessionLoading: boolean;
  createSession: () => void;
  lastStream?: TStreamProps;
  runModel: (props: PromptProps, sessionId: string) => Promise<void>;
};

export type TChatProvider = {
  children: React.ReactNode;
};
