"use client";

interface Props {
  onCreate: () => void;
}

export const TaskEmptyState = ({ onCreate }: Props) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="text-center max-w-2xl w-full">
        {/* Icon or Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Task Generator
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Create structured specs and engineering tasks with AI-powered
          assistance
        </p>

        {/* CTA Button */}
        <button
          onClick={onCreate}
          className="
            group
            relative
            bg-gradient-to-r from-teal-500 to-teal-600
            hover:from-teal-600 hover:to-teal-700
            text-white
            font-semibold
            px-8 py-4
            rounded-xl
            shadow-lg shadow-teal-500/30
            hover:shadow-xl hover:shadow-teal-500/40
            transition-all duration-300
            transform hover:scale-105
            inline-flex items-center gap-3
          "
        >
          <span>Create New Task</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="⚡"
            title="Fast Generation"
            description="AI-powered spec creation in seconds"
          />
          <FeatureCard
            icon="📋"
            title="Structured Output"
            description="Organized user stories and tasks"
          />
          <FeatureCard
            icon="🎯"
            title="Risk Analysis"
            description="Identify potential issues early"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-teal-500/50 transition-colors">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);