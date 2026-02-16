"use client";

import { Button } from "@/components/Buttons/Button";
import { GenerateSpecInput } from "../types/task.types";

interface Props {
  data: GenerateSpecInput;
  onBack: () => void;
  onGenerate: () => void;
}

export const TaskReview = ({ data, onBack, onGenerate }: Props) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Review Your Task</h1>
        </div>
        <p className="text-gray-400">
          Review the details before generating your spec
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ReviewCard
          icon="📝"
          label="Title"
          value={data.title}
          fullWidth={true}
        />
        <ReviewCard
          icon="🎯"
          label="Goal"
          value={data.goal}
          fullWidth={true}
        />
        <ReviewCard
          icon="👥"
          label="Target Users"
          value={data.targetUsers}
        />
        <ReviewCard
          icon="💻"
          label="Platform"
          value={data.platformType}
        />
        <ReviewCard
          icon="⚠️"
          label="Constraints"
          value={data.constraints || "None specified"}
        />
        <ReviewCard
          icon="🛠️"
          label="Tech Preference"
          value={data.techPreference || "No preference"}
        />
        <ReviewCard
          icon="🔒"
          label="Risk Sensitivity"
          value={data.riskSensitivity || "Not specified"}
          fullWidth={true}
        />
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/30 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">
              Ready to Generate
            </h3>
            <p className="text-gray-300 text-sm">
              We'll create a comprehensive spec including user stories,
              engineering tasks, potential risks, and unknowns based on your
              input.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="
            flex-1
            bg-gray-700
            hover:bg-gray-600
            text-white
            font-semibold
            py-4
            rounded-xl
            transition-all
            duration-200
            flex items-center justify-center gap-2
          "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Edit</span>
        </button>

        <button
          onClick={onGenerate}
          className="
            flex-1
            bg-gradient-to-r from-teal-500 to-teal-600
            hover:from-teal-600 hover:to-teal-700
            text-white
            font-semibold
            py-4
            rounded-xl
            transition-all
            duration-200
            flex items-center justify-center gap-2
            shadow-lg shadow-teal-500/30
            hover:shadow-xl hover:shadow-teal-500/40
            transform hover:scale-[1.02]
          "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Generate Spec</span>
        </button>
      </div>
    </div>
  );
};

const ReviewCard = ({
  icon,
  label,
  value,
  fullWidth = false,
}: {
  icon: string;
  label: string;
  value: string;
  fullWidth?: boolean;
}) => (
  <div
    className={`
      bg-gradient-to-br from-gray-800/80 to-gray-900/80
      backdrop-blur-xl
      border border-gray-700/50
      rounded-xl
      p-5
      hover:border-teal-500/30
      transition-all
      duration-300
      ${fullWidth ? "md:col-span-2" : ""}
    `}
  >
    <div className="flex items-start gap-3">
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </div>
        <div className="text-white font-medium break-words">
          {value || "—"}
        </div>
      </div>
    </div>
  </div>
);