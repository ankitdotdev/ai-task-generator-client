"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="w-full bg-[#10a37f] hover:bg-[#0e8f6f] transition-all text-white font-medium py-2 rounded-lg disabled:opacity-50"
    >
      {children}
    </button>
  );
};
