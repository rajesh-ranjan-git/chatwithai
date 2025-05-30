import { PromptType, RoleType } from "@/lib/types/types";

export const getRole = (type: RoleType) => {
  switch (type) {
    case RoleType.ASSISTANT:
      return "Assistant";
    case RoleType.WRITING_EXPERT:
      return "Expert in writing and coding.";
    case RoleType.SOCIAL_MEDIA_EXPERT:
      return "Expert in twitter (X), social media in general.";
  }
};

export const getInstruction = (type: PromptType) => {
  switch (type) {
    case PromptType.ASK:
      return "Based on {userQuery} :";
    case PromptType.ANSWER:
      return "Answer this question :";
    case PromptType.EXPLAIN:
      return "Explain this :";
    case PromptType.SUMMARIZE:
      return "Explain this :";
    case PromptType.IMPROVE:
      return "Improve this :";
    case PromptType.FIX_GRAMMAR:
      return "Fix grammar and types :";
    case PromptType.REPLY:
      return "Reply to this tweet. Social media post or comment with a helpful response, must not use offensive language, use simple language like answering to friend :";
    case PromptType.SHORT_REPLY:
      "Reply to this tweet. Social media post or comment in short 3-4 words max :";
  }
};
