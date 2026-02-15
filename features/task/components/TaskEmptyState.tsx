"use client";

interface Props {
  onCreate: () => void;
}

export const TaskEmptyState = ({
  onCreate,
}: Props) => {
  return (
    <div className="text-center mt-32">

      <h1 className="
        text-3xl
        font-semibold
        mb-4
      ">
        Task Generator
      </h1>

      <p className="
        text-gray-400
        mb-6
      ">
        Create structured specs and engineering tasks
      </p>

      <button
        onClick={onCreate}
        className="
          bg-[#10a37f]
          px-6 py-3
          rounded-lg
          hover:bg-[#0e8c6d]
        "
      >
        Create New Task
      </button>

    </div>
  );
};
