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
    <div>
      {/* Header */}
      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >
        <h1
          className="
          text-2xl font-semibold
        "
        >
          Review Task
        </h1>

        <div className="w-40">
          <Button onClick={onGenerate}>Generate</Button>
        </div>
      </div>

      {/* Card */}
      <div
        className="
        bg-[#444654]
        p-6
        rounded-lg
        space-y-4
      "
      >
        <Item label="Title" value={data.title} />

        <Item label="Goal" value={data.goal} />

        <Item label="Target Users" value={data.targetUsers} />

        <Item label="Platform" value={data.platformType} />

        <Item label="Constraints" value={data.constraints} />

        <Item label="Tech Preference" value={data.techPreference} />

        <Item label="Risk Sensitivity" value={data.riskSensitivity} />
      </div>

      <div
        className="
        mt-6
        w-40
      "
      >
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  );
};

const Item = ({ label, value }: any) => (
  <div>
    <div
      className="
      text-sm
      text-gray-400
    "
    >
      {label}
    </div>

    <div>{value || "—"}</div>
  </div>
);
