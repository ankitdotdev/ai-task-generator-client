"use client";

export const TaskGenerating = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Logo/Icon */}
        <div className="relative mb-8 inline-block">
          {/* Outer Ring */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-teal-500/20 rounded-full animate-ping" />

          {/* Middle Ring */}
          <div className="absolute inset-2 w-28 h-28 border-4 border-teal-400/30 rounded-full animate-spin" />

          {/* Inner Circle */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/50">
            <svg
              className="w-16 h-16 text-white animate-pulse"
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
          </div>
        </div>

        {/* Main Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 animate-pulse">
          AI is Generating Your Spec
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 mb-8">
          Creating user stories, tasks, and risk analysis...
        </p>

        {/* Tip */}
        <div className="mt-8 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
          <p className="text-sm text-teal-300">
            💡 <span className="font-semibold">Tip:</span> This usually takes
            10-30 seconds
          </p>
        </div>
      </div>
    </div>
  );
};
