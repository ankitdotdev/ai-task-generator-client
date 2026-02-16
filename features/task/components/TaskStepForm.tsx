"use client";

import { useState } from "react";
import { STEPS } from "../constants/steps";
import { GenerateSpecInput } from "../types/task.types";

interface Props {
  initialData: GenerateSpecInput | null;
  onCancel: () => void;
  onComplete: (data: GenerateSpecInput) => void;
}

export const TaskStepForm = ({ initialData, onCancel, onComplete }: Props) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<GenerateSpecInput>>(
    initialData || {}
  );

  const step = STEPS[stepIndex];
  const value = formData[step.key] || "";
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (step.type === "textarea") {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        next();
      }
      return;
    }

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-3xl font-bold text-white">Create Task</h1>
            <p className="text-gray-400 text-sm mt-1">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress Track */}
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`
                flex flex-col items-center
                ${idx <= stepIndex ? "text-teal-400" : "text-gray-600"}
                transition-colors duration-300
              `}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1
                  ${
                    idx < stepIndex
                      ? "bg-teal-500 text-white"
                      : idx === stepIndex
                      ? "bg-teal-500 text-white ring-4 ring-teal-500/30"
                      : "bg-gray-700 text-gray-400"
                  }
                  transition-all duration-300
                `}
              >
                {idx < stepIndex ? "✓" : idx + 1}
              </div>
              <span className="text-xs hidden md:block">{s.label.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        {/* Step Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {step.label}
          </h2>
          {step.required && (
            <span className="text-xs text-teal-400 font-medium">
              * Required field
            </span>
          )}
        </div>

        {/* Form Input */}
        <div className="mb-8">
          {step.type === "text" && (
            <div>
              <input
                type="text"
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Enter ${step.label.toLowerCase()}`}
                className="
                  w-full
                  bg-gray-900/50
                  border border-gray-600
                  rounded-xl
                  px-4 py-3
                  text-white
                  placeholder-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  focus:border-transparent
                  transition-all
                "
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to continue
              </p>
            </div>
          )}

          {step.type === "textarea" && (
            <div>
              <textarea
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                placeholder={`Describe ${step.label.toLowerCase()}`}
                rows={6}
                className="
                  w-full
                  bg-gray-900/50
                  border border-gray-600
                  rounded-xl
                  px-4 py-3
                  text-white
                  placeholder-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  focus:border-transparent
                  transition-all
                  resize-none
                "
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                Press Ctrl + Enter to continue
              </p>
            </div>
          )}

          {step.type === "select" && (
            <select
              value={value}
              onChange={(e) => updateValue(e.target.value)}
              className="
                w-full
                bg-gray-900/50
                border border-gray-600
                rounded-xl
                px-4 py-3
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                focus:border-transparent
                transition-all
                cursor-pointer
              "
              autoFocus
            >
              <option value="" className="bg-gray-800">
                Select {step.label}
              </option>
              {step.options?.map((option) => (
                <option key={option} value={option} className="bg-gray-800">
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={back}
            className="
              flex-1
              bg-gray-700
              hover:bg-gray-600
              text-white
              font-semibold
              py-3
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
            <span>Back</span>
          </button>

          <button
            onClick={next}
            disabled={step.required && !value}
            className="
              flex-1
              bg-gradient-to-r from-teal-500 to-teal-600
              hover:from-teal-600 hover:to-teal-700
              disabled:from-gray-600 disabled:to-gray-600
              disabled:cursor-not-allowed
              text-white
              font-semibold
              py-3
              rounded-xl
              transition-all
              duration-200
              flex items-center justify-center gap-2
              shadow-lg shadow-teal-500/30
              hover:shadow-xl hover:shadow-teal-500/40
              disabled:shadow-none
            "
          >
            <span>
              {stepIndex === STEPS.length - 1 ? "Review" : "Next"}
            </span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};