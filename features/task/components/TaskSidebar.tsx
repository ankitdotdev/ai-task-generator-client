"use client";

import { useRouter } from "next/navigation";

interface TaskItem {
  id: string;
  title: string;
}

interface Props {
  tasks: TaskItem[];
}

export const TaskSidebar = ({ tasks }: Props) => {

  const router = useRouter();

  const handleNewTask = () => {
    router.push("/task");
  };

  const handleTaskClick = (id: string) => {
    router.push(`/task/${id}`);
  };

  return (
    <div className="w-64 bg-[#202123] flex flex-col">

      {/* New Task */}
      <div className="p-3">
        <button
          onClick={handleNewTask}
          className="
            w-full
            border border-gray-600
            rounded-md
            px-3 py-2
            hover:bg-gray-700
          "
        >
          + New Task
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3">

        <div className="text-sm text-gray-400 mb-2">
          History
        </div>

        {tasks.length === 0 && (
          <div className="text-sm text-gray-500">
            No tasks yet
          </div>
        )}

        {tasks.map(task => (

          <div
            key={task.id}

            onClick={() =>
              handleTaskClick(task.id)
            }

            className="
              text-sm
              p-2
              rounded
              hover:bg-gray-700
              cursor-pointer
              truncate
            "
          >
            {task.title}
          </div>

        ))}

      </div>

      {/* Profile */}
      <div className="p-3 border-t border-gray-700">
        Profile
      </div>

    </div>
  );
};
