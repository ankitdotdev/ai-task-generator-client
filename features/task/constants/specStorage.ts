import { AISpecOutput } from "../types/task.types";

export const SPEC_STORAGE: Record<string, AISpecOutput> = {
  "ecfc7154-d72c-47e0-b75f-c8b47608d72c": {
    specInputId: "ecfc7154-d72c-47e0-b75f-c8b47608d72c",

    version: 1,

    generatedAt: new Date(),

    aiModel: "gpt-5",

    output: {
      userStories: [
        {
          id: "us1",
          content: "User can generate tasks from feature input",
        },
      ],

      engineeringTasks: [
        {
          id: "et1",
          content: "Build step form UI",
        },
      ],

      risks: [
        {
          id: "r1",
          content: "AI output may need validation",
        },
      ],

      unknowns: [
        {
          id: "u1",
          content: "Unknown user adoption",
        },
      ],
    },
  },
};
