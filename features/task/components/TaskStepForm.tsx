"use client";

import { useState } from "react";

import { STEPS } from "../constants/steps";
import { Input } from "@/components/Inputs/Inputs";
import { Textarea } from "@/components/Inputs/Textarea";
import { Button } from "@/components/Buttons/Button";
import { GenerateSpecInput } from "../types/task.types";

interface Props {
  initialData: GenerateSpecInput | null;

  onCancel: () => void;

  onComplete: (data: GenerateSpecInput) => void;
}

export const TaskStepForm = ({ initialData, onCancel, onComplete }: Props) => {
  const [stepIndex, setStepIndex] = useState(0);

  const [formData, setFormData] = useState<Partial<GenerateSpecInput>>(
    initialData || {},
  );

  const step = STEPS[stepIndex];

  const value = formData[step.key] || "";
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (step.type === "textarea") {
      // Ctrl + Enter → Next
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        next();
      }

      return;
    }

    // Enter → Next
    if (e.key === "Enter") {
      e.preventDefault();
      next();
    }
  };
  const updateValue = (value: string) => {
    setFormData({
      ...formData,
      [step.key]: value,
    });
  };

  const next = () => {
    if (step.required && !value) return;

    if (stepIndex === STEPS.length - 1) {
      onComplete(formData as GenerateSpecInput);

      return;
    }

    setStepIndex(stepIndex + 1);
  };

  const back = () => {
    if (stepIndex === 0) {
      onCancel();
      return;
    }

    setStepIndex(stepIndex - 1);
  };

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
        <div>
          <h1
            className="
            text-2xl
            font-semibold
          "
          >
            Create Task
          </h1>

          <p
            className="
            text-gray-400
            text-sm
          "
          >
            Step {stepIndex + 1}
            of {STEPS.length}
          </p>
        </div>
      </div>

      {/* Card */}
      <div
        className="
        bg-[#444654]
        p-6
        rounded-lg
      "
      >
        {step.type === "text" && (
          <Input
            label={step.label}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        {step.type === "textarea" && (
          <Textarea
            label={step.label}
            rows={4}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
        )}

        {step.type === "select" && (
          <select
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            className="
              w-full
              mt-2
              bg-[#1f2937]
              border border-[#1e293b]
              rounded-lg
              px-4 py-2
            "
          >
            <option value="">Select {step.label}</option>

            {step.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Footer */}
      <div
        className="
        flex
        justify-between
        mt-6
        gap-4
      "
      >
        <Button onClick={back}>Back</Button>

        <Button onClick={next}>
          {stepIndex === STEPS.length - 1 ? "Review" : "Next"}
        </Button>
      </div>
    </div>
  );
};
