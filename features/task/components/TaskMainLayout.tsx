"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TaskMainLayout = ({
  children,
}: Props) => {
  return (
    <div className="
      flex-1
      overflow-y-auto
      flex
      justify-center
    ">
      <div className="
        w-full
        max-w-4xl
        px-6
        py-10
      ">
        {children}
      </div>
    </div>
  );
};
