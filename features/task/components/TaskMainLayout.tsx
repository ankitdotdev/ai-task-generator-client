"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TaskMainLayout = ({ children }: Props) => {
  return (
    <div
      className="
        flex-1
        overflow-y-auto
        bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800
        relative
      "
    >
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};