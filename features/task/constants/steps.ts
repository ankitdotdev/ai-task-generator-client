import {
  GenerateSpecInput,
} from "../types/task.types";

export type StepKey = keyof GenerateSpecInput;

export interface StepConfig {
  key: StepKey;
  label: string;
  placeholder: string;
  required: boolean;
  type: "text" | "textarea" | "select";
  options?: string[];
}

export const STEPS: StepConfig[] = [
  {
    key: "title",
    label: "Feature Title",
    placeholder: "Task Generator",
    required: true,
    type: "text",
  },
  {
    key: "goal",
    label: "Goal",
    placeholder: "What is the main purpose?",
    required: true,
    type: "textarea",
  },
  {
    key: "targetUsers",
    label: "Target Users",
    placeholder: "Developers, Designers...",
    required: true,
    type: "text",
  },
  {
    key: "platformType",
    label: "Platform Type",
    placeholder: "",
    required: true,
    type: "select",
    options: ["web", "mobile", "internal-tool", "api"],
  },
  {
    key: "constraints",
    label: "Constraints",
    placeholder: "Optional constraints",
    required: false,
    type: "textarea",
  },
  {
    key: "techPreference",
    label: "Tech Preference",
    placeholder: "Next.js, Node.js...",
    required: false,
    type: "text",
  },
  {
    key: "riskSensitivity",
    label: "Risk Sensitivity",
    placeholder: "",
    required: false,
    type: "select",
    options: ["low", "medium", "high"],
  },
];
