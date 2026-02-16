"use client";

import React from "react";

interface Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<Props> = ({
  label,
  ...props
}) => {
  return (
    <div className="space-y-1">

      <label className="text-sm text-gray-400">
        {label}
      </label>

      <textarea
        {...props}
        className="
          w-full
          rounded-lg
          bg-[#1f2937]
          border border-[#1e293b]
          px-4 py-2
          text-gray-200
          focus:outline-none
          focus:ring-2
          focus:ring-[#10a37f]
          resize-none
        "
      />

    </div>
  );
};
