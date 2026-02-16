import { AISpecOutput } from "../types/task.types";

export const DUMMY_SPEC: AISpecOutput = {

  specInputId: "spec_123",

  version: 1,

  generatedAt: new Date(),

  aiModel: "gpt-5",

  output: {

    userStories: [
      {
        id: "us1",
        content:
          "As a user, I want to generate tasks from feature description",
      },
      {
        id: "us2",
        content:
          "As a manager, I want structured engineering tasks",
      },
    ],

    engineeringTasks: [
      {
        id: "et1",
        content:
          "Create frontend step form wizard",
      },
      {
        id: "et2",
        content:
          "Implement backend spec generation endpoint",
      },
    ],

    risks: [
      {
        id: "r1",
        content:
          "AI output may require manual review",
      },
    ],

    unknowns: [
      {
        id: "u1",
        content:
          "User adoption rate unknown",
      },
    ],

  },

};
