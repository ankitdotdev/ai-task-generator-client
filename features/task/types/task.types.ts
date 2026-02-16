export type PlatformType =
  | "web"
  | "mobile"
  | "internal-tool"
  | "api";

export type RiskSensitivity =
  | "low"
  | "medium"
  | "high";

export interface GenerateSpecInput {
  title: string;
  goal: string;
  targetUsers: string;
  platformType: PlatformType;
  constraints?: string;
  techPreference?: string;
  riskSensitivity?: RiskSensitivity;
}

export type TaskViewState =
  | "empty"
  | "create"
  | "review"
  | "generating"
  | "result";






  // AI SPEC OUTPUT TYPES 

export interface SpecItem {
  id: string;
  content: string;
}

export interface AISpecOutput {
  specInputId: string;
  version: number;
  output: {
    userStories: SpecItem[];
    engineeringTasks: SpecItem[];
    risks: SpecItem[];
    unknowns: SpecItem[];
  };

  aiModel?: string;
  generatedAt: Date;
}
