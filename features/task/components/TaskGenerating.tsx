"use client";

export const TaskGenerating = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-32">

      {/* Spinner */}
      <div className="
        w-12 h-12
        border-4
        border-[#10a37f]
        border-t-transparent
        rounded-full
        animate-spin
        mb-6
      " />

      {/* Text */}
      <h2 className="
        text-xl
        font-semibold
        mb-2
      ">
        AI is generating your spec...
      </h2>

      <p className="
        text-gray-400
      ">
        Creating user stories, tasks, and risks
      </p>

    </div>
  );
};
